
import {
  ArrowLeft,
  Check,
  Search,
  CircleOff,
} from 'lucide-react'
import './ProfilePage.css'

type CoverOption = {
  id: string
  name: string
  category: string
  background: string
  accent: string
  pattern: string
}

const coverOptions: CoverOption[] = [
  {
    id: 'ccc-golden-empire',
    name: 'Golden Empire',
    category: 'CheckmaîtréX',
    background: '#17130b',
    accent: '#c9a34d',
    pattern: 'gold',
  },
  {
    id: 'ccc-royal-board',
    name: 'Royal Board',
    category: 'CheckmaîtréX',
    background: '#171717',
    accent: '#d9b45b',
    pattern: 'chess',
  },
  {
    id: 'ccc-dark-knight',
    name: 'Dark Knight',
    category: 'CheckmaîtréX',
    background: '#101216',
    accent: '#9e854c',
    pattern: 'knight',
  },
  {
    id: 'ccc-champions',
    name: 'Champions',
    category: 'CheckmaîtréX',
    background: '#282014',
    accent: '#e4bd65',
    pattern: 'crown',
  },
  {
    id: 'abstract-aurora',
    name: 'Aurora',
    category: 'Abstract',
    background: '#17252b',
    accent: '#76b9bd',
    pattern: 'aurora',
  },
  {
    id: 'abstract-midnight',
    name: 'Midnight',
    category: 'Abstract',
    background: '#151725',
    accent: '#777fae',
    pattern: 'midnight',
  },
  {
    id: 'abstract-violet',
    name: 'Violet Horizon',
    category: 'Abstract',
    background: '#241b32',
    accent: '#aa85c9',
    pattern: 'violet',
  },
  {
    id: 'abstract-silver',
    name: 'Silver Lines',
    category: 'Abstract',
    background: '#25282b',
    accent: '#aeb8c0',
    pattern: 'silver',
  },
  {
    id: 'nature-mountains',
    name: 'Mountain Range',
    category: 'Nature',
    background: '#17252d',
    accent: '#91b3c1',
    pattern: 'mountains',
  },
  {
    id: 'nature-forest',
    name: 'Deep Forest',
    category: 'Nature',
    background: '#14251d',
    accent: '#78a987',
    pattern: 'forest',
  },
  {
    id: 'nature-ocean',
    name: 'Ocean Calm',
    category: 'Nature',
    background: '#10232d',
    accent: '#6eb5c9',
    pattern: 'ocean',
  },
  {
    id: 'nature-sunset',
    name: 'Sunset',
    category: 'Nature',
    background: '#38231f',
    accent: '#e6a16c',
    pattern: 'sunset',
  },
  {
    id: 'minimal-dark',
    name: 'Pure Dark',
    category: 'Minimalist',
    background: '#151515',
    accent: '#777777',
    pattern: 'minimal',
  },
  {
    id: 'minimal-gold',
    name: 'Soft Gold',
    category: 'Minimalist',
    background: '#292216',
    accent: '#c5a45e',
    pattern: 'minimal-gold',
  },
  {
    id: 'minimal-blue',
    name: 'Deep Blue',
    category: 'Minimalist',
    background: '#172332',
    accent: '#7598bc',
    pattern: 'minimal-blue',
  },
  {
    id: 'minimal-stone',
    name: 'Stone',
    category: 'Minimalist',
    background: '#292929',
    accent: '#999999',
    pattern: 'stone',
  },
]

const categories = [
  'All',
  'CheckmaîtréX',
  'Abstract',
  'Nature',
  'Minimalist',
]

