
import { chessPhilosophyQuotes } from './chessPhilosophy'
import { chessStrategyCalculationsQuotes } from './chessStrategyCalculations'
import { chessPsychologyMindsetQuotes } from './chessPsychologyMindset'
import { chessLearningMasteryQuotes } from './chessLearningMastery'
import { chessCompetitionSportsmanshipQuotes } from './chessCompetitionSportsmanship'
import { chessTheoryPrinciplesQuotes } from './chessTheoryPrinciples'
import { chessHistoryLegacyQuotes } from './chessHistoryLegacy'

export const dailyQuoteCategories = [
  {
    id: 'chess-philosophy',
    name: 'Chess Philosophy',
    quotes: chessPhilosophyQuotes,
  },
  {
    id: 'chess-strategy-calculations',
    name: 'Chess Strategy & Calculations',
    quotes: chessStrategyCalculationsQuotes,
  },
  {
    id: 'chess-psychology-mindset',
    name: 'Chess Psychology & Mindset',
    quotes: chessPsychologyMindsetQuotes,
  },
  {
    id: 'chess-learning-mastery',
    name: 'Chess Learning & Mastery',
    quotes: chessLearningMasteryQuotes,
  },
  {
    id: 'chess-competition-sportsmanship',
    name: 'Chess Competition & Sportsmanship',
    quotes: chessCompetitionSportsmanshipQuotes,
  },
  {
    id: 'chess-theory-principles',
    name: 'Chess Theory & Principles',
    quotes: chessTheoryPrinciplesQuotes,
  },
  {
    id: 'chess-history-legacy',
    name: 'Chess History & Legacy',
    quotes: chessHistoryLegacyQuotes,
  },
] as const
