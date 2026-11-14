
import { Flame, Sparkles } from 'lucide-react'
import './StreakBadge.css'

type StreakBadgeProps = {
  days: number
  size?: 'large' | 'compact'
}

function getBadgeTier(days: number): string {
  if (days >= 3650) return 'eternal'
  if (days >= 1825) return 'legacy'
  if (days >= 1500) return 'transcendent'
  if (days >= 1000) return 'mythic'
  if (days >= 500) return 'legendary'
  if (days >= 300) return 'royal'
  if (days >= 100) return 'master'
  if (days >= 60) return 'advanced'
  if (days >= 30) return 'awakened'

  return 'starter'
}

function getEvolutionMarkCount(days: number): number {
  if (days < 100) return 0

  const marks = Math.floor(days / 100) % 10

  return marks === 0 ? 10 : marks
}

function StreakBadge({
  days,
  size = 'large',
}: StreakBadgeProps) {
  const safeDays = Math.max(0, Math.floor(days))
  const tier = getBadgeTier(safeDays)
  const evolutionMarks = getEvolutionMarkCount(safeDays)
  const isYearlyMilestone =
    safeDays > 0 && safeDays % 365 === 0

  return (
    <span
      className={[
        'cx-shared-streak-badge',
        `cx-shared-streak-${tier}`,
        `cx-shared-streak-badge--${size}`,
        isYearlyMilestone
          ? 'cx-shared-streak-anniversary'
          : '',
      ].filter(Boolean).join(' ')}
      role="img"
      aria-label={`${safeDays} day ${tier} streak badge`}
      data-tier={tier}
      data-days={safeDays}
    >
      <span className="cx-shared-streak-art">
        <span className="cx-shared-streak-aura" />

        <span className="cx-shared-streak-legacy-radiance" />

        <span className="cx-shared-streak-orbit cx-shared-streak-orbit-one" />
        <span className="cx-shared-streak-orbit cx-shared-streak-orbit-two" />

        <span
          className="cx-shared-streak-evolution-marks"
          aria-hidden="true"
        >
          {Array.from(
            { length: evolutionMarks },
            (_, index) => (
              <span
                key={index}
                className="cx-shared-streak-evolution-mark"
                style={{
                  transform: `rotate(${(360 / evolutionMarks) * index}deg) translateY(-82px)`,
                }}
              />
            ),
          )}
        </span>

        <span className="cx-shared-streak-flame">
          <Flame className="cx-shared-streak-flame-layer cx-shared-streak-flame-outer" />
          <Flame className="cx-shared-streak-flame-layer cx-shared-streak-flame-inner" />
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
