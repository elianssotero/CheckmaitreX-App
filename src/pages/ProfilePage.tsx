import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  CircleUserRound,
  Crown,
  Gamepad2,
  Gem, 
  MapPin,
  Pencil,
  QrCode,
  Share2,
  Sparkles,
  Star,
  Trophy,
  UserPlus,
  X,
  ChartNoAxesCombined,
  Eye,
  Lock,
  WifiOff,
} from 'lucide-react'
import { playerProfile } from '../data/playerProfile'
import { alpha3 } from './ProfileSelectionPages'
import StreakBadge from '../components/StreakBadge'
import './ProfilePage.css'

type ProfileData = {
  accountName: string
  username: string
  firstName: string
  lastName: string
  country: string
  location: string
  bio: string
  profilePhoto: string
  flair: string
  borders: string
  coverPhoto: string
}

const defaultProfile: ProfileData = {
  accountName: playerProfile.accountName,
  username: '@playername',
  firstName: 'Player',
  lastName: 'Name',
  country: 'Philippines',
  location: 'Philippines',
  bio: 'Add your bio here.',
  profilePhoto: '',
  flair: playerProfile.flair || '',
  borders: 'Default Gold',
  coverPhoto: '',
}

function readProfile(): ProfileData {
  try {
    const saved = localStorage.getItem('cx-profile-preview')
    return saved
      ? { ...defaultProfile, ...JSON.parse(saved) }
      : defaultProfile
  } catch {
    return defaultProfile
  }
}


function calculateProfileCompletion(profile: ProfileData): number {
  const country = profile.country.trim()
  const countryName = /^[A-Z]{2}$/i.test(country)
    ? new Intl.DisplayNames(['en'], { type: 'region' }).of(country.toUpperCase()) || country
    : country

  const location = profile.location.trim()

  const completedItems = [
    // 1. Profile Picture
    Boolean(profile.profilePhoto.trim()),

    // 2. Cover Photo
    Boolean(profile.coverPhoto.trim()),

    // 3. Bio
    Boolean(
      profile.bio.trim() &&
      profile.bio.trim().toLowerCase() !== 'add your bio here.'
    ),

    // 4. Username
    Boolean(
      profile.username.trim() &&
      profile.username.trim().replace(/^@/, '').toLowerCase() !== 'playername'
    ),

    // 5. First Name
    Boolean(
      profile.firstName.trim() &&
      profile.firstName.trim().toLowerCase() !== 'player'
    ),

    // 6. Last Name
    Boolean(
      profile.lastName.trim() &&
      profile.lastName.trim().toLowerCase() !== 'name'
    ),

    // 7. Country
    Boolean(country),

    // 8. Location
    Boolean(
      location &&
      location.toLowerCase() !== 'philippines' &&
      location.toLowerCase() !== countryName.toLowerCase()
    ),
  ]

  const completedCount = completedItems.filter(Boolean).length

  return Math.round((completedCount / completedItems.length) * 100)
}


function countryFlag(country: string) {
  const normalized = country.trim().toUpperCase()
  const displayNames = new Intl.DisplayNames(
    ['en'],
    { type: 'region' }
  )

  const code = /^[A-Z]{2}$/.test(normalized)
    ? normalized
    : Object.keys(alpha3).find(
        (key) =>
          alpha3[key] === normalized ||
          displayNames.of(key)?.toUpperCase() === normalized
      ) || ''

  if (!/^[A-Z]{2}$/.test(code)) return ''

  return String.fromCodePoint(
    ...code.split('').map(
      (letter) => 127397 + letter.charCodeAt(0)
    )
  )
}

const ratings = [
  { name: 'Bullet', rating: '—', change: 'No rating yet' },
  { name: 'Blitz', rating: '—', change: 'No rating yet' },
  { name: 'Rapid', rating: '—', change: 'No rating yet' },
  { name: 'Classical', rating: '—', change: 'No rating yet' },
  { name: 'Daily', rating: '—', change: 'No rating yet' },
]

const games = [
  { opponent: 'Opponent One', mode: 'Blitz', result: 'Victory', rating: '+12', date: 'Sample game' },
  { opponent: 'Opponent Two', mode: 'Rapid', result: 'Defeat', rating: '−8', date: 'Sample game' },
  { opponent: 'Opponent Three', mode: 'Bullet', result: 'Draw', rating: '0', date: 'Sample game' },
  { opponent: 'Opponent Four', mode: 'Classical', result: 'Victory', rating: '+10', date: 'Sample game' },
  { opponent: 'Opponent Five', mode: 'Blitz', result: 'Victory', rating: '+8', date: 'Sample game' },
]


const friends = [
  { name: 'PlayerOne', username: 'playerone', status: 'online', lastActive: '' },
  { name: 'KnightMaster', username: 'knightmaster', status: 'playing', lastActive: '' },
  { name: 'ChessFan', username: 'chessfan', status: 'offline', lastActive: '2h' },
  { name: 'QueenSide', username: 'queenside', status: 'queue', lastActive: '' },
  { name: 'EndgamePro', username: 'endgamepro', status: 'online', lastActive: '' },
]


