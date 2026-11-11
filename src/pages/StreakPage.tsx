
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Share2,
  Flame,
  Check,
  LockKeyhole,
  CalendarDays,
  History,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import StreakBadge from '../components/StreakBadge'
import { playerProfile } from '../data/playerProfile'
import {
  getCurrentMilestone,
  getMilestoneProgress,
  getNextMilestone,
  STREAK_GRACE_PERIOD_DAYS,
} from '../data/streakConfig'

import './StreakPage.css'

const weekDays = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
]

const weeklyActivity = weekDays.map((day) => ({
  day,
  completed: false,
}))

function StreakPage() {
  const navigate = useNavigate()
  const [shareMessage, setShareMessage] = useState('')

  // Frontend preview data.
  // The backend will provide the real streak information later.
  const currentStreak = playerProfile.streak
  const longestStreak = currentStreak

  const currentMilestone = getCurrentMilestone(currentStreak)
  const nextMilestone = getNextMilestone(currentStreak)
  const milestoneProgress = getMilestoneProgress(currentStreak)
  const badgePiece = getBadgePiece(currentStreak)

    const shareText =
      `I currently have ${currentStreak} XStreaks on CheckmaîtréX Chess Club!`

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'CheckmaîtréXStreak',
          text: shareText,
          url: window.location.href,
        })
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          `${shareText} ${window.location.href}`,
        )
        setShareMessage('Streak link copied!')
      } else {
        setShareMessage('Sharing is not available on this device.')
      }
    } catch {
      setShareMessage('Sharing was cancelled or unavailable.')
    }
  }

  return (
    <div className="cx-streak-page">
      <header className="cx-streak-header">
        <button
          className="cx-streak-header-button"
          type="button"
          aria-label="Go back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={22} />
        </button>

        <h1>CheckmaîtréXStreak</h1>

        <button
          className="cx-streak-header-button"
          type="button"
          aria-label="Share streak"
          onClick={handleShare}
        >
          <Share2 size={20} />
        </button>
      </header>

      {shareMessage && (
        <div className="cx-streak-share-message" role="status">
          {shareMessage}
        </div>
      )}

      <main className="cx-streak-content">
        <section className="cx-streak-hero">
          <span className="cx-streak-overline">
            YOUR STREAK JOURNEY
          </span>

          <div
            className={`cx-streak-badge cx-streak-${badgeTier}`}
            data-tier={badgeTier}
          >
            <div className="cx-streak-aura" />
            <div className="cx-streak-orbit cx-streak-orbit-one" />
            <div className="cx-streak-orbit cx-streak-orbit-two" />

            <div className="cx-streak-flame">
              <Flame className="cx-streak-flame-icon" />
              <span className="cx-streak-chess-piece">
                {badgePiece}
              </span>
            </div>

            <div className="cx-streak-badge-sparks">
              <Sparkles className="cx-streak-spark spark-one" />
              <Sparkles className="cx-streak-spark spark-two" />
              <Sparkles className="cx-streak-spark spark-three" />
            </div>
          </div>

          <div className="cx-streak-count">
            <strong>{currentStreak}</strong>
            <span>XStreaks</span>
          </div>

          <div className="cx-streak-rank">
            <Flame size={15} />
            {currentMilestone > 0
              ? `${currentMilestone}-Day Badge Unlocked`
              : 'Streak Journey Started'}
          </div>

          <p className="cx-streak-description">
            Complete an eligible activity to keep your streak going.
          </p>
        </section>

        <section className="cx-streak-card cx-streak-progress-card">
          <div className="cx-streak-card-heading">
            <div>
              <span className="cx-streak-card-label">
                NEXT MILESTONE
              </span>
              <h2>{nextMilestone} Days</h2>
            </div>

            <div className="cx-streak-next-icon">
              <LockKeyhole size={19} />
            </div>
          </div>

          <div className="cx-streak-progress-track">
            <div
              className="cx-streak-progress-fill"
              style={{ width: `${milestoneProgress.progress}%` }}
            />
          </div>

          <div className="cx-streak-progress-footer">
            <span>{currentStreak} days completed</span>
            <strong>
              {Math.max(nextMilestone - currentStreak, 0)} days to go
            </strong>
          </div>
        </section>

        <section className="cx-streak-card">
          <div className="cx-streak-section-heading">
            <div className="cx-streak-section-icon">
              <CalendarDays size={19} />
            </div>
            <div>
              <h2>Weekly Activity</h2>
              <p>Your daily streak checklist</p>
            </div>
          </div>

          <div className="cx-streak-week">
            {weeklyActivity.map((item) => (
              <div
                className="cx-streak-day"
                key={item.day}
              >
                <span>{item.day}</span>

                <div
                  className={`cx-streak-day-check ${
                    item.completed ? 'completed' : ''
                  }`}
                >
                  {item.completed ? (
                    <Check size={16} />
                  ) : (
                    <span />
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="cx-streak-footnote">
            Activity records will appear here after successful
            activities are connected.
          </p>
        </section>

        <section className="cx-streak-card cx-streak-grace-card">
          <div className="cx-streak-section-heading">
            <div className="cx-streak-section-icon">
              <ShieldCheck size={20} />
            </div>

            <div>
              <h2>1-Day Streak Pause</h2>
              <p>Grace period protection</p>
            </div>
          </div>

          <div className="cx-streak-grace-status">
            <span className="cx-streak-status-dot" />
            <strong>Available in the streak system</strong>
          </div>

          <p>
            If you miss an eligible activity, one grace day can
            protect your current streak. Complete another eligible
            activity before the grace period expires to restore it.
          </p>

          <span className="cx-streak-grace-note">
            One grace day per streak cycle.
          </span>

          <span className="cx-streak-grace-config">
            Configured grace period: {STREAK_GRACE_PERIOD_DAYS} day
          </span>
        </section>

        <section className="cx-streak-card">
          <div className="cx-streak-section-heading">
            <div className="cx-streak-section-icon">
              <History size={19} />
            </div>

            <div>
              <h2>Streak History</h2>
              <p>Your previous streak records</p>
            </div>
          </div>

          <div className="cx-streak-empty-history">
            <Flame size={27} />
            <strong>No streak history yet</strong>
            <span>
              Your completed streak records will appear here.
            </span>
          </div>

          <div className="cx-streak-personal-record">
            <span>Longest Streak</span>
            <strong>{longestStreak} Days</strong>
          </div>
        </section>

        <section className="cx-streak-card cx-streak-rules-card">
          <div className="cx-streak-section-heading">
            <div className="cx-streak-section-icon">
              <Sparkles size={19} />
            </div>
            <div>
              <h2>How to Earn XStreaks</h2>
              <p>Successful activities only</p>
            </div>
          </div>

          <ul>
            <li>Successfully complete a chess game.</li>
            <li>Successfully solve a chess puzzle.</li>
            <li>Successfully complete a lesson.</li>
            <li>Successfully complete a training activity.</li>
          </ul>

          <p className="cx-streak-footnote">
            Opening the app alone does not count. Failed,
            cancelled, and incomplete activities do not qualify.
          </p>
        </section>

        <footer className="cx-streak-footer">
          CheckmaîtréX Chess Club
          <span>Calculate. Conquer. Checkmate.</span>
        </footer>
      </main>
    </div>
  )
}

export default StreakPage
