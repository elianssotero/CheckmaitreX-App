import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Bookmark,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Compass,
  Database,
  Download,
  Eye,
  FileText,
  Flag,
  GraduationCap,
  Heart,
  History,
  Info,
  Languages,
  Library,
  LockKeyhole,
  Mail,
  MessageCircle,
  Newspaper,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Swords,
  Trophy,
  UserRound,
  Users,
  Video,
  X,
  type LucideIcon,
} from 'lucide-react'
MorePage.css

type MoreItem = {
  label: string
  description: string
  icon: LucideIcon
  to?: string
}

type MoreSection = {
  title: string
  description: string
  icon: LucideIcon
  items: MoreItem[]
}

const sections: MoreSection[] = [
  {
    title: 'PLAY & ANALYSIS',
    description: 'Chess tools and improvement features',
    icon: Swords,
    items: [
      {
        label: 'Analysis',
        description: 'Review games and examine chess positions.',
        icon: Activity,
      },
      {
        label: 'Explorer',
        description: 'Explore openings, moves, and chess positions.',
        icon: Compass,
      },
      {
        label: 'Practice',
        description: 'Improve through guided chess exercises.',
        icon: GraduationCap,
      },
      {
        label: 'Insights',
        description: 'Review your playing patterns and performance.',
        icon: BarChart3,
      },
      {
        label: 'Vision',
        description: 'Develop board awareness and visualization.',
        icon: Eye,
      },
      {
        label: 'Solo Chess',
        description: 'Explore individual chess challenges.',
        icon: Sparkles,
      },
      {
        label: 'Opening Reference',
        description: 'Browse chess openings and variations.',
        icon: BookOpen,
      },
      {
        label: 'Chess Database',
        description: 'Explore a library of chess games and positions.',
        icon: Database,
      },
      {
        label: 'Game Import',
        description: 'Prepare to import and review your chess games.',
        icon: FileText,
      },
      {
        label: 'PGN Library',
        description: 'Organize your saved PGN chess files.',
        icon: Library,
      },
    ],
  },
  {
    title: 'COMPETITION & COMMUNITY',
    description: 'Connect with players and club activities',
    icon: Users,
    items: [
      {
        label: 'Events',
        description: 'Discover upcoming club events.',
        icon: CalendarDays,
      },
      {
        label: 'Tournaments',
        description: 'Explore tournament information.',
        icon: Trophy,
      },
      {
        label: 'Leaderboard',
        description: 'View player rankings and standings.',
        icon: Award,
      },
      {
        label: 'Friends',
        description: 'Connect with other chess players.',
        icon: Heart,
      },
      {
        label: 'Messages',
        description: 'Access your player conversations.',
        icon: Mail,
      },
      {
        label: 'Forums',
        description: 'Join chess discussions and community topics.',
        icon: MessageCircle,
      },
      {
        label: 'Clubs & Teams',
        description: 'Discover chess groups and teams.',
        icon: ShieldCheck,
      },
      {
        label: 'Player Directory',
        description: 'Browse the player community.',
        icon: Users,
      },
      {
        label: 'Community Challenges',
        description: 'Explore shared chess challenges.',
        icon: Flag,
      },
      {
        label: 'Chess Calendar',
        description: 'Keep track of chess activities and events.',
        icon: CalendarDays,
      },
    ],
  },
  {
    title: 'MEDIA & RESOURCES',
    description: 'Chess videos, articles, and learning materials',
    icon: Video,
    items: [
      {
        label: 'Watch',
        description: 'Open the chess media center.',
        icon: Video,
        to: '/watch',
      },
      {
        label: 'Articles',
        description: 'Read chess articles and educational content.',
        icon: BookOpen,
      },
      {
        label: 'News',
        description: 'Read club announcements and updates.',
        icon: Newspaper,
      },
      {
        label: 'Downloads',
        description: 'Access your available downloaded materials.',
        icon: Download,
      },
      {
        label: 'Saved Items',
        description: 'Keep your favorite content in one place.',
        icon: Bookmark,
      },
      {
        label: 'Watch History',
        description: 'Review your previously watched content.',
        icon: History,
      },
      {
        label: 'Chess Glossary',
        description: 'Understand common chess terms.',
        icon: BookOpen,
      },
    ],
  },
  {
    title: 'PERSONAL CHESS CENTER',
    description: 'Your progress, identity, and achievements',
    icon: UserRound,
    items: [
      {
        label: 'My Profile',
        description: 'View your player profile.',
        icon: UserRound,
        to: '/profile',
      },
      {
        label: 'Chess Statistics',
        description: 'Review your chess statistics.',
        icon: BarChart3,
      },
      {
        label: 'Achievements',
        description: 'Track your milestones and accomplishments.',
        icon: Award,
      },
      {
        label: 'Daily Goals',
        description: 'Manage your personal chess goals.',
        icon: CheckCircle2,
      },
      {
        label: 'Training Tracker',
        description: 'Track lessons, puzzles, and training progress.',
        icon: Activity,
      },
      {
        label: 'Chess Journal',
        description: 'Keep notes about your chess journey.',
        icon: FileText,
      },
      {
        label: 'Personal Records',
        description: 'Review your best results and records.',
        icon: Trophy,
      },
      {
        label: 'Activity Feed',
        description: 'Review your recent chess activity.',
        icon: History,
      },
    ],
  },
  {
    title: 'ACCOUNT & SUPPORT',
    description: 'Manage your account and preferences',
    icon: Settings,
    items: [
      {
        label: 'Membership',
        description: 'Review club membership information.',
        icon: ShieldCheck,
      },
      {
        label: 'Notifications',
        description: 'Manage your notification preferences.',
        icon: Bell,
      },
      {
        label: 'Privacy & Security',
        description: 'Review account privacy and security options.',
        icon: LockKeyhole,
      },
      {
        label: 'Settings',
        description: 'Manage your platform preferences.',
        icon: Settings,
      },
      {
        label: 'Language',
        description: 'Choose your preferred language.',
        icon: Languages,
      },
      {
        label: 'Help Center',
        description: 'Find help and answers to common questions.',
        icon: CircleHelp,
      },
      {
        label: 'Feedback & Suggestions',
        description: 'Share ideas and suggestions for the platform.',
        icon: MessageCircle,
      },
      {
        label: 'Report a Problem',
        description: 'Report an issue with the platform.',
        icon: Flag,
      },
      {
        label: 'About the Club',
        description: 'Learn more about CheckmaîtréX Chess Club.',
        icon: Info,
      },
    ],
  },
]

