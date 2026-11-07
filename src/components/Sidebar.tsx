
import { NavLink } from 'react-router-dom'
import {
  House,
  Swords,
  Puzzle,
  GraduationCap,
  AlignJustify, 
  Video,
  Users,
  ShoppingBag,
  BarChart3,
  Settings,
  Building2,
} from 'lucide-react'

const navigation = [
  {
    title: 'MAIN',
    items: [
      { label: 'Home', path: '/', icon: House },
      { label: 'Play', path: '/play', icon: Swords },
      { label: 'Puzzles', path: '/puzzles', icon: Puzzle },
      { label: 'Learn', path: '/learn', icon: GraduationCap },
      { label: 'Watch', path: '/watch', icon: Video },
    ],
  },
  {
    title: 'COMPETITION & COMMUNITY',
    items: [
      { label: 'More', path: '/more', icon: AlignJustify },
      { label: 'Community', path: '/community', icon: Users },
      { label: 'Ratings', path: '/ratings', icon: BarChart3 },
    ],
  },
  {
    title: 'COMPANY',
    items: [
      { label: 'Corporate Management', path: '/corporate', icon: Building2 },
      { label: 'Shop', path: '/shop', icon: ShoppingBag },
      { label: 'Settings', path: '/settings', icon: Settings },
    ],
  },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">C</div>
        <div>
          <div className="sidebar-brand-name">CheckmaîtréX</div>
          <div className="sidebar-brand-caption">OFFICIAL PLATFORM</div>
        </div>
      </div>

      <nav className="sidebar-navigation">
        {navigation.map((section) => (
          <div className="sidebar-section" key={section.title}>
            <div className="sidebar-section-title">
              {section.title}
            </div>

            {section.items.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `sidebar-link${isActive ? ' active' : ''}`
                  }
                >
                  <Icon size={19} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-label">
          CHECKMAÎTRÉX COMPANY
        </div>
        <div className="sidebar-footer-version">
          Web Platform
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
