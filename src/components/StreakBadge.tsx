import { Flame, Sparkles } from 'lucide-react'
import './StreakBadge.css'

type StreakBadgeProps = {
  days: number
  size?: 'large' | 'compact'
}

function getBadgeTier(days: number): string {
  if (days >= 500) return 'legendary'
  if (days >= 300) return 'royal'
  if (days >= 100) return 'master'
  if (days >= 60) return 'advanced'
  if (days >= 30) return 'awakened'
  return 'starter'
}

function StreakBadge({
  days,
  size = 'large',
}: StreakBadgeProps) {
  const tier = getBadgeTier(days)

  return (
    <span
      className={`cx-shared-streak-badge cx-shared-streak-${tier} cx-shared-streak-badge--${size}`}
      role="img"
      aria-label={`${days} day streak badge`}
      data-tier={tier}
    >
      <span className="cx-shared-streak-art">
        <span className="cx-shared-streak-aura" />

        <span className="cx-shared-streak-orbit cx-shared-streak-orbit-one" />
        <span className="cx-shared-streak-orbit cx-shared-streak-orbit-two" />

        <span className="cx-shared-streak-flame">
          <Flame className="cx-shared-streak-flame-icon" />
        </span>

        <span className="cx-shared-streak-sparks">
          <Sparkles className="cx-shared-streak-spark spark-one" />
          <Sparkles className="cx-shared-streak-spark spark-two" />
          <Sparkles className="cx-shared-streak-spark spark-three" />
        </span>
      </span>
    </span>
  )
}

export default StreakBadge
