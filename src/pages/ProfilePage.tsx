
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
  MapPin,
  Pencil,
  QrCode,
  Share2,
  Sparkles,
  Star,
  Trophy,
  UserPlus,
  Users,
  X,
  ChartNoAxesCombined,
  Eye,
  Lock,
  Pin,
  BookOpen,
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
  favoriteOpening: string
  pinnedGame: string
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
  favoriteOpening: 'Sicilian Defense',
  pinnedGame: 'Featured Game',
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
  'PlayerOne',
  'KnightMaster',
  'ChessFan',
  'QueenSide',
  'EndgamePro',
]

const achievements = [
  { name: 'First Victory', description: 'Win your first chess game', date: 'Sample achievement', rarity: 'Common' },
  { name: 'Tactical Mind', description: 'Complete a chess puzzle', date: 'Sample achievement', rarity: 'Rare' },
  { name: 'Consistent Player', description: 'Build your playing streak', date: 'Sample achievement', rarity: 'Epic' },
  { name: 'Chess Explorer', description: 'Explore different chess modes', date: 'Sample achievement', rarity: 'Rare' },
]

const tabs = ['Overview', 'Games', 'Achievements', 'Activity']

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
  const [featured, setFeatured] = useState('First Victory')

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
            <div className="cx-profile-photo">
              {profile.profilePhoto ? (
                <img src={profile.profilePhoto} alt="Profile" />
              ) : (
                <CircleUserRound size={54} />
              )}
            </div>
            <div className="cx-profile-name-area">
              <h1>
                {verifiedTitle && <span className="cx-profile-title">{verifiedTitle}</span>}
                <span className="cx-profile-account-name">{profile.accountName}</span>
                <span className="cx-profile-country-flag">🇵🇭</span>
              </h1>
              <span>{profile.username}</span>
              {profile.location && (
                <span className="cx-profile-location">
                  <MapPin size={12} /> {profile.location}
                </span>
              )}
              {profile.flair && (
                <span className="cx-profile-flair-label">
                  <Sparkles size={13} /> {profile.flair}
                </span>
              )}
            </div>
          </div>

          <p className="cx-profile-bio">{profile.bio || 'No bio added yet.'}</p>
          <div className="cx-profile-joined">
            <CalendarDays size={15} />
            <div className="cx-profile-joined-text">
              <strong>November 2026</strong>
              <span>Joined</span>
            </div>
          </div>
        </section>

        <section className="cx-profile-stat-track">
          {[
            ['128', 'Friends'],
            ['2,450', 'Views'],
            ['859', 'Followers'],
            ['3,841', 'Likes'],
            ['156', 'Following'],
          ].map(([value, label]) => (
            <article className="cx-profile-stat" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </section>

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
            <div className="cx-profile-highlight-icon">
              <StreakBadge days={playerProfile.streak} size="compact" />
            </div>
            <div>
              <strong>{playerProfile.streak} Day Streak</strong>
              <span>Current streak</span>
            </div>
          </button>
          <article className="cx-profile-highlight">
            <div className="cx-profile-highlight-icon"><Crown size={21} /></div>
            <div>
              <strong>CCC Member</strong>
              <span>Membership</span>
            </div>
          </article>
        </section>

        <section className="cx-profile-completion">
          <div className="cx-profile-section-heading">
            <h2>Profile Completion</h2>
            <strong>75%</strong>
          </div>
          <div className="cx-profile-progress-track"><span style={{ width: '75%' }} /></div>
          <p>Complete your profile to introduce yourself to the CCC community.</p>
          <button type="button" onClick={() => navigate('/profile/edit')}>Complete Profile <ChevronRight size={15} /></button>
        </section>

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
              <div className="cx-profile-chart-card">
                <div><ChartNoAxesCombined size={18} /><strong>Rating Progress</strong></div>
                <p>Rating history will appear here when game data is connected.</p>
                <div className="cx-profile-chart-placeholder">
                  <span /><span /><span /><span /><span /><span /><span />
                </div>
                <small>Sample chart preview · No live rating data</small>
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
                    <div className="cx-profile-game-info">
                      <strong>{game.opponent}</strong><span>{game.mode} · {game.date}</span>
                    </div>
                    <strong className={`cx-profile-game-rating ${game.result.toLowerCase()}`}>{game.rating}</strong>
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
                  <article className="cx-profile-friend-card" key={friend}>
                    <div className="cx-profile-friend-avatar"><CircleUserRound size={29} /></div>
                    <strong>{friend}</strong>
                  </article>
                ))}
              </div>
            </section>

            <section className="cx-profile-section">
              <div className="cx-profile-section-heading">
                <h2>Featured Achievement</h2>
                <button className="cx-profile-view-all" onClick={() => navigate('/profile/achievements')} type="button">View All <ChevronRight size={15} /></button>
              </div>
              <div className="cx-profile-featured-achievement">
                <Trophy size={29} />
                <div><strong>{featured}</strong><span>Selected featured achievement</span></div>
                <Star size={18} />
              </div>
              <div className="cx-profile-achievement-track">
                {achievements.map((achievement) => (
                  <button
                    className={`cx-profile-achievement-card ${featured === achievement.name ? 'selected' : ''}`}
                    type="button"
                    key={achievement.name}
                    onClick={() => setFeatured(achievement.name)}
                  >
                    <span className="cx-profile-achievement-card-icon"><Trophy size={22} /></span>
                    <strong>{achievement.name}</strong>
                    <small>{achievement.rarity}</small>
                    <span>{achievement.description}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="cx-profile-section cx-profile-extra-details">
              <h2>Player Details</h2>
              <div><BookOpen size={17} /><span>Favorite Opening</span><strong>{profile.favoriteOpening}</strong></div>
              <div><Pin size={17} /><span>Pinned Game</span><strong>{profile.pinnedGame}</strong></div>
            </section>
          </>
        )}

        {activeTab === 'Games' && (
          <section className="cx-profile-section">
            <div className="cx-profile-section-heading"><h2>Game History</h2><button className="cx-profile-view-all" onClick={() => navigate('/profile/games')} type="button">View All <ChevronRight size={15} /></button></div>
            <GameRows />
          </section>
        )}

        {activeTab === 'Achievements' && (
          <section className="cx-profile-section">
            <div className="cx-profile-section-heading"><h2>Achievements</h2><button className="cx-profile-view-all" onClick={() => navigate('/profile/achievements')} type="button">View All <ChevronRight size={15} /></button></div>
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

function AchievementCards() {
  return (
    <div className="cx-profile-achievement-track">
      {achievements.map((achievement) => (
        <article className="cx-profile-achievement-card" key={achievement.name}>
          <span className="cx-profile-achievement-card-icon"><Trophy size={22} /></span>
          <strong>{achievement.name}</strong>
          <small>{achievement.rarity}</small>
          <span>{achievement.description}</span>
          <small>{achievement.date}</small>
        </article>
      ))}
    </div>
  )
}

export function EditProfilePage() {
  const navigate = useNavigate()

  const getInitialForm = (): ProfileData => {
    const profile = readProfile()
    const savedFlair = localStorage.getItem('cx-profile-flair')
    const savedCountry = localStorage.getItem('cx-profile-country')

    return {
      ...profile,
      flair: savedFlair ?? profile.flair,
      country: savedCountry ?? (
        profile.country === 'Philippines' ? 'PH' : profile.country
      ),
    }
  }

  const [original] = useState<ProfileData>(getInitialForm)
  const [form, setForm] = useState<ProfileData>(getInitialForm)
  const [preview, setPreview] = useState(false)
  const [privacy, setPrivacy] = useState('Public')

  const countryName = (code: string) => {
    if (code.length !== 2) return code
    try {
      return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code
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

  const hasChanges = (
    Object.keys(form) as (keyof ProfileData)[]
  ).some((key) => form[key] !== original[key])

  const update = (key: keyof ProfileData, value: string) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const photoChange = (file?: File) => {
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      update('profilePhoto', String(reader.result || ''))
    }
    reader.readAsDataURL(file)
  }

  const save = () => {
    if (!hasChanges) return

    const nextProfile: ProfileData = {
      ...form,
      accountName:
        `${form.firstName} ${form.lastName}`.trim() || form.username,
    }

    localStorage.setItem(
      'cx-profile-preview',
      JSON.stringify(nextProfile)
    )

    localStorage.removeItem('cx-profile-flair')
    localStorage.removeItem('cx-profile-country')

    navigate('/profile')
  }

  const cancel = () => {
    if (!hasChanges) return

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
            <div className="cx-edit-picture-preview">
              {form.profilePhoto ? (
                <img src={form.profilePhoto} alt="Profile preview" />
              ) : (
                <CircleUserRound size={46} />
              )}
            </div>

            <label className="cx-profile-upload-button">
              <Camera size={16} />
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  photoChange(event.target.files?.[0])
                }
              />
            </label>
          </div>
        </section>

        <button
          type="button"
          className="cx-edit-profile-row cx-edit-select-row"
          onClick={() => navigate('/profile/select-flair')}
        >
          <span className="cx-edit-row-label">Flair</span>
          <span className="cx-edit-row-value">
            {form.flair ? <Sparkles size={23} /> : null}
          </span>
        </button>

        <section className="cx-edit-profile-row">
          <label htmlFor="profile-bio">Bio</label>
          <textarea
            id="profile-bio"
            maxLength={20}
            value={form.bio}
            onChange={(event) => update('bio', event.target.value)}
            placeholder="Tell others about yourself..."
          />
          <span className="cx-edit-field-hint">
            {form.bio.length}/20 characters
          </span>
        </section>

        {([
          ['username', 'Username'],
          ['firstName', 'First Name'],
          ['lastName', 'Last Name'],
        ] as [keyof ProfileData, string][]).map(([key, label]) => (
          <section className="cx-edit-profile-row" key={key}>
            <label htmlFor={`profile-${key}`}>{label}</label>
            <input
              id={`profile-${key}`}
              value={String(form[key])}
              onChange={(event) => update(key, event.target.value)}
            />
          </section>
        ))}

        <button
          type="button"
          className="cx-edit-profile-row cx-edit-select-row"
          onClick={() => navigate('/profile/select-country')}
        >
          <span className="cx-edit-row-label">Country</span>
          <span className="cx-edit-country-value">
            <span>{displayCountry}</span>
            <small>{displayAlpha3}</small>
            <strong>{displayFlag}</strong>
          </span>
        </button>

        <section className="cx-edit-profile-row">
          <label htmlFor="profile-location">Location</label>
          <input
            id="profile-location"
            value={form.location}
            onChange={(event) => update('location', event.target.value)}
            placeholder="City or region"
          />
        </section>

        <section className="cx-edit-profile-row">
          <label htmlFor="favorite-opening">Favorite Opening</label>
          <input
            id="favorite-opening"
            value={form.favoriteOpening}
            onChange={(event) =>
              update('favoriteOpening', event.target.value)
            }
          />
        </section>

        <section className="cx-edit-profile-row">
          <label htmlFor="pinned-game">Pinned Game</label>
          <input
            id="pinned-game"
            value={form.pinnedGame}
            onChange={(event) =>
              update('pinnedGame', event.target.value)
            }
          />
        </section>

        <section className="cx-edit-profile-row">
          <label htmlFor="profile-privacy">Profile Visibility</label>
          <select
            id="profile-privacy"
            value={privacy}
            onChange={(event) => setPrivacy(event.target.value)}
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
          disabled={!hasChanges}
        >
          Cancel
        </button>

        {!hasChanges && (
          <p className="cx-edit-field-hint cx-edit-no-changes">
            No changes to save.
          </p>
        )}
      </main>

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
              <div className="cx-edit-picture-preview">
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
                <span>Favorite Opening</span>
                <strong>{form.favoriteOpening || 'Not specified'}</strong>
              </div>
              <div>
                <span>Pinned Game</span>
                <strong>{form.pinnedGame || 'Not specified'}</strong>
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
          

function ProfileDetailPage({ type }: { type: 'ratings' | 'games' | 'friends' | 'achievements' }) {
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
            <div className="cx-profile-detail-intro"><ChartNoAxesCombined size={24} /><div><strong>Player Ratings</strong><span>Sample rating overview</span></div></div>
            {ratings.map((item) => <div className="cx-profile-detail-row" key={item.name}><span>{item.name}</span><strong>{item.rating}</strong><small>{item.change}</small></div>)}
            <div className="cx-profile-chart-card"><strong>Rating Progress</strong><p>Rating chart will be connected to actual game records in the backend phase.</p><div className="cx-profile-chart-placeholder"><span /><span /><span /><span /><span /><span /><span /></div></div>
          </>
        )}
        {type === 'games' && <><div className="cx-profile-detail-intro"><Gamepad2 size={24} /><div><strong>Recent Games</strong><span>Sample game history</span></div></div><GameRows /></>}
        {type === 'friends' && <><div className="cx-profile-detail-intro"><Users size={24} /><div><strong>Friends</strong><span>Sample friends list · Requests not active</span></div></div><div className="cx-profile-detail-friends">{friends.map((friend) => <div className="cx-profile-detail-friend" key={friend}><CircleUserRound size={32} /><strong>{friend}</strong><span>CCC Player</span></div>)}</div><p className="cx-profile-preview-note">Friend search and friend requests will be implemented during the backend phase.</p></>}
        {type === 'achievements' && <><div className="cx-profile-detail-intro"><Trophy size={24} /><div><strong>Player Achievements</strong><span>Sample achievement collection</span></div></div><AchievementCards /></>}
        <button className="cx-profile-secondary-button cx-profile-detail-back" type="button" onClick={() => navigate('/profile')}><ArrowLeft size={16} /> Back to Profile</button>
      </main>
    </div>
  )
}

export function ProfileRatingsPage() {
  return <ProfileDetailPage type="ratings" />
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
