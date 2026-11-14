import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Check,
  Clock3,
  Copy,
  Gamepad2,
  Info,
  Link2,
  LockKeyhole,
  Share2,
  Swords,
  Users,
} from 'lucide-react'
import './SendChallengeLinkPage.css'

type ChallengeType = 'One-Time' | 'Reusable' | 'Open Challenge'

const timeControls = [
  '1+0',
  '1+1',
  '2+0',
  '2+1',
  '3+0',
  '3+1',
  '5+0',
  '5+1',
  '10+0',
  '10+1',
  '15+0',
  '15+1',
  '30+0',
  '30+10',
  '60+0',
  '60+10',
  '1 Day',
  '2 Days',
  '3 Days',
  '4 Days',
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

const expirationOptions = [
  '1 Hour',
  '6 Hours',
  '12 Hours',
  '24 Hours',
  '3 Days',
  '7 Days',
  '30 Days',
]

const challengeTypes: {
  value: ChallengeType
  description: string
  icon: typeof LockKeyhole
}[] = [
  {
    value: 'One-Time',
    description:
      'Only one opponent can accept. The invitation becomes unavailable after acceptance.',
    icon: LockKeyhole,
  },
  {
    value: 'Reusable',
    description:
      'Share the link with multiple people. Each match invitation can have one opponent.',
    icon: Link2,
  },
  {
    value: 'Open Challenge',
    description:
      'Make your challenge available for any eligible player to accept.',
    icon: Users,
  },
]

function readSetting(key: string, fallback: string) {
  try {
    return localStorage.getItem(key) || fallback
  } catch {
    return fallback
  }
}

function SendChallengeLinkPage() {
  const navigate = useNavigate()

  const savedTime = readSetting('time-control', '10+0')
  const savedVariant = readSetting('play-variant', 'Standard')

  const [timeControl, setTimeControl] = useState(
    timeControls.includes(savedTime) ? savedTime : '10+0',
  )
  const [variant, setVariant] = useState(
    variants.includes(savedVariant) ? savedVariant : 'Standard',
  )
  const [challengeType, setChallengeType] =
    useState<ChallengeType>('One-Time')
  const [expiration, setExpiration] = useState('24 Hours')
  const [showBackendNotice, setShowBackendNotice] = useState(false)

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/play/friend')
    }
  }

  const handleCreateChallenge = () => {
    setShowBackendNotice(true)
  }

  return (
    <main className="cx-challenge-link-page">
      <header className="cx-challenge-link-header">
        <button
          type="button"
          className="cx-challenge-link-back"
          onClick={goBack}
          aria-label="Go back"
        >
          <ArrowLeft size={21} />
        </button>

        <h1>Send Challenge Link</h1>

        <div className="cx-challenge-link-header-space" />
      </header>

      <div className="cx-challenge-link-content">
        <section className="cx-challenge-link-intro">
          <div className="cx-challenge-link-intro-icon">
            <Swords size={29} />
          </div>

          <div>
            <span className="cx-challenge-link-eyebrow">
              CHECKMAÎTRÉX
            </span>
            <h2>Create a Challenge</h2>
            <p>
              Create a chess match invitation and share it
              with anyone.
            </p>
          </div>
        </section>

        <section className="cx-challenge-link-section">
          <div className="cx-challenge-link-section-heading">
            <span className="cx-challenge-link-step">01</span>
            <div>
              <h3>Match Settings</h3>
              <p>
                Synced from Game Settings. Changes here apply
                only to this challenge.
              </p>
            </div>
          </div>

          <div className="cx-challenge-link-fields">
            <div className="cx-challenge-link-field">
              <label htmlFor="challenge-time-control">
                Time Control
              </label>

              <div className="cx-challenge-link-select">
                <Clock3 size={17} />

                <select
                  id="challenge-time-control"
                  value={timeControl}
                  onChange={(event) =>
                    setTimeControl(event.target.value)
                  }
                >
                  {timeControls.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="cx-challenge-link-field">
              <label htmlFor="challenge-variant">
                Game Variant
              </label>

              <div className="cx-challenge-link-select">
                <Gamepad2 size={17} />

                <select
                  id="challenge-variant"
                  value={variant}
                  onChange={(event) =>
                    setVariant(event.target.value)
                  }
                >
                  {variants.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="cx-challenge-link-section">
          <div className="cx-challenge-link-section-heading">
            <span className="cx-challenge-link-step">02</span>
            <div>
              <h3>Challenge Type</h3>
              <p>
                Choose how other players can accept your
                invitation.
              </p>
            </div>
          </div>

          <div className="cx-challenge-link-types">
            {challengeTypes.map((item) => {
              const Icon = item.icon
              const selected = challengeType === item.value

              return (
                <button
                  type="button"
                  key={item.value}
                  className={`cx-challenge-link-type ${
                    selected ? 'selected' : ''
                  }`}
                  onClick={() => setChallengeType(item.value)}
                  aria-pressed={selected}
                >
                  <span className="cx-challenge-link-type-icon">
                    <Icon size={20} />
                  </span>

                  <span className="cx-challenge-link-type-copy">
                    <strong>{item.value}</strong>
                    <small>{item.description}</small>
                  </span>

                  <span
                    className="cx-challenge-link-radio"
                    aria-hidden="true"
                  >
                    {selected && <Check size={13} />}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        <section className="cx-challenge-link-section">
          <div className="cx-challenge-link-section-heading">
            <span className="cx-challenge-link-step">03</span>
            <div>
              <h3>Link Expiration</h3>
              <p>
                Select how long this challenge invitation
                remains valid.
              </p>
            </div>
          </div>

          <div className="cx-challenge-link-field">
            <label htmlFor="challenge-expiration">
              Expiration Time
            </label>

            <div className="cx-challenge-link-select">
              <Clock3 size={17} />

              <select
                id="challenge-expiration"
                value={expiration}
                onChange={(event) =>
                  setExpiration(event.target.value)
                }
              >
                {expirationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="cx-challenge-link-summary">
          <div className="cx-challenge-link-summary-heading">
            <Swords size={18} />
            <h3>Challenge Summary</h3>
          </div>

          <div className="cx-challenge-link-summary-row">
            <span>Challenge Type</span>
            <strong>{challengeType}</strong>
          </div>

          <div className="cx-challenge-link-summary-row">
            <span>Time Control</span>
            <strong>{timeControl}</strong>
          </div>

          <div className="cx-challenge-link-summary-row">
            <span>Game Variant</span>
            <strong>{variant}</strong>
          </div>

          <div className="cx-challenge-link-summary-row">
            <span>Expires In</span>
            <strong>{expiration}</strong>
          </div>
        </section>

        <section className="cx-challenge-link-actions">
          <button
            type="button"
            className="cx-challenge-link-create"
            onClick={handleCreateChallenge}
          >
            <Link2 size={18} />
            Create Challenge Link
          </button>

          <div className="cx-challenge-link-share-actions">
            <button type="button" disabled>
              <Copy size={16} />
              Copy Link
            </button>

            <button type="button" disabled>
              <Share2 size={16} />
              Share Link
            </button>
          </div>

          {showBackendNotice && (
            <div
              className="cx-challenge-link-notice"
              role="status"
            >
              <Info size={17} />
              <p>
                Challenge link generation will be enabled
                after backend integration. Your selections
                are ready, but no active invitation has
                been created.
              </p>
            </div>
          )}

          <p className="cx-challenge-link-footnote">
            Challenge links, acceptance, expiration, and
            cancellation require backend support.
          </p>
        </section>
      </div>
    </main>
  )
}

export default SendChallengeLinkPage
