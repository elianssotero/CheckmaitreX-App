
import ProfileOptionSelector from './ProfileOptionSelector'
import type { ProfileBorder } from './profileTypes'

type Props = {
  value: ProfileBorder
  onChange: (value: ProfileBorder) => void
}

const borderOptions = [
  {
    value: 'Default Gold',
    label: 'Default Gold',
    description: 'Classic CheckmaîtréX gold outline',
  },
  {
    value: 'Silver',
    label: 'Silver',
    description: 'Clean silver outline',
  },
  {
    value: 'Bronze',
    label: 'Bronze',
    description: 'Warm bronze outline',
  },
  {
    value: 'Royal Gold',
    label: 'Royal Gold',
    description: 'Enhanced royal gold outline',
  },
  {
    value: 'Diamond',
    label: 'Diamond',
    description: 'Premium diamond-style outline',
  },
  {
    value: 'No Border',
    label: 'No Border',
    description: 'Without a decorative outline',
  },
]

export default function ProfileBorderSelector({
  value,
  onChange,
}: Props) {
  return (
    <ProfileOptionSelector
      label="Profile Border"
      value={value}
      options={borderOptions}
      description="Choose the outline style for your profile picture."
      onChange={(nextValue) =>
        onChange(nextValue as ProfileBorder)
      }
    />
  )
}
