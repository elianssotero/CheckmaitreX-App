
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  SlidersHorizontal,
  X,
  Search,
  ChevronDown,
  ChevronRight,
  Trophy,
  Clock3,
  Users,
  CalendarDays,
  Crown,
  Swords,
  Check,
  Medal,
  Radio,
  Bookmark,
} from 'lucide-react'

import './PlayTournamentsPage.css'

type Status = 'Ended' | 'Live' | 'Upcoming'

type Tournament = {
  id: number
  name: string
  status: Status
  timeControl: string
  category: string
  variant: string
  mode: string
  minRating: number
  maxRating: number
  players: number
  capacity: number
  rounds: number
  date: string
  startTime: string
  organizer: string
  prize: string
  description: string
}

const tournaments: Tournament[] = [
  {
    id: 1,
    name: 'CCC Weekly Rapid Arena',
    status: 'Live',
    timeControl: '10+0',
    category: 'Rapid',
    variant: 'Standard',
    mode: 'Rated',
    minRating: 0,
    maxRating: 2000,
    players: 24,
    capacity: 50,
    rounds: 5,
    date: 'November 8, 2026',
    startTime: '2:00 PM',
    organizer: 'CheckmaîtréX Chess Club',
    prize: 'CCC Points',
    description: 'A weekly rapid competition for CheckmaîtréX Chess Club members and eligible participants.',
  },
  {
    id: 2,
    name: 'CCC Blitz Championship',
    status: 'Upcoming',
    timeControl: '5+0',
    category: 'Blitz',
    variant: 'Standard',
    mode: 'Rated',
    minRating: 500,
    maxRating: 2500,
    players: 32,
    capacity: 64,
    rounds: 7,
    date: 'November 10, 2026',
    startTime: '7:00 PM',
    organizer: 'CheckmaîtréX Chess Club',
    prize: 'Trophy and CCC Points',
    description: 'A competitive blitz tournament with multiple rounds and a final leaderboard.',
  },
  {
    id: 3,
    name: 'CCC Beginner Friendly Arena',
    status: 'Upcoming',
    timeControl: '10+1',
    category: 'Rapid',
    variant: 'Standard',
    mode: 'Casual',
    minRating: 0,
    maxRating: 1200,
    players: 18,
    capacity: 40,
    rounds: 5,
    date: 'November 12, 2026',
    startTime: '4:00 PM',
    organizer: 'CheckmaîtréX Chess Club',
    prize: 'Participation Recognition',
    description: 'A welcoming tournament designed for developing players.',
  },
  {
    id: 4,
    name: 'CCC Chess960 Challenge',
    status: 'Upcoming',
    timeControl: '5+3',
    category: 'Blitz',
    variant: 'Chess960',
    mode: 'Unrated',
    minRating: 0,
    maxRating: 3000,
    players: 12,
    capacity: 32,
    rounds: 5,
    date: 'November 15, 2026',
    startTime: '6:00 PM',
    organizer: 'CheckmaîtréX Chess Club',
    prize: 'CCC Points',
    description: 'Explore creative opening positions in a Chess960 competition.',
  },
  {
    id: 5,
    name: 'CCC Monthly Classical',
    status: 'Ended',
    timeControl: '30+10',
    category: 'Classical',
    variant: 'Standard',
    mode: 'Rated',
    minRating: 800,
    maxRating: 2500,
    players: 28,
    capacity: 32,
    rounds: 5,
    date: 'November 1, 2026',
    startTime: '10:00 AM',
    organizer: 'CheckmaîtréX Chess Club',
    prize: 'Trophy and CCC Points',
    description: 'The monthly classical tournament has concluded.',
  },
  {
    id: 6,
    name: 'CCC Weekend Bullet',
    status: 'Ended',
    timeControl: '2+1',
    category: 'Bullet',
    variant: 'Standard',
    mode: 'Rated',
    minRating: 0,
    maxRating: 2000,
    players: 40,
    capacity: 40,
    rounds: 9,
    date: 'November 3, 2026',
    startTime: '8:00 PM',
    organizer: 'CheckmaîtréX Chess Club',
    prize: 'CCC Points',
    description: 'A fast-paced weekend bullet tournament.',
  },
]

const statusTabs: Status[] = ['Ended', 'Live', 'Upcoming']

const timeControls = [
  'Bullet',
  'Blitz',
  'Rapid',
  'Classical',
  'Daily',
]

const variants = [
  'Standard',
  'Chess960',
  'King of the Hill',
  'Three-Check',
  'Crazyhouse',
  'Anti-Chess',
  'Atomic',
  'Horde',
  'Racing Kings',
]

const gameModes = ['Casual', 'Unrated', 'Rated', 'CCC-Rated']

