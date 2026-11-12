
import ProfileOptionSelector from './ProfileOptionSelector'
import type { ProfileVisibility } from './profileTypes'

type Props = {
  value: ProfileVisibility
  onChange: (value: ProfileVisibility) => void
}

const visibilityOptions = [
  {
    value: 'Public',
    label: 'Public',
    description: 'Your profile is intended to be visible to everyone.',
  },
  {
    value: 'Friends Only',
    label: 'Friends Only',
    description: 'Preview setting for a friends-only profile.',
  },
  {
    value: 'Private',
    label: 'Private',
    description: 'Preview setting for a private profile.',
  },
]

export default function ProfileVisibilitySelector({
  value,
  onChange,
}: Props) {
  return (
    <ProfileOptionSelector
      label="Profile Visibility"
      value={value}
      options={visibilityOptions}
      description="Preview setting only. Actual privacy controls are not active yet."
      onChange={(nextValue) =>
        onChange(nextValue as ProfileVisibility)
      }
    />
  )
}
