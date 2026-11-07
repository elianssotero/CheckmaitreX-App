import {
  CalendarDays,
  ChevronRight,
  Pencil,
  CircleUserRound,
  Flame,
  Heart,
  QrCode,
  UserPlus,
  Trophy,
} from 'lucide-react'

const profile = {
  coverPhoto: '',
  profilePhoto: '',
  accountName: 'Player Name',
  username: '@playername',
  title: 'AIM',
  countryFlag: '🇵🇭',
  location: 'Philippines',
  bio: 'Add your bio here.',
  joined: 'November 2026',
  friends: 128,
  views: 2450,
  followers: 85927,
  likes: 3849371,
  following: 156,
  streak: 1,
  membership: 'CCC Member',
}

const profileRatings = [
  { name: 'Bullet', rating: '—' },
  { name: 'Blitz', rating: '—' },
  { name: 'Rapid', rating: '—' },
  { name: 'Classical', rating: '—' },
  { name: 'Daily', rating: '—' },
]

const profileGames = [
  { opponent: 'Opponent One', mode: 'Blitz', result: 'Victory', rating: '+12' },
  { opponent: 'Opponent Two', mode: 'Rapid', result: 'Defeat', rating: '-8' },
  { opponent: 'Opponent Three', mode: 'Bullet', result: 'Draw', rating: '0' },
  { opponent: 'Opponent Four', mode: 'Classical', result: 'Victory', rating: '+10' },
  { opponent: 'Opponent Five', mode: 'Blitz', result: 'Victory', rating: '+8' },
]

const profileFriends = [
  'PlayerOne',
  'KnightMaster',
  'ChessFan',
  'QueenSide',
  'EndgamePro',
]

const achievements = [
  { name: 'First Victory', description: 'Win your first chess game' },
  { name: 'Tactical Mind', description: 'Complete a chess puzzle' },
  { name: 'Consistent Player', description: 'Build your playing streak' },
]

function ProfilePage() {
  const hasMembership = Boolean(profile.membership)

  return (
    <div className="cx-profile-page">
      <div className="cx-profile-cover">
        {profile.coverPhoto ? (
          <img src={profile.coverPhoto} alt="Profile cover" />
        ) : (
          <div className="cx-profile-cover-placeholder" />
        )}
      </div>

      <main className="cx-profile-content">
              <section className="cx-profile-identity">
          <div className="cx-profile-identity-top">
            <div className="cx-profile-photo">
              {profile.profilePhoto ? (
                <img src={profile.profilePhoto} alt="Profile" />
              ) : (
                <CircleUserRound size={58} />
              )}
            </div>

            <div className="cx-profile-name-area">
              <h1>{profile.accountName}</h1>
              <span>{profile.username}</span>
            </div>
          </div>

          <p className="cx-profile-bio">{profile.bio}</p>

          <div className="cx-profile-joined">
            <CalendarDays size={15} />
            <div className="cx-profile-joined-text">
              <strong>{profile.joined}</strong>
              <span>Joined</span>
            </div>
          </div>
        </section>

        <section className="cx-profile-stat-track">
          <article className="cx-profile-stat">
            <strong>{profile.friends}</strong>
            <span>Friends</span>
          </article>

          <article className="cx-profile-stat">
            <strong>{profile.views}</strong>
            <span>Views</span>
          </article>

          <article className="cx-profile-stat">
            <strong>{profile.followers}</strong>
            <span>Followers</span>
          </article>

          <article className="cx-profile-stat">
            <strong>{profile.likes}</strong>
            <span>Likes</span>
          </article>

          <article className="cx-profile-stat">
            <strong>{profile.following}</strong>
            <span>Following</span>
          </article>
        </section>

        <section className="cx-profile-actions">
          <button className="cx-profile-add-friend">
            <UserPlus size={17} />
            Add Friend
          </button>

          <button
            className="cx-profile-qr-button"
            aria-label="Show QR code"
          >
            <QrCode size={21} />
          </button>
        </section>

        <section className="cx-profile-highlight-row">
          <article className="cx-profile-highlight">
            <div className="cx-profile-highlight-icon">
              <Flame size={21} />
            </div>
            <div>
              <strong>{profile.streak} Day Streak</strong>
              <span>Current streak</span>
            </div>
          </article>

          <article className="cx-profile-highlight">
            <div className="cx-profile-highlight-icon">
              {hasMembership ? (
                <Trophy size={21} />
              ) : (
                <Heart size={21} />
              )}
            </div>
            <div>
              <strong>
                {hasMembership ? profile.membership : 'Achievements'}
              </strong>
              <span>
                {hasMembership ? 'Membership' : 'Player achievements'}
              </span>
            </div>
          </article>
        </section>

        <section className="cx-profile-section">
          <div className="cx-profile-section-heading">
            <h2>Ratings</h2>
            <button className="cx-profile-view-all">
              View All <ChevronRight size={15} />
            </button>
          </div>

          <div className="cx-profile-rating-track">
            {profileRatings.map((item) => (
              <article className="cx-profile-rating-card" key={item.name}>
                <span>{item.name}</span>
                <strong>{item.rating}</strong>
                <small>Rating</small>
              </article>
            ))}
          </div>
        </section>

        <section className="cx-profile-section">
          <div className="cx-profile-section-heading">
            <h2>Game History</h2>
            <button className="cx-profile-view-all">
              View All <ChevronRight size={15} />
            </button>
          </div>

          <div className="cx-profile-game-list">
            {profileGames.map((game, index) => (
              <article
                className="cx-profile-game-row"
                key={`${game.opponent}-${index}`}
              >
                <div className={`cx-profile-game-result ${game.result.toLowerCase()}`}>
                  {game.result}
                </div>

                <div className="cx-profile-game-info">
                  <strong>{game.opponent}</strong>
                  <span>{game.mode}</span>
                </div>

                <strong className={`cx-profile-game-rating ${game.result.toLowerCase()}`}>
                  {game.rating}
                </strong>

                <ChevronRight size={17} />
              </article>
            ))}
          </div>
        </section>

        <section className="cx-profile-section">
          <div className="cx-profile-section-heading">
            <h2>Friends</h2>
            <button className="cx-profile-view-all">
              View All <ChevronRight size={15} />
            </button>
          </div>

          <div className="cx-profile-friends-track">
            {profileFriends.map((friend) => (
              <article className="cx-profile-friend-card" key={friend}>
                <div className="cx-profile-friend-avatar">
                  <CircleUserRound size={29} />
                </div>
                <strong>{friend}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="cx-profile-section cx-profile-achievements-section">
          <div className="cx-profile-section-heading">
            <h2>Achievements</h2>
            <button className="cx-profile-view-all">
              View All <ChevronRight size={15} />
            </button>
          </div>

          <div className="cx-profile-achievement-list">
            {achievements.map((achievement) => (
              <article
                className="cx-profile-achievement"
                key={achievement.name}
              >
                <div className="cx-profile-achievement-icon">
                  <Trophy size={20} />
                </div>

                <div>
                  <strong>{achievement.name}</strong>
                  <span>{achievement.description}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProfilePage
