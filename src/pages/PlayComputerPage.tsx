
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Bot,
  ChevronDown,
  SlidersHorizontal,
  Check,
  Sparkles,
  MessageCircle,
} from 'lucide-react'

import './PlayComputerPage.css'

const STORAGE_KEY = 'cx-play-computer-last-activity'

const categories = [
  'New to Chess',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert',
  'Master',
  'Grandmaster',
  'Personalities',
  'CheckmaîtréX Bots',
  'Engines',
]

const timeGroups = [
  { title: 'Bullet', options: ['1+0', '1+1', '2+0', '2+1'] },
  { title: 'Blitz', options: ['3+0', '3+1', '5+0', '5+1'] },
  { title: 'Rapid', options: ['10+0', '10+1', '15+0', '15+1'] },
  { title: 'Classical', options: ['30+0', '30+10', '60+0', '60+10'] },
]

const gameModes = [
  'Chess960',
  'King of the Hill',
  'Three-Check',
  'Crazyhouse',
  'Anti-Chess',
  'Atomic',
  'Horde',
  'Racing Kings',
]

const toggleOptions = [
  'Bot Chat',
  'Evaluation Bar',
  'Threat Arrows',
  'Suggestion Arrows',
  'Move Feedback',
  'Engine',
]

type Side = 'white' | 'random' | 'black'

type SavedActivity = {
  selectedBot: string
  timeControl: string
  selectedVariant: string
  selectedSide: Side
  toggles: Record<string, boolean>
}

const defaultActivity: SavedActivity = {
  selectedBot: '',
  timeControl: 'No Timer',
  selectedVariant: 'Standard',
  selectedSide: 'random',
  toggles: {
    'Bot Chat': false,
    'Evaluation Bar': false,
    'Threat Arrows': false,
    'Suggestion Arrows': false,
    'Move Feedback': false,
    Engine: false,
  },
}

function loadSavedActivity(): SavedActivity | null {
  try {
    if (typeof window === 'undefined') return null

    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return null

    const parsed = JSON.parse(saved)

    return {
      ...defaultActivity,
      ...parsed,
      toggles: {
        ...defaultActivity.toggles,
        ...(parsed.toggles || {}),
      },
    }
  } catch {
    return null
  }
}

