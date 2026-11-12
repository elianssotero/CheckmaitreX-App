
export function getCountryName(code: string): string {
  if (!code) return ''

  if (code.length !== 2) {
    return code
  }

  try {
    return (
      new Intl.DisplayNames(['en'], {
        type: 'region',
      }).of(code.toUpperCase()) || code
    )
  } catch {
    return code
  }
}

export function getCountryFlag(code: string): string {
  const normalized = code.toUpperCase()

  if (!/^[A-Z]{2}$/.test(normalized)) {
    return ''
  }

  return String.fromCodePoint(
    ...normalized.split('').map(
      (letter) => 127397 + letter.charCodeAt(0)
    )
  )
}

export function normalizeCountryCode(
  country: string
): string {
  if (!country) return 'PH'

  if (country === 'Philippines') {
    return 'PH'
  }

  return country.toUpperCase()
}

export function getProfileAccountName(
  firstName: string,
  lastName: string,
  username: string
): string {
  const fullName = `${firstName.trim()} ${lastName.trim()}`.trim()

  return fullName || username.trim() || 'Player'
}
