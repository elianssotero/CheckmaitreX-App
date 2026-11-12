
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Check,
  Search,
  Shield,
  Crown,
  Swords,
  Trophy,
  Star,
  Flame,
  Gem,
  Zap,
  Target,
  Sparkles,
  CircleUserRound,
  PawPrint,
  Mountain,
  Gamepad2,
  Leaf,
  UserRound,
} from 'lucide-react'
import './ProfilePage.css'

type AvatarOption = {
  id: string
  name: string
  category: string
  icon: typeof Crown
  background: string
  color: string
}

const avatarOptions: AvatarOption[] = [
  {
    id: 'ccc-knight',
    name: 'Golden Knight',
    category: 'CheckmaîtréX',
    icon: Swords,
    background: 'linear-gradient(145deg, #332713, #a47a2d)',
    color: '#ffe4a0',
  },
  {
    id: 'ccc-king',
    name: 'Royal King',
    category: 'CheckmaîtréX',
    icon: Crown,
    background: 'linear-gradient(145deg, #171717, #806020)',
    color: '#f4d27d',
  },
  {
    id: 'ccc-shield',
    name: 'Golden Shield',
    category: 'CheckmaîtréX',
    icon: Shield,
    background: 'linear-gradient(145deg, #292929, #72521c)',
    color: '#f3d68b',
  },
  {
    id: 'ccc-champion',
    name: 'Champion',
    category: 'CheckmaîtréX',
    icon: Trophy,
    background: 'linear-gradient(145deg, #352711, #a67d31)',
    color: '#ffe5a3',
  },
  {
    id: 'minimal-star',
    name: 'Starlight',
    category: 'Minimalist',
    icon: Star,
    background: 'linear-gradient(145deg, #20202a, #55536b)',
    color: '#eeeaff',
  },
  {
    id: 'minimal-gem',
    name: 'Crystal',
    category: 'Minimalist',
    icon: Gem,
    background: 'linear-gradient(145deg, #142a35, #28647a)',
    color: '#a9efff',
  },
  {
    id: 'minimal-spark',
    name: 'Radiance',
    category: 'Minimalist',
    icon: Sparkles,
    background: 'linear-gradient(145deg, #30231c, #79513c)',
    color: '#ffd6b4',
  },
  {
    id: 'minimal-circle',
    name: 'Classic',
    category: 'Minimalist',
    icon: CircleUserRound,
    background: 'linear-gradient(145deg, #252525, #555555)',
    color: '#e6e6e6',
  },
  {
    id: 'nature-leaf',
    name: 'Evergreen',
    category: 'Nature',
    icon: Leaf,
    background: 'linear-gradient(145deg, #152c20, #34764c)',
    color: '#c0f1c9',
  },
  {
    id: 'nature-mountain',
    name: 'Summit',
    category: 'Nature',
    icon: Mountain,
    background: 'linear-gradient(145deg, #202b36, #58778d)',
    color: '#d5e8f5',
  },
  {
    id: 'animal-paw',
    name: 'Wild Spirit',
    category: 'Animals',
    icon: PawPrint,
    background: 'linear-gradient(145deg, #33261b, #80603d)',
    color: '#f4d5ae',
  },
  {
    id: 'gaming-controller',
    name: 'Player One',
    category: 'Gaming',
    icon: Gamepad2,
    background: 'linear-gradient(145deg, #211b38, #59418c)',
    color: '#d9caff',
  },
  {
    id: 'gaming-flame',
    name: 'Blaze',
    category: 'Gaming',
    icon: Flame,
    background: 'linear-gradient(145deg, #351a18, #9c3f27)',
    color: '#ffc1a4',
  },
  {
    id: 'gaming-energy',
    name: 'Volt',
    category: 'Gaming',
    icon: Zap,
    background: 'linear-gradient(145deg, #282516, #82702b)',
    color: '#fff0a6',
  },
  {
    id: 'abstract-target',
    name: 'Focus',
    category: 'Abstract',
    icon: Target,
    background: 'linear-gradient(145deg, #1b2931, #356d79)',
    color: '#b9f2f5',
  },
  {
    id: 'abstract-user',
    name: 'Identity',
    category: 'Abstract',
    icon: UserRound,
    background: 'linear-gradient(145deg, #29212d, #75516f)',
    color: '#f0d5ef',
  },
]

const categories = [
  'All',
  'CheckmaîtréX',
  'Minimalist',
  'Nature',
  'Animals',
  'Gaming',
  'Abstract',
]

