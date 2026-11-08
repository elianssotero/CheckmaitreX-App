import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Check, X, RotateCcw, Trophy, Puzzle } from 'lucide-react'
import { puzzleAreas } from './PuzzlesPage'
import './PuzzleLevelPage.css'

type Mode = 'main' | 'retry' | 'passed'

function PuzzleLevelPage() {
  const navigate = useNavigate()
  const { areaId, level } = useParams()

  const area = puzzleAreas.find((item) => item.id === areaId)
  const levelNumber = Math.max(1, Math.min(10, Number(level) || 1))
  const levelName = area?.levels[levelNumber - 1] ?? 'Puzzle Level'

  const [mode, setMode] = useState<Mode>('main')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([])
  const [missedAnswers, setMissedAnswers] = useState<number[]>([])
  const [retryQueue, setRetryQueue] = useState<number[]>([])

  const currentQueue = mode === 'retry' ? retryQueue : Array.from({ length: 10 }, (_, i) => i + 1)
  const currentPuzzle = currentQueue[questionIndex] ?? 1

  const answerPuzzle = (isCorrect: boolean) => {
    const nextCorrect = isCorrect
      ? [...new Set([...correctAnswers, currentPuzzle])]
      : correctAnswers.filter((item) => item !== currentPuzzle)

    const nextMissed = isCorrect
      ? missedAnswers.filter((item) => item !== currentPuzzle)
      : [...new Set([...missedAnswers, currentPuzzle])]

    setCorrectAnswers(nextCorrect)
    setMissedAnswers(nextMissed)

    const lastPuzzle = questionIndex >= currentQueue.length - 1

    if (!lastPuzzle) {
      setQuestionIndex((value) => value + 1)
      return
    }

    if (mode === 'main') {
      if (nextCorrect.length >= 8) {
        setMode('passed')
      } else {
        setRetryQueue(nextMissed)
        setQuestionIndex(0)
        setMode('retry')
      }
    } else {
      if (nextMissed.length === 0) {
        setMode('passed')
      } else {
        setRetryQueue(nextMissed)
        setQuestionIndex(0)
      }
    }
  }

  const restartLevel = () => {
    setMode('main')
    setQuestionIndex(0)
    setCorrectAnswers([])
    setMissedAnswers([])
    setRetryQueue([])
  }

  if (!area) {
    return (
      <main className="cx-level-page">
        <button type="button" onClick={() => navigate('/puzzles')}>
          <ArrowLeft size={19} /> Back to Puzzle Journey
        </button>
        <h2>Area not found</h2>
      </main>
    )
  }

  return (
    <main className={`cx-level-page ${area.theme}`}>
      <header className="cx-level-header">
        <button type="button" onClick={() => navigate(`/puzzles?area=${area.id}`)} aria-label="Back to Puzzle Journey">
          <ArrowLeft size={21} />
        </button>
        <div>
          <span>{area.name}</span>
          <h1>{levelName}</h1>
        </div>
        <div className="cx-level-header-number">LEVEL {levelNumber}</div>
      </header>

      <div className="cx-level-content">
        <section className="cx-level-intro">
          <span>YOUR LEVEL JOURNEY</span>
          <h2>{levelName}</h2>
          <p>Complete the ten puzzle challenges to advance to the next level.</p>
        </section>

        <section className="cx-level-progress-card">
          <div className="cx-level-progress-top">
            <div><span>LEVEL PROGRESS</span><strong>{correctAnswers.length}/10 correct</strong></div>
            <div><span>PASS MARK</span><strong>8/10</strong></div>
          </div>
          <div className="cx-level-progress-track">
            <span style={{ width: `${correctAnswers.length * 10}%` }} />
          </div>
          <div className="cx-level-puzzle-dots">
            {Array.from({ length: 10 }, (_, i) => {
              const number = i + 1
              return (
                <span
                  key={number}
                  className={correctAnswers.includes(number) ? 'correct' : missedAnswers.includes(number) ? 'missed' : ''}
                >
                  {correctAnswers.includes(number) ? <Check size={11} /> : number}
                </span>
              )
            })}
          </div>
        </section>

        {mode === 'passed' ? (
          <section className="cx-level-result">
            <div className="cx-level-result-icon"><Trophy size={34} /></div>
            <span>LEVEL COMPLETED</span>
            <h2>Well played!</h2>
            <p>You reached the passing score for {levelName}.</p>
            <div className="cx-level-result-score">{correctAnswers.length}<small>/10 correct</small></div>
            {levelNumber < 10 ? (
              <button
                type="button"
                className="cx-level-primary-button"
                onClick={() => navigate(`/puzzles/area/${area.id}/level/${levelNumber + 1}`)}
              >
                Continue to {area.levels[levelNumber]} <ArrowLeft className="cx-level-next-arrow" size={17} />
              </button>
            ) : (
              <button type="button" className="cx-level-primary-button" onClick={() => navigate('/puzzles')}>
                Return to Puzzle Journey
              </button>
            )}
          </section>
        ) : (
          <section className="cx-level-challenge">
            <div className="cx-level-challenge-heading">
              <div>
                <span>{mode === 'retry' ? 'RETRY MISSED PUZZLES' : 'PUZZLE CHALLENGE'}</span>
                <h2>{mode === 'retry' ? 'Try these again' : 'Find the best move'}</h2>
              </div>
              <div className="cx-level-counter">
                {questionIndex + 1}<small> / {currentQueue.length}</small>
              </div>
            </div>

            <div className="cx-level-board-placeholder">
              <div className="cx-level-board-grid">
                {Array.from({ length: 64 }, (_, i) => (
                  <span key={i} className={(Math.floor(i / 8) + i % 8) % 2 === 0 ? 'light' : 'dark'} />
                ))}
              </div>
              <div className="cx-level-board-label"><Puzzle size={15} /> SAMPLE PUZZLE BOARD</div>
            </div>

            <p className="cx-level-prompt">
              Sample challenge {currentPuzzle}. Choose whether this puzzle is answered correctly.
            </p>

            <div className="cx-level-answer-buttons">
              <button type="button" className="cx-level-correct-button" onClick={() => answerPuzzle(true)}>
                <Check size={18} /> Correct
              </button>
              <button type="button" className="cx-level-missed-button" onClick={() => answerPuzzle(false)}>
                <X size={18} /> Missed
              </button>
            </div>

            <p className="cx-level-demo-note">
              Frontend demonstration only. Real chess positions and move validation will be connected later.
            </p>
          </section>
        )}

        {mode === 'retry' && (
          <section className="cx-level-retry-note">
            <RotateCcw size={17} />
            <span>Only your missed puzzles are included in this retry round.</span>
          </section>
        )}

        <button type="button" className="cx-level-reset-button" onClick={restartLevel}>
          <RotateCcw size={15} /> Reset sample level
        </button>
      </div>
    </main>
  )
}

export default PuzzleLevelPage
