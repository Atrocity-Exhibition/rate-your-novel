import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserProfile } from '@/firebase/auth'
import { getReadingList } from '@/firebase/users'
import type { UserProfile, ReadingListEntry } from '@/types'

export default function UserProfilePage() {
  const { id } = useParams<{ id: string }>()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [readingList, setReadingList] = useState<ReadingListEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    async function load() {
      const [p, rl] = await Promise.all([getUserProfile(id!), getReadingList(id!)])
      setProfile(p)
      setReadingList(rl)
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d0d0d]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-rose-500" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d0d0d]">
        <p className="text-neutral-500">User not found.</p>
      </div>
    )
  }

  const joinDate = profile.joinedAt instanceof Date
    ? profile.joinedAt
    : (profile.joinedAt as unknown as { toDate?: () => Date })?.toDate?.() ?? new Date()

  const statusGroups = {
    reading: readingList.filter((r) => r.status === 'reading'),
    completed: readingList.filter((r) => r.status === 'completed'),
    planning: readingList.filter((r) => r.status === 'planning'),
    dropped: readingList.filter((r) => r.status === 'dropped'),
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Profile header */}
        <div className="flex items-start gap-5 rounded-2xl border border-white/8 bg-[#141414] p-6">
          <img
            src={profile.avatarUrl}
            alt={profile.username}
            className="h-20 w-20 rounded-2xl ring-2 ring-white/10 object-cover"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-black text-white">{profile.username}</h1>
            {profile.bio && <p className="text-sm text-neutral-400">{profile.bio}</p>}
            <p className="text-xs text-neutral-600">
              Member since {joinDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
            </p>
            <div className="mt-2 flex gap-4 text-sm">
              <div>
                <span className="font-bold text-white">{readingList.length}</span>{' '}
                <span className="text-neutral-500">on list</span>
              </div>
              <div>
                <span className="font-bold text-white">{statusGroups.completed.length}</span>{' '}
                <span className="text-neutral-500">completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reading list */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-white">Reading List</h2>
          {readingList.length === 0 ? (
            <p className="text-sm text-neutral-500">No novels on their list yet.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {(['reading', 'completed', 'planning', 'dropped'] as const).map((status) => {
                const entries = statusGroups[status]
                if (entries.length === 0) return null
                return (
                  <div key={status}>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-neutral-500 capitalize">
                      {status} ({entries.length})
                    </h3>
                    <div className="flex flex-col divide-y divide-white/6 rounded-xl border border-white/8 bg-[#141414] overflow-hidden">
                      {entries.map((entry) => (
                        <div key={entry.novelId} className="flex items-center justify-between px-4 py-3">
                          <span className="text-sm text-neutral-300 font-mono">{entry.novelId}</span>
                          <span className={`rounded px-2 py-0.5 text-xs capitalize ${
                            status === 'completed' ? 'text-emerald-400' :
                            status === 'reading' ? 'text-blue-400' :
                            status === 'dropped' ? 'text-rose-400' :
                            'text-neutral-400'
                          }`}>
                            {status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