function PageHeader({ title }: { title: string }) {
  const navigate = useNavigate()

  return (
    <header className="cx-profile-page-header">
      <button
        type="button"
        className="cx-profile-back"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <ArrowLeft size={21} />
      </button>

      <h1>{title}</h1>
      <span className="cx-profile-header-spacer" />
    </header>
  )
}

function readCurrentAvatar() {
  try {
    const staged = localStorage.getItem('cx-profile-avatar')

    if (staged) return staged

    const saved = localStorage.getItem('cx-profile-preview')

    if (saved) {
      const profile = JSON.parse(saved)
      return profile.profileAvatar || ''
    }

    return ''
  } catch {
    return ''
  }
}

export default function ProfileAvatarSelectionPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(readCurrentAvatar)

  const filteredAvatars = useMemo(() => {
    return avatarOptions.filter((avatar) => {
      const matchesCategory =
        category === 'All' || avatar.category === category

      const matchesSearch =
        `${avatar.name} ${avatar.category}`
          .toLowerCase()
          .includes(search.trim().toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [category, search])

  const selectedAvatar = avatarOptions.find(
    (avatar) => avatar.id === selected
  )

  const confirmSelection = () => {
    localStorage.setItem('cx-profile-avatar', selected)
    navigate('/profile/edit')
  }

  const removeSelection = () => {
    setSelected('')
  }

  return (
    <div className="cx-profile-subpage">
      <PageHeader title="Choose Avatar" />

      <main className="cx-profile-selection-content">
        <div className="cx-profile-country-intro">
          <span className="cx-profile-country-eyebrow">
            PROFILE CUSTOMIZATION
          </span>

          <h2>Avatar Library</h2>

          <p>
            Choose an avatar that represents your identity.
            You can also use your own uploaded photo.
          </p>
        </div>

        <div className="cx-profile-country-search">
          <Search size={18} />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search avatars..."
            aria-label="Search avatars"
          />
        </div>

        <div className="cx-profile-avatar-categories">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={
                category === item ? 'active' : ''
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <section className="cx-profile-avatar-selected">
          <span className="cx-profile-country-section-label">
            SELECTED AVATAR
          </span>

          <div className="cx-profile-avatar-preview">
            {selectedAvatar ? (
              <div
                className="cx-profile-avatar-art"
                style={{
                  background: selectedAvatar.background,
                  color: selectedAvatar.color,
                }}
              >
                <selectedAvatar.icon size={42} />
              </div>
            ) : (
              <div className="cx-profile-avatar-art default">
                <CircleUserRound size={42} />
              </div>
            )}

            <div>
              <strong>
                {selectedAvatar?.name || 'No Avatar'}
              </strong>

              <small>
                {selectedAvatar?.category ||
                  'Use your default profile picture'}
              </small>
            </div>

            {selected !== '' && (
              <button
                type="button"
                onClick={removeSelection}
                className="cx-profile-avatar-remove"
              >
                Remove
              </button>
            )}
          </div>
        </section>

        <section className="cx-profile-avatar-results">
          <div className="cx-profile-country-results-heading">
            <h2>Available Avatars</h2>
            <span>{filteredAvatars.length} designs</span>
          </div>

          <div className="cx-profile-avatar-grid">
            {filteredAvatars.map((avatar) => {
              const Icon = avatar.icon
              const isSelected = selected === avatar.id

              return (
                <button
                  type="button"
                  key={avatar.id}
                  className={`cx-profile-avatar-option ${
                    isSelected ? 'selected' : ''
                  }`}
                  onClick={() => setSelected(avatar.id)}
                >
                  <span
                    className="cx-profile-avatar-art"
                    style={{
                      background: avatar.background,
                      color: avatar.color,
                    }}
                  >
                    <Icon size={34} />
                  </span>

                  <strong>{avatar.name}</strong>
                  <small>{avatar.category}</small>

                  {isSelected && (
                    <span className="cx-profile-avatar-check">
                      <Check size={15} />
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {filteredAvatars.length === 0 && (
            <div className="cx-profile-country-empty">
              <Search size={25} />
              <strong>No matching avatars</strong>
              <span>
                Try another search term or category.
              </span>
            </div>
          )}
        </section>

        <div className="cx-profile-avatar-actions">
          <button
            type="button"
            className="cx-profile-secondary-button"
            onClick={() => navigate('/profile/edit')}
          >
            Cancel
          </button>

          <button
            type="button"
            className="cx-profile-primary-button"
            onClick={confirmSelection}
          >
            <Check size={17} />
            Use Selected Avatar
          </button>
        </div>
      </main>
    </div>
  )
}
