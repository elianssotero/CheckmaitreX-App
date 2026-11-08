
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Bot,
  Users,
  GraduationCap,
  Trophy,
  Swords,
} from 'lucide-react'

const TIME_CONTROL_KEY = 'time-control'

const DEFAULT_TIME_CONTROL = '10 min'

function getSavedTimeControl() {
  try {
    return localStorage.getItem(TIME_CONTROL_KEY) || DEFAULT_TIME_CONTROL
  } catch {
    return DEFAULT_TIME_CONTROL
  }
}

function PlayPage() {
  const navigate = useNavigate()
  const [timeControl] = useState(getSavedTimeControl)

  useEffect(() => {
    try {
      localStorage.setItem(TIME_CONTROL_KEY, timeControl)
    } catch {
      // Storage is optional; the page still works without it.
    }
  }, [timeControl])

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  const destinations = [
    {
      title: 'Play vs Computer',
      description: 'Challenge a chess computer',
      icon: Bot,
      path: '/play/computer',
    },
    {
      title: 'Play with Friend',
      description: 'Play a game with your friend',
      icon: Users,
      path: '/play/friend',
    },
    {
      title: 'Play with Coach',
      description: 'Improve your chess with a coach',
      icon: GraduationCap,
      path: '/play/coach',
    },
    {
      title: 'Tournaments',
      description: 'Join chess competitions',
      icon: Trophy,
      path: '/play/tournaments',
    },
  ]

  return (
    <main className="cx-play-page">
      <header className="cx-play-header">
        <button
          type="button"
          className="cx-play-back"
          onClick={goBack}
          aria-label="Go back"
        >
          <ArrowLeft size={21} strokeWidth={2} />
        </button>

        <div className="cx-play-title">
          <Swords size={23} strokeWidth={1.8} />
          <h1>Play Chess</h1>
        </div>

        <div className="cx-play-header-space" />
      </header>

      <div className="cx-play-content">
        <section className="cx-play-control-section">
          <button
            type="button"
            className="cx-play-time-control"
            onClick={() => navigate('/play/time-control')}
            aria-label={`Time control: ${timeControl}. Open time control settings`}
          >
            <svg
              className="cx-play-clock-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>

            <span className="cx-play-time-value">
              {timeControl}
            </span>

            <ChevronDown
              className="cx-play-time-chevron"
              size={20}
            />
          </button>
        </section>

        <section className="cx-play-primary-section">
          <button
            type="button"
            className="cx-play-now-button"
            onClick={() => navigate('/play/now')}
          >
            <span>Play Now</span>
            <ChevronRight size={20} />
          </button>
        </section>

        <section className="cx-play-options">
          {destinations.map((item) => {
            const Icon = item.icon

            return (
              <button
                type="button"
                key={item.path}
                className="cx-play-option"
                onClick={() => navigate(item.path)}
              >
                <span className="cx-play-option-icon">
                  <Icon size={23} strokeWidth={1.8} />
                </span>

                <span className="cx-play-option-text">
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </span>

                <ChevronRight
                  className="cx-play-option-arrow"
                  size={19}
                />
              </button>
            )
          })}
        </section>

        <footer className="cx-play-footer">
          © {new Date().getFullYear()} CheckmaîtréX • All rights reserved.
          <span>Calculate. Conquer. Checkmate.</span>
        </footer>
      </div>
    </main>
  )
}

export default PlayPage
