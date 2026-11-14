import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  UserPlus,
  Link2,
  Settings2,
  Check,
  Users,
  Clock3,
  Gamepad2,
  X,
  ChevronDown,
  Swords,
} from 'lucide-react'
import './PlayFriendPage.css'

type FriendStatus = 'Online' | 'Offline' | 'Queue' | 'Playing'

type Friend = {
  id: number
  name: string
  username: string
  rating: number
  status: FriendStatus
  initials: string
}

const sampleFriends: Friend[] = [
  {
    id: 1,
    name: 'Alex Morgan',
    username: '@alexmorgan',
    rating: 1842,
    status: 'Online',
    initials: 'AM',
  },
  {
    id: 2,
    name: 'Daniel Reyes',
    username: '@danreyes',
    rating: 1725,
    status: 'Playing',
    initials: 'DR',
  },
  {
    id: 3,
    name: 'Sophia Cruz',
    username: '@sophiacruz',
    rating: 1650,
    status: 'Online',
    initials: 'SC',
  },
  {
    id: 4,
    name: 'Marcus Lee',
    username: '@marcuslee',
    rating: 2011,
    status: 'Queue',
    initials: 'ML',
  },
  {
    id: 5,
    name: 'Isabella Santos',
    username: '@isasantos',
    rating: 1538,
    status: 'Offline',
    initials: 'IS',
  },
  {
    id: 6,
    name: 'Nathan Cole',
    username: '@nathancole',
    rating: 1920,
    status: 'Online',
    initials: 'NC',
  },
  {
    id: 7,
    name: 'Mia Thompson',
    username: '@miathompson',
    rating: 1476,
    status: 'Offline',
    initials: 'MT',
  },
  {
    id: 8,
    name: 'Ethan Garcia',
    username: '@ethangarcia',
    rating: 1789,
    status: 'Queue',
    initials: 'EG',
  },
]

const timeControlGroups = [
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
  {
    title: 'Daily',
    options: ['1 Day', '2 Days', '3 Days', '4 Days'],
  },
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

const gameModes = ['Casual', 'Unrated', 'Rated', 'CCC-Rated']

const TIME_CONTROL_KEY = 'time-control'
const VARIANT_KEY = 'play-variant'
const MODE_KEY = 'play-mode'
const LOWER_RATING_KEY = 'play-rating-lower'
const UPPER_RATING_KEY = 'play-rating-upper'

function readSetting(key: string, fallback: string) {
  try {
    return localStorage.getItem(key) || fallback
  } catch {
    return fallback
  }
}

function readNumberSetting(key: string, fallback: number) {
  try {
    const value = localStorage.getItem(key)
    return value === null ? fallback : Number(value)
  } catch {
    return fallback
  }
}

function saveSetting(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Local storage is optional.
  }
}

type PanelType = 'invite' | 'settings' | null

