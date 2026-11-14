
export const STREAK_MILESTONES = [
  30,
  60,
  ...Array.from(
    { length: 36 },
    (_, index) => (index + 1) * 100,
  ),
  ...Array.from(
    { length: 10 },
    (_, index) => (index + 1) * 365,
  ),
].filter((value, index, array) => (
  array.indexOf(value) === index
)).sort((a, b) => a - b)

export const STREAK_GRACE_PERIOD_DAYS = 1

export const ELIGIBLE_STREAK_ACTIONS = [
  'completed_game',
  'solved_puzzle',
  'completed_lesson',
  'completed_training',
] as const

export type EligibleStreakAction =
  (typeof ELIGIBLE_STREAK_ACTIONS)[number]

export type StreakStatus =
  | 'active'
  | 'grace_period'
  | 'restored'
  | 'ended'

export type StreakActivity = {
  date: string
  completed: boolean
  actionType: EligibleStreakAction | null
}

export type StreakHistoryEntry = {
  startedAt: string
  endedAt: string | null
  highestDays: number
  status: StreakStatus
}

export type StreakData = {
  currentStreak: number
  longestStreak: number
  lastSuccessfulActionAt: string | null
  weeklyActivity: StreakActivity[]
  gracePeriodStatus: StreakStatus
  gracePeriodUsed: boolean
  milestoneLevel: number
  streakHistory: StreakHistoryEntry[]
}

export function getNextMilestone(days: number): number {
  if (days < 30) return 30
  if (days < 60) return 60

  const nextHundred =
    (Math.floor(days / 100) + 1) * 100

  const nextAnniversary =
    (Math.floor(days / 365) + 1) * 365

  return Math.min(nextHundred, nextAnniversary)
}

export function getCurrentMilestone(days: number): number {
  if (days < 30) return 0
  if (days < 60) return 30

  const currentHundred =
    Math.floor(days / 100) * 100

  const currentAnniversary =
    Math.floor(days / 365) * 365

  return Math.max(
    60,
    currentHundred,
    currentAnniversary,
  )
}

export function getMilestoneProgress(days: number) {
  const current = getCurrentMilestone(days)
  const next = getNextMilestone(days)

  if (current === 0) {
    return {
      current,
      next,
      progress: Math.min((days / next) * 100, 100),
    }
  }

  return {
    current,
    next,
    progress: Math.min(
      ((days - current) / (next - current)) * 100,
      100,
    ),
  }
}

export function getBadgePiece(days: number): string {
  if (days < 60) return '♟'
  if (days < 100) return '♞'
  if (days < 200) return '♝'
  if (days < 300) return '♜'
  if (days < 400) return '♛'

  const legendaryPieces = ['♚', '♛', '♜', '♝', '♞', '♟']
  const variation = Math.floor((days - 400) / 100)

  return legendaryPieces[variation % legendaryPieces.length]
}
