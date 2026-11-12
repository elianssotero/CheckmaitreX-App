
export type ProfileVisibility =
  | 'Public'
  | 'Friends Only'
  | 'Private'

export type ProfileOption = {
  value: string
  label: string
  description?: string
}

export type ProfileSelectorProps = {
  label: string
  value: string
  options: ProfileOption[]
  description?: string
  onChange: (value: string) => void
}

export type ProfileBorder =
  | 'Default Gold'
  | 'Silver'
  | 'Bronze'
  | 'Royal Gold'
  | 'Diamond'
  | 'No Border'
