import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Puzzle } from 'lucide-react'

import './PuzzleDestinationPage.css'

const puzzlePages: Record<string, string> = {
  play: 'Play Puzzles',
  daily: 'Daily Puzzle',
  themes: 'Puzzle Themes',
  streak: 'Puzzle Streak',
  storm: 'Puzzle Storm',
  rush: 'Puzzle Rush',
  battle: 'Puzzle Battle',
  turbo: 'Puzzle Turbo',
  dashboard: 'Puzzle Dashboard',
  history: 'Puzzle History',
}

function PuzzleDestinationPage() {
  const navigate = useNavigate()
  const { section } = useParams()

  const title = section ? puzzlePages[section] : undefined

  if (!title) {
    return (
      <main className="cx-puzzle-destination">
        <button type="button" onClick={() => navigate('/puzzles')}>
          <ArrowLeft size={20} />
          Back to Puzzles
        </button>
        <h1>Page Not Found</h1>
      </main>
    )
  }

  return (
    <main className="cx-puzzle-destination">
      <header className="cx-puzzle-destination-header">
        <button
          type="button"
          onClick={() => navigate('/puzzles')}
          aria-label="Back to Puzzles"
        >
          <ArrowLeft size={21} />
        </button>

        <h1>{title}</h1>

        <div />
      </header>

      <section className="cx-puzzle-destination-content">
        <div className="cx-puzzle-destination-icon">
          <Puzzle size={31} />
        </div>

        <span>CHECKMAÎTRÉX PUZZLES</span>
        <h2>{title}</h2>

        <p>
          This page is reserved for the {title} experience.
          Its individual frontend design and features will be
          developed separately.
        </p>

        <button
          type="button"
          onClick={() => navigate('/puzzles')}
        >
          Return to Puzzle Journey
        </button>
      </section>
    </main>
  )
}

export default PuzzleDestinationPage
