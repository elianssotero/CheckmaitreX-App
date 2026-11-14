import { Quote, ExternalLink } from 'lucide-react'
import { chessQuotes } from '../data/chessQuotes'

const ROTATION_START_DATE = '2026-01-01'

function getDailyQuote() {
  if (!chessQuotes.length) return null

  const now = new Date()

  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  )

  const [year, month, day] = ROTATION_START_DATE
    .split('-')
    .map(Number)

  const startDate = Date.UTC(
    year,
    month - 1,
    day
  )

  const elapsedDays = Math.max(
    0,
    Math.floor((today - startDate) / 86400000)
  )

  const index = elapsedDays % chessQuotes.length

  return chessQuotes[index]
}

function DailyQuote() {
  const dailyQuote = getDailyQuote()

  if (!dailyQuote) return null

  return (
    <section className="cx-section cx-daily-quote">
      <div className="cx-daily-quote-card">

        <div className="cx-daily-quote-heading">
          <div>
            <span className="cx-overline">
              DAILY INSPIRATION
            </span>

            <span className="cx-daily-quote-category">
              {dailyQuote.category}
            </span>
          </div>

          <div className="cx-daily-quote-icon">
            <Quote size={25} />
          </div>
        </div>

        <blockquote className="cx-daily-quote-text">
          “{dailyQuote.quote}”
        </blockquote>

        <div className="cx-daily-quote-author">
          <span className="cx-daily-quote-author-line" />

          <div>
            <strong>{dailyQuote.author}</strong>

            <span>{dailyQuote.source}</span>
          </div>
        </div>

        <div className="cx-daily-quote-footer">
          <span>
            CHECKMAÎTRÉX DAILY QUOTE
            {' '}· #{dailyQuote.id}
          </span>

          <a
            href={dailyQuote.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Read the original source for the quote by ${dailyQuote.author}`}
          >
            View source
            <ExternalLink size={12} />
          </a>
        </div>

      </div>
    </section>
  )
}

export default DailyQuote
