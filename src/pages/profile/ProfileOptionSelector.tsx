
import { useEffect, useState } from 'react'
import { Check, ChevronDown, X } from 'lucide-react'
import type { ProfileSelectorProps } from './profileTypes'
import './ProfileSelectors.css'

export default function ProfileOptionSelector({
  label,
  value,
  options,
  description,
  onChange,
}: ProfileSelectorProps) {
  const [open, setOpen] = useState(false)
useEffect(() => {
  if (!open) return

  const scrollY = window.scrollY

  const previousBodyPosition = document.body.style.position
  const previousBodyTop = document.body.style.top
  const previousBodyWidth = document.body.style.width
  const previousBodyOverflow = document.body.style.overflow
  const previousHtmlOverflow =
    document.documentElement.style.overflow

  document.body.style.position = 'fixed'
  document.body.style.top = `-${scrollY}px`
  document.body.style.width = '100%'
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'

  return () => {
    document.body.style.position = previousBodyPosition
    document.body.style.top = previousBodyTop
    document.body.style.width = previousBodyWidth
    document.body.style.overflow = previousBodyOverflow
    document.documentElement.style.overflow =
      previousHtmlOverflow

    window.scrollTo(0, scrollY)
  }
}, [open])
  
  const selectedOption =
    options.find((option) => option.value === value) ??
    options[0]

  const chooseOption = (nextValue: string) => {
    onChange(nextValue)
    setOpen(false)
  }

  return (
    <section className="cx-profile-selector-field">
      <span className="cx-profile-selector-label">
        {label}
      </span>

      <button
        type="button"
        className="cx-profile-selector-trigger"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="cx-profile-selector-trigger-text">
          <strong>
            {selectedOption?.label ?? value}
          </strong>

          {selectedOption?.description && (
            <small>{selectedOption.description}</small>
          )}
        </span>

        <ChevronDown size={19} />
      </button>

      {description && (
        <span className="cx-profile-selector-hint">
          {description}
        </span>
      )}

      {open && (
        <div
          className="cx-profile-selector-backdrop"
          onClick={() => setOpen(false)}
        >
          <section
            className="cx-profile-selector-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`Choose ${label}`}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="cx-profile-selector-header">
              <div>
                <strong>{label}</strong>
                <span>Select your preferred option.</span>
              </div>

              <button
                type="button"
                className="cx-profile-selector-close"
                onClick={() => setOpen(false)}
                aria-label="Close selector"
              >
                <X size={19} />
              </button>
            </header>

            <div className="cx-profile-selector-options">
              {options.map((option) => {
                const isSelected =
                  option.value === value

                return (
                  <button
                    type="button"
                    key={option.value}
                    className={`cx-profile-selector-option ${
                      isSelected ? 'selected' : ''
                    }`}
                    onClick={() =>
                      chooseOption(option.value)
                    }
                  >
                    <span>
                      <strong>{option.label}</strong>

                      {option.description && (
                        <small>{option.description}</small>
                      )}
                    </span>

                    {isSelected && (
                      <Check size={19} />
                    )}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              className="cx-profile-selector-done"
              onClick={() => setOpen(false)}
            >
              Done
            </button>
          </section>
        </div>
      )}
    </section>
  )
}
