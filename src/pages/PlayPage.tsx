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
  Clock3,
  Crown,
  Shuffle,
  Mountain,
  ShieldCheck,
  Package,
  Flame,
  Zap,
  Target,
  List,
  SlidersHorizontal,
  Check,
} from 'lucide-react'

import type { LucideIcon } from 'lucide-react'

type PanelType = 'time' | 'variant' | 'mode' | 'rating' | null

const TIME_CONTROL_KEY = 'time-control'
const VARIANT_KEY = 'play-variant'
const MODE_KEY = 'play-mode'
const LOWER_RATING_KEY = 'play-rating-lower'
const UPPER_RATING_KEY = 'play-rating-upper'
const CUSTOM_MINUTES_KEY = 'play-custom-minutes'
const CUSTOM_INCREMENT_KEY = 'play-custom-increment'

const DEFAULT_TIME_CONTROL = '10 min'
const DEFAULT_VARIANT = 'Standard'
const DEFAULT_MODE = 'Rated'

function getSavedValue(key: string, fallback: string) {
  try {
    return localStorage.getItem(key) || fallback
  } catch {
    return fallback
  }
}

function getSavedNumber(key: string, fallback: number) {
  try {
    const value = localStorage.getItem(key)
    return value === null ? fallback : Number(value)
  } catch {
    return fallback
  }
}

const timeGroups = [
  {
    title: 'Bullet',
    options: ['1+0', '1+1', '2+0', '2+1'],
  },
  {
    title: 'Blitz',
    options: ['3+0', '3+1', '5+0', '5+1'],
  },
  {
    title: 'Rapid',
    options: ['10+0', '10+1', '15+0', '15+1'],
  },
  {
    title: 'Classical',
    options: ['30+0', '30+10', '60+0', '60+10'],
  },
  {
    title: 'Daily',
    options: ['1 Day', '2 Days', '3 Days'],
  },
]

const variants: {
  name: string
  description: string
  icon: LucideIcon
}[] = [
  {
    name: 'Standard',
    description: 'Traditional chess with the usual starting position and rules.',
    icon: Crown,
  },
  {
    name: 'Chess960',
    description: 'A randomized starting position for a different opening challenge.',
    icon: Shuffle,
  },
  {
    name: 'King of the Hill',
    description: 'Win by bringing your king to one of the four center squares.',
    icon: Mountain,
  },
  {
    name: 'Three-Check',
    description: 'The first player to give three checks wins.',
    icon: ShieldCheck,
  },
  {
    name: 'Crazyhouse',
    description: 'Captured pieces can be returned to the board as your own.',
    icon: Package,
  },
  {
    name: 'Anti-Chess',
    description: 'Try to lose all your pieces or leave yourself without legal moves.',
    icon: Target,
  },
  {
    name: 'Atomic',
    description: 'Captures create explosions that affect nearby pieces.',
    icon: Flame,
  },
  {
    name: 'Horde',
    description: 'One side starts with a large army of pawns.',
    icon: Users,
  },
  {
    name: 'Racing Kings',
    description: 'Race your king to the opposite side of the board.',
    icon: Zap,
  },
]

const gameModes = ['Casual', 'Unrated', 'Rated', 'CCC-Rated']

