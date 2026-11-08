import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Bot,
  ChevronDown,
  SlidersHorizontal,
  Check,
  Sparkles,
} from 'lucide-react'

import './PlayComputerPage.css'

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

function PlayComputerPage() {
  const navigate = useNavigate()

  const [selectedBot, setSelectedBot] = useState('')
  const [customizeOpen, setCustomizeOpen] = useState(false)
  const [gameModeOpen, setGameModeOpen] = useState(false)

  const [timeControl, setTimeControl] = useState('No Timer')
  const [selectedVariant, setSelectedVariant] = useState('Standard')
  const [selectedSide, setSelectedSide] = useState<Side>('random')

  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'Bot Chat': false,
    'Evaluation Bar': false,
    'Threat Arrows': false,
    'Suggestion Arrows': false,
    'Move Feedback': false,
    Engine: false,
  })

  const [startMessage, setStartMessage] = useState('')

  const toggleOption = (option: string) => {
    setToggles((current) => ({
      ...current,
      [option]: !current[option],
    }))
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
                    }}
                    aria-pressed={isSelected}
                  >
                    <span className="cx-computer-bot-avatar">
                      <Bot size={25} />
                    </span>

                    <strong>{botName}</strong>

                    <span className="cx-computer-bot-caption">
                      Sample Bot
                    </span>

                    <span className="cx-computer-bot-select">
                      {isSelected ? (
                        <>
                          <Check size={14} />
                          Selected
                        </>
                      ) : (
                        'Select'
                      )}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        ))}

        <section className="cx-computer-bottom">
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

            <div
              className="cx-computer-side-picker"
              aria-label="Choose your side"
            >
              <button
                type="button"
                className={
                  selectedSide === 'white'
                    ? 'cx-computer-side-box chosen'
                    : 'cx-computer-side-box'
                }
                onClick={() => setSelectedSide('white')}
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
                onClick={() => setSelectedSide('random')}
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
                onClick={() => setSelectedSide('black')}
                aria-label="Play as Black"
                aria-pressed={selectedSide === 'black'}
              >
                <span className="cx-computer-queen">♛</span>
              </button>
            </div>
          </div>

          {customizeOpen && (
            <section className="cx-computer-customize-panel">
              <div className="cx-computer-panel-heading">
                <h2>Time Control</h2>

                <button
                  type="button"
                  className={
                    timeControl === 'No Timer' ? 'selected' : ''
                  }
                  onClick={() => setTimeControl('No Timer')}
                >
                  No Timer
                </button>
              </div>

              <div className="cx-computer-time-groups">
                {timeGroups.map((group) => (
                  <div
                    className="cx-computer-time-group"
                    key={group.title}
                  >
                    <h3>{group.title}</h3>

                    <div className="cx-computer-time-options">
                      {group.options.map((option) => (
                        <button
                          type="button"
                          key={option}
                          className={
                            timeControl === option ? 'selected' : ''
                          }
                          onClick={() => setTimeControl(option)}
                        >
                          {option}

                          {timeControl === option && (
                            <Check size={14} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="cx-computer-dropdown-trigger"
                onClick={() =>
                  setGameModeOpen((value) => !value)
                }
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
                      className={
                        selectedVariant === mode ? 'selected' : ''
                      }
                      onClick={() => {
                        setSelectedVariant(mode)
                        setGameModeOpen(false)
                      }}
                    >
                      {mode}

                      {selectedVariant === mode && (
                        <Check size={14} />
                      )}
                    </button>
                  ))}
                </div>
              )}

              <div className="cx-computer-toggle-list">
                {toggleOptions.map((option) => (
                  <div
                    className="cx-computer-toggle-row"
                    key={option}
                  >
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
            </section>
          )}

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
      </div>
    </main>
  )
}

export default PlayComputerPage
