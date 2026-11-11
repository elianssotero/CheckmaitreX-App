
export type ChessTitle = {
  value: string
  type: 'official' | 'arena' | 'national'
  verificationStatus:
    | 'unverified'
    | 'pending'
    | 'verified'
    | 'rejected'
  verifiedAt: string | null
  verificationSource: string | null
  isSample: boolean
}

export type PlayerProfile = {
  accountName: string
  chessTitle: ChessTitle | null
  flair: string | null
  streak: number
}

export const playerProfile: PlayerProfile = {
  accountName: 'Player Name',

  chessTitle: {
    value: 'AIM',
    type: 'arena',
    verificationStatus: 'unverified',
    verifiedAt: null,
    verificationSource: null,
    isSample: true,
  },

  flair: null,
  streak: 1,
}
