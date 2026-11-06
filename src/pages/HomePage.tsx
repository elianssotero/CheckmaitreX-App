
import {
  Swords,
  Puzzle,
  GraduationCap,
  Trophy,
  Users,
  ArrowRight,
  Play,
  ChevronRight,
  Crown,
} from 'lucide-react'

const quickActions = [
  {
    title: 'Play Chess',
    description: 'Start a chess game',
    icon: Swords,
    path: '/play',
  },
  {
    title: 'Solve Puzzles',
    description: 'Improve your tactics',
    icon: Puzzle,
    path: '/puzzles',
  },
  {
    title: 'Learn Chess',
    description: 'Explore chess lessons',
    icon: GraduationCap,
    path: '/learn',
  },
  {
    title: 'Tournaments',
    description: 'Compete with players',
    icon: Trophy,
    path: '/tournaments',
  },
]

function HomePage() {
  return (
    <div className="page-container home-page">
      <header className="home-header">
        <div>
          <div className="home-eyebrow">
            CHECKMAÎTRÉX COMPANY
          </div>
          <h1>
            Welcome to <span>CheckmaîtréX</span>
          </h1>
          <p>
            Your chess journey starts here.
          </p>
        </div>

        <button className="home-profile-button" type="button">
          <Users size={18} />
          <span>Community</span>
        </button>
      </header>

      <section className="home-hero">
        <div className="home-hero-content">
          <div className="home-hero-label">
            <Crown size={15} />
            THE OFFICIAL CHESS PLATFORM
          </div>

          <h2>
            Think. Play.
            <br />
            <span>Master the Game.</span>
          </h2>

          <p>
            Play chess, sharpen your skills, explore new strategies,
            and become part of the CheckmaîtréX community.
          </p>

          <div className="home-hero-actions">
            <button className="btn btn-primary" type="button">
              <Play size={17} fill="currentColor" />
              Play Now
            </button>

            <button className="btn btn-secondary" type="button">
              Explore Platform
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="home-hero-decoration" aria-hidden="true">
          <Crown size={112} strokeWidth={0.8} />
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <div>
            <h2>Quick Access</h2>
            <p>Choose where you want to begin.</p>
          </div>
        </div>

        <div className="quick-actions-grid">
          {quickActions.map((action) => {
            const Icon = action.icon

            return (
              <a
                href={action.path}
                className="quick-action-card"
                key={action.title}
              >
                <div className="quick-action-icon">
                  <Icon size={22} />
                </div>

                <div className="quick-action-info">
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </div>

                <ChevronRight
                  className="quick-action-arrow"
                  size={18}
                />
              </a>
            )
          })}
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <div>
            <h2>Featured Activity</h2>
            <p>Discover what's happening on the platform.</p>
          </div>

          <button className="home-text-link" type="button">
            View All
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="featured-activity-card">
          <div className="featured-activity-content">
            <span className="featured-activity-tag">
              FEATURED
            </span>

            <h3>Your Next Chess Challenge</h3>

            <p>
              Explore puzzles, training activities, and competitive
              opportunities designed to improve your game.
            </p>

            <button className="btn btn-primary" type="button">
              Explore Activities
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="featured-activity-symbol">
            <Trophy size={76} strokeWidth={1} />
          </div>
        </div>
      </section>

      <section className="home-section home-community">
        <div className="section-heading">
          <div>
            <h2>Community</h2>
            <p>Connect with the CheckmaîtréX community.</p>
          </div>
        </div>

        <div className="community-placeholder">
          <Users size={30} />
          <h3>Your chess community awaits.</h3>
          <p>
            Player profiles, friends, and community features
            will be developed in this section.
          </p>
        </div>
      </section>
    </div>
  )
}

export default HomePage
