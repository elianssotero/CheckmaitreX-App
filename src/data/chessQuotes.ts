export type ChessQuote = {
  id: number
  quote: string
  author: string
  category: string
  source: string
  sourceUrl: string
  verificationStatus: 'verified'
}

export const chessQuotes: ChessQuote[] = [
  {
    id: 1,
    quote:
      'The game of Chess is not merely an idle Amusement.',
    author: 'Benjamin Franklin',
    category: 'Chess Philosophy',
    source: 'The Morals of Chess',
    sourceUrl:
      'https://www.cambridge.org/core/books/abs/franklin-the-autobiography-and-other-writings-on-politics-economics-and-virtue/morals-of-chess-before-28-june-1779/7018D284A26087FB63286079DAD52A3C',
    verificationStatus: 'verified',
  },
  {
    id: 2,
    quote:
      'The pawns: They are the very life of this game.',
    author: 'François-André Danican Philidor',
    category: 'Chess Strategy',
    source: 'Chess Analysed (1750)',
    sourceUrl:
      'https://www.chesshistory.com/winter/extra/philidor.html',
    verificationStatus: 'verified',
  },
]