function createCoverSvg(cover: CoverOption) {
  let artwork = ''

  switch (cover.pattern) {
    case 'gold':
      artwork = `
        <circle cx="760" cy="70" r="230" fill="none" stroke="${cover.accent}" stroke-width="2" opacity=".35"/>
        <circle cx="760" cy="70" r="170" fill="none" stroke="${cover.accent}" stroke-width="2" opacity=".3"/>
        <path d="M0 250 L420 0 M180 300 L620 0 M480 300 L800 0" stroke="${cover.accent}" stroke-width="2" opacity=".25"/>
      `
      break

    case 'chess':
      artwork = `
        <g fill="${cover.accent}" opacity=".16">
          ${Array.from({ length: 24 }, (_, i) => {
            const x = (i % 8) * 110
            const y = Math.floor(i / 8) * 110
            return (i + Math.floor(i / 8)) % 2 === 0
              ? `<rect x="${x}" y="${y}" width="110" height="110"/>`
              : ''
          }).join('')}
        </g>
      `
      break

    case 'knight':
      artwork = `
        <path d="M550 270 L590 130 L650 85 L730 110 L790 200 L760 270 Z" fill="${cover.accent}" opacity=".22"/>
        <path d="M610 145 L655 100 L710 130 L680 165 Z" fill="${cover.accent}" opacity=".5"/>
        <path d="M540 270 H800" stroke="${cover.accent}" stroke-width="3" opacity=".5"/>
      `
      break

    case 'crown':
      artwork = `
        <path d="M530 235 L565 100 L640 175 L700 70 L755 175 L815 100 L845 235 Z" fill="${cover.accent}" opacity=".24" stroke="${cover.accent}" stroke-width="4"/>
        <path d="M555 260 H820" stroke="${cover.accent}" stroke-width="5" opacity=".6"/>
      `
      break

    case 'aurora':
      artwork = `
        <path d="M0 230 Q180 40 360 170 T800 80 L800 300 H0Z" fill="${cover.accent}" opacity=".18"/>
        <path d="M0 260 Q200 100 400 200 T800 110" fill="none" stroke="${cover.accent}" stroke-width="18" opacity=".3"/>
      `
      break

    case 'midnight':
      artwork = `
        <circle cx="680" cy="100" r="75" fill="${cover.accent}" opacity=".5"/>
        <circle cx="715" cy="75" r="75" fill="${cover.background}"/>
        <g fill="${cover.accent}" opacity=".45">
          <circle cx="120" cy="70" r="3"/><circle cx="270" cy="160" r="4"/>
          <circle cx="460" cy="55" r="3"/><circle cx="570" cy="220" r="3"/>
        </g>
      `
      break

    case 'violet':
      artwork = `
        <path d="M380 300 L650 0 L800 0 L800 300Z" fill="${cover.accent}" opacity=".18"/>
        <path d="M520 300 L730 0" stroke="${cover.accent}" stroke-width="3" opacity=".45"/>
      `
      break

    case 'silver':
      artwork = `
        <path d="M450 300 L800 0 M550 300 L800 80 M650 300 L800 160" stroke="${cover.accent}" stroke-width="3" opacity=".3"/>
      `
      break

    case 'mountains':
      artwork = `
        <path d="M0 280 L180 95 L300 220 L440 65 L650 280Z" fill="${cover.accent}" opacity=".35"/>
        <path d="M350 280 L560 110 L800 280Z" fill="${cover.accent}" opacity=".5"/>
        <path d="M180 95 L230 155 L195 145Z M440 65 L500 145 L455 125Z" fill="#ffffff" opacity=".45"/>
      `
      break

    case 'forest':
      artwork = `
        <g fill="${cover.accent}" opacity=".35">
          <path d="M500 280 L590 65 L680 280Z"/>
          <path d="M620 280 L700 100 L780 280Z"/>
          <path d="M420 280 L490 130 L560 280Z"/>
        </g>
      `
      break

    case 'ocean':
      artwork = `
        <path d="M0 170 Q180 100 360 170 T800 170 V300 H0Z" fill="${cover.accent}" opacity=".28"/>
        <path d="M0 220 Q180 150 360 220 T800 220" fill="none" stroke="${cover.accent}" stroke-width="5" opacity=".6"/>
        <path d="M0 260 Q180 190 360 260 T800 260" fill="none" stroke="${cover.accent}" stroke-width="3" opacity=".4"/>
      `
      break

    case 'sunset':
      artwork = `
        <circle cx="650" cy="110" r="90" fill="${cover.accent}" opacity=".5"/>
        <path d="M0 230 Q200 160 400 230 T800 230 V300 H0Z" fill="${cover.accent}" opacity=".2"/>
      `
      break

    case 'minimal-gold':
    case 'minimal-blue':
    case 'stone':
      artwork = `
        <circle cx="690" cy="140" r="100" fill="none" stroke="${cover.accent}" stroke-width="2" opacity=".3"/>
        <path d="M500 300 L800 0" stroke="${cover.accent}" stroke-width="2" opacity=".2"/>
      `
      break

    default:
      artwork = `
        <path d="M500 300 L800 0" stroke="${cover.accent}" stroke-width="2" opacity=".25"/>
      `
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="300" viewBox="0 0 800 300">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${cover.background}"/>
          <stop offset="100%" stop-color="#080808"/>
        </linearGradient>
      </defs>
      <rect width="800" height="300" fill="url(#bg)"/>
      ${artwork}
      <path d="M0 295 H800" stroke="${cover.accent}" stroke-width="3" opacity=".5"/>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

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

function readCurrentCover() {
  try {
    const staged = localStorage.getItem('cx-profile-cover')
    if (staged !== null) return staged

    const saved = localStorage.getItem('cx-profile-preview')
    if (saved) {
      const profile = JSON.parse(saved)
      return profile.coverPhoto || ''
    }

    return ''
  } catch {
    return ''
  }
}

export default function ProfileCoverSelectionPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(readCurrentCover)

  const filteredCovers = useMemo(() => {
    return coverOptions.filter((cover) => {
      const matchesCategory =
        category === 'All' || cover.category === category

      const matchesSearch =
        `${cover.name} ${cover.category}`
          .toLowerCase()
          .includes(search.trim().toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [category, search])
  const selectedCover = coverOptions.find(
    (cover) => createCoverSvg(cover) === selected
  )
  const confirmSelection = () => {
  localStorage.setItem('cx-profile-cover', selected)
  navigate('/profile/edit')
}


  const clearSelection = () => {
    setSelected('')
  }

  return (
    <div className="cx-profile-subpage">
      <PageHeader title="Choose Cover" />

      <main className="cx-profile-selection-content">
        <div className="cx-profile-country-intro">
          <span className="cx-profile-country-eyebrow">
            PROFILE CUSTOMIZATION
          </span>

          <h2>Cover Library</h2>

          <p>
            Choose a cover design for your profile.
            You can also upload your own cover photo
            from Edit Profile.
          </p>
        </div>

        <div className="cx-profile-country-search">
          <Search size={18} />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search cover designs..."
            aria-label="Search cover designs"
          />
        </div>

        <div className="cx-profile-avatar-categories">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={category === item ? 'active' : ''}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <section className="cx-profile-cover-selected">
          <span className="cx-profile-country-section-label">
            COVER PREVIEW
          </span>

{selectedCover ? (
  <img
    src={createCoverSvg(selectedCover)}
    alt={`${selectedCover.name} cover preview`}
  />
) : selected ? (
  <img
    src={selected}
    alt="Custom cover preview"
  />
) : (
  <div className="cx-profile-cover-empty">
    <CircleOff size={25} />
    <span>No cover selected</span>
  </div>
)}

<strong>
  {selectedCover?.name || (selected ? 'Custom Cover' : 'No Cover')}
</strong>

{selectedCover && (
  <span>{selectedCover.category}</span>
)}

                        {selected !== '' && (
              <button
                type="button"
                onClick={clearSelection}
              >
                Remove Selection
              </button>
            )}
        </section>

        <section className="cx-profile-cover-results">
          <div className="cx-profile-country-results-heading">
            <h2>Available Covers</h2>
            <span>{filteredCovers.length} designs</span>
          </div>

          <div className="cx-profile-cover-grid">
            {filteredCovers.map((cover) => {
              const coverImage = createCoverSvg(cover)
              const isSelected = selected === coverImage

              return (
                <button
                  type="button"
                  key={cover.id}
                  className={`cx-profile-cover-option ${
                    isSelected ? 'selected' : ''
                  }`}
                  onClick={() => setSelected(coverImage)}
                >
                  <img
                    src={coverImage}
                    alt={cover.name}
                  />

                  <span className="cx-profile-cover-option-info">
                    <strong>{cover.name}</strong>
                    <small>{cover.category}</small>
                  </span>

                  {isSelected && (
                    <span className="cx-profile-avatar-check">
                      <Check size={15} />
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {filteredCovers.length === 0 && (
            <div className="cx-profile-country-empty">
              <Search size={25} />
              <strong>No matching covers</strong>
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
            Use Selected Cover
          </button>
        </div>
      </main>
    </div>
  )
}
