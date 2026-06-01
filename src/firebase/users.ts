import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './config'
import type { ReadingListEntry } from '@/types'

export async function getReadingList(userId: string): Promise<ReadingListEntry[]> {
  const snap = await getDocs(collection(db, 'users', userId, 'readingList'))
  return snap.docs.map((d) => ({ ...(d.data() as ReadingListEntry), novelId: d.id }))
}

export async function setReadingStatus(
  userId: string,
  novelId: string,
  status: ReadingListEntry['status']
) {
  await setDoc(doc(db, 'users', userId, 'readingList', novelId), {
    novelId,
    status,
    addedAt: serverTimestamp(),
  })
}

export async function removeFromReadingList(userId: string, novelId: string) {
  await deleteDoc(doc(db, 'users', userId, 'readingList', novelId))
}
