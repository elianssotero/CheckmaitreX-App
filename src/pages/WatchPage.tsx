import { useMemo, useState } from 'react'
import {
  Bookmark,
  Check,
  ChevronRight,
  Clock3,
  Eye,
  Play,
  Search,
  Share2,
  Sparkles,
  Video,
  X,
} from 'lucide-react'
import './WatchPage.css'

type WatchCategory =
  | 'All'
  | 'Events'
  | 'News'
  | 'Live'
  | 'Highlights'
  | 'Interviews'
  | 'Premieres'

type WatchItem = {
  id: number
  title: string
  description: string
  category: Exclude<WatchCategory, 'All'>
  duration: string
  views: string
  date: string
  thumbnail: string
  featured?: boolean
  live?: boolean
}

const videos: WatchItem[] = [
  {
    id: 1,
    title: 'Inside the CheckmaîtréX Chess Club',
    description:
      'Discover the club, its community, and the passion behind every move.',
    category: 'Premieres',
    duration: '08:42',
    views: '2.4K',
    date: 'Featured',
    thumbnail: 'watch-thumb-gold',
    featured: true,
  },
  {
    id: 2,
    title: 'The Grand Tournament — Final Round',
    description:
      'A look back at the final round and the decisive games.',
    category: 'Events',
    duration: '12:18',
    views: '1.8K',
    date: '2 days ago',
    thumbnail: 'watch-thumb-board',
  },
  {
    id: 3,
    title: 'Official Club Announcement',
    description:
      'Important updates and announcements from the club.',
    category: 'News',
    duration: '03:25',
    views: '980',
    date: '3 days ago',
    thumbnail: 'watch-thumb-news',
  },
  {
    id: 4,
    title: 'Live Tournament Coverage',
    description:
      'Follow the latest club tournament coverage and match updates.',
    category: 'Live',
    duration: 'LIVE',
    views: '342 watching',
    date: 'Live now',
    thumbnail: 'watch-thumb-live',
    live: true,
  },
  {
    id: 5,
    title: 'Best Moves of the Week',
    description:
      'A collection of memorable tactical moments and combinations.',
    category: 'Highlights',
    duration: '06:54',
    views: '3.1K',
    date: '5 days ago',
    thumbnail: 'watch-thumb-highlight',
  },
  {
    id: 6,
    title: 'Meet the Players',
    description:
      'Conversations with members about their chess journey.',
    category: 'Interviews',
    duration: '10:06',
    views: '760',
    date: '1 week ago',
    thumbnail: 'watch-thumb-interview',
  },
  {
    id: 7,
    title: 'Tournament Preparation',
    description:
      'A preview of upcoming competitions and activities.',
    category: 'Events',
    duration: '05:32',
    views: '1.2K',
    date: '1 week ago',
    thumbnail: 'watch-thumb-prep',
  },
  {
    id: 8,
    title: 'A Special Message to Our Community',
    description:
      'A message for the players, supporters, and members.',
    category: 'News',
    duration: '04:15',
    views: '640',
    date: '2 weeks ago',
    thumbnail: 'watch-thumb-community',
  },
]

const categories: WatchCategory[] = [
  'All',
  'Events',
  'News',
  'Live',
  'Highlights',
  'Interviews',
  'Premieres',
]

