import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './config'
import type { UserProfile } from '@/types'

const googleProvider = new GoogleAuthProvider()

export async function registerWithEmail(email: string, password: string, username: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(cred.user, { displayName: username })

  const profile: Omit<UserProfile, 'uid'> = {
    username,
    email,
    avatarUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(username)}`,
    bio: '',
    joinedAt: new Date(),
  }

  await setDoc(doc(db, 'users', cred.user.uid), {
    ...profile,
    joinedAt: serverTimestamp(),
  })

  return cred.user
}

export async function loginWithEmail(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password)
  return cred.user
}

export async function loginWithGoogle() {
  const cred = await signInWithPopup(auth, googleProvider)
  const userRef = doc(db, 'users', cred.user.uid)
  const snap = await getDoc(userRef)

  if (!snap.exists()) {
    const username = cred.user.displayName ?? cred.user.email?.split('@')[0] ?? 'reader'
    await setDoc(userRef, {
      username,
      email: cred.user.email,
      avatarUrl: cred.user.photoURL ?? `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(username)}`,
      bio: '',
      joinedAt: serverTimestamp(),
    })
  }

  return cred.user
}

export async function logout() {
  await signOut(auth)
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, 'users', uid))
  if (!snap.exists()) return null
  return { ...(snap.data() as Omit<UserProfile, 'uid'>), uid }
}

export async function updateUserProfile(uid: string, data: Partial<Pick<UserProfile, 'bio' | 'username' | 'avatarUrl'>>) {
  await updateDoc(doc(db, 'users', uid), { ...data })
}
