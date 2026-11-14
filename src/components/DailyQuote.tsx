
import { Quote, ExternalLink } from 'lucide-react'
import { dailyQuoteCategories } from '../data/daily-quotes'
import type { ChessQuote } from '../data/daily-quotes/types'

const ROTATION_START_DATE = '2026-01-01'
const STORAGE_KEY = 'cx-daily-quotes-history-v1'

type CategoryHistory = {
  remainingIds: number[]
  usedIds: number[]
  cycle: number
}

type DailyQuoteState = {
  version: 1
  lastDate: string
  lastCategoryId: string
  lastQuoteId: number
  histories: Record<string, CategoryHistory>
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

function seededRandom(seedText: string) {
  let seed = 0

  for (let i = 0; i < seedText.length; i++) {
    seed = (seed * 31 + seedText.charCodeAt(i)) >>> 0
  }

  return () => {
    seed = (seed + 0x6D2B79F5) >>> 0

    let value = seed
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)

    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function seededShuffle<T>(items: T[], seed: string): T[] {
  const result = [...items]
  const random = seededRandom(seed)

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

function getDateInformation() {
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

  return {
    dateKey: now.toISOString().slice(0, 10),
    elapsedDays,
    categoryIndex: elapsedDays % 7,
    categoryOccurrence: Math.floor(elapsedDays / 7),
  }
}

function getFallbackQuote(
  category: (typeof dailyQuoteCategories)[number],
  occurrence: number
): ChessQuote | null {
  const quotes = category.quotes

  if (!quotes.length) return null

  const cycle = Math.floor(occurrence / quotes.length)
  const position = occurrence % quotes.length

  const orderedQuotes = seededShuffle(
    quotes,
    `${category.id}-${cycle}`
  )

  return orderedQuotes[position] ?? null
}

function getDailyQuote(): ChessQuote | null {
  const {
    dateKey,
    categoryIndex,
    categoryOccurrence,
  } = getDateInformation()

  const category = dailyQuoteCategories[categoryIndex]

  if (!category || !category.quotes.length) {
    return null
  }

  const quotes = category.quotes
  const currentIds = quotes.map((quote) => quote.id)

  try {
    const savedText = localStorage.getItem(STORAGE_KEY)

    let state: DailyQuoteState = savedText
      ? JSON.parse(savedText)
      : {
          version: 1,
          lastDate: '',
          lastCategoryId: '',
          lastQuoteId: 0,
          histories: {},
        }

    if (
      state.version === 1 &&
      state.lastDate === dateKey &&
      state.lastCategoryId === category.id
    ) {
      const savedQuote = quotes.find(
        (quote) => quote.id === state.lastQuoteId
      )

      if (savedQuote) return savedQuote
    }

    const previousHistory = state.histories[category.id]

    let usedIds = (previousHistory?.usedIds ?? [])
      .filter((id) => currentIds.includes(id))

    let remainingIds = (previousHistory?.remainingIds ?? [])
      .filter((id) => currentIds.includes(id))

    let cycle = previousHistory?.cycle ?? 0

    const knownIds = new Set([
      ...usedIds,
      ...remainingIds,
    ])

    const newIds = currentIds.filter(
      (id) => !knownIds.has(id)
    )

    if (newIds.length) {
      remainingIds = shuffle([
        ...remainingIds,
        ...newIds,
      ])
    }

    if (!remainingIds.length) {
      remainingIds = shuffle(currentIds)
      usedIds = []
      cycle += 1
    }

    const selectedId = remainingIds.shift()

    if (selectedId === undefined) return null

    usedIds.push(selectedId)

    const selectedQuote = quotes.find(
      (quote) => quote.id === selectedId
    )

    if (!selectedQuote) return null

    state = {
      version: 1,
      lastDate: dateKey,
      lastCategoryId: category.id,
      lastQuoteId: selectedId,
      histories: {
        ...state.histories,
        [category.id]: {
          remainingIds,
          usedIds,
          cycle,
        },
      },
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    )

    return selectedQuote
  } catch {
    return getFallbackQuote(
      category,
      categoryOccurrence
    )
  }
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
