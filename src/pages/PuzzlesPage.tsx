import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
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
  ChevronRight,
  Play,
  Crown,
  Target,
  Map,
  BarChart3,
} from 'lucide-react'
import './PuzzlesPage.css'

type Area = {
  id: string
  name: string
  subtitle: string
  description: string
  theme: string
  icon: string
  levels: string[]
}

export const puzzleAreas: Area[] = [
  {
    id: 'opening',
    name: 'Opening Grounds',
    subtitle: 'THE BEGINNING OF YOUR JOURNEY',
    description: 'Learn opening principles, piece development, and control of the center.',
    theme: 'opening',
    icon: '♟',
    levels: [
      'Snow', 'Winter', 'Frost', 'Ice Valley', 'Frozen Lake',
      'Snowfall', 'Glacier', 'Arctic Path', 'Frozen Summit', 'Winter Kingdom',
    ],
  },
  {
    id: 'tactics',
    name: 'Tactical Fortress',
    subtitle: 'MASTER THE ART OF TACTICS',
    description: 'Discover combinations, forks, pins, discovered attacks, and checkmate patterns.',
    theme: 'tactics',
    icon: '⚔',
    levels: [
      'The Outpost', 'Fork Crossing', 'Pinning Grounds', 'Skewer Pass',
      'The Ambush', 'Discovery Hall', 'Sacrifice Keep', 'Combination Tower',
      'Checkmate Gate', 'Tactical Fortress',
    ],
  },
  {
    id: 'middlegame',
    name: 'Middlegame Kingdom',
    subtitle: 'BUILD YOUR STRATEGY',
    description: 'Improve your positional understanding, planning, and strategic decisions.',
    theme: 'middlegame',
    icon: '♜',
    levels: [
      'Quiet Village', 'Central Square', 'The Open File', 'Knight Valley',
      'Bishop Heights', 'Pawn Kingdom', 'Strategic Bridge', 'Castle District',
      'Royal Garden', 'Middlegame Kingdom',
    ],
  },
  {
    id: 'endgame',
    name: 'Endgame Citadel',
    subtitle: 'CONQUER THE FINAL STAGE',
    description: 'Practice king activity, pawn endings, rook endings, and winning techniques.',
    theme: 'endgame',
    icon: '♛',
    levels: [
      'Last Frontier', 'Pawn Fields', 'King’s Road', 'Rook Harbor',
      'Opposition Pass', 'Promotion Gate', 'The Final Bridge',
      'Fortress Valley', 'Victory Summit', 'Endgame Citadel',
    ],
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
const [searchParams] = useSearchParams()

const initialArea = puzzleAreas.find(
  (area) => area.id === searchParams.get('area')
)

const [menuOpen, setMenuOpen] = useState(false)
const [activeArea, setActiveArea] = useState<Area | null>(
  initialArea ?? null
)
  const goBack = () => navigate('/play')

  const openLevel = (level: number) => {
    if (!activeArea) return
    navigate(`/puzzles/area/${activeArea.id}/level/${level}`)
  }

  return (
    <main className="cx-puzzles-page">
      <header className="cx-puzzles-header">
        <button type="button" className="cx-puzzles-back" onClick={goBack} aria-label="Back to Play">
          <ArrowLeft size={21} />
        </button>
        <h1>Puzzles</h1>
        <div />
      </header>

      <div className="cx-puzzles-content">
        {!activeArea ? (
          <>
            <section className="cx-puzzles-intro">
              <div>
                <span className="cx-puzzles-eyebrow">CHECKMAÎTRÉX TRAINING</span>
                <h2>Your Puzzle Journey</h2>
                <p>Explore different chess worlds, solve challenges, and progress through every stage.</p>
              </div>
              <div className="cx-puzzles-intro-icon"><Puzzle size={29} /></div>
            </section>

            <section className="cx-overall-section">
              <div className="cx-puzzles-section-heading">
                <div>
                  <span>YOUR PROGRESSION</span>
                  <h2>Overall Journey</h2>
                </div>
                <span className="cx-puzzles-area-count">SWIPE TO EXPLORE</span>
              </div>

              <div className="cx-overall-slider">
                <article className="cx-overall-card main">
                  <div className="cx-overall-card-top">
                    <span className="cx-overall-icon"><Crown size={19} /></span>
                    <span className="cx-overall-tag">YOUR RANK</span>
                  </div>
                  <h3>Explorer</h3>
                  <p>Your chess puzzle journey starts here.</p>
                  <div className="cx-overall-stats">
                    <div><strong>0/4</strong><span>Areas completed</span></div>
                    <div><strong>0/40</strong><span>Levels completed</span></div>
                  </div>
                  <div className="cx-overall-track"><span style={{ width: '0%' }} /></div>
                  <small>Overall completion · 0%</small>
                </article>

                <article className="cx-overall-card">
                  <div className="cx-overall-card-top">
                    <span className="cx-overall-icon"><Map size={19} /></span>
                    <span className="cx-overall-tag">YOUR WORLDS</span>
                  </div>
                  <h3>4 Puzzle Areas</h3>
                  <p>Four unique worlds, each with ten named levels.</p>
                  <div className="cx-overall-highlight">40 <span>total levels</span></div>
                  <div className="cx-overall-mini-list">
                    <span>Opening Grounds</span>
                    <span>Tactical Fortress</span>
                    <span>Middlegame Kingdom</span>
                    <span>Endgame Citadel</span>
                  </div>
                </article>

                <article className="cx-overall-card">
                  <div className="cx-overall-card-top">
                    <span className="cx-overall-icon"><BarChart3 size={19} /></span>
                    <span className="cx-overall-tag">YOUR RECORD</span>
                  </div>
                  <h3>Training Stats</h3>
                  <p>Your sample progress will appear here.</p>
                  <div className="cx-overall-stats">
                    <div><strong>0</strong><span>Puzzles solved</span></div>
                    <div><strong>0</strong><span>Perfect levels</span></div>
                  </div>
                  <small>Progress tracking will connect to your account later.</small>
                </article>
              </div>
            </section>

            <section className="cx-puzzles-areas">
              <div className="cx-puzzles-section-heading">
                <div>
                  <span>CHOOSE YOUR WORLD</span>
                  <h2>Puzzle Areas</h2>
                </div>
                <span className="cx-puzzles-area-count">04 AREAS</span>
              </div>

              <div className="cx-puzzles-area-row">
                {puzzleAreas.map((area, index) => (
                  <button
                    type="button"
                    key={area.id}
                    className={`cx-puzzles-area-card ${area.theme}`}
                    onClick={() => setActiveArea(area)}
                  >
                    <div className="cx-puzzles-area-card-top">
                      <span className="cx-puzzles-area-symbol">{area.icon}</span>
                      <span className="cx-puzzles-area-number">AREA 0{index + 1}</span>
                    </div>
                    <h3>{area.name}</h3>
                    <p>{area.subtitle}</p>
                    <div className="cx-puzzles-area-progress">
                      <span>0/10 Levels</span><span>0%</span>
                    </div>
                    <div className="cx-puzzles-area-track"><span style={{ width: '0%' }} /></div>
                    <div className="cx-puzzles-area-bottom">
                      <span>Explore Area</span><ChevronRight size={16} />
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="cx-puzzles-bottom-info">
              <div className="cx-puzzles-bottom-info-icon"><Trophy size={20} /></div>
              <div>
                <strong>Four worlds. Forty levels.</strong>
                <p>Complete all ten levels in an area to complete that world in your Puzzle Journey.</p>
              </div>
            </section>
          </>
        ) : (
          <section className={`cx-area-journey ${activeArea.theme}`}>
            <div className="cx-area-topline">
              <button type="button" onClick={() => setActiveArea(null)} className="cx-area-back">
                <ArrowLeft size={18} /> All Areas
              </button>
              <span>AREA JOURNEY</span>
            </div>

            <div className="cx-area-title">
              <div>
                <span>{activeArea.subtitle}</span>
                <h2>{activeArea.name}</h2>
                <p>{activeArea.description}</p>
              </div>
              <div className="cx-area-emblem">{activeArea.icon}</div>
            </div>

            <div className="cx-area-progress-summary">
              <div><span>AREA PROGRESS</span><strong>0 / 10 Levels</strong></div>
              <div><span>COMPLETION</span><strong>0%</strong></div>
            </div>
            <div className="cx-puzzles-area-track large"><span style={{ width: '0%' }} /></div>

            <div className="cx-level-map-heading">
              <div><span>YOUR PATH</span><h3>Level Journey</h3></div>
              <span>10 LEVELS</span>
            </div>

            <div className="cx-level-path">
              <div className="cx-level-path-line" />
              {activeArea.levels.map((name, index) => {
                const level = index + 1
                const locked = level > 1
                return (
                  <button
                    type="button"
                    key={name}
                    className={`cx-level-node node-${level} ${locked ? 'locked' : 'available'}`}
                    onClick={() => openLevel(level)}
                    disabled={locked}
                  >
                    <span className="cx-level-node-circle">
                      {locked ? <Lock size={16} /> : <span>{level}</span>}
                    </span>
                    <span className="cx-level-node-name">{name}</span>
                    <small>LEVEL {level}</small>
                  </button>
                )
              })}
            </div>

            <div className="cx-area-rule">
              <Check size={17} />
              <div>
                <strong>8 out of 10 to advance</strong>
                <p>Answer at least 8 puzzles correctly. If you do not pass, only missed puzzles are repeated.</p>
              </div>
            </div>
          </section>
        )}
      </div>

      <div className="cx-puzzles-bottom-bar">
        <button
          type="button"
          className={`cx-puzzles-menu-button ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Open puzzle menu"
        >
          {menuOpen ? <X size={21} /> : <Menu size={22} />}
        </button>
        <button type="button" className="cx-puzzles-solve-button" onClick={() => navigate('/puzzles/play')}>
          <Play size={17} fill="currentColor" /><span>Solve Puzzles</span>
        </button>
      </div>

      {menuOpen && (
        <>
          <button className="cx-puzzles-menu-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
          <nav className="cx-puzzles-menu-panel">
            <div className="cx-puzzles-menu-heading">
              <div><span>CHECKMAÎTRÉX</span><h2>Puzzle Menu</h2></div>
              <button type="button" onClick={() => setMenuOpen(false)}><X size={19} /></button>
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
                      navigate(item.path === 'play' ? '/puzzles/play' : `/puzzles/${item.path}`)
                    }}
                  >
                    <span className="cx-puzzles-menu-item-icon"><Icon size={18} /></span>
                    <span>{item.label}</span><ChevronRight size={16} />
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
