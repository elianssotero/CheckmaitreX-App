
import { useEffect, useRef, useState } from 'react'
import {
  ChevronRight,
  Bell,
  Search,
  Puzzle,
  Bot,
  GraduationCap,
  BookOpen,
  Trophy,
  Clock3,
  Crown,
  Swords,
  CircleUserRound,
} from 'lucide-react'

const accountName = 'Player Name'
const playerStreak = 1
const playerFlair: string | null = null

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
  { name: 'Bullet', rating: '—', icon: '/icons/ratings/bullet.png' },
  { name: 'Blitz', rating: '—', icon: '/icons/blitz.png' },
  { name: 'Rapid', rating: '—', icon: '/icons/rapid.png' },
  { name: 'Classical', rating: '—', icon: '/icons/ratings/classical.png' },
  { name: 'Daily', rating: '—', icon: '/icons/ratings/daily.jpg' },
  { name: 'All Stats', rating: '—', icon: '/icons/ratings/all-stats.png' },
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

function getGreeting() {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12) return 'Good Morning'
  if (hour >= 12 && hour < 18) return 'Good Afternoon'
  return 'Good Evening'
}

function HomePage() {
  const [greeting, setGreeting] = useState(getGreeting)
  const [featureIndex, setFeatureIndex] = useState(0)
  const featureTrackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateGreeting = () => setGreeting(getGreeting())

    const interval = window.setInterval(updateGreeting, 60_000)

    return () => window.clearInterval(interval)
  }, [])

  const updateFeatureIndex = () => {
    const track = featureTrackRef.current
    if (!track) return

    const cards = Array.from(track.children) as HTMLElement[]
    if (!cards.length) return

    let closestIndex = 0
    let smallestDistance = Infinity

    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - track.scrollLeft - track.offsetLeft)

      if (distance < smallestDistance) {
        smallestDistance = distance
        closestIndex = index
      }
    })

    setFeatureIndex(closestIndex)
  }

  const goToFeature = (index: number) => {
    const track = featureTrackRef.current
    const card = track?.children[index] as HTMLElement | undefined

    if (!track || !card) return

    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: 'smooth',
    })

    setFeatureIndex(index)
  }

  const visibleFriends = [
    ...friends.filter((friend) => friend.status === 'online'),
    ...friends.filter((friend) => friend.status !== 'online'),
  ]

  return (
    <div className="cx-home">
      <header className="cx-topbar">
        <div className="cx-user-area">
          <button className="cx-avatar" aria-label="Player profile">
            <CircleUserRound size={25} />
          </button>

          <div className="cx-user-details">
            <div className="cx-player-name-line">
              <strong className="cx-player-name">{accountName}</strong>

              {playerFlair && (
                <span className="cx-player-flair">{playerFlair}</span>
              )}

              <span className="cx-user-streak">
                🔥 <strong>{playerStreak}</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="cx-top-actions">
          <button className="cx-icon-button" aria-label="Notifications">
            <Bell size={19} />
          </button>

          <button className="cx-icon-button" aria-label="Search">
            <Search size={19} />
          </button>
        </div>
      </header>
    
    <main className="cx-main-content">
        <section className="cx-feature-section">
          <div className="cx-section-heading cx-welcome-heading">
            <div>
              <span className="cx-overline">YOUR CHESS EXPERIENCE</span>
              <h1>{greeting}</h1>
              <p className="cx-welcome-account">
                Welcome Back, <strong>{accountName}!</strong>
              </p>
            </div>
          </div>

          <div
            className="cx-feature-track"
            ref={featureTrackRef}
            onScroll={updateFeatureIndex}
          >
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

          <div className="cx-carousel-indicators" aria-label="Feature slides">
            {features.map((feature, index) => (
              <button
                key={feature.title}
                className={`cx-carousel-dot ${featureIndex === index ? 'active' : ''}`}
                aria-label={`Go to ${feature.title}`}
                aria-current={featureIndex === index ? 'true' : undefined}
                onClick={() => goToFeature(index)}
              />
            ))}
          </div>
        </section>

        <section className="cx-section">
          <div className="cx-section-heading">
            <div>
              <h2>Your Ratings</h2>
            </div>
            <button className="cx-text-link">
              View all <ChevronRight size={15} />
            </button>
          </div>

          <div className="cx-rating-track">
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
                <span className="cx-friend-username">{friend.username}</span>
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
              View All Games <ChevronRight size={15} />
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
          <span>CheckmaîtréX • All rights reserved.</span>
          <span>Calculate. Conquer. Checkmate.</span>
        </footer>
      </main>
    </div>
  )
}

export default HomePage