function PlayFriendPage() {
  const navigate = useNavigate()

  const [activePanel, setActivePanel] = useState<PanelType>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedTime, setSelectedTime] = useState(() => readSetting(TIME_CONTROL_KEY, '10 min'))
  const [selectedVariant, setSelectedVariant] = useState(() => readSetting(VARIANT_KEY, 'Standard'))
  const [selectedMode, setSelectedMode] = useState(() => readSetting(MODE_KEY, 'Rated'))
 const [openSetting, setOpenSetting] = useState<
  'time' | 'variant' | 'mode' | null
 >(null)
  const [lowerRating, setLowerRating] = useState(() => readNumberSetting(LOWER_RATING_KEY, 0))
  const [upperRating, setUpperRating] = useState(() => readNumberSetting(UPPER_RATING_KEY, 500))
  const [notice, setNotice] = useState('')
  const [challengedFriend, setChallengedFriend] = useState<string | null>(null)

  const filteredFriends = useMemo(() => {
    return sampleFriends.filter((friend) => {
      const matchesSearch =
        friend.name.toLowerCase().includes(search.toLowerCase()) ||
        friend.username.toLowerCase().includes(search.toLowerCase())

      const matchesStatus =
        statusFilter === 'All' || friend.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  const openPanel = (panel: PanelType) => {
    setNotice('')
    setActivePanel((current) => current === panel ? null : panel)
  }

  const updateTime = (value: string) => {
    setSelectedTime(value)
    saveSetting(TIME_CONTROL_KEY, value)
  }

  const updateVariant = (value: string) => {
    setSelectedVariant(value)
    saveSetting(VARIANT_KEY, value)
  }

  const updateMode = (value: string) => {
    setSelectedMode(value)
    saveSetting(MODE_KEY, value)
  }

  const updateLowerRating = (value: number) => {
    setLowerRating(value)
    saveSetting(LOWER_RATING_KEY, String(value))
  }

  const updateUpperRating = (value: number) => {
    setUpperRating(value)
    saveSetting(UPPER_RATING_KEY, String(value))
  }

  const handleChallenge = (friend: Friend) => {
    if (friend.status !== 'Online') return

    setChallengedFriend(friend.name)
    setNotice(`Challenge preview prepared for ${friend.name}.`)
  }

  const statusCounts = {
    Online: sampleFriends.filter((friend) => friend.status === 'Online').length,
    Offline: sampleFriends.filter((friend) => friend.status === 'Offline').length,
    Queue: sampleFriends.filter((friend) => friend.status === 'Queue').length,
    Playing: sampleFriends.filter((friend) => friend.status === 'Playing').length,
  }

  return (
    <main className="cx-friend-page">
      <header className="cx-friend-header">
        <button
          type="button"
          className="cx-friend-back"
          onClick={() => navigate('/play')}
          aria-label="Back to Play"
        >
          <ArrowLeft size={21} />
        </button>

        <h1>Play with Friend</h1>

        <div className="cx-friend-header-space" />
      </header>

      <div className="cx-friend-content">
        <section className="cx-friend-intro">
          <div>
<span className="cx-friend-eyebrow">CHECKMAÎTRÉX</span>
<h2>Play with Friends</h2>
<p>Challenge your friends to a chess match.</p>
<p>Invite players, send match challenges, and play chess together.</p>
          </div>
          <div className="cx-friend-intro-icon">
            <Swords size={30} />
          </div>
        </section>

        <section className="cx-friend-action-grid">
          <button
            type="button"
            className="cx-friend-action-card"
            onClick={() => navigate('/search')}
          >
            <span className="cx-friend-action-icon">
              <Search size={21} />
            </span>
            <span className="cx-friend-action-copy">
              <strong>Find a Friend</strong>
              <small>Search for a player</small>
            </span>
            <span className="cx-friend-card-arrow">›</span>
          </button>

          <button
            type="button"
            className={`cx-friend-action-card ${activePanel === 'invite' ? 'active' : ''}`}
            onClick={() => openPanel('invite')}
          >
            <span className="cx-friend-action-icon">
              <UserPlus size={21} />
            </span>
            <span className="cx-friend-action-copy">
              <strong>Invite a Friend</strong>
              <small>Invite someone to join</small>
            </span>
            <span className="cx-friend-card-arrow">›</span>
          </button>

          <button
            type="button"
            className="cx-friend-action-card"
            onClick={() => navigate('/play/friend/challenge')}
          >
            <span className="cx-friend-action-icon">
              <Link2 size={21} />
            </span>
            <span className="cx-friend-action-copy">
              <strong>Send Challenge Link</strong>
              <small>Share a game invitation</small>
            </span>
            <span className="cx-friend-card-arrow">›</span>
          </button>

          <button
            type="button"
            className={`cx-friend-action-card ${activePanel === 'settings' ? 'active' : ''}`}
            onClick={() => openPanel('settings')}
          >
            <span className="cx-friend-action-icon">
              <Settings2 size={21} />
            </span>
            <span className="cx-friend-action-copy">
              <strong>Game Settings</strong>
              <small>
                {selectedTime} · {selectedVariant}
              </small>
            </span>
            <span className="cx-friend-card-arrow">›</span>
          </button>
        </section>

{activePanel === 'settings' && (
  <div className="cx-friend-panel-body cx-friend-settings">

    {/* TIME CONTROL */}
    <div className="cx-friend-setting-field">
      <label>Time Control</label>

      <button
        type="button"
        className={`cx-friend-setting-trigger ${openSetting === 'time' ? 'expanded' : ''}`}
        onClick={() =>
          setOpenSetting((current) => current === 'time' ? null : 'time')
        }
        aria-expanded={openSetting === 'time'}
      >
        <span className="cx-friend-setting-trigger-icon">
          <Clock3 size={18} />
        </span>

        <span className="cx-friend-setting-trigger-copy">
          <strong>{selectedTime}</strong>
          <small>Choose time control</small>
        </span>

        <ChevronDown
          size={18}
          className={openSetting === 'time' ? 'rotated' : ''}
        />
      </button>

      {openSetting === 'time' && (
        <div className="cx-friend-setting-options cx-friend-time-options">
          {timeControlGroups.map((group) => (
            <div className="cx-friend-time-group" key={group.title}>
              <span>{group.title}</span>

              <div className="cx-friend-option-grid">
                {group.options.map((time) => (
                  <button
                    type="button"
                    key={time}
                    className={selectedTime === time ? 'selected' : ''}
                    onClick={() => {
                      updateTime(time)
                      setOpenSetting(null)
                    }}
                  >
                    {time}
                    {selectedTime === time && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* GAME VARIANT */}
    <div className="cx-friend-setting-field">
      <label>Game Variant</label>

      <button
        type="button"
        className={`cx-friend-setting-trigger ${openSetting === 'variant' ? 'expanded' : ''}`}
        onClick={() =>
          setOpenSetting((current) => current === 'variant' ? null : 'variant')
        }
        aria-expanded={openSetting === 'variant'}
      >
        <span className="cx-friend-setting-trigger-icon">
          <Gamepad2 size={18} />
        </span>

        <span className="cx-friend-setting-trigger-copy">
          <strong>{selectedVariant}</strong>
          <small>Choose game rules</small>
        </span>

        <ChevronDown
          size={18}
          className={openSetting === 'variant' ? 'rotated' : ''}
        />
      </button>

      {openSetting === 'variant' && (
        <div className="cx-friend-setting-options cx-friend-variant-options">
          {variants.map((variant) => (
            <button
              type="button"
              key={variant}
              className={selectedVariant === variant ? 'selected' : ''}
              onClick={() => {
                updateVariant(variant)
                setOpenSetting(null)
              }}
            >
              <span>{variant}</span>
              {selectedVariant === variant && <Check size={15} />}
            </button>
          ))}
        </div>
      )}
    </div>

    {/* GAME MODE */}
    <div className="cx-friend-setting-field">
      <label>Game Mode</label>

      <button
        type="button"
        className={`cx-friend-setting-trigger ${openSetting === 'mode' ? 'expanded' : ''}`}
        onClick={() =>
          setOpenSetting((current) => current === 'mode' ? null : 'mode')
        }
        aria-expanded={openSetting === 'mode'}
      >
        <span className="cx-friend-setting-trigger-icon">
          <Swords size={18} />
        </span>

        <span className="cx-friend-setting-trigger-copy">
          <strong>{selectedMode}</strong>
          <small>Choose match type</small>
        </span>

        <ChevronDown
          size={18}
          className={openSetting === 'mode' ? 'rotated' : ''}
        />
      </button>

      {openSetting === 'mode' && (
        <div className="cx-friend-setting-options cx-friend-mode-options">
          {gameModes.map((mode) => (
            <button
              type="button"
              key={mode}
              className={selectedMode === mode ? 'selected' : ''}
              onClick={() => {
                updateMode(mode)
                setOpenSetting(null)
              }}
            >
              <span>{mode}</span>
              {selectedMode === mode && <Check size={15} />}
            </button>
          ))}
        </div>
      )}
    </div>

    {/* RATING FILTER */}
    <div className="cx-friend-setting-field cx-friend-rating-field">
      <label>Rating Filter</label>

      <div className="cx-friend-rating-controls">
        <label>
          <span>
            Lower Limit
            <strong>-{lowerRating}</strong>
          </span>

          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={lowerRating}
            onChange={(event) =>
              updateLowerRating(Number(event.target.value))
            }
            aria-label="Lower rating limit"
          />

          <small>0–500 points</small>
        </label>

        <label>
          <span>
            Upper Limit
            <strong>+{upperRating}</strong>
          </span>

          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={upperRating}
            onChange={(event) =>
              updateUpperRating(Number(event.target.value))
            }
            aria-label="Upper rating limit"
          />

          <small>0–500 points</small>
        </label>
      </div>
    </div>

    {/* SETTINGS SUMMARY */}
    <div className="cx-friend-setting-summary">
      <div className="cx-friend-setting-summary-heading">
        <span>Synced from Play</span>
        <Check size={15} />
      </div>

      <div className="cx-friend-setting-summary-values">
        <strong>{selectedTime}</strong>
        <strong>{selectedVariant} · {selectedMode}</strong>
      </div>

      <small>
        Rating: -{lowerRating} / +{upperRating}
      </small>
    </div>

  </div>
)}
        {notice && (
          <div className="cx-friend-notice" role="status">
            {notice}
          </div>
        )}

        <button
          type="button"
          className="cx-friend-pass-button"
          onClick={() => navigate('/play/friend/pass-and-play')}
        >
          <Users size={20} />
          <span>Pass &amp; Play</span>
          <small>Play locally on one device</small>
        </button>

        <section className="cx-friend-list-section">
          <div className="cx-friend-list-heading">
            <div>
              <span className="cx-friend-eyebrow">YOUR NETWORK</span>
              <h2>Friend Lists</h2>
              <p>Find a friend and send a challenge.</p>
            </div>
            <span className="cx-friend-total">
              <Users size={15} />
              {sampleFriends.length} Friends
            </span>
          </div>

          <div className="cx-friend-status-summary">
            <button
              type="button"
              className={statusFilter === 'All' ? 'selected' : ''}
              onClick={() => setStatusFilter('All')}
            >
              All <strong>{sampleFriends.length}</strong>
            </button>
            <button
              type="button"
              className={statusFilter === 'Online' ? 'selected' : ''}
              onClick={() => setStatusFilter('Online')}
            >
              <i className="status-dot online" />
              Online <strong>{statusCounts.Online}</strong>
            </button>
            <button
              type="button"
              className={statusFilter === 'Offline' ? 'selected' : ''}
              onClick={() => setStatusFilter('Offline')}
            >
              <i className="status-dot offline" />
              Offline <strong>{statusCounts.Offline}</strong>
            </button>
            <button
              type="button"
              className={statusFilter === 'Queue' ? 'selected' : ''}
              onClick={() => setStatusFilter('Queue')}
            >
              <i className="status-dot queue" />
              Queue <strong>{statusCounts.Queue}</strong>
            </button>
            <button
              type="button"
              className={statusFilter === 'Playing' ? 'selected' : ''}
              onClick={() => setStatusFilter('Playing')}
            >
              <i className="status-dot playing" />
              Playing <strong>{statusCounts.Playing}</strong>
            </button>
          </div>

          <div className="cx-friend-list-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search your friends..."
              aria-label="Search your friends"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="cx-friend-list">
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend) => (
                <article className="cx-friend-row" key={friend.id}>
                  <div className="cx-friend-avatar-wrap">
                    <div className="cx-friend-avatar">{friend.initials}</div>
                    <i className={`status-dot avatar-status ${friend.status.toLowerCase()}`} />
                  </div>

                  <div className="cx-friend-details">
                    <strong>{friend.name}</strong>
                    <span>{friend.username}</span>
                    <small>{friend.rating} Rating</small>
                  </div>

                  <div className="cx-friend-row-status">
                    <span className={`cx-friend-status-text ${friend.status.toLowerCase()}`}>
                      <i className={`status-dot ${friend.status.toLowerCase()}`} />
                      {friend.status}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="cx-friend-challenge"
                    disabled={friend.status !== 'Online'}
                    onClick={() => handleChallenge(friend)}
                    title={
                      friend.status === 'Online'
                        ? `Challenge ${friend.name}`
                        : `${friend.name} is ${friend.status.toLowerCase()}`
                    }
                  >
                    <Swords size={15} />
                    Challenge
                  </button>
                </article>
              ))
            ) : (
              <div className="cx-friend-empty">
                <Users size={25} />
                <strong>No friends found</strong>
                <span>Try another search or status filter.</span>
              </div>
            )}
          </div>

          {challengedFriend && (
            <div className="cx-friend-challenge-preview">
              <div>
                <strong>Challenge preview</strong>
                <span>{challengedFriend} · {selectedTime} · {selectedVariant}</span>
              </div>
              <button
                type="button"
                onClick={() => setChallengedFriend(null)}
                aria-label="Dismiss challenge preview"
              >
                <X size={17} />
              </button>
            </div>
          )}

          <p className="cx-friend-sample-note">
            Sample friend profiles and statuses for frontend preview only.
          </p>
        </section>
      </div>
    </main>
  )
}

export default PlayFriendPage
