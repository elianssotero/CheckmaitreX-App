
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Bot,
  Settings2,
  X,
  ChevronDown,
  Check,
} from 'lucide-react'

import './PlayCoachPage.css'

type Side = 'white' | 'any' | 'black'

const assistanceOptions = [
  'Voice',
  'Teach Legal Moves',
  'Suggestion Arrows',
  'Threat Arrows',
  'Evaluation Bar',
  'Move Feedback',
]

const coachLevels = [
  'New to Chess',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert',
  'Master',
  'Grandmaster',
  'Maximum',
]

const initialToggles: Record<string, boolean> = {
  Voice: false,
  'Teach Legal Moves': false,
  'Suggestion Arrows': false,
  'Threat Arrows': false,
  'Evaluation Bar': false,
  'Move Feedback': false,
}

const board = [
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
]

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

function PlayCoachPage() {
  const navigate = useNavigate()

  const [settingsOpen, setSettingsOpen] = useState(false)
  const [toggles, setToggles] = useState(initialToggles)
  const [levelOpen, setLevelOpen] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState('Maximum')
  const [selectedSide, setSelectedSide] = useState<Side>('any')
  const [startMessage, setStartMessage] = useState('')

  const toggleOption = (option: string) => {
    setToggles((current) => ({
      ...current,
      [option]: !current[option],
    }))
  }

  const handleStart = () => {
    setStartMessage(
      'Your coaching game setup is ready. Live coaching will be connected in a later stage.',
    )
  }

  return (
    <main className="cx-coach-page">
      <header className="cx-coach-header">
        <button
          type="button"
          className="cx-coach-back"
          onClick={() => navigate('/play')}
          aria-label="Back to Play"
        >
          <ArrowLeft size={21} />
        </button>

        <div className="cx-coach-title">
          <Bot size={23} />
          <h1>Play with Coach</h1>
        </div>

        <button
          type="button"
          className="cx-coach-settings-button"
          onClick={() => setSettingsOpen(true)}
          aria-label="Coach settings"
        >
          <Settings2 size={21} />
        </button>
      </header>

      {settingsOpen && (
        <div
          className="cx-coach-settings-backdrop"
          onClick={() => setSettingsOpen(false)}
        >
          <section
            className="cx-coach-settings-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Assistance settings"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cx-coach-settings-heading">
              <h2>Assistance</h2>

              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                aria-label="Close assistance settings"
              >
                <X size={20} />
              </button>
            </div>

            <div className="cx-coach-toggle-list">
              {assistanceOptions.map((option) => (
                <div className="cx-coach-toggle-row" key={option}>
                  <span>{option}</span>

                  <button
                    type="button"
                    role="switch"
                    aria-label={option}
                    aria-checked={toggles[option]}
                    className={
                      toggles[option]
                        ? 'cx-coach-switch on'
                        : 'cx-coach-switch'
                    }
                    onClick={() => toggleOption(option)}
                  >
                    <span />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      <section className="cx-coach-main">
        <div className="cx-coach-conversation">
          <div className="cx-coach-avatar" aria-label="Coach avatar">
            <Bot size={30} />
          </div>

          <div className="cx-coach-chat-bubble">
            Hello! I'm your chess coach. Ready to play?
          </div>
        </div>

        <div className="cx-coach-board-frame">
          <div className="cx-coach-board" aria-label="Standard chessboard">
            {board.map((rank, rowIndex) =>
              rank.map((piece, colIndex) => {
                const isLight = (rowIndex + colIndex) % 2 === 0
                const isWhitePiece = rowIndex >= 6

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={[
                      'cx-coach-square',
                      isLight ? 'light' : 'dark',
                    ].join(' ')}
                    aria-label={`${files[colIndex]}${8 - rowIndex}${piece ? ` ${piece}` : ''}`}
                  >
                    {piece && (
                      <span
                        className={
                          isWhitePiece
                            ? 'cx-coach-piece white-piece'
                            : 'cx-coach-piece black-piece'
                        }
                      >
                        {piece}
                      </span>
                    )}
                  </div>
                )
              }),
            )}
          </div>
        </div>
      </section>

      <section className="cx-coach-bottom">
        {levelOpen && (
          <div className="cx-coach-level-panel">
            <div className="cx-coach-level-heading">
              <span>Coach Level</span>
              <span>SELECT LEVEL</span>
            </div>

            <div className="cx-coach-level-options">
              {coachLevels.map((level) => (
                <button
                  type="button"
                  key={level}
                  className={
                    selectedLevel === level ? 'selected' : ''
                  }
                  onClick={() => {
                    setSelectedLevel(level)
                    setLevelOpen(false)
                  }}
                >
                  {level}
                  {selectedLevel === level && <Check size={15} />}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="cx-coach-selection-row">
          <button
            type="button"
            className={
              levelOpen
                ? 'cx-coach-level-trigger open'
                : 'cx-coach-level-trigger'
            }
            onClick={() => setLevelOpen((value) => !value)}
            aria-expanded={levelOpen}
          >
            <span>{selectedLevel}</span>
            <ChevronDown size={18} />
          </button>

          <div className="cx-coach-side-picker" aria-label="Choose your side">
            <button
              type="button"
              className={
                selectedSide === 'white'
                  ? 'cx-coach-side-box chosen'
                  : 'cx-coach-side-box'
              }
              onClick={() => setSelectedSide('white')}
              aria-label="Play as White"
              aria-pressed={selectedSide === 'white'}
            >
              <span className="cx-coach-queen">♛</span>
            </button>

            <button
              type="button"
              className={
                selectedSide === 'any'
                  ? 'cx-coach-side-box cx-coach-random chosen'
                  : 'cx-coach-side-box cx-coach-random'
              }
              onClick={() => setSelectedSide('any')}
              aria-label="Any side"
              aria-pressed={selectedSide === 'any'}
            >
              <span className="cx-coach-king">♚</span>
              <span className="cx-coach-question">?</span>
            </button>

            <button
              type="button"
              className={
                selectedSide === 'black'
                  ? 'cx-coach-side-box chosen'
                  : 'cx-coach-side-box'
              }
              onClick={() => setSelectedSide('black')}
              aria-label="Play as Black"
              aria-pressed={selectedSide === 'black'}
            >
              <span className="cx-coach-queen">♛</span>
            </button>
          </div>
        </div>

        {startMessage && (
          <p className="cx-coach-start-message" role="status">
            {startMessage}
          </p>
        )}

        <button
          type="button"
          className="cx-coach-start-button"
          onClick={handleStart}
        >
          Play with Coach
        </button>
      </section>
    </main>
  )
}

export default PlayCoachPage
