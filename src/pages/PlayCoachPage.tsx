import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Bot,
  Check,
  ChevronDown,
  GraduationCap,
  Sparkles,
  Swords,
} from 'lucide-react'

import './PlayCoachPage.css'

type Coach = {
  id: string
  name: string
  focus: string
  style: string
  bio: string
  rating: number
  initials: string
}

type Side = 'White' | 'Black' | 'Random'
type Assistance = 'Off' | 'Hints' | 'Guided'

const coaches: Coach[] = [
  {
    id: 'beginner',
    name: 'The Beginner',
    focus: 'Fundamentals',
    style: 'Patient',
    bio: 'Build confidence through simple positions and clear explanations.',
    rating: 700,
    initials: 'B',
  },
  {
    id: 'strategist',
    name: 'The Strategist',
    focus: 'Positional play',
    style: 'Analytical',
    bio: 'Learn planning, piece activity, and long-term positional ideas.',
    rating: 1400,
    initials: 'S',
  },
  {
    id: 'tactician',
    name: 'The Tactician',
    focus: 'Combinations',
    style: 'Challenging',
    bio: 'Practice calculation, tactical patterns, and sharp positions.',
    rating: 1700,
    initials: 'T',
  },
  {
    id: 'defender',
    name: 'The Defender',
    focus: 'Defensive play',
    style: 'Cautious',
    bio: 'Improve your defense, threat awareness, and resourcefulness.',
    rating: 1500,
    initials: 'D',
  },
  {
    id: 'grandmaster',
    name: 'The Grandmaster',
    focus: 'All-around',
    style: 'Competitive',
    bio: 'Face a balanced challenge across every phase of the game.',
    rating: 2200,
    initials: 'G',
  },
]

const timeControls = [
  { group: 'Bullet', values: ['1+0', '1+1', '2+0'] },
  { group: 'Blitz', values: ['3+0', '3+2', '5+0', '5+3'] },
  { group: 'Rapid', values: ['10+0', '10+5', '15+10'] },
  { group: 'Classical', values: ['30+0', '30+20', '60+0'] },
  { group: 'Daily', values: ['1 day', '3 days', '7 days'] },
]

const variants = [
  'Standard',
  'Chess960',
  'King of the Hill',
  'Three-Check',
  'Crazyhouse',
  'Anti-Chess',
  'Atomic',
  'Horde',
  'Racing Kings',
]

function getRatingLabel(rating: number) {
  if (rating < 800) return 'Beginner'
  if (rating < 1200) return 'Developing'
  if (rating < 1600) return 'Intermediate'
  if (rating < 2000) return 'Advanced'
  if (rating < 2400) return 'Expert'
  return 'Master-level'
}

