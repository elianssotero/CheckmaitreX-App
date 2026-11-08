import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Menu,
  X,
  Puzzle,
  CalendarDays,
  Layers,
  Flame,
  Zap,
  Swords,
  Gauge,
  LayoutDashboard,
  History,
  Trophy,
  Lock,
  Check,
  Star,
  ChevronRight,
  Play,
  Crown,
  Target,
} from 'lucide-react'

import './PuzzlesPage.css'

type PuzzleArea = {
  id: string
  name: string
  subtitle: string
  description: string
  theme: string
  icon: string
  completed: number
  total: number
}

const areas: PuzzleArea[] = [
  {
    id: 'opening',
    name: 'Opening Grounds',
    subtitle: 'THE BEGINNING OF YOUR JOURNEY',
    description: 'Learn opening principles, piece development, and control of the center.',
    theme: 'opening',
    icon: '♟',
    completed: 0,
    total: 10,
  },
  {
    id: 'tactics',
    name: 'Tactical Fortress',
    subtitle: 'MASTER THE ART OF TACTICS',
    description: 'Discover combinations, forks, pins, discovered attacks, and checkmate patterns.',
    theme: 'tactics',
    icon: '⚔',
    completed: 0,
    total: 10,
  },
  {
    id: 'middlegame',
    name: 'Middlegame Kingdom',
    subtitle: 'BUILD YOUR STRATEGY',
    description: 'Improve your positional understanding, planning, and strategic decisions.',
    theme: 'middlegame',
    icon: '♜',
    completed: 0,
    total: 10,
  },
  {
    id: 'endgame',
    name: 'Endgame Citadel',
    subtitle: 'CONQUER THE FINAL STAGE',
    description: 'Practice king activity, pawn endings, rook endings, and winning techniques.',
    theme: 'endgame',
    icon: '♛',
    completed: 0,
    total: 10,
  },
]

const puzzleMenu = [
  { label: 'Play Puzzles', path: 'play', icon: Puzzle },
  { label: 'Daily Puzzle', path: 'daily', icon: CalendarDays },
  { label: 'Puzzle Themes', path: 'themes', icon: Layers },
  { label: 'Puzzle Streak', path: 'streak', icon: Flame },
  { label: 'Puzzle Storm', path: 'storm', icon: Zap },
  { label: 'Puzzle Rush', path: 'rush', icon: Gauge },
  { label: 'Puzzle Battle', path: 'battle', icon: Swords },
  { label: 'Puzzle Turbo', path: 'turbo', icon: Target },
  { label: 'Puzzle Dashboard', path: 'dashboard', icon: LayoutDashboard },
  { label: 'Puzzle History', path: 'history', icon: History },
]

