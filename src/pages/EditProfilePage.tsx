
import { useState } from 'react'
import {
  ArrowLeft,
  BookOpen,
  Camera,
  Check,
  ChevronRight,
  CircleUserRound,
  Crown,
  Flame,
  Gem,
  Lightbulb,
  Medal,
  Shield,
  Sparkles,
  Star,
  Swords,
  Target,
  Trophy,
  X,
  Zap,
  Eye,
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'
import { alpha3 } from './ProfileSelectionPages'
import ProfileBorderSelector from './profile/ProfileBorderSelector'
import ProfileVisibilitySelector from './profile/ProfileVisibilitySelector'
import type {
  ProfileBorder,
  ProfileVisibility,
} from './profile/profileTypes'
import './ProfilePage.css'

type ProfileData = {
  accountName: string
  username: string
  firstName: string
  lastName: string
  country: string
  location: string
  bio: string
  profilePhoto: string
  flair: string
  borders: string
  coverPhoto: string
}

const defaultProfile: ProfileData = {
  accountName: 'Player Name',
  username: '@playername',
  firstName: 'Player',
  lastName: 'Name',
  country: 'Philippines',
  location: 'Philippines',
  bio: 'Add your bio here.',
  profilePhoto: '',
  flair: '',
  borders: 'Default Gold',
  coverPhoto: '',
}

const flairIcons: Record<string, typeof Sparkles> = {
  'tactical-mind': Target,
  'puzzle-master': Lightbulb,
  'opening-expert': BookOpen,
  'endgame-specialist': Crown,
  'ccc-supporter': Shield,
  'chess-warrior': Swords,
  'streak-master': Flame,
  champion: Trophy,
  'master-player': Medal,
  'elite-player': Gem,
  'rapid-thinker': Zap,
  'star-player': Star,
}

const avatarSymbols: Record<
  string,
  {
    symbol: string
    background: string
    color: string
  }
> = {
  'ccc-knight': {
    symbol: '♞',
    background: '#332713',
    color: '#ffe4a0',
  },
  'ccc-king': {
    symbol: '♛',
    background: '#171717',
    color: '#f4d27d',
  },
  'ccc-shield': {
    symbol: '⬡',
    background: '#292929',
    color: '#f3d68b',
  },
  'ccc-champion': {
    symbol: '♜',
    background: '#352711',
    color: '#ffe5a3',
  },
  'minimal-star': {
    symbol: '★',
    background: '#20202a',
    color: '#eeeaff',
  },
  'minimal-gem': {
    symbol: '◆',
    background: '#142a35',
    color: '#a9efff',
  },
  'minimal-spark': {
    symbol: '✦',
    background: '#30231c',
    color: '#ffd6b4',
  },
  'minimal-circle': {
    symbol: '●',
    background: '#252525',
    color: '#e6e6e6',
  },
  'nature-leaf': {
    symbol: '❧',
    background: '#152c20',
    color: '#c0f1c9',
  },
  'nature-mountain': {
    symbol: '▲',
    background: '#202b36',
    color: '#d5e8f5',
  },
  'animal-paw': {
    symbol: '✥',
    background: '#33261b',
    color: '#f4d5ae',
  },
  'gaming-controller': {
    symbol: '⌘',
    background: '#211b38',
    color: '#d9caff',
  },
  'gaming-flame': {
    symbol: '♨',
    background: '#351a18',
    color: '#ffc1a4',
  },
  'gaming-energy': {
    symbol: 'ϟ',
    background: '#282516',
    color: '#fff0a6',
  },
  'abstract-target': {
    symbol: '◎',
    background: '#1b2931',
    color: '#b9f2f5',
  },
  'abstract-user': {
    symbol: '◉',
    background: '#29212d',
    color: '#f0d5ef',
  },
}

function avatarIdToImage(avatarId: string) {
  const avatar = avatarSymbols[avatarId]

  if (!avatar) return ''

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
      <defs>
        <linearGradient id="avatar-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${avatar.background}"/>
          <stop offset="100%" stop-color="#080808"/>
        </linearGradient>
      </defs>
      <circle cx="256" cy="256" r="256" fill="url(#avatar-bg)"/>
      <circle cx="256" cy="256" r="220" fill="none" stroke="${avatar.color}" stroke-opacity=".35" stroke-width="5"/>
      <text x="256" y="310" text-anchor="middle" font-size="220" fill="${avatar.color}" font-family="serif">${avatar.symbol}</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function readProfile(): ProfileData {
  try {
    const saved = localStorage.getItem('cx-profile-preview')

    return saved
      ? { ...defaultProfile, ...JSON.parse(saved) }
      : defaultProfile
  } catch {
    return defaultProfile
  }
}

function PageHeader({ title }: { title: string }) {
  const navigate = useNavigate()

  return (
    <header className="cx-profile-page-header">
      <button
        type="button"
        className="cx-profile-back"
        onClick={() => navigate('/profile')}
        aria-label="Back to profile"
      >
        <ArrowLeft size={20} />
      </button>

      <h1>{title}</h1>
      <span className="cx-profile-header-spacer" />
    </header>
  )
}

export default function EditProfilePage() {
  const navigate = useNavigate()

  const normalizeProfile = (
    profile: ProfileData
  ): ProfileData => ({
    ...defaultProfile,
    ...profile,
    country:
      profile.country === 'Philippines'
        ? 'PH'
        : profile.country,
    borders: profile.borders || 'Default Gold',
  })

  const [original] = useState<ProfileData>(() =>
    normalizeProfile(readProfile())
  )

  const [form, setForm] = useState<ProfileData>(() => {
    const profile = normalizeProfile(readProfile())

    const selectedAvatar = avatarIdToImage(
      localStorage.getItem('cx-profile-avatar') || ''
    )

    return {
      ...profile,
      flair:
        localStorage.getItem('cx-profile-flair') ??
        profile.flair,
      country:
        localStorage.getItem('cx-profile-country') ??
        profile.country,
      profilePhoto:
        selectedAvatar || profile.profilePhoto,
      coverPhoto:
        localStorage.getItem('cx-profile-cover') ||
        profile.coverPhoto,
    }
  })

  const [preview, setPreview] = useState(false)

  const [privacy, setPrivacy] =
    useState<ProfileVisibility>('Public')

  const [cropSource, setCropSource] = useState('')
  const [cropZoom, setCropZoom] = useState(1)
  const [cropX, setCropX] = useState(50)
  const [cropY, setCropY] = useState(50)

  const usernameChangedAt = Number(
    localStorage.getItem('cx-username-changed-at') || 0
  )

  const countryChangedAt = Number(
    localStorage.getItem('cx-country-changed-at') || 0
  )

  const cooldown = 90 * 24 * 60 * 60 * 1000
  const now = Date.now()

  const usernameLocked =
    usernameChangedAt > 0 &&
    now < usernameChangedAt + cooldown

  const countryLocked =
    countryChangedAt > 0 &&
    now < countryChangedAt + cooldown

  const getRemainingDays = (timestamp: number) =>
    Math.max(
      0,
      Math.ceil(
        (timestamp + cooldown - now) /
          (24 * 60 * 60 * 1000)
      )
    )

  const countryName = (code: string) => {
    if (code.length !== 2) return code

    try {
      return (
        new Intl.DisplayNames(['en'], {
          type: 'region',
        }).of(code) || code
      )
    } catch {
      return code
    }
  }

  const countryFlag = (code: string) => {
    if (!/^[A-Za-z]{2}$/.test(code)) return ''

    return String.fromCodePoint(
      ...code.toUpperCase().split('').map(
        (letter) => 127397 + letter.charCodeAt(0)
      )
    )
  }

  const countryAlpha3 = (code: string) => {
    const normalizedCode = code.toUpperCase()
    return alpha3[normalizedCode] || normalizedCode
  }

  const update = (
    key: keyof ProfileData,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const hasChanges = (
    Object.keys(form) as (keyof ProfileData)[]
  ).some((key) => form[key] !== original[key])

  const photoChange = (file?: File) => {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image.')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setCropSource(String(reader.result || ''))
      setCropZoom(1)
      setCropX(50)
      setCropY(50)
    }

    reader.readAsDataURL(file)
  }

  const confirmCrop = () => {
    if (!cropSource) return

    const image = new Image()

    image.onload = () => {
      const size =
        Math.min(
          image.naturalWidth,
          image.naturalHeight
        ) / cropZoom

      const maxX = image.naturalWidth - size
      const maxY = image.naturalHeight - size

      const sourceX = maxX * (cropX / 100)
      const sourceY = maxY * (cropY / 100)

      const canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 512

      const context = canvas.getContext('2d')

      if (!context) {
        alert('Unable to process this photo.')
        return
      }

      context.drawImage(
        image,
        sourceX,
        sourceY,
        size,
        size,
        0,
        0,
        512,
        512
      )

      update(
        'profilePhoto',
        canvas.toDataURL('image/jpeg', 0.9)
      )

      setCropSource('')
    }

    image.onerror = () => {
      alert('Unable to load this photo.')
    }

    image.src = cropSource
  }

  const removePhoto = () => {
    update('profilePhoto', '')
  }

  const save = () => {
    if (!hasChanges) return

    const username = form.username.trim()
    const firstName = form.firstName.trim()
    const lastName = form.lastName.trim()
    const bio = form.bio.slice(0, 20)

    if (username.length > 15) {
      alert('Username must not exceed 15 characters.')
      return
    }

    if (/\s/.test(username)) {
      alert('Username cannot contain spaces.')
      return
    }

    if (
      firstName.length > 10 ||
      lastName.length > 10
    ) {
      alert(
        'First Name and Last Name have a 10-character limit.'
      )
      return
    }

    if (bio.length > 20) {
      alert('Bio must not exceed 20 characters.')
      return
    }

    if (
      usernameLocked &&
      username !== original.username
    ) {
      alert(
        `Username can be changed again in ${getRemainingDays(
          usernameChangedAt
        )} days.`
      )
      return
    }

    if (
      countryLocked &&
      form.country !== original.country
    ) {
      alert(
        `Country can be changed again in ${getRemainingDays(
          countryChangedAt
        )} days.`
      )
      return
    }

    const nextProfile: ProfileData = {
      ...form,
      username,
      firstName,
      lastName,
      bio,
      accountName:
        `${firstName} ${lastName}`.trim() || username,
      borders: form.borders || 'Default Gold',
    }

    try {
      localStorage.setItem(
        'cx-profile-preview',
        JSON.stringify(nextProfile)
      )

      if (username !== original.username) {
        localStorage.setItem(
          'cx-username-changed-at',
          String(Date.now())
        )
      }

      if (form.country !== original.country) {
        localStorage.setItem(
          'cx-country-changed-at',
          String(Date.now())
        )
      }

      localStorage.removeItem('cx-profile-flair')
      localStorage.removeItem('cx-profile-country')
      localStorage.removeItem('cx-profile-avatar')
      localStorage.removeItem('cx-profile-cover')

      navigate('/profile')

      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto',
        })
      })
    } catch {
      alert(
        'Unable to save your profile. Your changes may exceed the available browser storage.'
      )
    }
  }

  const cancel = () => {
    localStorage.removeItem('cx-profile-flair')
    localStorage.removeItem('cx-profile-country')
    localStorage.removeItem('cx-profile-avatar')
    localStorage.removeItem('cx-profile-cover')

    navigate('/profile')
  }

  const displayCountry = countryName(form.country)
  const displayFlag = countryFlag(form.country)
  const displayAlpha3 = countryAlpha3(form.country)
  const SelectedFlairIcon = flairIcons[form.flair]

  return (
    <div className="cx-profile-subpage">
      <PageHeader title="Edit Profile" />

      <main className="cx-profile-edit-content">
        <section className="cx-edit-profile-row">
          <label>Profile Picture</label>

          <div className="cx-edit-picture-control">
            <div
              className="cx-edit-picture-preview"
              data-border={form.borders || 'Default Gold'}
            >
              {form.profilePhoto ? (
                <img
                  src={form.profilePhoto}
                  alt="Profile preview"
                />
              ) : (
                <CircleUserRound size={46} />
              )}
            </div>

            <button
              type="button"
              className="cx-profile-upload-button"
              onClick={() =>
                navigate('/profile/select-avatar')
              }
            >
              <Sparkles size={16} />
              Choose Avatar
            </button>

            <label className="cx-profile-upload-button">
              <Camera size={16} />
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  photoChange(event.target.files?.[0])
                  event.currentTarget.value = ''
                }}
              />
            </label>

            {form.profilePhoto && (
              <button
                type="button"
                className="cx-profile-upload-button cx-remove-photo-button"
                onClick={removePhoto}
              >
                <X size={16} />
                Remove Photo
              </button>
            )}
          </div>

          <span className="cx-edit-field-hint">
            Profile pictures use a circular 1:1 crop.
          </span>
        </section>

        <button
          type="button"
          className="cx-edit-profile-row cx-edit-select-row"
          onClick={() => navigate('/profile/select-flair')}
        >
          <span className="cx-edit-row-label">Flair</span>

          <span className="cx-edit-row-value">
            {form.flair && SelectedFlairIcon ? (
              <SelectedFlairIcon
                className="cx-edit-selected-flair-icon"
                size={20}
                aria-label="Selected flair"
              />
            ) : form.flair ? (
              <Sparkles
                className="cx-edit-selected-flair-icon"
                size={20}
                aria-label="Selected flair"
              />
            ) : (
              <>
                Choose Flair
                <ChevronRight size={17} />
              </>
            )}
          </span>
        </button>

        <button
          type="button"
          className="cx-edit-profile-row cx-edit-select-row"
          onClick={() => navigate('/profile/select-cover')}
        >
          <span className="cx-edit-row-label">
            Cover Photo
          </span>

          <span className="cx-edit-row-value">
            {form.coverPhoto
              ? 'Change Cover'
              : 'Choose Cover'}
            <ChevronRight size={17} />
          </span>
        </button>

        <section className="cx-edit-profile-row cx-edit-bio-row">
          <label htmlFor="profile-bio">Bio</label>

          <textarea
            id="profile-bio"
            rows={1}
            maxLength={20}
            value={form.bio}
            onChange={(event) =>
              update(
                'bio',
                event.target.value.slice(0, 20)
              )
            }
            placeholder="Tell others about yourself..."
          />

          <span className="cx-edit-field-hint">
            {form.bio.length}/20 characters
          </span>
        </section>

        <section className="cx-edit-profile-row">
          <label htmlFor="profile-username">Username</label>

          <input
            id="profile-username"
            value={form.username}
            maxLength={15}
            disabled={usernameLocked}
            onChange={(event) =>
              update(
                'username',
                event.target.value
                  .replace(/\s/g, '')
                  .slice(0, 15)
              )
            }
          />

          <span className="cx-edit-field-hint">
            {usernameLocked
              ? `Locked · Available again in ${getRemainingDays(
                  usernameChangedAt
                )} days`
              : 'Maximum 15 characters · No spaces'}
          </span>
        </section>

        <section className="cx-edit-profile-row">
          <label htmlFor="profile-firstName">
            First Name
          </label>

          <input
            id="profile-firstName"
            value={form.firstName}
            maxLength={10}
            onChange={(event) =>
              update(
                'firstName',
                event.target.value.slice(0, 10)
              )
            }
          />

          <span className="cx-edit-field-hint">
            {form.firstName.length}/10 characters
          </span>
        </section>

        <section className="cx-edit-profile-row">
          <label htmlFor="profile-lastName">
            Last Name
          </label>

          <input
            id="profile-lastName"
            value={form.lastName}
            maxLength={10}
            onChange={(event) =>
              update(
                'lastName',
                event.target.value.slice(0, 10)
              )
            }
          />

          <span className="cx-edit-field-hint">
            {form.lastName.length}/10 characters
          </span>
        </section>

        <button
          type="button"
          className="cx-edit-profile-row cx-edit-select-row"
          disabled={countryLocked}
          onClick={() =>
            navigate('/profile/select-country')
          }
        >
          <span className="cx-edit-row-label">
            Country
          </span>

          <span className="cx-edit-country-value">
            <span>{displayCountry}</span>
            <small>{displayAlpha3}</small>
            <strong>{displayFlag}</strong>
            {!countryLocked && <ChevronRight size={17} />}
          </span>

          {countryLocked && (
            <span className="cx-edit-field-hint">
              Locked · Available again in{' '}
              {getRemainingDays(countryChangedAt)} days
            </span>
          )}
        </button>

        <section className="cx-edit-profile-row">
          <label htmlFor="profile-location">
            Location
          </label>

          <input
            id="profile-location"
            value={form.location}
            onChange={(event) =>
              update('location', event.target.value)
            }
            placeholder="City or region"
          />
        </section>

        <ProfileBorderSelector
          value={form.borders as ProfileBorder}
          onChange={(value) => update('borders', value)}
        />

        <ProfileVisibilitySelector
          value={privacy}
          onChange={setPrivacy}
        />

        <div className="cx-profile-edit-actions">
          <button
            type="button"
            className="cx-profile-secondary-button"
            onClick={() => setPreview(true)}
          >
            <Eye size={16} />
            Preview Profile
          </button>

          <button
            type="button"
            className="cx-profile-primary-button"
            onClick={save}
            disabled={!hasChanges}
          >
            <Check size={16} />
            Save Changes
          </button>
        </div>

        <button
          className="cx-profile-cancel-button"
          type="button"
          onClick={cancel}
        >
          Cancel
        </button>

        {!hasChanges && (
          <p className="cx-edit-field-hint cx-edit-no-changes">
            No changes to save.
          </p>
        )}
      </main>

      {cropSource && (
        <div className="cx-profile-modal-backdrop">
          <section className="cx-profile-crop-modal">
            <button
              className="cx-profile-modal-close"
              type="button"
              onClick={() => setCropSource('')}
              aria-label="Cancel photo crop"
            >
              <X size={19} />
            </button>

            <h2>Adjust Profile Photo</h2>

            <p>
              Adjust your image inside the square crop area.
              It will appear as a circle on your profile.
            </p>

            <div className="cx-profile-crop-frame">
              <img
                src={cropSource}
                alt="Photo crop preview"
                style={{
                  width: `${cropZoom * 100}%`,
                  height: `${cropZoom * 100}%`,
                  maxWidth: 'none',
                  maxHeight: 'none',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transform: `translate(${(50 - cropX) * 0.02 * cropZoom}%, ${(50 - cropY) * 0.02 * cropZoom}%)`,
                }}
              />
            </div>

            <label className="cx-profile-crop-control">
              Zoom
              <input
                type="range"
                min="1"
                max="3"
                step="0.05"
                value={cropZoom}
                onChange={(event) =>
                  setCropZoom(Number(event.target.value))
                }
              />
            </label>

            <label className="cx-profile-crop-control">
              Horizontal Position
              <input
                type="range"
                min="0"
                max="100"
                value={cropX}
                onChange={(event) =>
                  setCropX(Number(event.target.value))
                }
              />
            </label>

            <label className="cx-profile-crop-control">
              Vertical Position
              <input
                type="range"
                min="0"
                max="100"
                value={cropY}
                onChange={(event) =>
                  setCropY(Number(event.target.value))
                }
              />
            </label>

            <div className="cx-profile-crop-actions">
              <button
                type="button"
                className="cx-profile-secondary-button"
                onClick={() => setCropSource('')}
              >
                Cancel
              </button>

              <button
                type="button"
                className="cx-profile-primary-button"
                onClick={confirmCrop}
              >
                <Check size={16} />
                Confirm Photo
              </button>
            </div>
          </section>
        </div>
      )}

      {preview && (
        <div
          className="cx-profile-modal-backdrop"
          onClick={() => setPreview(false)}
        >
          <section
            className="cx-profile-preview-modal cx-profile-live-preview"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="cx-profile-modal-close"
              type="button"
              onClick={() => setPreview(false)}
              aria-label="Close preview"
            >
              <X size={19} />
            </button>

            <span className="cx-profile-preview-label">
              PROFILE PREVIEW
            </span>

            <div
              className="cx-profile-preview-cover"
              style={
                form.coverPhoto
                  ? {
                      backgroundImage: `url("${form.coverPhoto}")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : undefined
              }
            />

            <div className="cx-profile-preview-identity">
              <div
                className="cx-edit-picture-preview"
                data-border={form.borders || 'Default Gold'}
              >
                {form.profilePhoto ? (
                  <img
                    src={form.profilePhoto}
                    alt="Profile"
                  />
                ) : (
                  <CircleUserRound size={42} />
                )}
              </div>

              <div>
                <h2>
                  {`${form.firstName} ${form.lastName}`.trim() ||
                    'Player Name'}
                </h2>

                <p>{form.username || '@username'}</p>
              </div>
            </div>

            {form.flair && (
              <div className="cx-profile-preview-flair">
                {SelectedFlairIcon ? (
                  <SelectedFlairIcon size={19} />
                ) : (
                  <Sparkles size={19} />
                )}
              </div>
            )}

            <p className="cx-profile-preview-bio">
              {form.bio || 'No bio added yet.'}
            </p>

            <div className="cx-profile-preview-information">
              <div>
                <span>Country</span>
                <strong>
                  {displayFlag} {displayCountry}
                </strong>
              </div>

              <div>
                <span>Location</span>
                <strong>
                  {form.location || 'Not specified'}
                </strong>
              </div>

              <div>
                <span>Borders</span>
                <strong>{form.borders}</strong>
              </div>
            </div>

            <p className="cx-profile-preview-visibility">
              Profile Visibility: {privacy}
            </p>

            <button
              type="button"
              className="cx-profile-primary-button"
              onClick={() => setPreview(false)}
            >
              Close Preview
            </button>
          </section>
        </div>
      )}
    </div>
  )
}
