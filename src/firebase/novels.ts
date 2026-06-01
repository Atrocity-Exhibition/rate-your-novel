import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  runTransaction,
  addDoc,
  serverTimestamp,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  QueryConstraint,
} from 'firebase/firestore'
import { db } from './config'
import type { Novel, Rating, Review } from '@/types'

const novelsCol = collection(db, 'novels')

function novelFromDoc(docSnap: DocumentSnapshot | QueryDocumentSnapshot): Novel {
  const d = docSnap.data() as Omit<Novel, 'id'>
  return { ...d, id: docSnap.id }
}

// ─── Novels ─────────────────────────────────────────────────────────────────

export interface GetNovelsOptions {
  genre?: string
  status?: string
  sortBy?: 'avgRating' | 'reviewCount' | 'addedAt'
  pageSize?: number
  afterDoc?: QueryDocumentSnapshot | null
}

export async function getNovels(options: GetNovelsOptions = {}): Promise<{
  novels: Novel[]
  lastDoc: QueryDocumentSnapshot | null
}> {
  const { genre, status, sortBy = 'avgRating', pageSize = 24, afterDoc } = options
  const constraints: QueryConstraint[] = []

  if (genre) constraints.push(where('genres', 'array-contains', genre))
  if (status) constraints.push(where('status', '==', status))
  constraints.push(orderBy(sortBy, 'desc'))
  if (afterDoc) constraints.push(startAfter(afterDoc))
  constraints.push(limit(pageSize))

  const snap = await getDocs(query(novelsCol, ...constraints))
  const novels = snap.docs.map(novelFromDoc)
  const lastDoc = snap.docs[snap.docs.length - 1] ?? null
  return { novels, lastDoc }
}

export async function getTopNovels(count = 10): Promise<Novel[]> {
  const snap = await getDocs(
    query(novelsCol, orderBy('avgRating', 'desc'), limit(count))
  )
  return snap.docs.map(novelFromDoc)
}

export async function getNewReleases(count = 12): Promise<Novel[]> {
  const snap = await getDocs(
    query(novelsCol, orderBy('addedAt', 'desc'), limit(count))
  )
  return snap.docs.map(novelFromDoc)
}

export async function getNovel(id: string): Promise<Novel | null> {
  const snap = await getDoc(doc(db, 'novels', id))
  if (!snap.exists()) return null
  return novelFromDoc(snap)
}

// ─── Ratings ─────────────────────────────────────────────────────────────────

export async function getUserRating(novelId: string, userId: string): Promise<Rating | null> {
  const snap = await getDoc(doc(db, 'novels', novelId, 'ratings', userId))
  if (!snap.exists()) return null
  return snap.data() as Rating
}

export async function rateNovel(novelId: string, userId: string, score: number): Promise<void> {
  const novelRef = doc(db, 'novels', novelId)
  const ratingRef = doc(db, 'novels', novelId, 'ratings', userId)

  await runTransaction(db, async (tx) => {
    const novelSnap = await tx.get(novelRef)
    const ratingSnap = await tx.get(ratingRef)

    if (!novelSnap.exists()) throw new Error('Novel not found')

    const novel = novelSnap.data() as Novel
    let { ratingSum, ratingCount } = novel

    if (ratingSnap.exists()) {
      const prev = ratingSnap.data() as Rating
      ratingSum = ratingSum - prev.score + score
    } else {
      ratingSum += score
      ratingCount += 1
    }

    const avgRating = ratingSum / ratingCount

    tx.set(ratingRef, { userId, score, updatedAt: serverTimestamp(), createdAt: ratingSnap.exists() ? ratingSnap.data()?.createdAt : serverTimestamp() })
    tx.update(novelRef, { ratingSum, ratingCount, avgRating, updatedAt: serverTimestamp() })
  })
}

export async function getRatingDistribution(novelId: string): Promise<Record<number, number>> {
  const snap = await getDocs(collection(db, 'novels', novelId, 'ratings'))
  const dist: Record<number, number> = {}
  for (let i = 1; i <= 10; i++) dist[i] = 0
  snap.docs.forEach((d) => {
    const score = (d.data() as Rating).score
    dist[score] = (dist[score] ?? 0) + 1
  })
  return dist
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export async function getReviews(novelId: string): Promise<Review[]> {
  const snap = await getDocs(
    query(collection(db, 'novels', novelId, 'reviews'), orderBy('createdAt', 'desc'), limit(50))
  )
  return snap.docs.map((d) => ({ ...(d.data() as Omit<Review, 'id'>), id: d.id }))
}

export async function addReview(
  novelId: string,
  data: Omit<Review, 'id' | 'createdAt' | 'helpfulCount'>
): Promise<void> {
  const reviewsCol = collection(db, 'novels', novelId, 'reviews')
  const novelRef = doc(db, 'novels', novelId)

  await runTransaction(db, async (tx) => {
    const novelSnap = await tx.get(novelRef)
    if (!novelSnap.exists()) throw new Error('Novel not found')
    const novel = novelSnap.data() as Novel

    const reviewRef = doc(reviewsCol)
    tx.set(reviewRef, { ...data, novelId, helpfulCount: 0, createdAt: serverTimestamp() })
    tx.update(novelRef, { reviewCount: (novel.reviewCount ?? 0) + 1 })
  })
}

export async function getRecentReviews(count = 6): Promise<(Review & { novelTitle: string; novelId: string })[]> {
  // Firestore doesn't support cross-collection queries, so we get recent reviews per novel
  // For a real app you'd maintain a top-level `reviews` collection mirrored
  // This is a simplified version using a top-level reviews collection
  const snap = await getDocs(
    query(collection(db, 'reviews'), orderBy('createdAt', 'desc'), limit(count))
  )
  return snap.docs.map((d) => ({ ...(d.data() as Review & { novelTitle: string }), id: d.id }))
}
