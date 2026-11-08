import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Puzzle, Map, ChevronRight, Target } from 'lucide-react'
import { puzzleAreas } from './PuzzlesPage'
import './PlayPuzzlesPage.css'

function PlayPuzzlesPage() {
  const navigate = useNavigate()

  return (
    <main className="cx-play-puzzles">
      <header className="cx-play-puzzles-header">
        <button type="button" onClick={() => navigate('/puzzles')} aria-label="Back to Puzzle Journey">
          <ArrowLeft size={21} />
        </button>
        <h1><Puzzle size={19} /> Play Puzzles</h1>
        <div />
      </header>

      <div className="cx-play-puzzles-content">
        <section className="cx-play-puzzles-hero">
          <span>CHECKMAÎTRÉX PUZZLES</span>
          <h2>Sharpen Your Chess Skills</h2>
          <p>Choose a puzzle area and continue your training journey.</p>
          <div className="cx-play-puzzles-hero-icon"><Target size={35} /></div>
        </section>

        <div className="cx-play-puzzles-section-title">
          <div><span>YOUR TRAINING WORLDS</span><h2>Choose an Area</h2></div>
          <Map size={19} />
        </div>

        <div className="cx-play-puzzles-area-list">
          {puzzleAreas.map((area, index) => (
            <button
              type="button"
              key={area.id}
              className={`cx-play-puzzles-area ${area.theme}`}
              onClick={() => navigate(`/puzzles/area/${area.id}/level/1`)}
            >
              <span className="cx-play-puzzles-area-symbol">{area.icon}</span>
              <span className="cx-play-puzzles-area-info">
                <small>AREA 0{index + 1}</small>
                <strong>{area.name}</strong>
                <span>10 named levels · 10 puzzles per level</span>
              </span>
              <ChevronRight size={19} />
            </button>
          ))}
        </div>

        <section className="cx-play-puzzles-rule">
          <strong>How progression works</strong>
          <p>Answer at least 8 out of 10 puzzles correctly to pass a level. If you do not pass, you only repeat the puzzles you missed.</p>
        </section>

        <button className="cx-play-puzzles-return" type="button" onClick={() => navigate('/puzzles')}>
          Return to Puzzle Journey
        </button>
      </div>
    </main>
  )
}

export default PlayPuzzlesPage
