
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MaitronXAssistant from '../components/MaitronXAssistant'
import {
  ChevronRight,
  Bell,
  ShoppingBag,
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
  { name: 'Bullet', rating: '—' },
  { name: 'Blitz', rating: '—' },
  { name: 'Rapid', rating: '—' },
  { name: 'Classical', rating: '—' },
  { name: 'Daily', rating: '—' },
  { name: 'All Stats', rating: '—' },
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

function RatingIcon({ name }: { name: string }) {
  const common = {
    width: 25,
    height: 25,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  }

  switch (name) {
    
    case 'Bullet':
      return (
        <svg {...common}>
          <path
            d="M4 17.5 15.2 6.3c1.5-1.5 3.5-2 5.3-1.5.5 1.8 0 3.8-1.5 5.3L7.8 21.3 4 17.5Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <path d="m7.8 13.7 2.5 2.5" stroke="#171717" strokeWidth="1.3" />
        </svg>
      )


    case 'Blitz':
      return (
        <svg {...common}>
          <path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" />
        </svg>
      )

    case 'Rapid':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l4 2" />
          <path d="M9 2h6" />
        </svg>
      )

    
    case 'Classical':
      return (
        <svg {...common}>
          <path d="M7 7V4.5h3V7m4 0V4.5h3V7" />
          <rect x="3" y="7" width="18" height="14" rx="2.5" />
          <path d="M12 7v14" />
          <rect x="5.5" y="10" width="4.5" height="4" rx=".5" />
          <rect x="14" y="10" width="4.5" height="4" rx=".5" />
          <path d="M6.5 17h3m5 0h3" />
        </svg>
      )


    case 'Daily':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
      )

    case 'All Stats':
      return (
        <svg {...common}>
          <path d="M4 20V10m5 10V4m5 16v-7m5 7V7" />
          <path d="M2 20h20" />
        </svg>
      )

    default:
      return null
  }
}


  function HomePage() {
  const navigate = useNavigate() 
  const featureTrackRef = useRef<HTMLDivElement>(null)
  const [featureIndex, setFeatureIndex] = useState(0)
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
          <button
  className="cx-avatar"
  aria-label="Player profile"
  onClick={() => navigate('/profile')}
>
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
       <main>
  <section className="cx-section">
    <MaitronXAssistant homepageMode />

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
{feature.title === 'Puzzles' ? (
  <img
    src="/icons/puzzles/puzzle.png"
    alt="Puzzles"
    width={23}
    height={23}
    className="cx-feature-image-icon"
  />
) : (
  <Icon size={23} />
)}          
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
              <span className="cx-overline">YOUR CHESS PERFORMANCE</span>
              <h2>Ratings</h2>
            </div>
            <button className="cx-text-link">
              View all <ChevronRight size={15} />
            </button>
          </div>

          <div className="cx-rating-track">
            {ratings.map((rating) => (
              <article className="cx-rating-card" key={rating.name}>
                <div className="cx-rating-icon">
                  <RatingIcon name={rating.name} />
                </div>

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
              <span className="cx-overline">YOUR RECENT ACTIVITY</span>
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
          © {new Date().getFullYear()} CheckmaîtréX • All rights reserved.
          <span>Calculate. Conquer. Checkmate.</span>
        </footer>
      </main>
    </div>
  )
}

export default HomePage
