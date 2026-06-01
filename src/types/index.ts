export interface Novel {
  id: string
  title: string
  author: string
  description: string
  coverUrl: string
  status: 'ongoing' | 'completed' | 'hiatus'
  genres: string[]
  tags: string[]
  sourceUrl: string
  totalChapters: number
  year: number
  // Denormalized for fast queries
  avgRating: number
  ratingCount: number
  ratingSum: number
  reviewCount: number
  addedAt: Date
  updatedAt: Date
}

export interface Rating {
  userId: string
  score: number // 1-10
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  id: string
  novelId: string
  userId: string
  username: string
  userAvatar: string
  score: number // 1-10
  title: string
  body: string
  helpfulCount: number
  createdAt: Date
}

export interface UserProfile {
  uid: string
  username: string
  email: string
  avatarUrl: string
  bio: string
  joinedAt: Date
}

export interface ReadingListEntry {
  novelId: string
  status: 'reading' | 'completed' | 'dropped' | 'planning'
  addedAt: Date
}

export interface UserList {
  id: string
  name: string
  description: string
  novelIds: string[]
  createdAt: Date
}
