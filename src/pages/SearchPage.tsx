
import { useMemo, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  X,
  Clock3,
  TrendingUp,
  Users,
  Swords,
  Puzzle,
  GraduationCap,
  PlayCircle,
  CalendarDays,
  Newspaper,
  ChevronRight,
  Filter,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import './SearchPage.css'

type SearchCategory =
  | 'All'
  | 'Players'
  | 'Games'
  | 'Puzzles'
  | 'Lessons'
  | 'Videos'
  | 'Events'
  | 'Articles'

type SearchResult = {
  id: number
  title: string
  subtitle: string
  description: string
  category: Exclude<SearchCategory, 'All'>
  tags: string[]
  destination: string
  icon: LucideIcon
  meta: string
}

const categories: SearchCategory[] = [
  'All',
  'Players',
  'Games',
  'Puzzles',
  'Lessons',
  'Videos',
  'Events',
  'Articles',
]

const searchResults: SearchResult[] = [
  {
    id: 1,
    title: 'PlayerOne',
    subtitle: '@playerone',
    description: 'Sample chess player profile.',
    category: 'Players',
    tags: ['Online', 'Blitz', 'Rapid'],
    destination: '/profile',
    icon: Users,
    meta: 'Online · 1842 Rating',
  },
  {
    id: 2,
    title: 'KnightMaster',
    subtitle: '@knightmaster',
    description: 'Sample chess player profile.',
    category: 'Players',
    tags: ['Online', 'Intermediate'],
    destination: '/profile',
    icon: Users,
    meta: 'Online · 1720 Rating',
  },
  {
    id: 3,
    title: 'Classic Game Collection',
    subtitle: 'Chess Games',
    description: 'Explore sample classical chess game records.',
    category: 'Games',
    tags: ['Classical', 'Master Games'],
    destination: '/play',
    icon: Swords,
    meta: 'Game collection',
  },
  {
    id: 4,
    title: 'Tactical Training',
    subtitle: 'Puzzle Collection',
    description: 'Practice tactical patterns and combinations.',
    category: 'Puzzles',
    tags: ['Intermediate', 'Tactics'],
    destination: '/puzzles',
    icon: Puzzle,
    meta: 'Puzzle collection',
  },
  {
    id: 5,
    title: 'Opening Fundamentals',
    subtitle: 'Chess Lesson',
    description: 'Learn the basic principles of chess openings.',
    category: 'Lessons',
    tags: ['Beginner', 'Openings'],
    destination: '/learn',
    icon: GraduationCap,
    meta: 'Beginner · Openings',
  },
  {
    id: 6,
    title: 'Understanding the Endgame',
    subtitle: 'Chess Lesson',
    description: 'Explore fundamental endgame concepts.',
    category: 'Lessons',
    tags: ['Intermediate', 'Endgames'],
    destination: '/learn',
    icon: GraduationCap,
    meta: 'Intermediate · Endgames',
  },
  {
    id: 7,
    title: 'CCC Chess Highlights',
    subtitle: 'Video',
    description: 'Sample chess highlights and educational content.',
    category: 'Videos',
    tags: ['Strategy', 'Highlights'],
    destination: '/watch',
    icon: PlayCircle,
    meta: 'CCC-TV',
  },
  {
    id: 8,
    title: 'CheckmaîtréX Chess Events',
    subtitle: 'Club Events',
    description: 'Explore chess events and club activities.',
    category: 'Events',
    tags: ['Upcoming', 'Competition'],
    destination: '/play/tournaments',
    icon: CalendarDays,
    meta: 'Events',
  },
  {
    id: 9,
    title: 'Chess Strategy Guide',
    subtitle: 'Article',
    description: 'A sample article about chess strategy.',
    category: 'Articles',
    tags: ['Strategy', 'Education'],
    destination: '/watch',
    icon: Newspaper,
    meta: 'Chess articles',
  },
]

const trendingSearches = [
  'Chess openings',
  'Tactical puzzles',
  'Endgame strategy',
  'Chess tournaments',
  'CCC videos',
]

const initialRecentSearches = [
  'PlayerOne',
  'Chess openings',
  'Endgame strategy',
]

const suggestions = [
  'PlayerOne',
  'KnightMaster',
  'Chess openings',
  'Tactical puzzles',
  'Endgame strategy',
  'Chess tournaments',
  'CCC videos',
]

const filterOptions: Record<SearchCategory, string[]> = {
  All: ['All'],
  Players: ['All', 'Online', 'Intermediate'],
  Games: ['All', 'Classical', 'Master Games'],
  Puzzles: ['All', 'Intermediate', 'Tactics'],
  Lessons: ['All', 'Beginner', 'Intermediate', 'Openings', 'Endgames'],
  Videos: ['All', 'Strategy', 'Highlights'],
  Events: ['All', 'Upcoming', 'Competition'],
  Articles: ['All', 'Strategy', 'Education'],
}

function SearchPage() {
  const navigate = useNavigate()

  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] =
    useState<SearchCategory>('All')
  const [recentSearches, setRecentSearches] =
    useState(initialRecentSearches)
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [hasSearched, setHasSearched] = useState(false)

  const normalizedQuery = query.trim().toLowerCase()

  const filteredResults = useMemo(() => {
    return searchResults.filter((result) => {
      const matchesCategory =
        activeCategory === 'All' ||
        result.category === activeCategory

      const searchableText = [
        result.title,
        result.subtitle,
        result.description,
        result.category,
        ...result.tags,
      ].join(' ').toLowerCase()

      const matchesQuery =
        !normalizedQuery || searchableText.includes(normalizedQuery)

      const matchesFilter =
        activeFilter === 'All' ||
        result.tags.some(
          (tag) => tag.toLowerCase() === activeFilter.toLowerCase()
        )

      return matchesCategory && matchesQuery && matchesFilter
    })
  }, [activeCategory, activeFilter, normalizedQuery])

  const matchingSuggestions = useMemo(() => {
    if (!normalizedQuery) return []

    return suggestions
      .filter((item) =>
        item.toLowerCase().includes(normalizedQuery)
      )
      .slice(0, 5)
  }, [normalizedQuery])

  const addRecentSearch = (value: string) => {
    const cleanValue = value.trim()
    if (!cleanValue) return

    setRecentSearches((current) => [
      cleanValue,
      ...current.filter(
        (item) => item.toLowerCase() !== cleanValue.toLowerCase()
      ),
    ].slice(0, 6))

    setQuery(cleanValue)
    setHasSearched(true)
  }

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!query.trim()) return

    addRecentSearch(query)
  }

  const handleCategoryChange = (category: SearchCategory) => {
    setActiveCategory(category)
    setActiveFilter('All')
  }

  const handleClearSearch = () => {
    setQuery('')
    setHasSearched(false)
  }

  const handleResultClick = (result: SearchResult) => {
    addRecentSearch(result.title)
    navigate(result.destination)
  }

  const isShowingResults =
    hasSearched || activeCategory !== 'All' || activeFilter !== 'All'

  return (
    <div className="cx-search-page">
      <header className="cx-search-header">
        <button
          className="cx-search-back"
          type="button"
          aria-label="Go back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </button>

        <h1>Search</h1>

        <button
          className={`cx-search-filter-toggle ${
            showFilters ? 'active' : ''
          }`}
          type="button"
          aria-label="Toggle advanced filters"
          onClick={() => setShowFilters((value) => !value)}
        >
          <SlidersHorizontal size={19} />
        </button>
      </header>

      <main className="cx-search-content">
        <section className="cx-search-intro">
          <span className="cx-search-overline">
            CHECKMAÎTRÉX DISCOVERY
          </span>
          <h2>What are you looking for?</h2>
          <p>
            Find players, games, puzzles, lessons, videos, events,
            and articles.
          </p>
        </section>

        <form
          className="cx-search-input-wrap"
          onSubmit={handleSearch}
        >
          <Search size={20} />

          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setHasSearched(false)
            }}
            placeholder="Search players, games, lessons..."
            aria-label="Search CheckmaîtréX"
            autoComplete="off"
          />

          {query && (
            <button
              type="button"
              className="cx-search-clear"
              aria-label="Clear search"
              onClick={handleClearSearch}
            >
              <X size={17} />
            </button>
          )}

          <button
            type="submit"
            className="cx-search-submit"
            aria-label="Submit search"
            disabled={!query.trim()}
          >
            <Search size={17} />
          </button>
        </form>

        {matchingSuggestions.length > 0 && !hasSearched && (
          <div className="cx-search-suggestions">
            <div className="cx-search-small-heading">
              <Sparkles size={14} />
              <span>Suggestions</span>
            </div>

            {matchingSuggestions.map((suggestion) => (
              <button
                type="button"
                key={suggestion}
                onClick={() => addRecentSearch(suggestion)}
              >
                <Search size={15} />
                <span>{suggestion}</span>
                <ChevronRight size={15} />
              </button>
            ))}
          </div>
        )}

        <nav
          className="cx-search-categories"
          aria-label="Search categories"
        >
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={
                activeCategory === category ? 'active' : ''
              }
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </nav>

        {showFilters && (
          <section className="cx-search-filter-panel">
            <div className="cx-search-filter-heading">
              <div>
                <Filter size={16} />
                <strong>Advanced Filters</strong>
              </div>

              <button
                type="button"
                onClick={() => setActiveFilter('All')}
              >
                Reset
              </button>
            </div>

            <label htmlFor="cx-search-filter-select">
              {activeCategory === 'All'
                ? 'Available filters'
                : `${activeCategory} filters`}
            </label>

            <select
              id="cx-search-filter-select"
              value={activeFilter}
              onChange={(event) =>
                setActiveFilter(event.target.value)
              }
            >
              {filterOptions[activeCategory].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <p>
              Filters are currently applied to sample frontend data.
            </p>
          </section>
        )}

        {isShowingResults ? (
          <section className="cx-search-results-section">
            <div className="cx-search-section-heading">
              <div>
                <span className="cx-search-overline">
                  DISCOVERY RESULTS
                </span>
                <h2>
                  {filteredResults.length} Results
                </h2>
              </div>

              <span className="cx-search-result-category">
                {activeCategory}
              </span>
            </div>

            {filteredResults.length > 0 ? (
              <div className="cx-search-results-list">
                {filteredResults.map((result) => {
                  const ResultIcon = result.icon

                  return (
                    <button
                      type="button"
                      className="cx-search-result"
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                    >
                      <span className="cx-search-result-icon">
                        <ResultIcon size={21} />
                      </span>

                      <span className="cx-search-result-copy">
                        <span className="cx-search-result-topline">
                          <strong>{result.title}</strong>
                          <span>{result.category}</span>
                        </span>

                        <span className="cx-search-result-subtitle">
                          {result.subtitle}
                        </span>

                        <span className="cx-search-result-description">
                          {result.description}
                        </span>

                        <span className="cx-search-result-meta">
                          {result.meta}
                        </span>
                      </span>

                      <ChevronRight
                        className="cx-search-result-arrow"
                        size={18}
                      />
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="cx-search-empty">
                <span className="cx-search-empty-icon">
                  <Search size={27} />
                </span>
                <h3>No results found</h3>
                <p>
                  Try another keyword, category, or filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setActiveCategory('All')
                    setActiveFilter('All')
                    setHasSearched(false)
                  }}
                >
                  Clear search
                </button>
              </div>
            )}
          </section>
        ) : (
          <>
            <section className="cx-search-discovery-section">
              <div className="cx-search-section-heading">
                <div>
                  <span className="cx-search-overline">
                    YOUR ACTIVITY
                  </span>
                  <h2>Recent Searches</h2>
                </div>

                {recentSearches.length > 0 && (
                  <button
                    type="button"
                    className="cx-search-text-button"
                    onClick={() => setRecentSearches([])}
                  >
                    Clear all
                  </button>
                )}
              </div>

              {recentSearches.length > 0 ? (
                <div className="cx-search-recent-list">
                  {recentSearches.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => addRecentSearch(item)}
                    >
                      <Clock3 size={16} />
                      <span>{item}</span>
                      <ChevronRight size={15} />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="cx-search-muted">
                  Your recent searches will appear here.
                </p>
              )}
            </section>

            <section className="cx-search-discovery-section">
              <div className="cx-search-section-heading">
                <div>
                  <span className="cx-search-overline">
                    POPULAR DISCOVERIES
                  </span>
                  <h2>Trending Searches</h2>
                </div>
                <TrendingUp size={19} className="cx-search-gold-icon" />
              </div>

              <div className="cx-search-trending-list">
                {trendingSearches.map((item, index) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => addRecentSearch(item)}
                  >
                    <span className="cx-search-trending-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{item}</span>
                    <TrendingUp size={14} />
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        <div className="cx-search-preview-note">
          <Sparkles size={14} />
          <span>
            Search preview · Results shown are sample content,
            not live platform data.
          </span>
        </div>
      </main>
    </div>
  )
}

export default SearchPage