function PlayComputerPage() {
  const navigate = useNavigate()

  const [initialActivity] = useState(loadSavedActivity)

  const [selectedBot, setSelectedBot] = useState(
    initialActivity?.selectedBot || '',
  )

  const [timeControl, setTimeControl] = useState(
    initialActivity?.timeControl || 'No Timer',
  )

  const [selectedVariant, setSelectedVariant] = useState(
    initialActivity?.selectedVariant || 'Standard',
  )

  const [selectedSide, setSelectedSide] = useState<Side>(
    initialActivity?.selectedSide || 'random',
  )

  const [toggles, setToggles] = useState<Record<string, boolean>>(
    initialActivity?.toggles || defaultActivity.toggles,
  )

  const [hasSavedActivity, setHasSavedActivity] = useState(
    Boolean(initialActivity),
  )

  const [customizeOpen, setCustomizeOpen] = useState(false)
  const [gameModeOpen, setGameModeOpen] = useState(false)
  const [startMessage, setStartMessage] = useState('')

  const saveActivity = () => {
    setHasSavedActivity(true)
  }

  useEffect(() => {
    if (!hasSavedActivity) return

    const activity: SavedActivity = {
      selectedBot,
      timeControl,
      selectedVariant,
      selectedSide,
      toggles,
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activity))
    } catch {
      // Continue even if browser storage is unavailable.
    }
  }, [
    hasSavedActivity,
    selectedBot,
    timeControl,
    selectedVariant,
    selectedSide,
    toggles,
  ])

  const toggleOption = (option: string) => {
    setToggles((current) => ({
      ...current,
      [option]: !current[option],
    }))
    saveActivity()
  }

  const handleStartGame = () => {
    if (!selectedBot) {
      setStartMessage('Please select a bot first.')
      return
    }

    setStartMessage(
      'Your bot selection is ready. The chessboard interface will be connected in the next stage.',
    )
  }

  return (
    <main className="cx-computer-page">
      <header className="cx-computer-header">
        <button
          type="button"
          className="cx-computer-back"
          onClick={() => navigate('/play')}
          aria-label="Back to Play"
        >
          <ArrowLeft size={21} />
        </button>

        <div className="cx-computer-title">
          <Bot size={23} />
          <h1>Play vs Computer</h1>
        </div>

        <span className="cx-computer-header-spacer" />
      </header>

      {selectedBot && (
        <section className="cx-computer-selected-bot">
          <div
            className="cx-computer-selected-avatar"
            aria-label={`${selectedBot} profile picture`}
          >
            <Bot size={27} />
          </div>

          <div className="cx-computer-selected-chat">
            <MessageCircle size={22} />
          </div>
        </section>
      )}

      <div className="cx-computer-content">
        {categories.map((category) => (
          <section
            className="cx-computer-category-section"
            key={category}
          >
            <div className="cx-computer-category-heading">
              <h2>{category}</h2>
              <span>5 BOTS</span>
            </div>

            <div className="cx-computer-bot-row">
              {Array.from({ length: 5 }, (_, index) => {
                const botName = `${category} ${String(index + 1).padStart(2, '0')}`
                const isSelected = selectedBot === botName

                return (
                  <button
                    type="button"
                    key={botName}
                    className={
                      isSelected
                        ? 'cx-computer-bot-card selected'
                        : 'cx-computer-bot-card'
                    }
                    onClick={() => {
                      setSelectedBot(botName)
                      setStartMessage('')
                      saveActivity()
                    }}
                    aria-label={`Select ${botName}`}
                    aria-pressed={isSelected}
                  >
                    <span className="cx-computer-bot-avatar">
                      <Bot size={30} />
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <section className="cx-computer-bottom">
        {customizeOpen && (
          <div className="cx-computer-customize-panel">
            <div className="cx-computer-panel-heading">
              <h2>Time Control</h2>

              <button
                type="button"
                className={timeControl === 'No Timer' ? 'selected' : ''}
                onClick={() => {
                  setTimeControl('No Timer')
                  saveActivity()
                }}
              >
                No Timer
              </button>
            </div>

            <div className="cx-computer-time-groups">
              {timeGroups.map((group) => (
                <div className="cx-computer-time-group" key={group.title}>
                  <h3>{group.title}</h3>

                  <div className="cx-computer-time-options">
                    {group.options.map((option) => (
                      <button
                        type="button"
                        key={option}
                        className={timeControl === option ? 'selected' : ''}
                        onClick={() => {
                          setTimeControl(option)
                          saveActivity()
                        }}
                      >
                        {option}
                        {timeControl === option && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="cx-computer-dropdown-trigger"
              onClick={() => setGameModeOpen((value) => !value)}
              aria-expanded={gameModeOpen}
            >
              <span>
                <Sparkles size={17} />
                Game Mode
                <small>{selectedVariant}</small>
              </span>

              <ChevronDown
                size={17}
                className={gameModeOpen ? 'rotated' : ''}
              />
            </button>

            {gameModeOpen && (
              <div className="cx-computer-variant-options">
                {gameModes.map((mode) => (
                  <button
                    type="button"
                    key={mode}
                    className={selectedVariant === mode ? 'selected' : ''}
                    onClick={() => {
                      setSelectedVariant(mode)
                      setGameModeOpen(false)
                      saveActivity()
                    }}
                  >
                    {mode}
                    {selectedVariant === mode && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}

            <div className="cx-computer-toggle-list">
              {toggleOptions.map((option) => (
                <div className="cx-computer-toggle-row" key={option}>
                  <span>{option}</span>

                  <button
                    type="button"
                    role="switch"
                    aria-label={option}
                    aria-checked={toggles[option]}
                    className={
                      toggles[option]
                        ? 'cx-computer-switch on'
                        : 'cx-computer-switch'
                    }
                    onClick={() => toggleOption(option)}
                  >
                    <span />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="cx-computer-customize-row">
          <button
            type="button"
            className={
              customizeOpen
                ? 'cx-computer-customize-trigger open'
                : 'cx-computer-customize-trigger'
            }
            onClick={() => setCustomizeOpen((value) => !value)}
            aria-expanded={customizeOpen}
          >
            <SlidersHorizontal size={17} />
            <span>Customize</span>
            <ChevronDown size={17} />
          </button>

          <div className="cx-computer-side-picker" aria-label="Choose your side">
            <button
              type="button"
              className={
                selectedSide === 'white'
                  ? 'cx-computer-side-box chosen'
                  : 'cx-computer-side-box'
              }
              onClick={() => {
                setSelectedSide('white')
                saveActivity()
              }}
              aria-label="Play as White"
              aria-pressed={selectedSide === 'white'}
            >
              <span className="cx-computer-queen">♛</span>
            </button>

            <button
              type="button"
              className={
                selectedSide === 'random'
                  ? 'cx-computer-side-box cx-computer-random chosen'
                  : 'cx-computer-side-box cx-computer-random'
              }
              onClick={() => {
                setSelectedSide('random')
                saveActivity()
              }}
              aria-label="Random side"
              aria-pressed={selectedSide === 'random'}
            >
              <span className="cx-computer-king">♚</span>
              <span className="cx-computer-question">?</span>
            </button>

            <button
              type="button"
              className={
                selectedSide === 'black'
                  ? 'cx-computer-side-box chosen'
                  : 'cx-computer-side-box'
              }
              onClick={() => {
                setSelectedSide('black')
                saveActivity()
              }}
              aria-label="Play as Black"
              aria-pressed={selectedSide === 'black'}
            >
              <span className="cx-computer-queen">♛</span>
            </button>
          </div>
        </div>

        {startMessage && (
          <p className="cx-computer-start-message" role="status">
            {startMessage}
          </p>
        )}

        <button
          type="button"
          className="cx-computer-start-button"
          onClick={handleStartGame}
        >
          Start Game
        </button>
      </section>
    </main>
  )
}

export default PlayComputerPage