const achievements = [
  { name: 'First Victory', description: 'Win your first chess game', rarity: 'Common', category: 'Games', achieved: true, date: 'Sample date', unlock: 'Win your first chess game' },
  { name: 'Tactical Mind', description: 'Complete a chess puzzle', rarity: 'Rare', category: 'Puzzles', achieved: true, date: 'Sample date', unlock: 'Complete a chess puzzle' },
  { name: 'Consistent Player', description: 'Build your playing streak', rarity: 'Epic', category: 'Streaks', achieved: true, date: 'Sample date', unlock: 'Build a playing streak' },
  { name: 'Chess Explorer', description: 'Explore different chess modes', rarity: 'Rare', category: 'Games', achieved: true, date: 'Sample date', unlock: 'Play different chess modes' },
  { name: 'Lesson Graduate', description: 'Complete a chess lesson', rarity: 'Common', category: 'Lessons', achieved: false, date: '', unlock: 'Complete your first chess lesson' },
  { name: 'Puzzle Master', description: 'Solve multiple chess puzzles', rarity: 'Epic', category: 'Puzzles', achieved: false, date: '', unlock: 'Solve 100 chess puzzles' },
  { name: 'Tournament Debut', description: 'Join your first tournament', rarity: 'Rare', category: 'Tournaments', achieved: false, date: '', unlock: 'Join a chess tournament' },
  { name: 'Social Player', description: 'Connect with other players', rarity: 'Common', category: 'Social', achieved: false, date: '', unlock: 'Add your first friend' },
  { name: 'Winning Streak', description: 'Win consecutive games', rarity: 'Epic', category: 'Games', achieved: false, date: '', unlock: 'Win 5 games in a row' },
  { name: 'Dedicated Learner', description: 'Complete multiple lessons', rarity: 'Rare', category: 'Lessons', achieved: false, date: '', unlock: 'Complete 10 chess lessons' },
  { name: 'Daily Champion', description: 'Maintain a long playing streak', rarity: 'Epic', category: 'Streaks', achieved: false, date: '', unlock: 'Reach a 30-day streak' },
  { name: 'Tournament Champion', description: 'Win a tournament', rarity: 'Legendary', category: 'Tournaments', achieved: false, date: '', unlock: 'Win a chess tournament' },
]

const achievementCategories = ['All', 'Games', 'Puzzles', 'Lessons', 'Streaks', 'Tournaments', 'Social']

const tabs = ['Overview', 'Games', 'Achievements', 'Activity']
// Frontend preview only. Backend presence integration will come later.
type ProfilePresence = 'online' | 'queue' | 'playing' | 'offline'

const profilePresence: ProfilePresence = 'online'
const profileLastActive = '15m ago'

function PageHeader({ title }: { title: string }) {
  const navigate = useNavigate()

  return (
    <header className="cx-profile-page-header">
      <button
        type="button"
        className="cx-profile-back"
        aria-label="Go back"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={21} />
      </button>
      <h1>{title}</h1>
      <span className="cx-profile-header-spacer" />
    </header>
  )
}

function QRPreview({ onClose }: { onClose: () => void }) {
  const cells = Array.from({ length: 225 }, (_, i) => {
    const row = Math.floor(i / 15)
    const col = i % 15
    const finder =
      (row < 5 && col < 5) ||
      (row < 5 && col > 9) ||
      (row > 9 && col < 5)

    if (finder) {
      const r = row < 5 ? row : row - 10
      const c = col < 5 ? col : col - 10
      return r === 0 || r === 4 || c === 0 || c === 4 ||
        (r >= 2 && r <= 2 && c >= 2 && c <= 2)
    }

    return ((row * 7 + col * 11 + row * col) % 5) < 2
  })

  return (
    <div className="cx-profile-modal-backdrop" onClick={onClose}>
      <section
        className="cx-profile-qr-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="cx-profile-modal-close" onClick={onClose} type="button" aria-label="Close">
          <X size={19} />
        </button>
        <div className="cx-profile-qr-heading">
          <QrCode size={23} />
          <h2>Player QR Code</h2>
        </div>
        <div className="cx-profile-qr-sample" aria-label="Decorative sample QR code">
          {cells.map((active, index) => (
            <span className={active ? 'active' : ''} key={index} />
          ))}
        </div>
        <strong>{readProfile().username}</strong>
        <p>Sample profile QR preview</p>
        <span className="cx-profile-preview-note">Not scannable yet</span>
        <button className="cx-profile-primary-button" type="button" onClick={() => onClose()}>
          Close
        </button>
      </section>
    </div>
  )
}