function PlayTournamentsPage() {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<Status>('Live')
  const [filterOpen, setFilterOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('Starting Soon')
  const [selectedTournament, setSelectedTournament] =
    useState<Tournament | null>(null)

  const [statusFilter, setStatusFilter] = useState<Status[]>([])
  const [timeFilter, setTimeFilter] = useState<string[]>([])
  const [variantFilter, setVariantFilter] = useState<string[]>([])
  const [modeFilter, setModeFilter] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [maxRating, setMaxRating] = useState(3000)

  const [savedIds, setSavedIds] = useState<number[]>([])

  const toggleArrayValue = (
    value: string,
    current: string[],
    setter: (next: string[]) => void,
  ) => {
    setter(
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    )
  }

  const filteredTournaments = useMemo(() => {
    let result = tournaments.filter((item) => item.status === activeTab)

    if (search.trim()) {
      const query = search.toLowerCase()
      result = result.filter((item) =>
        `${item.name} ${item.organizer} ${item.category}`
          .toLowerCase()
          .includes(query),
      )
    }

    if (statusFilter.length) {
      result = result.filter((item) => statusFilter.includes(item.status))
    }

    if (timeFilter.length) {
      result = result.filter((item) => timeFilter.includes(item.category))
    }

    if (variantFilter.length) {
      result = result.filter((item) => variantFilter.includes(item.variant))
    }

    if (modeFilter.length) {
      result = result.filter((item) => modeFilter.includes(item.mode))
    }

    result = result.filter(
      (item) =>
        item.maxRating >= minRating &&
        item.minRating <= maxRating,
    )

    if (sortBy === 'Most Players') {
      result = [...result].sort((a, b) => b.players - a.players)
    } else if (sortBy === 'Fewest Players') {
      result = [...result].sort((a, b) => a.players - b.players)
    } else if (sortBy === 'Name A–Z') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [
    activeTab,
    search,
    statusFilter,
    timeFilter,
    variantFilter,
    modeFilter,
    minRating,
    maxRating,
    sortBy,
  ])

  const activeFilterCount =
    statusFilter.length +
    timeFilter.length +
    variantFilter.length +
    modeFilter.length +
    (minRating > 0 || maxRating < 3000 ? 1 : 0)

  const resetFilters = () => {
    setStatusFilter([])
    setTimeFilter([])
    setVariantFilter([])
    setModeFilter([])
    setMinRating(0)
    setMaxRating(3000)
  }

  const toggleSaved = (id: number) => {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  const featuredTournament = tournaments.find(
    (item) => item.status === 'Live',
  )

  const renderTournamentCard = (item: Tournament, featured = false) => (
    <article
      className={`cx-tournament-card ${featured ? 'featured' : ''}`}
      key={item.id}
    >
      <div className="cx-tournament-card-top">
        <div className="cx-tournament-card-heading">
          <div className="cx-tournament-icon">
            <Trophy size={22} />
          </div>
          <div className="cx-tournament-card-name">
            <h3>{item.name}</h3>
            <span>{item.organizer}</span>
          </div>
        </div>

        <span className={`cx-tournament-status ${item.status.toLowerCase()}`}>
          {item.status === 'Live' && <Radio size={12} />}
          {item.status}
        </span>
      </div>

      <div className="cx-tournament-tags">
        <span>{item.category}</span>
        <span>{item.mode}</span>
        <span>{item.variant}</span>
      </div>

      <div className="cx-tournament-info-grid">
        <div>
          <Clock3 size={15} />
          <span>
            <small>TIME CONTROL</small>
            <strong>{item.timeControl}</strong>
          </span>
        </div>

        <div>
          <Crown size={15} />
          <span>
            <small>RATING REQUIREMENT</small>
            <strong>{item.minRating}–{item.maxRating}</strong>
          </span>
        </div>

        <div>
          <Users size={15} />
          <span>
            <small>PARTICIPANTS</small>
            <strong>{item.players} / {item.capacity}</strong>
          </span>
        </div>

        <div>
          <Medal size={15} />
          <span>
            <small>ROUNDS</small>
            <strong>{item.rounds} Rounds</strong>
          </span>
        </div>
      </div>

      <div className="cx-tournament-card-bottom">
        <div className="cx-tournament-date">
          <CalendarDays size={14} />
          <span>{item.date}</span>
        </div>

        <div className="cx-tournament-card-actions">
          <button
            type="button"
            className={`cx-tournament-save ${savedIds.includes(item.id) ? 'saved' : ''}`}
            onClick={() => toggleSaved(item.id)}
            aria-label="Save tournament"
            aria-pressed={savedIds.includes(item.id)}
          >
            <Bookmark size={17} />
          </button>

          <button
            type="button"
            className="cx-tournament-details-button"
            onClick={() => setSelectedTournament(item)}
          >
            Details
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </article>
  )

  return (
    <main className="cx-tournaments-page">
      <header className="cx-tournaments-header">
        <button
          type="button"
          className="cx-tournaments-back"
          onClick={() => navigate('/play')}
          aria-label="Back to Play"
        >
          <ArrowLeft size={21} />
        </button>

        <h1>Tournaments</h1>

        <button
          type="button"
          className={`cx-tournaments-filter-button ${filterOpen ? 'active' : ''}`}
          onClick={() => setFilterOpen(true)}
          aria-label="Open tournament filters"
        >
          <SlidersHorizontal size={20} />
          {activeFilterCount > 0 && (
            <span className="cx-tournament-filter-count">
              {activeFilterCount}
            </span>
          )}
        </button>
      </header>

      <nav className="cx-tournaments-tabs" aria-label="Tournament status">
        {statusTabs.map((tab) => (
          <button
            type="button"
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {tab === 'Live' && (
              <span className="cx-tournaments-live-dot" />
            )}
          </button>
        ))}
      </nav>

      <div className="cx-tournaments-content">
        <div className="cx-tournaments-search-row">
          <label className="cx-tournaments-search">
            <Search size={18} />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search tournaments..."
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </label>

          <label className="cx-tournaments-sort">
            <span>Sort</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option>Starting Soon</option>
              <option>Most Players</option>
              <option>Fewest Players</option>
              <option>Name A–Z</option>
            </select>
          </label>
        </div>

        {activeTab === 'Live' && featuredTournament && (
          <section className="cx-tournaments-featured">
            <div className="cx-tournaments-section-heading">
              <div>
                <span className="cx-tournaments-overline">HAPPENING NOW</span>
                <h2>Featured Tournament</h2>
              </div>
              <span className="cx-tournaments-live-label">
                <Radio size={13} /> LIVE
              </span>
            </div>

            {renderTournamentCard(featuredTournament, true)}
          </section>
        )}

        <section className="cx-tournaments-list-section">
          <div className="cx-tournaments-section-heading">
            <div>
              <span className="cx-tournaments-overline">
                {activeTab.toUpperCase()} TOURNAMENTS
              </span>
              <h2>
                {activeTab} Tournaments
                <span className="cx-tournaments-result-count">
                  {filteredTournaments.length}
                </span>
              </h2>
            </div>
          </div>

          {filteredTournaments.length > 0 ? (
            <div className="cx-tournaments-list">
              {filteredTournaments
                .filter(
                  (item) =>
                    !(activeTab === 'Live' && item.id === featuredTournament?.id),
                )
                .map((item) => renderTournamentCard(item))}
            </div>
          ) : (
            <div className="cx-tournaments-empty">
              <Trophy size={34} />
              <h3>No tournaments found</h3>
              <p>
                There are no tournaments matching your current search or filters.
              </p>
              <button type="button" onClick={resetFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </div>

      {filterOpen && (
        <div
          className="cx-tournament-overlay"
          onClick={() => setFilterOpen(false)}
        >
          <section
            className="cx-tournament-filter-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Tournament filters"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cx-tournament-panel-header">
              <div>
                <span className="cx-tournaments-overline">CUSTOMIZE RESULTS</span>
                <h2>Filter Tournaments</h2>
              </div>
              <button
                type="button"
                onClick={() => setFilterOpen(false)}
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            <div className="cx-tournament-filter-body">
              <div className="cx-tournament-filter-group">
                <h3>Status</h3>
                <div className="cx-tournament-filter-chips">
                  {statusTabs.map((value) => (
                    <button
                      type="button"
                      key={value}
                      className={statusFilter.includes(value) ? 'selected' : ''}
                      onClick={() =>
                        toggleArrayValue(value, statusFilter, setStatusFilter)
                      }
                    >
                      {value}
                      {statusFilter.includes(value) && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="cx-tournament-filter-group">
                <h3>Time Control</h3>
                <div className="cx-tournament-filter-chips">
                  {timeControls.map((value) => (
                    <button
                      type="button"
                      key={value}
                      className={timeFilter.includes(value) ? 'selected' : ''}
                      onClick={() =>
                        toggleArrayValue(value, timeFilter, setTimeFilter)
                      }
                    >
                      {value}
                      {timeFilter.includes(value) && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="cx-tournament-filter-group">
                <h3>Variant</h3>
                <div className="cx-tournament-filter-chips">
                  {variants.map((value) => (
                    <button
                      type="button"
                      key={value}
                      className={variantFilter.includes(value) ? 'selected' : ''}
                      onClick={() =>
                        toggleArrayValue(value, variantFilter, setVariantFilter)
                      }
                    >
                      {value}
                      {variantFilter.includes(value) && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="cx-tournament-filter-group">
                <h3>Game Mode</h3>
                <div className="cx-tournament-filter-chips">
                  {gameModes.map((value) => (
                    <button
                      type="button"
                      key={value}
                      className={modeFilter.includes(value) ? 'selected' : ''}
                      onClick={() =>
                        toggleArrayValue(value, modeFilter, setModeFilter)
                      }
                    >
                      {value}
                      {modeFilter.includes(value) && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="cx-tournament-filter-group">
                <h3>Rating Filter</h3>
                <p className="cx-tournament-rating-help">
                  Show tournaments whose rating requirements overlap your selected range.
                </p>

                <div className="cx-tournament-rating-values">
                  <span>Minimum <strong>{minRating}</strong></span>
                  <span>Maximum <strong>{maxRating}</strong></span>
                </div>

                <label className="cx-tournament-range">
                  <span>Minimum rating</span>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="100"
                    value={minRating}
                    onChange={(event) =>
                      setMinRating(Math.min(Number(event.target.value), maxRating))
                    }
                  />
                </label>

                <label className="cx-tournament-range">
                  <span>Maximum rating</span>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="100"
                    value={maxRating}
                    onChange={(event) =>
                      setMaxRating(Math.max(Number(event.target.value), minRating))
                    }
                  />
                </label>
              </div>
            </div>

            <div className="cx-tournament-filter-footer">
              <button
                type="button"
                className="cx-tournament-reset-button"
                onClick={resetFilters}
              >
                Reset
              </button>
              <button
                type="button"
                className="cx-tournament-apply-button"
                onClick={() => setFilterOpen(false)}
              >
                Show Results
              </button>
            </div>
          </section>
        </div>
      )}

      {selectedTournament && (
        <div
          className="cx-tournament-overlay"
          onClick={() => setSelectedTournament(null)}
        >
          <section
            className="cx-tournament-details-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Tournament details"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cx-tournament-details-header">
              <div className="cx-tournament-icon large">
                <Trophy size={27} />
              </div>
              <button
                type="button"
                onClick={() => setSelectedTournament(null)}
                aria-label="Close tournament details"
              >
                <X size={20} />
              </button>
            </div>

            <span
              className={`cx-tournament-status ${selectedTournament.status.toLowerCase()}`}
            >
              {selectedTournament.status}
            </span>

            <h2>{selectedTournament.name}</h2>
            <p className="cx-tournament-details-description">
              {selectedTournament.description}
            </p>

            <div className="cx-tournament-details-grid">
              <div><small>Time Control</small><strong>{selectedTournament.timeControl}</strong></div>
              <div><small>Format</small><strong>{selectedTournament.category}</strong></div>
              <div><small>Variant</small><strong>{selectedTournament.variant}</strong></div>
              <div><small>Game Mode</small><strong>{selectedTournament.mode}</strong></div>
              <div><small>Rating Requirement</small><strong>{selectedTournament.minRating}–{selectedTournament.maxRating}</strong></div>
              <div><small>Participants</small><strong>{selectedTournament.players}/{selectedTournament.capacity}</strong></div>
              <div><small>Rounds</small><strong>{selectedTournament.rounds}</strong></div>
              <div><small>Prize / Rewards</small><strong>{selectedTournament.prize}</strong></div>
            </div>

            <div className="cx-tournament-detail-line">
              <CalendarDays size={17} />
              <span>{selectedTournament.date} · {selectedTournament.startTime}</span>
            </div>

            <div className="cx-tournament-detail-line">
              <Users size={17} />
              <span>Organizer: {selectedTournament.organizer}</span>
            </div>

            <div className="cx-tournament-detail-sections">
              <div>
                <strong>Tournament Overview</strong>
                <p>Review the tournament format, eligibility, and participation information.</p>
              </div>
              <div>
                <strong>Rules and Regulations</strong>
                <p>Official rules and tournament policies will be displayed here.</p>
              </div>
              <div>
                <strong>Schedule and Standings</strong>
                <p>Round pairings, results, and leaderboard will be available here.</p>
              </div>
            </div>

            <button
              type="button"
              className="cx-tournament-join-button"
              disabled={selectedTournament.status === 'Ended'}
            >
              {selectedTournament.status === 'Ended'
                ? 'Tournament Ended'
                : selectedTournament.status === 'Live'
                  ? 'View Live Tournament'
                  : 'Registration Preview'}
            </button>

            <p className="cx-tournament-demo-note">
              Frontend preview only. Registration and live tournament data are not connected yet.
            </p>
          </section>
        </div>
      )}
    </main>
  )
}

export default PlayTournamentsPage
