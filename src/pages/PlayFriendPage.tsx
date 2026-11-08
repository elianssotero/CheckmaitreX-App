import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  UserPlus,
  Mail,
  Link2,
  Settings2,
  Users,
  Copy,
  Check,
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

const timeControls = [
  '1+0 Bullet',
  '2+1 Bullet',
  '3+0 Blitz',
  '3+2 Blitz',
  '5+0 Blitz',
  '5+3 Blitz',
  '10+0 Rapid',
  '10+5 Rapid',
  '15+10 Rapid',
  '30+0 Classical',
]

const variants = [
  'Standard',
  'Chess960',
  'King of the Hill',
  'Three-Check',
  'Crazyhouse',
  'Antichess',
  'Atomic',
  'Horde',
  'Racing Kings',
]

type PanelType = 'find' | 'invite' | 'link' | 'settings' | null

function PlayFriendPage() {
  const navigate = useNavigate()

  const [activePanel, setActivePanel] = useState<PanelType>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedTime, setSelectedTime] = useState('10+0 Rapid')
  const [selectedVariant, setSelectedVariant] = useState('Standard')
  const [inviteEmail, setInviteEmail] = useState('')
  const [copied, setCopied] = useState(false)
  const [notice, setNotice] = useState('')
  const [challengedFriend, setChallengedFriend] = useState<string | null>(null)
  const [passAndPlayOpen, setPassAndPlayOpen] = useState(false)

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

  const handleChallenge = (friend: Friend) => {
    if (friend.status !== 'Online') return

    setChallengedFriend(friend.name)
    setNotice(`Challenge preview prepared for ${friend.name}.`)
  }

  const handleCopyLink = async () => {
    const demoLink = `${window.location.origin}/play/friend?challenge=CCC-DEMO`

    try {
      await navigator.clipboard.writeText(demoLink)
      setCopied(true)
      setNotice('Demo challenge link copied.')
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setNotice('Copy is unavailable in this browser. You can copy the link manually.')
    }
  }

  const handleInvite = () => {
    if (!inviteEmail.trim()) {
      setNotice('Enter a name or email address first.')
      return
    }

    setNotice(`Invitation preview prepared for ${inviteEmail}.`)
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
            <span className="cx-friend-eyebrow">CHECKMAÎTRÉX CHESS CLUB</span>
            <h2>Challenge your friends.</h2>
            <p>Play a friendly match or invite someone to the board.</p>
          </div>
          <div className="cx-friend-intro-icon">
            <Swords size={30} />
          </div>
        </section>

        <section className="cx-friend-action-grid">
          <button
            type="button"
            className={`cx-friend-action-card ${activePanel === 'find' ? 'active' : ''}`}
            onClick={() => openPanel('find')}
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
            className={`cx-friend-action-card ${activePanel === 'link' ? 'active' : ''}`}
            onClick={() => openPanel('link')}
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

        {activePanel && (
          <section className="cx-friend-panel">
            <div className="cx-friend-panel-heading">
              <div>
                <span className="cx-friend-eyebrow">QUICK ACTION</span>
                <h3>
                  {activePanel === 'find' && 'Find a Friend'}
                  {activePanel === 'invite' && 'Invite a Friend'}
                  {activePanel === 'link' && 'Send Challenge Link'}
                  {activePanel === 'settings' && 'Game Settings'}
                </h3>
              </div>

              <button
                type="button"
                className="cx-friend-close"
                onClick={() => setActivePanel(null)}
                aria-label="Close panel"
              >
                <X size={18} />
              </button>
            </div>

            {activePanel === 'find' && (
              <div className="cx-friend-panel-body">
                <label className="cx-friend-field-label" htmlFor="friend-search">
                  Search by player name or username
                </label>
                <div className="cx-friend-search-box">
                  <Search size={18} />
                  <input
                    id="friend-search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search players..."
                  />
                </div>
              </div>
            )}

            {activePanel === 'invite' && (
              <div className="cx-friend-panel-body">
                <label className="cx-friend-field-label" htmlFor="friend-invite">
                  Friend's name or email
                </label>
                <div className="cx-friend-inline-form">
                  <input
                    id="friend-invite"
                    value={inviteEmail}
                    onChange={(event) => setInviteEmail(event.target.value)}
                    placeholder="Enter name or email address"
                  />
                  <button type="button" onClick={handleInvite}>
                    <Mail size={16} />
                    Prepare Invite
                  </button>
                </div>
                <p className="cx-friend-helper">
                  Invitation sending will be connected when the backend is added.
                </p>
              </div>
            )}

            {activePanel === 'link' && (
              <div className="cx-friend-panel-body">
                <p className="cx-friend-panel-description">
                  Create a shareable challenge link for a friend.
                </p>
                <div className="cx-friend-link-preview">
                  <span>checkmaitrexchessclub.com/play/friend/...</span>
                  <button type="button" onClick={handleCopyLink}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied' : 'Copy Link'}
                  </button>
                </div>
                <p className="cx-friend-helper">
                  This is a frontend demo link. Real challenge links require backend support.
                </p>
              </div>
            )}

            {activePanel === 'settings' && (
              <div className="cx-friend-panel-body cx-friend-settings">
                <div className="cx-friend-setting-field">
                  <label htmlFor="friend-time-control">Time Control</label>
                  <div className="cx-friend-select-wrap">
                    <Clock3 size={17} />
                    <select
                      id="friend-time-control"
                      value={selectedTime}
                      onChange={(event) => setSelectedTime(event.target.value)}
                    >
                      {timeControls.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} />
                  </div>
                </div>

                <div className="cx-friend-setting-field">
                  <label htmlFor="friend-variant">Game Variant</label>
                  <div className="cx-friend-select-wrap">
                    <Gamepad2 size={17} />
                    <select
                      id="friend-variant"
                      value={selectedVariant}
                      onChange={(event) => setSelectedVariant(event.target.value)}
                    >
                      {variants.map((variant) => (
                        <option key={variant} value={variant}>{variant}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} />
                  </div>
                </div>

                <div className="cx-friend-setting-summary">
                  <span>Selected match</span>
                  <strong>{selectedTime}</strong>
                  <strong>{selectedVariant}</strong>
                </div>
              </div>
            )}

            {notice && (
              <div className="cx-friend-notice" role="status">
                {notice}
              </div>
            )}
          </section>
        )}

        <button
          type="button"
          className="cx-friend-pass-button"
          onClick={() => {
            setPassAndPlayOpen((current) => !current)
            setNotice('')
          }}
        >
          <Users size={20} />
          <span>Pass &amp; Play</span>
          <small>Play locally on one device</small>
        </button>

        {passAndPlayOpen && (
          <section className="cx-friend-pass-panel">
            <div className="cx-friend-panel-heading">
              <div>
                <span className="cx-friend-eyebrow">LOCAL GAME</span>
                <h3>Pass &amp; Play</h3>
              </div>
              <button
                type="button"
                className="cx-friend-close"
                onClick={() => setPassAndPlayOpen(false)}
                aria-label="Close Pass and Play"
              >
                <X size={18} />
              </button>
            </div>
            <p>
              Two players can take turns using the same device. The chessboard
              and local game controls will be added in a later frontend step.
            </p>
            <div className="cx-friend-pass-players">
              <span>Player 1 <strong>White</strong></span>
              <span>Player 2 <strong>Black</strong></span>
            </div>
            <span className="cx-friend-demo-label">FRONTEND PREVIEW</span>
          </section>
        )}

        <section className="cx-friend-list-section">
          <div className="cx-friend-list-heading">
            <div>
              <span className="cx-friend-eyebrow">YOUR COMMUNITY</span>
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
