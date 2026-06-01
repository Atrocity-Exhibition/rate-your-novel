import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyDuYxOzj4XYtnUm1EYUx9p8Pqee1WrmsVQ",
  authDomain: "ryn-db.firebaseapp.com",
  projectId: "ryn-db",
  storageBucket: "ryn-db.firebasestorage.app",
  messagingSenderId: "308913007941",
  appId: "1:308913007941:web:c21923c21e2adafdc4e22c",
  measurementId: "G-WDNWJPEQB7"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const analytics = getAnalytics(app)

export default app