function PlayCoachPage() {
  const navigate = useNavigate()
  const [selectedCoach, setSelectedCoach] = useState('beginner')
  const [rating, setRating] = useState(700)
  const [timeControl, setTimeControl] = useState('10+0')
  const [variant, setVariant] = useState('Standard')
  const [side, setSide] = useState<Side>('Random')
  const [assistance, setAssistance] = useState<Assistance>('Off')
  const [mode, setMode] = useState('Training Match')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const activeCoach = coaches.find((coach) => coach.id === selectedCoach) ?? coaches[0]

  const handleStart = () => {
    setNotice(
      'Your match setup is ready. The chess engine and live coaching will be connected in a later development stage.',
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
          <ArrowLeft size={20} />
        </button>

        <div className="cx-coach-heading">
          <GraduationCap size={22} />
          <div>
            <h1>Play with Coach</h1>
            <p>Play a match. Learn as you go.</p>
          </div>
        </div>

        <button
          type="button"
          className="cx-coach-settings-button"
          onClick={() => setSettingsOpen((open) => !open)}
          aria-expanded={settingsOpen}
          aria-label="Toggle match settings"
        >
          <Sparkles size={19} />
        </button>
      </header>

      <div className="cx-coach-content">
        <section className="cx-coach-intro">
          <div>
            <span className="cx-coach-eyebrow">YOUR CHESS PARTNER</span>
            <h2>Choose your coach</h2>
            <p>Every coach is both your opponent and your learning partner.</p>
          </div>
          <span className="cx-coach-type"><Bot size={14} /> AI opponent + coach</span>
        </section>

        <section className="cx-coach-roster" aria-label="Available coaches">
          {coaches.map((coach) => {
            const selected = selectedCoach === coach.id
            return (
              <button
                type="button"
                key={coach.id}
                className={selected ? 'cx-coach-card selected' : 'cx-coach-card'}
                onClick={() => {
                  setSelectedCoach(coach.id)
                  setRating(coach.rating)
                  setNotice('')
                }}
                aria-pressed={selected}
              >
                <span className="cx-coach-card-top">
                  <span className="cx-coach-avatar">{coach.initials}</span>
                  {selected && <Check size={17} className="cx-coach-card-check" />}
                </span>
                <strong>{coach.name}</strong>
                <span className="cx-coach-focus">{coach.focus}</span>
                <span className="cx-coach-style">{coach.style}</span>
                <span className="cx-coach-card-rating">{coach.rating} target rating</span>
              </button>
            )
          })}
        </section>

        <section className="cx-coach-profile">
          <div className="cx-coach-profile-avatar">{activeCoach.initials}</div>
          <div className="cx-coach-profile-copy">
            <span className="cx-coach-eyebrow">SELECTED COACH</span>
            <h3>{activeCoach.name}</h3>
            <p>{activeCoach.bio}</p>
          </div>
        </section>

        <section className="cx-coach-settings">
          <div className="cx-coach-section-heading">
            <div>
              <span className="cx-coach-eyebrow">MATCH CONFIGURATION</span>
              <h2>Game settings</h2>
            </div>
            <button
              type="button"
              className="cx-coach-collapse"
              onClick={() => setSettingsOpen((open) => !open)}
              aria-expanded={settingsOpen}
            >
              {settingsOpen ? 'Hide' : 'Customize'}
              <ChevronDown size={16} className={settingsOpen ? 'rotated' : ''} />
            </button>
          </div>

          <div className="cx-coach-rating-box">
            <div className="cx-coach-setting-label">
              <span>Coach rating</span>
              <strong>{rating}</strong>
            </div>
            <input
              type="range"
              min="400"
              max="2800"
              step="100"
              value={rating}
              onChange={(event) => {
                setRating(Number(event.target.value))
                setNotice('')
              }}
              aria-label="Coach target rating"
            />
            <div className="cx-coach-rating-scale">
              <span>400</span>
              <span>{getRatingLabel(rating)}</span>
              <span>2800</span>
            </div>
            <p>Target strength only. Actual playing strength will depend on engine calibration.</p>
          </div>

          {settingsOpen && (
            <div className="cx-coach-extra-settings">
              <div className="cx-coach-setting-group">
                <label htmlFor="cx-coach-time">Time control</label>
                <select
                  id="cx-coach-time"
                  value={timeControl}
                  onChange={(event) => setTimeControl(event.target.value)}
                >
                  {timeControls.map((group) => (
                    <optgroup label={group.group} key={group.group}>
                      {group.values.map((value) => (
                        <option value={value} key={value}>{value}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="cx-coach-setting-group">
                <label htmlFor="cx-coach-variant">Game variant</label>
                <select
                  id="cx-coach-variant"
                  value={variant}
                  onChange={(event) => setVariant(event.target.value)}
                >
                  {variants.map((value) => (
                    <option value={value} key={value}>{value}</option>
                  ))}
                </select>
              </div>

              <div className="cx-coach-setting-group">
                <span className="cx-coach-field-label">Play as</span>
                <div className="cx-coach-choice-row">
                  {(['White', 'Random', 'Black'] as Side[]).map((value) => (
                    <button
                      type="button"
                      key={value}
                      className={side === value ? 'active' : ''}
                      onClick={() => setSide(value)}
                      aria-pressed={side === value}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div className="cx-coach-setting-group">
                <label htmlFor="cx-coach-assistance">Coaching assistance</label>
                <select
                  id="cx-coach-assistance"
                  value={assistance}
                  onChange={(event) => setAssistance(event.target.value as Assistance)}
                >
                  <option value="Off">Off</option>
                  <option value="Hints">Hints</option>
                  <option value="Guided">Guided</option>
                </select>
                <p className="cx-coach-field-note">Optional. You can choose when to request help during a match.</p>
              </div>

              <div className="cx-coach-setting-group">
                <span className="cx-coach-field-label">Game mode</span>
                <div className="cx-coach-mode-row">
                  {['Training Match', 'Practice Match'].map((value) => (
                    <button
                      type="button"
                      key={value}
                      className={mode === value ? 'active' : ''}
                      onClick={() => setMode(value)}
                      aria-pressed={mode === value}
                    >
                      {value === 'Training Match' ? <GraduationCap size={16} /> : <Swords size={16} />}
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="cx-coach-summary">
            <span>Match summary</span>
            <p>{activeCoach.name} · {rating} rating · {timeControl} · {variant}</p>
            <p>{side} · {mode} · Coaching: {assistance}</p>
          </div>
        </section>

        {notice && <p className="cx-coach-notice" role="status">{notice}</p>}

        <button type="button" className="cx-coach-start" onClick={handleStart}>
          <Swords size={18} />
          Start Match
        </button>
        <p className="cx-coach-preview-note">
          Frontend setup preview. Live gameplay, engine strength, and coach responses are not connected yet.
        </p>
      </div>
    </main>
  )
}

export default PlayCoachPage