function WatchPage() {
  const [activeCategory, setActiveCategory] =
    useState<WatchCategory>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [savedVideos, setSavedVideos] = useState<number[]>([])
  const [showWatchLater, setShowWatchLater] = useState(false)
  const [selectedVideo, setSelectedVideo] =
    useState<WatchItem | null>(null)

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesCategory =
        activeCategory === 'All' ||
        video.category === activeCategory

      const matchesSearch =
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesSaved =
        !showWatchLater || savedVideos.includes(video.id)

      return matchesCategory && matchesSearch && matchesSaved
    })
  }, [
    activeCategory,
    searchQuery,
    showWatchLater,
    savedVideos,
  ])

  const featuredVideo = videos.find((video) => video.featured)

  const toggleSaved = (id: number) => {
    setSavedVideos((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    )
  }

  const openVideo = (video: WatchItem) => {
    setSelectedVideo(video)
  }

  const shareVideo = async (video: WatchItem) => {
    const shareText = `${video.title} — CheckmaîtréX Chess Club`

    if (navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: shareText,
          url: window.location.href,
        })
      } catch {
        // Sharing was cancelled or is unavailable.
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(
          `${shareText}\n${window.location.href}`,
        )
        window.alert('Link copied.')
      } catch {
        window.alert('Unable to copy the link on this device.')
      }
    }
  }

  const visibleVideos = showWatchLater
    ? filteredVideos
    : filteredVideos.filter((video) => !video.featured)

  return (
    <div className="cx-watch-page">
      <header className="cx-watch-header">
        <div className="cx-watch-header-copy">
          <span className="cx-watch-eyebrow">
            CHECKMAÎTRÉX CHESS CLUB
          </span>
          <h1>Watch</h1>
          <p>
            Events, stories, announcements, and moments from the
            chess community.
          </p>
        </div>

        <div className="cx-watch-header-actions">
          <button
            className="cx-watch-icon-button"
            aria-label="Watch Later"
            onClick={() => {
              setShowWatchLater((value) => !value)
              setActiveCategory('All')
            }}
            title="Watch Later"
          >
            <Bookmark size={19} />
            {savedVideos.length > 0 && (
              <span className="cx-watch-count">
                {savedVideos.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="cx-watch-content">
        {!showWatchLater && featuredVideo && (
          <section className="cx-watch-featured-section">
            <div className="cx-watch-section-heading">
              <div>
                <span className="cx-watch-overline">
                  EDITOR'S PICK
                </span>
                <h2>Featured</h2>
              </div>
            </div>

            <article className="cx-watch-featured">
              <div
                className={`cx-watch-featured-art ${featuredVideo.thumbnail}`}
              >
                <div className="cx-watch-art-label">
                  <Sparkles size={13} />
                  FEATURED
                </div>

                <div className="cx-watch-featured-watermark">
                  <span>CHECKMAÎTRÉX</span>
                  <strong>CHESS CLUB</strong>
                </div>

                <button
                  className="cx-watch-featured-play"
                  aria-label="Play featured video"
                  onClick={() => openVideo(featuredVideo)}
                >
                  <Play size={25} fill="currentColor" />
                </button>

                <span className="cx-watch-duration">
                  {featuredVideo.duration}
                </span>
              </div>

              <div className="cx-watch-featured-info">
                <div className="cx-watch-featured-meta">
                  <span>{featuredVideo.category}</span>
                  <span>•</span>
                  <span>{featuredVideo.views} views</span>
                </div>

                <h3>{featuredVideo.title}</h3>
                <p>{featuredVideo.description}</p>

                <div className="cx-watch-featured-actions">
                  <button
                    className="cx-watch-primary-button"
                    onClick={() => openVideo(featuredVideo)}
                  >
                    <Play size={16} fill="currentColor" />
                    Watch now
                  </button>

                  <button
                    className={`cx-watch-secondary-button ${
                      savedVideos.includes(featuredVideo.id)
                        ? 'saved'
                        : ''
                    }`}
                    onClick={() => toggleSaved(featuredVideo.id)}
                  >
                    {savedVideos.includes(featuredVideo.id) ? (
                      <Check size={16} />
                    ) : (
                      <Bookmark size={16} />
                    )}
                    {savedVideos.includes(featuredVideo.id)
                      ? 'Saved'
                      : 'Watch Later'}
                  </button>
                </div>
              </div>
            </article>
          </section>
        )}

        <section className="cx-watch-library-section">
          <div className="cx-watch-section-heading">
            <div>
              <span className="cx-watch-overline">
                EXPLORE CONTENT
              </span>
              <h2>
                {showWatchLater ? 'Watch Later' : 'Discover'}
              </h2>
            </div>

            {showWatchLater && (
              <button
                className="cx-watch-clear-filter"
                onClick={() => setShowWatchLater(false)}
              >
                Back to Watch
              </button>
            )}
          </div>

          <div className="cx-watch-toolbar">
            <div className="cx-watch-category-list">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`cx-watch-category ${
                    activeCategory === category ? 'active' : ''
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <label className="cx-watch-search">
              <Search size={17} />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search videos..."
                aria-label="Search videos"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearchQuery('')}
                >
                  <X size={15} />
                </button>
              )}
            </label>
          </div>

          <div className="cx-watch-results-heading">
            <div>
              <h3>
                {showWatchLater ? 'Saved videos' : 'Latest content'}
              </h3>
              <span>
                {visibleVideos.length} {visibleVideos.length === 1
                  ? 'video'
                  : 'videos'}
              </span>
            </div>
          </div>

          {visibleVideos.length > 0 ? (
            <div className="cx-watch-grid">
              {visibleVideos.map((video) => (
                <article
                  className="cx-watch-card"
                  key={video.id}
                >
                  <button
                    className={`cx-watch-thumbnail ${video.thumbnail}`}
                    onClick={() => openVideo(video)}
                    aria-label={`Play ${video.title}`}
                  >
                    <span className="cx-watch-thumbnail-brand">
                      CHECKMAÎTRÉX
                    </span>

                    {video.live && (
                      <span className="cx-watch-live-badge">
                        LIVE
                      </span>
                    )}

                    <span className="cx-watch-thumbnail-play">
                      <Play size={19} fill="currentColor" />
                    </span>

                    <span className="cx-watch-duration">
                      {video.duration}
                    </span>
                  </button>

                  <div className="cx-watch-card-info">
                    <div className="cx-watch-card-topline">
                      <span className="cx-watch-card-category">
                        {video.category}
                      </span>

                      <button
                        className={`cx-watch-save-button ${
                          savedVideos.includes(video.id)
                            ? 'saved'
                            : ''
                        }`}
                        aria-label={
                          savedVideos.includes(video.id)
                            ? 'Remove from Watch Later'
                            : 'Save to Watch Later'
                        }
                        onClick={() => toggleSaved(video.id)}
                      >
                        {savedVideos.includes(video.id) ? (
                          <Check size={16} />
                        ) : (
                          <Bookmark size={16} />
                        )}
                      </button>
                    </div>

                    <button
                      className="cx-watch-card-title"
                      onClick={() => openVideo(video)}
                    >
                      {video.title}
                    </button>

                    <p>{video.description}</p>

                    <div className="cx-watch-card-meta">
                      <span>
                        <Eye size={13} />
                        {video.views}
                      </span>
                      <span>
                        <Clock3 size={13} />
                        {video.date}
                      </span>
                    </div>

                    <button
                      className="cx-watch-share-link"
                      onClick={() => shareVideo(video)}
                    >
                      <Share2 size={13} />
                      Share
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="cx-watch-empty">
              <div className="cx-watch-empty-icon">
                <Video size={27} />
              </div>
              <h3>
                {showWatchLater
                  ? 'No saved videos yet'
                  : 'No content found'}
              </h3>
              <p>
                {showWatchLater
                  ? 'Save videos to find them here later.'
                  : 'Try another category or search term.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('All')
                  setShowWatchLater(false)
                }}
              >
                Explore content
              </button>
            </div>
          )}
        </section>

        <section className="cx-watch-playlists">
          <div className="cx-watch-section-heading">
            <div>
              <span className="cx-watch-overline">
                CURATED FOR YOU
              </span>
              <h2>Explore Series</h2>
            </div>
          </div>

          <div className="cx-watch-series-grid">
            <button
              className="cx-watch-series-card series-events"
              onClick={() => {
                setActiveCategory('Events')
                setShowWatchLater(false)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <span className="cx-watch-series-number">01</span>
              <span className="cx-watch-series-title">
                Tournament Series
              </span>
              <span className="cx-watch-series-subtitle">
                Events and competitions
              </span>
              <ChevronRight size={18} />
            </button>

            <button
              className="cx-watch-series-card series-stories"
              onClick={() => {
                setActiveCategory('Interviews')
                setShowWatchLater(false)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <span className="cx-watch-series-number">02</span>
              <span className="cx-watch-series-title">
                Player Stories
              </span>
              <span className="cx-watch-series-subtitle">
                People behind the board
              </span>
              <ChevronRight size={18} />
            </button>

            <button
              className="cx-watch-series-card series-highlights"
              onClick={() => {
                setActiveCategory('Highlights')
                setShowWatchLater(false)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <span className="cx-watch-series-number">03</span>
              <span className="cx-watch-series-title">
                Best of Chess
              </span>
              <span className="cx-watch-series-subtitle">
                Memorable chess moments
              </span>
              <ChevronRight size={18} />
            </button>
          </div>
        </section>

        <footer className="cx-watch-footer">
          <span>CHECKMAÎTRÉX CHESS CLUB</span>
          <p>Every move has a story.</p>
        </footer>
      </main>

      {selectedVideo && (
        <div
          className="cx-watch-modal-backdrop"
          onClick={() => setSelectedVideo(null)}
          role="presentation"
        >
          <section
            className="cx-watch-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cx-watch-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cx-watch-modal-header">
              <span>VIDEO PREVIEW</span>
              <button
                onClick={() => setSelectedVideo(null)}
                aria-label="Close preview"
              >
                <X size={20} />
              </button>
            </div>

            <div
              className={`cx-watch-modal-player ${selectedVideo.thumbnail}`}
            >
              <div className="cx-watch-modal-player-content">
                <Play size={34} />
                <strong>Video preview</strong>
                <span>
                  Actual video playback will be connected later.
                </span>
              </div>
            </div>

            <div className="cx-watch-modal-details">
              <span className="cx-watch-card-category">
                {selectedVideo.category}
              </span>
              <h2 id="cx-watch-modal-title">
                {selectedVideo.title}
              </h2>
              <p>{selectedVideo.description}</p>

              <div className="cx-watch-modal-meta">
                <span>
                  <Eye size={14} />
                  {selectedVideo.views}
                </span>
                <span>
                  <Clock3 size={14} />
                  {selectedVideo.duration}
                </span>
              </div>

              <div className="cx-watch-modal-actions">
                <button
                  className="cx-watch-primary-button"
                  onClick={() => toggleSaved(selectedVideo.id)}
                >
                  {savedVideos.includes(selectedVideo.id) ? (
                    <Check size={16} />
                  ) : (
                    <Bookmark size={16} />
                  )}
                  {savedVideos.includes(selectedVideo.id)
                    ? 'Saved'
                    : 'Watch Later'}
                </button>

                <button
                  className="cx-watch-secondary-button"
                  onClick={() => shareVideo(selectedVideo)}
                >
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default WatchPage