function ProfilePage() {
  const navigate = useNavigate()
  const [profile] = useState<ProfileData>(readProfile)
  const [activeTab, setActiveTab] = useState('Overview')
  const [showQR, setShowQR] = useState(false)

  const profileCompletion = calculateProfileCompletion(profile)
  const subscriptionTier = 'Standard'
  const subscriptionSince = 'November 2026'
  const verifiedTitle =
    playerProfile.chessTitle?.verificationStatus === 'verified'
      ? playerProfile.chessTitle.value
      : null

  const totalGames = games.length
  const wins = games.filter((game) => game.result === 'Victory').length
  const losses = games.filter((game) => game.result === 'Defeat').length
  const draws = games.filter((game) => game.result === 'Draw').length

  const shareProfile = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${profile.accountName} - CheckmaîtréX`,
          text: 'View my CheckmaîtréX player profile.',
          url,
        })
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url)
        alert('Profile link copied.')
      }
    } catch {
      // Share cancelled or unavailable.
    }
  }

  return (
    <div className="cx-profile-page">
      <div className="cx-profile-cover">
        {profile.coverPhoto ? (
          <img src={profile.coverPhoto} alt="Profile cover" />
        ) : (
          <div className="cx-profile-cover-placeholder" />
        )}
        <button
          className="cx-profile-edit-button"
          type="button"
          aria-label="Edit profile"
          onClick={() => navigate('/profile/edit')}
        >
          <Pencil size={18} />
        </button>
      </div>

      <main className="cx-profile-content">
        <section className="cx-profile-identity">
          <div className="cx-profile-identity-top">
            <div className="cx-profile-avatar-column">
              <div
                className="cx-profile-photo"
                data-border={profile.borders || 'Default Gold'}
              >
                {profile.profilePhoto ? (
                  <img src={profile.profilePhoto} alt="Profile" />
                ) : (
                  <CircleUserRound size={54} />
                )}
              </div>
            </div>

            <div className="cx-profile-name-area">
              <h1>
                {verifiedTitle && <span className="cx-profile-title">{verifiedTitle}</span>}
                <span className="cx-profile-account-name">{profile.accountName}</span>
                {countryFlag(profile.country) && (
  <span className="cx-profile-country-flag">
    {countryFlag(profile.country)}
  </span>
)}
              </h1>
              <span>{profile.username}</span>
<div className="cx-profile-location-status">
  {profile.location && (
    <span className="cx-profile-location">
      <MapPin size={12} /> {profile.location}
    </span>
  )}

  <div
    className={`cx-profile-presence cx-profile-presence-${profilePresence}`}
    aria-label={
      profilePresence === 'offline'
        ? `Offline · Active ${profileLastActive}`
        : profilePresence === 'queue'
          ? 'Queue'
          : profilePresence === 'playing'
            ? 'Playing'
            : 'Online'
    }
  >
    {profilePresence === 'offline' ? (
      <>
        <WifiOff size={12} />
        <span>Offline</span>
        <span className="cx-profile-presence-separator">•</span>
        <span>Active {profileLastActive}</span>
      </>
    ) : (
      <>
        <span className="cx-profile-presence-dot" />
        <span>
          {profilePresence === 'queue'
            ? 'Queue'
            : profilePresence === 'playing'
              ? 'Playing'
              : 'Online'}
        </span>
      </>
    )}
  </div>
</div>

              {profile.flair && (
                <span className="cx-profile-flair-label">
                  <Sparkles size={13} /> {profile.flair}
                </span>
              )}
            </div>
          </div>

          <p className="cx-profile-bio">{profile.bio || 'No bio added yet.'}</p>


<div className="cx-profile-meta-row">
  <div className="cx-profile-meta-item">
    <CalendarDays size={16} />
    <div>
      <strong>November 2026</strong>
      <span>Joined</span>
    </div>
  </div>

  <div className="cx-profile-meta-item">
    <CircleUserRound size={16} />
    <div>
      <strong>CMX-P-000001</strong>
      <span>Player ID</span>
    </div>
  </div>

  <div className="cx-profile-meta-item">
    <Crown size={16} />
    <div>
      <strong>Not available yet</strong>
      <span>Member Since</span>
    </div>
  </div>

  <div className="cx-profile-meta-item">
    <Gem size={16} />
    <div>
      <strong>{subscriptionSince}</strong>
      <span>{`CMX ${subscriptionTier} Since`}</span>
    </div>
  </div>
</div>
</section>

<div className="cx-profile-stat-groups">
  <div className="cx-profile-stat-group">
    <h3>Social Statistics</h3>
    <div className="cx-profile-stat-track">
      {[
        ['—', 'Friends'],
        ['—', 'Profile Views'],
        ['—', 'Followers'],
        ['—', 'Likes'],
        ['—', 'Following'],
        ['—', 'Clubs Joined'],
        ['—', 'Posts'],
        ['—', 'Comments'],
        ['—', 'Shares'],
        ['—', 'Visitors'],
      ].map(([value, label]) => (
        <article className="cx-profile-stat" key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </article>
      ))}
    </div>
  </div>

  <div className="cx-profile-stat-group">
    <h3>Chess Statistics</h3>
    <div className="cx-profile-stat-track">
      {[
        ['—', 'Total Games'],
        ['—', 'Wins'],
        ['—', 'Losses'],
        ['—', 'Draws'],
        ['—', 'Win Rate'],
        ['—', 'Puzzles Solved'],
        ['—', 'Trophies'],
        ['—', 'Achievements'],
        ['—', 'Lessons Completed'],
        ['—', 'Tournaments Played'],
      ].map(([value, label]) => (
        <article className="cx-profile-stat" key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </article>
      ))}
    </div>
  </div>
</div>


        <section className="cx-profile-actions">
          <button className="cx-profile-add-friend" type="button" onClick={() => navigate('/profile/friends')}>
            <UserPlus size={17} /> Add Friend
          </button>
          <button className="cx-profile-qr-button" type="button" aria-label="Show QR code" onClick={() => setShowQR(true)}>
            <QrCode size={21} />
          </button>
          <button className="cx-profile-qr-button" type="button" aria-label="Share profile" onClick={shareProfile}>
            <Share2 size={19} />
          </button>
        </section>

        <section className="cx-profile-highlight-row">
          <button className="cx-profile-highlight" type="button" onClick={() => navigate('/streak')}>
<StreakBadge days={playerProfile.streak} size="compact" />
            <div>
              <strong>{playerProfile.streak} Day Streak</strong>
              <span>Current streak</span>
            </div>
          </button>

          <article className="cx-profile-highlight">
            <div className="cx-profile-highlight-icon">
              <Crown size={21} />
            </div>
            <div>
              <strong>CCC Member</strong>
              <span>Membership</span>
            </div>
          </article>

          <article className="cx-profile-highlight">
            <div className="cx-profile-highlight-icon">
              <Gem size={21} />
            </div>
            <div>
              <strong>{`CMX ${subscriptionTier}`}</strong>
              <span>Subscription</span>
            </div>
          </article>
        </section>

        {profileCompletion < 100 && (
          <section className="cx-profile-completion">
            <div className="cx-profile-section-heading">
              <h2>Profile Completion</h2>
              <strong>{profileCompletion}%</strong>
            </div>

            <div className="cx-profile-progress-track">
              <span
                style={{ width: `${profileCompletion}%` }}
              />
            </div>

            <p>
              Complete your profile to introduce yourself
              to the CCC community.
            </p>

            <button
              type="button"
              onClick={() => navigate('/profile/edit')}
            >
              Complete Profile <ChevronRight size={15} />
            </button>
          </section>
        )}

        <nav className="cx-profile-tabs" aria-label="Profile sections">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        {activeTab === 'Overview' && (
          <>
            <section className="cx-profile-section">
              <div className="cx-profile-section-heading">
                <h2>Ratings</h2>
                <button className="cx-profile-view-all" onClick={() => navigate('/profile/ratings')} type="button">View All <ChevronRight size={15} /></button>
              </div>
              <div className="cx-profile-rating-track">
                {ratings.map((item) => (
                  <article className="cx-profile-rating-card" key={item.name}>
                    <span>{item.name}</span><strong>{item.rating}</strong><small>{item.change}</small>
                  </article>
                ))}
              </div>

<div className="cx-profile-insights-track">
  <article className="cx-profile-chart-card">
    <div><ChartNoAxesCombined size={18} /><strong>Rating Progress</strong></div>
    <p>Rating history will appear here when game data is connected.</p>
    <div className="cx-profile-chart-placeholder">
      <span /><span /><span /><span /><span /><span /><span />
    </div>
    <small>Sample chart preview · No live rating data</small>
  </article>

  <article className="cx-profile-chart-card cx-profile-insight-card">
    <div><ChartNoAxesCombined size={18} /><strong>Rating Distribution</strong></div>
    <p>Your rating range and consistency will appear here when rating history is available.</p>
    <div className="cx-profile-insight-placeholder">
      <span>Rating range</span>
      <strong>—</strong>
      <span>Consistency</span>
      <strong>—</strong>
    </div>
    <small>Requires rating history · No live data</small>
  </article>

  <article className="cx-profile-chart-card cx-profile-insight-card">
    <div><Trophy size={18} /><strong>Rating Milestones</strong></div>
    <p>Your reached rating milestones and personal bests will appear here.</p>
    <div className="cx-profile-insight-placeholder">
      <span>Highest rating</span>
      <strong>—</strong>
      <span>Milestones reached</span>
      <strong>—</strong>
    </div>
    <small>Requires rating history · No live data</small>
  </article>
</div>

            </section>

            <section className="cx-profile-section">
              <div className="cx-profile-section-heading">
                <h2>Recent Games</h2>
                <button className="cx-profile-view-all" onClick={() => navigate('/profile/games')} type="button">View All <ChevronRight size={15} /></button>
              </div>
              <div className="cx-profile-game-list">

{games.slice(0, 3).map((game, index) => (
  <article className="cx-profile-game-row" key={`${game.opponent}-${index}`}>
    <div className={`cx-profile-game-result ${game.result.toLowerCase()}`}>
      {game.result === 'Victory' ? '+' : game.result === 'Defeat' ? '−' : '='}
    </div>

    <div className="cx-profile-game-avatar">
      <CircleUserRound size={21} />
    </div>

    <div className="cx-profile-game-info">
      <strong>{game.opponent}</strong>
      <span>{game.mode} · {game.date}</span>
    </div>

    <strong className={`cx-profile-game-rating ${game.result.toLowerCase()}`}>
      {game.rating}
    </strong>
    <ChevronRight size={17} />
  </article>
))}

              </div>
              <div className="cx-profile-stat-summary">
                <span><strong>{totalGames}</strong> Games</span>
                <span><strong>{wins}</strong> Wins</span>
                <span><strong>{losses}</strong> Losses</span>
                <span><strong>{draws}</strong> Draws</span>
              </div>
            </section>

            <section className="cx-profile-section">
              <div className="cx-profile-section-heading">
                <h2>Friends</h2>
                <button className="cx-profile-view-all" onClick={() => navigate('/profile/friends')} type="button">View All <ChevronRight size={15} /></button>
              </div>
              <div className="cx-profile-friends-track">

{friends.map((friend) => (
  <article className="cx-profile-friend-card" key={friend.username}>
    <div className="cx-profile-friend-avatar">
      <CircleUserRound size={29} />
    </div>
    <strong>{friend.name}</strong>
    <span className="cx-profile-friend-username">@{friend.username}</span>
    <span className={`cx-profile-friend-status ${friend.status}`}>
      <i />
      {friend.status === 'offline'
        ? `Active ${friend.lastActive} ago`
        : friend.status === 'online'
          ? 'Online'
          : friend.status === 'queue'
            ? 'Queue'
            : 'Playing'}
    </span>
  </article>
))}

              </div>
            </section>

<section className="cx-profile-section">
  <div className="cx-profile-section-heading">
    <h2>Achievements</h2>
    <button
      className="cx-profile-view-all"
      onClick={() => navigate('/profile/achievements')}
      type="button"
    >
      View All <ChevronRight size={15} />
    </button>
  </div>

  <AchievementCards
    items={achievements.filter((achievement) => achievement.achieved)}
    locked={false}
    rows={1}
    preview
  />
</section>

            <section className="cx-profile-section cx-profile-extra-details">
              <h2>Player Details</h2>
              <div>
                <Sparkles size={17} />
                <span>Flair</span>
                <strong>{profile.flair || 'No Flair'}</strong>
              </div>
              <div>
                <CircleUserRound size={17} />
                <span>Profile Border</span>
                <strong>{profile.borders || 'Default Gold'}</strong>
              </div>
            </section>
          </>
        )}

        {activeTab === 'Games' && (
          <section className="cx-profile-section">
            <div className="cx-profile-section-heading">
              <h2>Game History</h2>
              <button
                className="cx-profile-view-all"
                onClick={() => navigate('/profile/games')}
                type="button"
              >
                View All <ChevronRight size={15} />
              </button>
            </div>
            <GameRows />
          </section>
        )}

        {activeTab === 'Achievements' && (
          <section className="cx-profile-section">
            <div className="cx-profile-section-heading">
              <h2>Achievements</h2>
              <button
                className="cx-profile-view-all"
                onClick={() => navigate('/profile/achievements')}
                type="button"
              >
                View All <ChevronRight size={15} />
              </button>
            </div>
            <AchievementCards />
          </section>
        )}

        {activeTab === 'Activity' && (
          <section className="cx-profile-section">
            <h2>Recent Activity</h2>
            <div className="cx-profile-activity-empty">
              <Gamepad2 size={28} />
              <strong>No recent activity yet</strong>
              <span>Completed games, puzzles, and lessons will appear here.</span>
            </div>
          </section>
        )}
      </main>
      {showQR && <QRPreview onClose={() => setShowQR(false)} />}
    </div>
  )
}

function GameRows() {
  return (
    <div className="cx-profile-game-list">
      {games.map((game, index) => (
        <article className="cx-profile-game-row" key={`${game.opponent}-${index}`}>
          <div className={`cx-profile-game-result ${game.result.toLowerCase()}`}>
            {game.result === 'Victory' ? '+' : game.result === 'Defeat' ? '−' : '='}
          </div>
          <div className="cx-profile-game-info"><strong>{game.opponent}</strong><span>{game.mode} · {game.date}</span></div>
          <strong className={`cx-profile-game-rating ${game.result.toLowerCase()}`}>{game.rating}</strong>
        </article>
      ))}
    </div>
  )
}

function AchievementCards({
  items,
  locked,
  rows,
  preview = false,
}: {
  items: (typeof achievements)[number][]
  locked: boolean
  rows: number
  preview?: boolean
}) {
  return (
    <div
      className={`cx-achievement-list ${preview ? 'preview' : ''}`}
      style={{ gridTemplateRows: `repeat(${rows}, minmax(160px, auto))` }}
    >
      {items.map((achievement) => (
        <article
          className={`cx-profile-achievement-card ${locked ? 'locked' : 'unlocked'}`}
          key={achievement.name}
        >
          <span className="cx-profile-achievement-card-icon">
            {locked ? <Lock size={21} /> : <Trophy size={22} />}
          </span>
          <strong>{achievement.name}</strong>
          <small>{achievement.rarity}</small>
          <span>{achievement.description}</span>
          {locked ? (
            <small>{achievement.unlock}</small>
          ) : (
            <small>{achievement.date}</small>
          )}
        </article>
      ))}
    </div>
  )
}


function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const achievedItems = achievements.filter(
    (achievement) =>
      achievement.achieved &&
      (selectedCategory === 'All' || achievement.category === selectedCategory)
  )

  const lockedItems = achievements.filter(
    (achievement) =>
      !achievement.achieved &&
      (selectedCategory === 'All' || achievement.category === selectedCategory)
  )

  const achievedCount = achievements.filter(
    (achievement) => achievement.achieved
  ).length

  const achievementProgress = Math.round(
    (achievedCount / achievements.length) * 100
  )

  return (
    <div className="cx-achievements-page">
      <section className="cx-achievement-progress">
        <div>
          <strong>Overall Progress</strong>
          <span>{achievedCount} / {achievements.length} Achieved</span>
        </div>
        <div className="cx-achievement-progress-track">
          <span style={{ width: `${achievementProgress}%` }} />
        </div>
        <small>{achievementProgress}% completed</small>
      </section>

      <div className="cx-achievement-categories">
        {achievementCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <section className="cx-achievement-group">
        <div className="cx-achievement-group-heading">
          <h2>Achieved</h2>
          <span>{achievedItems.length}</span>
        </div>

        {achievedItems.length > 0 ? (
          <AchievementCards
            items={achievedItems}
            locked={false}
            rows={2}
          />
        ) : (
          <p className="cx-achievement-empty">
            No achieved items in this category.
          </p>
        )}
      </section>

      <section className="cx-achievement-group">
        <div className="cx-achievement-group-heading">
          <h2>Achievements</h2>
          <span>{lockedItems.length}</span>
        </div>

        {lockedItems.length > 0 ? (
          <AchievementCards
            items={lockedItems}
            locked
            rows={3}
          />
        ) : (
          <p className="cx-achievement-empty">
            No remaining achievements in this category.
          </p>
        )}
      </section>
    </div>
  )
}


export function EditProfilePage() {
  const navigate = useNavigate()

  const normalizeProfile = (profile: ProfileData): ProfileData => ({
    ...defaultProfile,
    ...profile,
    country:
      profile.country === 'Philippines' ? 'PH' : profile.country,
    borders: profile.borders || 'Default Gold',
  })

  const [original] = useState<ProfileData>(() =>
    normalizeProfile(readProfile())
  )

  const [form, setForm] = useState<ProfileData>(() => {
    const profile = normalizeProfile(readProfile())

    return {
      ...profile,
      flair:
        localStorage.getItem('cx-profile-flair') ??
        profile.flair,
      country:
        localStorage.getItem('cx-profile-country') ??
        profile.country,
    }
  })

  const [preview, setPreview] = useState(false)
  const [privacy, setPrivacy] = useState('Public')

  const [cropSource, setCropSource] = useState('')
  const [cropZoom, setCropZoom] = useState(1)
  const [cropX, setCropX] = useState(50)
  const [cropY, setCropY] = useState(50)

  const usernameChangedAt = Number(
    localStorage.getItem('cx-username-changed-at') || 0
  )

  const countryChangedAt = Number(
    localStorage.getItem('cx-country-changed-at') || 0
  )

  const cooldown = 90 * 24 * 60 * 60 * 1000
  const now = Date.now()

  const usernameLocked =
    usernameChangedAt > 0 &&
    now < usernameChangedAt + cooldown

  const countryLocked =
    countryChangedAt > 0 &&
    now < countryChangedAt + cooldown

  const getRemainingDays = (timestamp: number) =>
    Math.max(
      0,
      Math.ceil(
        (timestamp + cooldown - now) /
        (24 * 60 * 60 * 1000)
      )
    )

  const countryName = (code: string) => {
    if (code.length !== 2) return code

    try {
      return (
        new Intl.DisplayNames(['en'], {
          type: 'region',
        }).of(code) || code
      )
    } catch {
      return code
    }
  }

  const countryFlag = (code: string) => {
    if (code.length !== 2) return ''

    return String.fromCodePoint(
      ...code.toUpperCase().split('').map(
        (letter) => 127397 + letter.charCodeAt(0)
      )
    )
  }

  const countryAlpha3 = (code: string) => {
    const normalizedCode = code.toUpperCase()
    return alpha3[normalizedCode] || normalizedCode
  }

  const update = (
    key: keyof ProfileData,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const hasChanges = (
    Object.keys(form) as (keyof ProfileData)[]
  ).some((key) => form[key] !== original[key])

  const photoChange = (file?: File) => {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image.')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setCropSource(String(reader.result || ''))
      setCropZoom(1)
      setCropX(50)
      setCropY(50)
    }

    reader.readAsDataURL(file)
  }

  const confirmCrop = () => {
    if (!cropSource) return

    const image = new Image()

    image.onload = () => {
      const size = Math.min(
        image.naturalWidth,
        image.naturalHeight
      ) / cropZoom

      const maxX = image.naturalWidth - size
      const maxY = image.naturalHeight - size

      const sourceX = maxX * (cropX / 100)
      const sourceY = maxY * (cropY / 100)

      const canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 512

      const context = canvas.getContext('2d')

      if (!context) {
        alert('Unable to process this photo.')
        return
      }

      context.drawImage(
        image,
        sourceX,
        sourceY,
        size,
        size,
        0,
        0,
        512,
        512
      )

      update(
        'profilePhoto',
        canvas.toDataURL('image/jpeg', 0.9)
      )

      setCropSource('')
    }

    image.onerror = () => {
      alert('Unable to load this photo.')
    }

    image.src = cropSource
  }

  const removePhoto = () => {
    update('profilePhoto', '')
  }

  const save = () => {
    if (!hasChanges) return

    const username = form.username.trim()
    const firstName = form.firstName.trim()
    const lastName = form.lastName.trim()
    const bio = form.bio.slice(0, 20)

    if (username.length > 15) {
      alert('Username must not exceed 15 characters.')
      return
    }

    if (/\s/.test(username)) {
      alert('Username cannot contain spaces.')
      return
    }

    if (firstName.length > 10 || lastName.length > 10) {
      alert('First Name and Last Name have a 10-character limit.')
      return
    }

    if (bio.length > 20) {
      alert('Bio must not exceed 20 characters.')
      return
    }

    if (
      usernameLocked &&
      username !== original.username
    ) {
      alert(
        `Username can be changed again in ${getRemainingDays(
          usernameChangedAt
        )} days.`
      )
      return
    }

    if (
      countryLocked &&
      form.country !== original.country
    ) {
      alert(
        `Country can be changed again in ${getRemainingDays(
          countryChangedAt
        )} days.`
      )
      return
    }

    const nextProfile: ProfileData = {
      ...form,
      username,
      firstName,
      lastName,
      bio,
      accountName:
        `${firstName} ${lastName}`.trim() || username,
      borders: form.borders || 'Default Gold',
    }

    try {
      localStorage.setItem(
        'cx-profile-preview',
        JSON.stringify(nextProfile)
      )

      if (username !== original.username) {
        localStorage.setItem(
          'cx-username-changed-at',
          String(Date.now())
        )
      }

      if (form.country !== original.country) {
        localStorage.setItem(
          'cx-country-changed-at',
          String(Date.now())
        )
      }

      localStorage.removeItem('cx-profile-flair')
      localStorage.removeItem('cx-profile-country')

      navigate('/profile')
    } catch {
      alert(
        'Unable to save your profile. Your changes may exceed the available browser storage.'
      )
    }
  }

  const cancel = () => {
    localStorage.removeItem('cx-profile-flair')
    localStorage.removeItem('cx-profile-country')
    navigate('/profile')
  }

  const displayCountry = countryName(form.country)
  const displayFlag = countryFlag(form.country)
  const displayAlpha3 = countryAlpha3(form.country)

  return (
    <div className="cx-profile-subpage">
      <PageHeader title="Edit Profile" />

      <main className="cx-profile-edit-content">
        <section className="cx-edit-profile-row">
          <label>Profile Picture</label>

          <div className="cx-edit-picture-control">
            <div
              className="cx-edit-picture-preview"
              data-border={form.borders || 'Default Gold'}
            >
              {form.profilePhoto ? (
                <img
                  src={form.profilePhoto}
                  alt="Profile preview"
                />
              ) : (
                <CircleUserRound size={46} />
              )}
            </div>

            {!form.profilePhoto ? (
              <label className="cx-profile-upload-button">
                <Camera size={16} />
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    photoChange(event.target.files?.[0])
                    event.currentTarget.value = ''
                  }}
                />
              </label>
            ) : (
              <button
                type="button"
                className="cx-profile-upload-button cx-remove-photo-button"
                onClick={removePhoto}
              >
                <X size={16} />
                Remove Photo
              </button>
            )}
          </div>

          <span className="cx-edit-field-hint">
            Profile pictures use a circular 1:1 crop.
          </span>
        </section>

        <button
          type="button"
          className="cx-edit-profile-row cx-edit-select-row"
          onClick={() => navigate('/profile/select-flair')}
        >
          <span className="cx-edit-row-label">Flair</span>
          <span className="cx-edit-row-value">
            {form.flair || 'Choose Flair'}
            <ChevronRight size={17} />
          </span>
        </button>

        <section className="cx-edit-profile-row cx-edit-bio-row">
          <label htmlFor="profile-bio">Bio</label>
          <textarea
            id="profile-bio"
            rows={1}
            maxLength={20}
            value={form.bio}
            onChange={(event) =>
              update('bio', event.target.value.slice(0, 20))
            }
            placeholder="Tell others about yourself..."
          />
          <span className="cx-edit-field-hint">
            {form.bio.length}/20 characters
          </span>
        </section>

        <section className="cx-edit-profile-row">
          <label htmlFor="profile-username">Username</label>
          <input
            id="profile-username"
            value={form.username}
            maxLength={15}
            disabled={usernameLocked}
            onChange={(event) =>
              update(
                'username',
                event.target.value
                  .replace(/\s/g, '')
                  .slice(0, 15)
              )
            }
          />
          <span className="cx-edit-field-hint">
            {usernameLocked
              ? `Locked · Available again in ${getRemainingDays(
                  usernameChangedAt
                )} days`
              : 'Maximum 15 characters · No spaces'}
          </span>
        </section>

        <section className="cx-edit-profile-row">
          <label htmlFor="profile-firstName">First Name</label>
          <input
            id="profile-firstName"
            value={form.firstName}
            maxLength={10}
            onChange={(event) =>
              update(
                'firstName',
                event.target.value.slice(0, 10)
              )
            }
          />
          <span className="cx-edit-field-hint">
            {form.firstName.length}/10 characters
          </span>
        </section>

        <section className="cx-edit-profile-row">
          <label htmlFor="profile-lastName">Last Name</label>
          <input
            id="profile-lastName"
            value={form.lastName}
            maxLength={10}
            onChange={(event) =>
              update(
                'lastName',
                event.target.value.slice(0, 10)
              )
            }
          />
          <span className="cx-edit-field-hint">
            {form.lastName.length}/10 characters
          </span>
        </section>

        <button
          type="button"
          className="cx-edit-profile-row cx-edit-select-row"
          disabled={countryLocked}
          onClick={() => navigate('/profile/select-country')}
        >
          <span className="cx-edit-row-label">Country</span>
          <span className="cx-edit-country-value">
            <span>{displayCountry}</span>
            <small>{displayAlpha3}</small>
            <strong>{displayFlag}</strong>
            {!countryLocked && <ChevronRight size={17} />}
          </span>
          {countryLocked && (
            <span className="cx-edit-field-hint">
              Locked · Available again in {getRemainingDays(
                countryChangedAt
              )} days
            </span>
          )}
        </button>

        <section className="cx-edit-profile-row">
          <label htmlFor="profile-location">Location</label>
          <input
            id="profile-location"
            value={form.location}
            onChange={(event) =>
              update('location', event.target.value)
            }
            placeholder="City or region"
          />
        </section>

        <section className="cx-edit-profile-row">
          <label htmlFor="profile-borders">Borders</label>
          <select
            id="profile-borders"
            value={form.borders}
            onChange={(event) =>
              update('borders', event.target.value)
            }
          >
            <option>Default Gold</option>
            <option>Silver</option>
            <option>Bronze</option>
            <option>Royal Gold</option>
            <option>Diamond</option>
            <option>No Border</option>
          </select>
          <span className="cx-edit-field-hint">
            Choose the outline style for your profile picture.
          </span>
        </section>

        <section className="cx-edit-profile-row">
          <label htmlFor="profile-privacy">Profile Visibility</label>
          <select
            id="profile-privacy"
            value={privacy}
            onChange={(event) =>
              setPrivacy(event.target.value)
            }
          >
            <option>Public</option>
            <option>Friends Only</option>
            <option>Private</option>
          </select>
          <span className="cx-edit-field-hint">
            <Lock size={12} />
            Preview setting only. Backend privacy enforcement is not active.
          </span>
        </section>

        <div className="cx-profile-edit-actions">
          <button
            type="button"
            className="cx-profile-secondary-button"
            onClick={() => setPreview(true)}
          >
            <Eye size={16} />
            Preview Profile
          </button>

          <button
            type="button"
            className="cx-profile-primary-button"
            onClick={save}
            disabled={!hasChanges}
          >
            <Check size={16} />
            Save Changes
          </button>
        </div>

        <button
          className="cx-profile-cancel-button"
          type="button"
          onClick={cancel}
        >
          Cancel
        </button>

        {!hasChanges && (
          <p className="cx-edit-field-hint cx-edit-no-changes">
            No changes to save.
          </p>
        )}
      </main>
            {cropSource && (
        <div className="cx-profile-modal-backdrop">
          <section className="cx-profile-crop-modal">
            <button
              className="cx-profile-modal-close"
              type="button"
              onClick={() => setCropSource('')}
              aria-label="Cancel photo crop"
            >
              <X size={19} />
            </button>

            <h2>Adjust Profile Photo</h2>
            <p>
              Adjust your image inside the square crop area.
              It will appear as a circle on your profile.
            </p>

            <div className="cx-profile-crop-frame">
              <img
                src={cropSource}
                alt="Photo crop preview"
                style={{
                  width: `${cropZoom * 100}%`,
                  height: `${cropZoom * 100}%`,
                  maxWidth: 'none',
                  maxHeight: 'none',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transform: `translate(${(50 - cropX) * 0.02 * cropZoom}%, ${(50 - cropY) * 0.02 * cropZoom}%)`,
                }}
              />
            </div>

            <label className="cx-profile-crop-control">
              Zoom
              <input
                type="range"
                min="1"
                max="3"
                step="0.05"
                value={cropZoom}
                onChange={(event) =>
                  setCropZoom(Number(event.target.value))
                }
              />
            </label>

            <label className="cx-profile-crop-control">
              Horizontal Position
              <input
                type="range"
                min="0"
                max="100"
                value={cropX}
                onChange={(event) =>
                  setCropX(Number(event.target.value))
                }
              />
            </label>

            <label className="cx-profile-crop-control">
              Vertical Position
              <input
                type="range"
                min="0"
                max="100"
                value={cropY}
                onChange={(event) =>
                  setCropY(Number(event.target.value))
                }
              />
            </label>

            <div className="cx-profile-crop-actions">
              <button
                type="button"
                className="cx-profile-secondary-button"
                onClick={() => setCropSource('')}
              >
                Cancel
              </button>
              <button
                type="button"
                className="cx-profile-primary-button"
                onClick={confirmCrop}
              >
                <Check size={16} />
                Confirm Photo
              </button>
            </div>
          </section>
        </div>
      )}

      {preview && (
        <div
          className="cx-profile-modal-backdrop"
          onClick={() => setPreview(false)}
        >
          <section
            className="cx-profile-preview-modal cx-profile-live-preview"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="cx-profile-modal-close"
              type="button"
              onClick={() => setPreview(false)}
              aria-label="Close preview"
            >
              <X size={19} />
            </button>

            <span className="cx-profile-preview-label">
              PROFILE PREVIEW
            </span>

            <div className="cx-profile-preview-cover" />

            <div className="cx-profile-preview-identity">
              <div
                className="cx-edit-picture-preview"
                data-border={form.borders || 'Default Gold'}
              >
                {form.profilePhoto ? (
                  <img src={form.profilePhoto} alt="Profile" />
                ) : (
                  <CircleUserRound size={42} />
                )}
              </div>

              <div>
                <h2>
                  {`${form.firstName} ${form.lastName}`.trim() ||
                    'Player Name'}
                </h2>
                <p>{form.username || '@username'}</p>
              </div>
            </div>

            {form.flair && (
              <div className="cx-profile-preview-flair">
                <Sparkles size={16} />
                <span>{form.flair}</span>
              </div>
            )}

            <p className="cx-profile-preview-bio">
              {form.bio || 'No bio added yet.'}
            </p>

            <div className="cx-profile-preview-information">
              <div>
                <span>Country</span>
                <strong>{displayFlag} {displayCountry}</strong>
              </div>
              <div>
                <span>Location</span>
                <strong>{form.location || 'Not specified'}</strong>
              </div>
              <div>
                <span>Borders</span>
                <strong>{form.borders}</strong>
              </div>
            </div>

            <p className="cx-profile-preview-visibility">
              Profile Visibility: {privacy}
            </p>

            <button
              type="button"
              className="cx-profile-primary-button"
              onClick={() => setPreview(false)}
            >
              Close Preview
            </button>
          </section>
        </div>
      )}
    </div>
  )
}

function ProfileDetailPage({
  type,
}: {
  type: 'ratings' | 'games' | 'friends' | 'achievements'
}) {
  const titles = {
    ratings: 'All Ratings',
    games: 'Game History',
    friends: 'Friends',
    achievements: 'Achievements',
  }

  const navigate = useNavigate()

  return (
    <div className="cx-profile-subpage">
      <PageHeader title={titles[type]} />

      <main className="cx-profile-detail-content">
        {type === 'ratings' && (
          <>
            <div className="cx-profile-detail-intro">
              <ChartNoAxesCombined size={24} />
              <div>
                <strong>Player Ratings</strong>
                <span>Sample rating overview</span>
              </div>
            </div>

            {ratings.map((item) => (
              <div className="cx-profile-detail-row" key={item.name}>
                <span>{item.name}</span>
                <strong>{item.rating}</strong>
                <small>{item.change}</small>
              </div>
            ))}

            <div className="cx-profile-chart-card">
              <strong>Rating Progress</strong>
              <p>
                Rating chart will be connected to actual game records
                in the backend phase.
              </p>
              <div className="cx-profile-chart-placeholder">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </>
        )}

        {type === 'games' && (
          <>
            <div className="cx-profile-detail-intro">
              <Gamepad2 size={24} />
              <div>
                <strong>Recent Games</strong>
                <span>Sample game history</span>
              </div>
            </div>
            <GameRows />
          </>
        )}
{type === 'friends' && (
  <>
    <div className="cx-profile-detail-friends">
      {friends.map((friend) => (
    <div className="cx-profile-detail-friend" key={friend.username}>
      <CircleUserRound size={32} />
      <strong>{friend.name}</strong>
      <span>@{friend.username}</span>
      <span className={`cx-profile-friend-status ${friend.status}`}>
        <i />
        {friend.status === 'offline'
          ? `Active ${friend.lastActive} ago`
          : friend.status === 'online'
            ? 'Online'
            : friend.status === 'queue'
              ? 'Queue'
              : 'Playing'}
      </span>
    </div>
  ))}
</div>
        
            <p className="cx-profile-preview-note">
              Friend search and friend requests will be implemented
              during the backend phase.
            </p>
          </>
        )}

{type === 'achievements' && (
  <AchievementsPage />
)}

        <button
          className="cx-profile-secondary-button cx-profile-detail-back"
          type="button"
          onClick={() => navigate('/profile')}
        >
          <ArrowLeft size={16} />
          Back to Profile
        </button>
      </main>
    </div>
  )
}


export function ProfileRatingsPage() {
  const [selectedFormat, setSelectedFormat] = useState('Bullet')
  const [selectedRange, setSelectedRange] = useState('30D')

  const formats = ['Bullet', 'Blitz', 'Rapid', 'Classical', 'Daily']
  const ranges = ['7D', '30D', '90D', '1Y', 'All']

  return (
    <div className="cx-profile-subpage cx-ratings-page">
      <PageHeader title="Ratings" />

      <main className="cx-profile-detail-content cx-ratings-content">
        <div className="cx-ratings-heading">
          <span className="cx-ratings-overline">
            YOUR CHESS PERFORMANCE
          </span>
          <h2>Rating Dashboard</h2>
          <p>Select a format to view its rating and history.</p>
        </div>

        <div className="cx-ratings-format-list" role="group" aria-label="Rating format">
          {formats.map((format) => (
            <button
              key={format}
              type="button"
              className={`cx-ratings-format-button ${selectedFormat === format ? 'active' : ''}`}
              aria-pressed={selectedFormat === format}
              onClick={() => setSelectedFormat(format)}
            >
              {format}
            </button>
          ))}
        </div>

        <section className="cx-ratings-primary-grid">
          <article className="cx-ratings-value-card">
            <span>Current Rating</span>
            <strong>—</strong>
            <small>{selectedFormat}</small>
          </article>

          <article className="cx-ratings-value-card">
            <span><Trophy size={13} /> Highest Rating</span>
            <strong>—</strong>
            <small>No peak recorded yet</small>
          </article>
        </section>

        <section className="cx-ratings-history-card">
          <div className="cx-ratings-section-heading">
            <div>
              <h3>Rating History</h3>
              <p>{selectedFormat} rating over time</p>
            </div>
            <ChartNoAxesCombined size={19} />
          </div>

          <div className="cx-ratings-range-list" role="group" aria-label="Rating history timeframe">
            {ranges.map((range) => (
              <button
                key={range}
                type="button"
                className={`cx-ratings-range-button ${selectedRange === range ? 'active' : ''}`}
                aria-pressed={selectedRange === range}
                onClick={() => setSelectedRange(range)}
              >
                {range}
              </button>
            ))}
          </div>

          <div className="cx-ratings-chart-empty">
            <div className="cx-ratings-chart-grid" aria-hidden="true" />
            <div className="cx-ratings-empty-message">
              <ChartNoAxesCombined size={25} />
              <strong>No rating history yet</strong>
              <span>
                Rating progress for {selectedFormat} will appear here
                once rated games are recorded.
              </span>
            </div>
          </div>

          <small className="cx-ratings-chart-note">
            Highest-rating marker will appear when rating history is available.
          </small>
        </section>

        <section className="cx-ratings-progress-card">
          <h3>Performance Summary</h3>

          <div className="cx-ratings-stat-grid">
            <div><span>Rating Change</span><strong>—</strong></div>
            <div><span>Games Played</span><strong>—</strong></div>
            <div><span>Wins</span><strong>—</strong></div>
            <div><span>Draws</span><strong>—</strong></div>
            <div><span>Losses</span><strong>—</strong></div>
            <div><span>Win Rate</span><strong>—</strong></div>
          </div>

          <p>
            Statistics will be calculated from actual game records
            when the backend is connected.
          </p>
        </section>
      </main>
    </div>
  )
}


export function ProfileGamesPage() {
  return <ProfileDetailPage type="games" />
}

export function ProfileFriendsPage() {
  return <ProfileDetailPage type="friends" />
}

export function ProfileAchievementsPage() {
  return <ProfileDetailPage type="achievements" />
}

export default ProfilePage
