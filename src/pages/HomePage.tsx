
import { useState } from 'react'
import {
  Bell,
  Search,
  ChevronRight,
  ChevronLeft,
  Puzzle,
  Bot,
  GraduationCap,
  BookOpen,
  Flame,
  Trophy,
  Users,
  Clock3,
  Crown,
  Swords,
  X,
  CircleUserRound,
  MoreHorizontal,
} from 'lucide-react'

const features = [
  {
    title: 'Puzzles',
    description: 'Improve your tactical vision',
    icon: Puzzle,
    label: 'TRAINING',
    color: 'gold',
  },
  {
    title: 'Play Bots',
    description: 'Challenge chess personalities',
    icon: Bot,
    label: 'PLAY',
    color: 'blue',
  },
  {
    title: 'Play Coach',
    description: 'Practice with your chess coach',
    icon: GraduationCap,
    label: 'PRACTICE',
    color: 'purple',
  },
  {
    title: 'Learn',
    description: 'Explore chess lessons',
    icon: BookOpen,
    label: 'EDUCATION',
    color: 'green',
  },
  {
    title: 'Daily Puzzle',
    description: 'A new challenge every day',
    icon: Crown,
    label: 'DAILY',
    color: 'orange',
  },
]

const ratings = [
  { name: 'Bullet', rating: '—', icon: '⚡' },
  { name: 'Blitz', rating: '—', icon: '♟' },
  { name: 'Rapid', rating: '—', icon: '◷' },
  { name: 'Classical', rating: '—', icon: '♜' },
  { name: 'Chess960', rating: '—', icon: '♞' },
]

const friends = [
  { name: 'PlayerOne', username: '@playerone', status: 'online', rating: 1842 },
  { name: 'KnightMaster', username: '@knightmaster', status: 'online', rating: 1720 },
  { name: 'ChessFan', username: '@chessfan', status: 'online', rating: 1650 },
  { name: 'QueenSide', username: '@queenside', status: 'offline', rating: 1904 },
  { name: 'EndgamePro', username: '@endgamepro', status: 'offline', rating: 2012 },
]

const games = [
  {
    opponent: 'Opponent One',
    result: 'Victory',
    color: 'win',
    mode: 'Blitz',
    time: '5 + 0',
    date: 'Today',
    rating: '+12',
  },
  {
    opponent: 'Opponent Two',
    result: 'Defeat',
    color: 'loss',
    mode: 'Rapid',
    time: '10 + 0',
    date: 'Yesterday',
    rating: '-8',
  },
  {
    opponent: 'Opponent Three',
    result: 'Draw',
    color: 'draw',
    mode: 'Bullet',
    time: '1 + 0',
    date: 'Yesterday',
    rating: '0',
  },
]