function PlayPage() {
    const goBack = () => {
    navigate('/')
    }

  const [activePanel, setActivePanel] = useState<PanelType>(null)

  const [timeControl, setTimeControl] = useState(
    () => getSavedValue(TIME_CONTROL_KEY, DEFAULT_TIME_CONTROL),
  )

  const [variant, setVariant] = useState(
    () => getSavedValue(VARIANT_KEY, DEFAULT_VARIANT),
  )

  const [gameMode, setGameMode] = useState(
    () => getSavedValue(MODE_KEY, DEFAULT_MODE),
  )

  const [lowerRating, setLowerRating] = useState(
    () => getSavedNumber(LOWER_RATING_KEY, 0),
  )

  const [upperRating, setUpperRating] = useState(
    () => getSavedNumber(UPPER_RATING_KEY, 500),
  )

  const [customMinutes, setCustomMinutes] = useState(
    () => getSavedNumber(CUSTOM_MINUTES_KEY, 10),
  )

  const [customIncrement, setCustomIncrement] = useState(
    () => Math.min(60, Math.max(1,
    getSavedNumber(CUSTOM_INCREMENT_KEY, 1))),
  )

  const [showMoreTimeControls, setShowMoreTimeControls] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(TIME_CONTROL_KEY, timeControl)
      localStorage.setItem(VARIANT_KEY, variant)
      localStorage.setItem(MODE_KEY, gameMode)
      localStorage.setItem(LOWER_RATING_KEY, String(lowerRating))
      localStorage.setItem(UPPER_RATING_KEY, String(upperRating))
      localStorage.setItem(CUSTOM_MINUTES_KEY, String(customMinutes))
      localStorage.setItem(CUSTOM_INCREMENT_KEY, String(customIncrement))
    } catch {
      // Local storage is optional.
    }
  }, [
    timeControl,
    variant,
    gameMode,
    lowerRating,
    upperRating,
    customMinutes,
    customIncrement,
  ])

    const navigate = useNavigate()

  const togglePanel = (panel: Exclude<PanelType, null>) => {
    setActivePanel((current) => current === panel ? null : panel)
  }

  const selectTimeControl = (value: string) => {
    setTimeControl(value)
    setActivePanel(null)
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
          <div className="cx-play-settings-grid">
            <button
              type="button"
              className={`cx-play-setting-card ${activePanel === 'time' ? 'active' : ''}`}
              onClick={() => togglePanel('time')}
              aria-expanded={activePanel === 'time'}
            >
              <span className="cx-play-setting-icon">
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
              </span>

              <span className="cx-play-setting-copy">
                <small>TIME CONTROL</small>
                <strong>{timeControl}</strong>
              </span>

              <ChevronDown size={17} />
            </button>

            <button
              type="button"
              className={`cx-play-setting-card ${activePanel === 'variant' ? 'active' : ''}`}
              onClick={() => togglePanel('variant')}
              aria-expanded={activePanel === 'variant'}
            >
              <span className="cx-play-setting-icon">
                <Crown size={21} />
              </span>

              <span className="cx-play-setting-copy">
                <small>VARIANT</small>
                <strong>{variant}</strong>
              </span>

              <ChevronDown size={17} />
            </button>

            <button
              type="button"
              className={`cx-play-setting-card ${activePanel === 'mode' ? 'active' : ''}`}
              onClick={() => togglePanel('mode')}
              aria-expanded={activePanel === 'mode'}
            >
              <span className="cx-play-setting-icon">
                <Swords size={21} />
              </span>

              <span className="cx-play-setting-copy">
                <small>GAME MODE</small>
                <strong>{gameMode}</strong>
              </span>

              <ChevronDown size={17} />
            </button>

            <button
              type="button"
              className={`cx-play-setting-card ${activePanel === 'rating' ? 'active' : ''}`}
              onClick={() => togglePanel('rating')}
              aria-expanded={activePanel === 'rating'}
            >
              <span className="cx-play-setting-icon">
                <SlidersHorizontal size={21} />
              </span>

              <span className="cx-play-setting-copy">
                <small>RATING FILTER</small>
                <strong>-{lowerRating} / +{upperRating}</strong>
              </span>

              <ChevronDown size={17} />
            </button>
          </div>

          {activePanel === 'time' && (
            <section className="cx-play-selection-panel">
              <div className="cx-play-panel-heading">
                <div>
                  <span className="cx-play-panel-overline">CHOOSE YOUR PACE</span>
                  <h2>Time Controls</h2>
                </div>
                <Clock3 size={22} />
              </div>

              <div className="cx-play-time-groups">
                {timeGroups.map((group) => (
                  <div className="cx-play-time-group" key={group.title}>
                    <h3>{group.title}</h3>

                    <div className="cx-play-time-options">
                      {group.options.map((option) => (
                        <button
                          type="button"
                          key={option}
                          className={`cx-play-choice-button ${timeControl === option ? 'selected' : ''}`}
                          onClick={() => selectTimeControl(option)}
                        >
                          {option}
                          {timeControl === option && <Check size={15} />}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="cx-play-more-time-toggle"
                onClick={() => setShowMoreTimeControls((value) => !value)}
                aria-expanded={showMoreTimeControls}
              >
                <span>
                  <List size={18} />
                  More Time Controls
                </span>
                <ChevronDown
                  size={18}
                  className={showMoreTimeControls ? 'rotated' : ''}
                />
              </button>

              {showMoreTimeControls && (
                <div className="cx-play-custom-time">
                  <label>
                    <span>
                      Minutes
                      <strong>{customMinutes} min</strong>
                    </span>
                    <input
                      type="range"
                      min="1"
                      max="120"
                      step="1"
                      value={customMinutes}
                      onChange={(event) => setCustomMinutes(Number(event.target.value))}
                    />
                    <small>1–120 minutes</small>
                  </label>

                  <label>
                    <span>
                      Increment
                      <strong>{customIncrement} sec</strong>
                    </span>
                    <input
                      type="range"
                      min="1"
                      max="60"
                      step="1"
                      value={Math.max(1, customIncrement)}
                      onChange={(event) => setCustomIncrement(Number(event.target.value))}
                    />
                    <small>1–60 seconds</small>
                  </label>

                  <button
                    type="button"
                    className="cx-play-apply-custom"
                    onClick={() => selectTimeControl(`${customMinutes}+${customIncrement}`)}
                  >
                    Use Custom Time
                  </button>
                </div>
              )}
            </section>
          )}

          {activePanel === 'variant' && (
            <section className="cx-play-selection-panel">
              <div className="cx-play-panel-heading">
                <div>
                  <span className="cx-play-panel-overline">CHOOSE GAME RULES</span>
                  <h2>Variants</h2>
                </div>
                <Crown size={22} />
              </div>

              <div className="cx-play-variant-list">
                {variants.map((item) => {
                  const Icon = item.icon

                  return (
                    <button
                      type="button"
                      key={item.name}
                      className={`cx-play-variant-option ${variant === item.name ? 'selected' : ''}`}
                      onClick={() => {
                        setVariant(item.name)
                        setActivePanel(null)
                      }}
                    >
                      <span className="cx-play-variant-icon">
                        <Icon size={21} />
                      </span>

                      <span className="cx-play-variant-copy">
                        <strong>{item.name}</strong>
                        <small>{item.description}</small>
                      </span>

                      {variant === item.name && (
                        <Check className="cx-play-selected-check" size={18} />
                      )}
                    </button>
                  )
                })}
              </div>
            </section>
          )}

          {activePanel === 'mode' && (
            <section className="cx-play-selection-panel">
              <div className="cx-play-panel-heading">
                <div>
                  <span className="cx-play-panel-overline">CHOOSE GAME TYPE</span>
                  <h2>Game Mode</h2>
                </div>
                <Swords size={22} />
              </div>

              <div className="cx-play-mode-list">
                {gameModes.map((mode) => (
                  <button
                    type="button"
                    key={mode}
                    className={`cx-play-mode-option ${gameMode === mode ? 'selected' : ''}`}
                    onClick={() => {
                      setGameMode(mode)
                      setActivePanel(null)
                    }}
                  >
                    <span>{mode}</span>
                    {gameMode === mode && <Check size={18} />}
                  </button>
                ))}
              </div>
            </section>
          )}

          {activePanel === 'rating' && (
            <section className="cx-play-selection-panel">
              <div className="cx-play-panel-heading">
                <div>
                  <span className="cx-play-panel-overline">OPPONENT STRENGTH</span>
                  <h2>Rating Filter</h2>
                </div>
                <SlidersHorizontal size={22} />
              </div>

              <div className="cx-play-rating-values">
                <div>
                  <small>LOWER LIMIT</small>
                  <strong>-{lowerRating}</strong>
                </div>

                <div>
                  <small>UPPER LIMIT</small>
                  <strong>+{upperRating}</strong>
                </div>
              </div>

              <div className="cx-play-rating-sliders">
                <label>
                  <span>Lower Limit</span>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={lowerRating}
                    onChange={(event) => setLowerRating(Number(event.target.value))}
                    aria-label="Lower rating limit"
                  />
                  <small>-0 to -500</small>
                </label>

                <label>
                  <span>Upper Limit</span>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={upperRating}
                    onChange={(event) => setUpperRating(Number(event.target.value))}
                    aria-label="Upper rating limit"
                  />
                  <small>+0 to +500</small>
                </label>
              </div>
            </section>
          )}
        </section>

        <section className="cx-play-primary-section">
          <button
            type="button"
            className="cx-play-now-button"
            onClick={() => navigate('/play/now')}
          >
            <span className="cx-play-now-content">
              <span>Play Now</span>
              <ChevronRight size={20} />
            </span>
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