function PuzzlesPage() {
  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState(false)
  const [activeArea, setActiveArea] = useState('opening')
  const [selectedLevel, setSelectedLevel] = useState(1)

  const currentArea =
    areas.find((area) => area.id === activeArea) ?? areas[0]

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/play')
    }
  }

  const handleSolve = () => {
    navigate('/puzzles/play', {
      state: {
        area: currentArea.name,
        level: selectedLevel,
      },
    })
  }

  return (
    <main className="cx-puzzles-page">
      <header className="cx-puzzles-header">
        <button
          type="button"
          className="cx-puzzles-back"
          onClick={handleBack}
          aria-label="Go back"
        >
          <ArrowLeft size={21} />
        </button>

        <h1>Puzzles</h1>

        <div className="cx-puzzles-header-space" />
      </header>

      <div className="cx-puzzles-content">
        <section className="cx-puzzles-intro">
          <div>
            <span className="cx-puzzles-eyebrow">
              CHECKMAÎTRÉX TRAINING
            </span>
            <h2>Your Puzzle Journey</h2>
            <p>
              Explore different chess worlds, solve challenges,
              and progress through every stage.
            </p>
          </div>

          <div className="cx-puzzles-intro-icon">
            <Puzzle size={29} />
          </div>
        </section>

        <section className="cx-puzzles-overall">
          <div className="cx-puzzles-overall-heading">
            <div>
              <span>YOUR PROGRESSION</span>
              <h2>Overall Journey</h2>
            </div>

            <div className="cx-puzzles-overall-badge">
              <Crown size={15} />
              <span>Explorer</span>
            </div>
          </div>

          <div className="cx-puzzles-overall-stats">
            <div>
              <strong>0</strong>
              <span>Areas Completed</span>
            </div>
            <div>
              <strong>0 / 40</strong>
              <span>Stages Completed</span>
            </div>
            <div>
              <strong>0</strong>
              <span>Puzzles Solved</span>
            </div>
          </div>

          <div className="cx-puzzles-overall-track">
            <span />
          </div>

          <p className="cx-puzzles-overall-note">
            Complete all stages in an area to mark that area as completed.
          </p>
        </section>

        <section className="cx-puzzles-areas">
          <div className="cx-puzzles-section-heading">
            <div>
              <span>CHOOSE YOUR WORLD</span>
              <h2>Puzzle Areas</h2>
            </div>
            <span className="cx-puzzles-area-count">04 AREAS</span>
          </div>

          <div className="cx-puzzles-area-grid">
            {areas.map((area, index) => (
              <button
                type="button"
                key={area.id}
                className={`cx-puzzles-area-card ${area.theme} ${
                  activeArea === area.id ? 'selected' : ''
                }`}
                onClick={() => {
                  setActiveArea(area.id)
                  setSelectedLevel(1)
                }}
              >
                <div className="cx-puzzles-area-card-top">
                  <span className="cx-puzzles-area-symbol">
                    {area.icon}
                  </span>
                  <span className="cx-puzzles-area-number">
                    AREA 0{index + 1}
                  </span>
                </div>

                <h3>{area.name}</h3>
                <p>{area.subtitle}</p>

                <div className="cx-puzzles-area-progress">
                  <span>
                    {area.completed}/{area.total} Stages
                  </span>
                  <span>0%</span>
                </div>

                <div className="cx-puzzles-area-track">
                  <span style={{ width: '0%' }} />
                </div>

                <div className="cx-puzzles-area-bottom">
                  <span>
                    {activeArea === area.id
                      ? 'Currently Selected'
                      : 'Explore Area'}
                  </span>
                  <ChevronRight size={16} />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className={`cx-puzzles-map ${currentArea.theme}`}>
          <div className="cx-puzzles-map-heading">
            <div>
              <span>{currentArea.subtitle}</span>
              <h2>{currentArea.name}</h2>
            </div>

            <span className="cx-puzzles-map-icon">
              {currentArea.icon}
            </span>
          </div>

          <p className="cx-puzzles-map-description">
            {currentArea.description}
          </p>

          <div className="cx-puzzles-map-summary">
            <div>
              <span>AREA PROGRESS</span>
              <strong>{currentArea.completed}/10 Stages</strong>
            </div>
            <div>
              <span>SELECTED STAGE</span>
              <strong>Level {selectedLevel}</strong>
            </div>
          </div>

          <div className="cx-puzzles-stage-map">
            <div className="cx-puzzles-stage-path" />

            {Array.from({ length: 10 }, (_, index) => {
              const level = index + 1
              const completed = level <= currentArea.completed
              const locked = level > currentArea.completed + 1
              const selected = selectedLevel === level

              return (
                <button
                  type="button"
                  key={level}
                  className={[
                    'cx-puzzles-stage',
                    `stage-${level}`,
                    completed ? 'completed' : '',
                    locked ? 'locked' : '',
                    selected ? 'selected' : '',
                  ].join(' ')}
                  onClick={() => {
                    if (!locked) setSelectedLevel(level)
                  }}
                  disabled={locked}
                  aria-label={`Level ${level}${locked ? ', locked' : ''}`}
                >
                  <span className="cx-puzzles-stage-node">
                    {completed ? (
                      <Check size={17} />
                    ) : locked ? (
                      <Lock size={14} />
                    ) : (
                      level
                    )}
                  </span>
                  <span className="cx-puzzles-stage-label">
                    {level === 1
                      ? 'START'
                      : level === 10
                        ? 'FINAL'
                        : `LEVEL ${level}`}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="cx-puzzles-selected-stage">
            <div className="cx-puzzles-selected-stage-icon">
              <Star size={20} />
            </div>

            <div className="cx-puzzles-selected-stage-info">
              <span>SELECTED CHALLENGE</span>
              <strong>Level {selectedLevel}</strong>
              <small>10 puzzles · 8 correct answers required</small>
            </div>

            <div className="cx-puzzles-selected-stage-status">
              {selectedLevel <= currentArea.completed
                ? 'COMPLETED'
                : selectedLevel === currentArea.completed + 1
                  ? 'AVAILABLE'
                  : 'LOCKED'}
            </div>
          </div>

          <div className="cx-puzzles-requirements">
            <div>
              <Check size={16} />
              <span>At least 8 correct answers</span>
            </div>
            <div>
              <X size={16} />
              <span>Maximum of 2 mistakes</span>
            </div>
          </div>
        </section>

        <section className="cx-puzzles-bottom-info">
          <div className="cx-puzzles-bottom-info-icon">
            <Trophy size={20} />
          </div>
          <div>
            <strong>Complete an entire area</strong>
            <p>
              Finish all 10 levels to complete an area and unlock
              the next part of your puzzle journey.
            </p>
          </div>
        </section>
      </div>

      <div className="cx-puzzles-bottom-bar">
        <button
          type="button"
          className={`cx-puzzles-menu-button ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Open puzzle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={21} /> : <Menu size={22} />}
        </button>

        <button
          type="button"
          className="cx-puzzles-solve-button"
          onClick={handleSolve}
        >
          <Play size={17} fill="currentColor" />
          <span>Solve Puzzles</span>
        </button>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            className="cx-puzzles-menu-backdrop"
            onClick={() => setMenuOpen(false)}
            aria-label="Close puzzle menu"
          />

          <nav className="cx-puzzles-menu-panel">
            <div className="cx-puzzles-menu-heading">
              <div>
                <span>CHECKMAÎTRÉX</span>
                <h2>Puzzle Menu</h2>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={19} />
              </button>
            </div>

            <div className="cx-puzzles-menu-items">
              {puzzleMenu.map((item) => {
                const Icon = item.icon

                return (
                  <button
                    type="button"
                    key={item.path}
                    onClick={() => {
                      setMenuOpen(false)
                      navigate(`/puzzles/${item.path}`)
                    }}
                  >
                    <span className="cx-puzzles-menu-item-icon">
                      <Icon size={18} />
                    </span>
                    <span>{item.label}</span>
                    <ChevronRight size={16} />
                  </button>
                )
              })}
            </div>
          </nav>
        </>
      )}
    </main>
  )
}

export default PuzzlesPage