function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [featureIndex, setFeatureIndex] = useState(0)

  const scrollFeatures = (direction: number) => {
    setFeatureIndex((current) =>
      Math.max(0, Math.min(features.length - 1, current + direction)),
    )
  }

  const visibleFriends = friends
    .filter((friend) => friend.status === 'online')
    .concat(friends.filter((friend) => friend.status !== 'online'))

  return (
    <div className="cx-home">
      <header className="cx-topbar">
        <div className="cx-user-area">
          <button className="cx-avatar" aria-label="Profile">
            <CircleUserRound size={25} />
          </button>

          <div className="cx-user-details">
            {/* Demo data: leave flair empty if user has no flair */}
            <div className="cx-user-flair">CCC MEMBER</div>
            <div className="cx-user-streak">
              <Flame size={15} />
              <strong>100</strong>
              <span>day streak</span>
            </div>
          </div>
        </div>

        <div className="cx-top-actions">
          <button
            className="cx-icon-button"
            aria-label="Search"
            onClick={() => {
              setSearchOpen(!searchOpen)
              setNotificationsOpen(false)
            }}
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          <button
            className="cx-icon-button"
            aria-label="Notifications"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen)
              setSearchOpen(false)
            }}
          >
            <Bell size={20} />
            <span className="cx-notification-dot" />
          </button>
        </div>
      </header>

      {searchOpen && (
        <div className="cx-search-panel">
          <Search size={18} />
          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search players, usernames or CCC ID..."
            autoFocus
          />
          {searchText && (
            <button onClick={() => setSearchText('')}>
              <X size={16} />
            </button>
          )}
        </div>
      )}

      {notificationsOpen && (
        <div className="cx-notification-panel">
          <div className="cx-panel-heading">
            <strong>Notifications</strong>
            <span>Demo</span>
          </div>
          <p>You are all caught up.</p>
        </div>
      )}

      <main className="cx-main-content">
        <section className="cx-feature-section">
          <div className="cx-section-heading">
            <div>
              <span className="cx-overline">YOUR CHESS EXPERIENCE</span>
              <h1>Welcome back.</h1>
            </div>

            <div className="cx-carousel-controls">
              <button
                aria-label="Previous"
                onClick={() => scrollFeatures(-1)}
                disabled={featureIndex === 0}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                aria-label="Next"
                onClick={() => scrollFeatures(1)}
                disabled={featureIndex === features.length - 1}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="cx-feature-track">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <article
                  className={`cx-feature-card cx-${feature.color}`}
                  key={feature.title}
                >
                  <div className="cx-feature-top">
                    <span>{feature.label}</span>
                    <Icon size={23} />
                  </div>

                  <div className="cx-feature-bottom">
                    <h2>{feature.title}</h2>
                    <p>{feature.description}</p>
                    <span className="cx-feature-arrow">
                      Explore <ChevronRight size={15} />
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="cx-section">
          <div className="cx-section-heading">
            <div>
              <span className="cx-overline">PERFORMANCE</span>
              <h2>CCC Ratings</h2>
            </div>
            <button className="cx-text-link">
              View all <ChevronRight size={15} />
            </button>
          </div>

          <div className="cx-rating-grid">
            {ratings.map((rating) => (
              <article className="cx-rating-card" key={rating.name}>
                <span className="cx-rating-icon">{rating.icon}</span>
                <span className="cx-rating-name">{rating.name}</span>
                <strong>{rating.rating}</strong>
                <span className="cx-rating-label">Rating</span>
              </article>
            ))}
          </div>
        </section>

        <section className="cx-section">
          <div className="cx-section-heading">
            <div>
              <span className="cx-overline">YOUR NETWORK</span>
              <h2>Friends</h2>
            </div>
            <button className="cx-text-link">
              View all <ChevronRight size={15} />
            </button>
          </div>

          <div className="cx-friends-track">
            {visibleFriends.map((friend) => (
              <article className="cx-friend-card" key={friend.username}>
                <div className="cx-friend-avatar">
                  <CircleUserRound size={31} />
                  <span
                    className={`cx-online-indicator ${
                      friend.status === 'online' ? 'is-online' : ''
                    }`}
                  />
                </div>

                <strong>{friend.name}</strong>
                <span className="cx-friend-username">
                  {friend.username}
                </span>
                <span className="cx-friend-rating">
                  {friend.rating} <span>Rating</span>
                </span>
                <span
                  className={`cx-friend-status ${
                    friend.status === 'online' ? 'online' : ''
                  }`}
                >
                  {friend.status}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="cx-section cx-history-section">
          <div className="cx-section-heading">
            <div>
              <span className="cx-overline">RECENT ACTIVITY</span>
              <h2>Game History</h2>
            </div>
            <button className="cx-text-link">
              View all games <ChevronRight size={15} />
            </button>
          </div>

          <div className="cx-history-list">
            {games.map((game, index) => (
              <article className="cx-game-row" key={`${game.opponent}-${index}`}>
                <div className={`cx-game-result ${game.color}`}>
                  {game.result === 'Victory' ? (
                    <Trophy size={18} />
                  ) : (
                    <Swords size={18} />
                  )}
                </div>

                <div className="cx-game-opponent">
                  <strong>{game.opponent}</strong>
                  <span>{game.mode} · {game.time}</span>
                </div>

                <div className="cx-game-date">
                  <Clock3 size={13} />
                  {game.date}
                </div>

                <div className={`cx-game-rating ${game.color}`}>
                  {game.rating}
                </div>

                <ChevronRight className="cx-game-arrow" size={17} />
              </article>
            ))}
          </div>
        </section>

        <footer className="cx-home-footer">
          <span>CHECKMAÎTRÉX CHESS CLUB</span>
          <span>Official Chess Platform</span>
        </footer>
      </main>
    </div>
  )
}

export default HomePage
