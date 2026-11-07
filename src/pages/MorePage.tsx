import {
  Activity,
  BarChart3,
  BookOpen,
  CalendarDays,
  Eye,
  Heart,
  HelpCircle,
  Lightbulb,
  MessageCircle,
  Newspaper,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Swords,
  Trophy,
  Users,
  Video,
  type LucideIcon,
} from 'lucide-react'

type MoreItem = {
  label: string
  icon: LucideIcon
}

type MoreSection = {
  title: string
  items: MoreItem[]
}

const sections: MoreSection[] = [
  {
    title: 'PLAY & IMPROVE',
    items: [
      { label: 'Analysis', icon: Activity },
      { label: 'Explorer', icon: Search },
      { label: 'Practice', icon: Swords },
      { label: 'Insights', icon: Lightbulb },
      { label: 'Vision', icon: Eye },
      { label: 'Solo Chess', icon: Sparkles },
    ],
  },
  {
    title: 'COMPETITION & COMMUNITY',
    items: [
      { label: 'Events', icon: CalendarDays },
      { label: 'Leaderboard', icon: Trophy },
      { label: 'Forums', icon: MessageCircle },
    ],
  },
  {
    title: 'WATCH & READ',
    items: [
      { label: 'CCC-TV', icon: Video },
      { label: 'Articles', icon: BookOpen },
      { label: 'Watch', icon: Video },
      { label: 'News', icon: Newspaper },
    ],
  },
  {
    title: 'YOUR ACCOUNT',
    items: [
      { label: 'CCC-Membership', icon: ShieldCheck },
      { label: 'Profile', icon: Users },
      { label: 'Stats', icon: BarChart3 },
      { label: 'Theme', icon: Sparkles },
      { label: 'Friends', icon: Heart },
      { label: 'Messages', icon: MessageCircle },
      { label: 'Settings', icon: Settings },
      { label: 'Support', icon: HelpCircle },
    ],
  },
]

function MorePage() {
  return (
    <div className="more-page">
      <header className="more-header">
        <div>
          <span className="more-eyebrow">
            CHECKMAÎTRÉX PLATFORM
          </span>
          <h1>More</h1>
          <p>
            Explore additional tools, community features
            and account options.
          </p>
        </div>
      </header>

      <div className="more-sections">
        {sections.map((section) => (
          <section className="more-section" key={section.title}>
            <h2>{section.title}</h2>

            <div className="more-grid">
              {section.items.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    className="more-item"
                    key={item.label}
                  >
                    <span className="more-item-icon">
                      <Icon size={20} strokeWidth={1.8} />
                    </span>

                    <span className="more-item-label">
                      {item.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <footer className="more-footer">
        CHECKMAÎTRÉX CHESS CLUB
      </footer>
    </div>
  )
}

export default MorePage