function MorePage() {
  const [search, setSearch] = useState('')
  const [openSections, setOpenSections] = useState<string[]>([
    'PLAY & ANALYSIS',
  ])
  const [recentItems, setRecentItems] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState<MoreItem | null>(null)

  const normalizedSearch = search.trim().toLowerCase()

  const filteredSections = sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        if (!normalizedSearch) return true

        return (
          item.label.toLowerCase().includes(normalizedSearch) ||
          item.description.toLowerCase().includes(normalizedSearch) ||
          section.title.toLowerCase().includes(normalizedSearch)
        )
      }),
    }))
    .filter((section) => section.items.length > 0)

  const recentItemsData = recentItems
    .map((label) =>
      sections.flatMap((section) => section.items).find(
        (item) => item.label === label,
      ),
    )
    .filter((item): item is MoreItem => Boolean(item))

  function toggleSection(title: string) {
    setOpenSections((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title],
    )
  }

  function recordRecent(item: MoreItem) {
    setRecentItems((current) => [
      item.label,
      ...current.filter((label) => label !== item.label),
    ].slice(0, 5))
  }

  function handleItemClick(item: MoreItem) {
    recordRecent(item)
    setSelectedItem(item)
  }

  function renderItem(item: MoreItem) {
    const Icon = item.icon

    const content = (
      <>
        <span className="more-item-icon">
          <Icon size={19} strokeWidth={1.8} />
        </span>

        <span className="more-item-copy">
          <strong>{item.label}</strong>
          <small>{item.description}</small>
        </span>

        <ChevronRight
          className="more-item-arrow"
          size={17}
        />
      </>
    )

    if (item.to) {
      return (
        <Link
          className="more-item"
          key={item.label}
          to={item.to}
          onClick={() => recordRecent(item)}
        >
          {content}
        </Link>
      )
    }

    return (
      <button
        className="more-item"
        key={item.label}
        type="button"
        onClick={() => handleItemClick(item)}
      >
        {content}
      </button>
    )
  }

  return (
    <main className="cx-more-page">
      <header className="cx-more-header">
        <div>
          <span className="cx-more-eyebrow">
            CHECKMAÎTRÉX CHESS CLUB
          </span>

          <h1>More</h1>

          <p>
            Your central hub for chess tools, community,
            resources, and account management.
          </p>
        </div>

        <div className="cx-more-header-icon">
          <Compass size={27} strokeWidth={1.5} />
        </div>
      </header>

      <section className="cx-more-search">
        <Search size={19} />

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search tools, features, and resources..."
          aria-label="Search More"
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            aria-label="Clear search"
          >
            <X size={17} />
          </button>
        )}
      </section>

      {!normalizedSearch && recentItemsData.length > 0 && (
        <section className="cx-more-recent">
          <div className="cx-more-section-heading">
            <div>
              <span className="cx-more-section-overline">
                QUICK ACCESS
              </span>
              <h2>Recently Used</h2>
            </div>

            <History size={19} />
          </div>

          <div className="cx-more-recent-list">
            {recentItemsData.map(renderItem)}
          </div>
        </section>
      )}

      <div className="cx-more-sections">
        {filteredSections.map((section) => {
          const Icon = section.icon
          const isOpen =
            normalizedSearch.length > 0 ||
            openSections.includes(section.title)

          return (
            <section
              className="cx-more-section"
              key={section.title}
            >
              <button
                className="cx-more-section-toggle"
                type="button"
                onClick={() => toggleSection(section.title)}
                aria-expanded={isOpen}
              >
                <span className="cx-more-section-icon">
                  <Icon size={19} />
                </span>

                <span className="cx-more-section-copy">
                  <strong>{section.title}</strong>
                  <small>{section.description}</small>
                </span>

                <span className="cx-more-section-count">
                  {section.items.length}
                </span>

                <ChevronDown
                  className={isOpen ? 'is-open' : ''}
                  size={19}
                />
              </button>

              {isOpen && (
                <div className="cx-more-item-list">
                  {section.items.map(renderItem)}
                </div>
              )}
            </section>
          )
        })}

        {filteredSections.length === 0 && (
          <div className="cx-more-empty">
            <Search size={27} />
            <strong>No results found</strong>
            <span>
              Try another keyword or clear your search.
            </span>
          </div>
        )}
      </div>

      {selectedItem && (
        <div
          className="cx-more-modal-backdrop"
          onClick={() => setSelectedItem(null)}
          role="presentation"
        >
          <section
            className="cx-more-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cx-more-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="cx-more-modal-close"
              type="button"
              onClick={() => setSelectedItem(null)}
              aria-label="Close feature information"
            >
              <X size={19} />
            </button>

            <span className="cx-more-modal-icon">
              <selectedItem.icon size={27} />
            </span>

            <span className="cx-more-eyebrow">
              CHECKMAÎTRÉX FEATURE
            </span>

            <h2 id="cx-more-modal-title">
              {selectedItem.label}
            </h2>

            <p>{selectedItem.description}</p>

            <div className="cx-more-coming-soon">
              <Sparkles size={16} />
              <span>
                This section is prepared for future development.
              </span>
            </div>

            <button
              className="cx-more-modal-button"
              type="button"
              onClick={() => setSelectedItem(null)}
            >
              Close
            </button>
          </section>
        </div>
      )}

      <footer className="cx-more-footer">
        <span>CHECKMAÎTRÉX CHESS CLUB</span>
        <small>More tools. More possibilities.</small>
      </footer>
    </main>
  )
}

export default MorePage
