
import { useState, type FormEvent } from 'react'

type Message = {
  id: number
  from: 'you' | 'maitronx'
  text: string
}

function MaitronXAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: 'maitronx',
      text: 'Welcome. I am MaîtronX V1. What would you like to explore?',
    },
  ])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const message = draft.trim()
    if (!message) return

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        from: 'you',
        text: message,
      },
      {
        id: Date.now() + 1,
        from: 'maitronx',
        text: 'This is a frontend preview. My AI connection will be added in a later phase.',
      },
    ])

    setDraft('')
  }

  return (
    <>
      <style>{`
        .cx-home .cx-welcome-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          position: relative;
        }

        .cx-home .cx-welcome-heading > div:first-child {
          flex: 1;
          min-width: 0;
        }

        .mx-widget {
          position: relative;
          flex: 0 0 210px;
          width: 210px;
          text-align: center;
          z-index: 5;
        }

        .mx-character-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 1.2 / 1;
          overflow: hidden;
          border: 1px solid rgba(217,180,91,.24);
          border-radius: 16px;
          background:
            radial-gradient(ellipse at center,
              rgba(130,25,28,.25),
              rgba(217,180,91,.08) 48%,
              #0b0b0d 78%);
        }

        .mx-character-stage img {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center top;
          transform-origin: center 82%;
          animation: mx-idle 4.5s ease-in-out infinite;
        }

        .mx-aura {
          position: absolute;
          inset: 15%;
          border-radius: 50%;
          background: rgba(217,180,91,.12);
          filter: blur(25px);
          animation: mx-glow 3.5s ease-in-out infinite;
        }

        @keyframes mx-idle {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-5px) scale(1.012, 1.018);
          }
        }

        @keyframes mx-glow {
          0%, 100% { opacity: .35; }
          50% { opacity: .85; }
        }

        .mx-meta {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 9px;
        }

        .mx-name {
          color: #f0d48a;
          font-size: 12px;
          font-weight: 800;
        }

        .mx-status {
          color: #55bd83;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .mx-greeting {
          margin: 7px 0;
          color: #c9c3b8;
          font-size: 10px;
        }

        .mx-open-button {
          width: 100%;
          padding: 9px 12px;
          border: 1px solid rgba(217,180,91,.45);
          border-radius: 9px;
          color: #f0d48a;
          background: rgba(217,180,91,.09);
          font-size: 10px;
          font-weight: 700;
        }

        .mx-open-button:hover {
          background: rgba(217,180,91,.17);
        }

        .mx-chat-panel {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          z-index: 50;
          display: flex;
          flex-direction: column;
          width: min(320px, calc(100vw - 32px));
          max-height: 360px;
          padding: 13px;
          border: 1px solid rgba(217,180,91,.3);
          border-radius: 14px;
          background: #111114;
          box-shadow: 0 15px 45px rgba(0,0,0,.55);
          text-align: left;
        }

        .mx-chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255,255,255,.08);
          color: #f0d48a;
          font-size: 12px;
          font-weight: 800;
        }

        .mx-close-button {
          border: 0;
          color: #aaa;
          background: transparent;
          font-size: 18px;
        }

        .mx-messages {
          display: flex;
          flex-direction: column;
          gap: 9px;
          min-height: 100px;
          max-height: 210px;
          padding: 12px 0;
          overflow-y: auto;
        }

        .mx-message {
          max-width: 90%;
          padding: 9px 11px;
          border-radius: 10px;
          font-size: 11px;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        .mx-message.bot {
          align-self: flex-start;
          color: #ddd;
          background: #242329;
        }

        .mx-message.user {
          align-self: flex-end;
          color: #17130d;
          background: #d9b45b;
        }

        .mx-chat-form {
          display: flex;
          gap: 7px;
        }

        .mx-chat-form input {
          flex: 1;
          min-width: 0;
          padding: 10px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 8px;
          outline: none;
          color: white;
          background: #1b1b20;
          font-size: 11px;
        }

        .mx-chat-form button {
          padding: 0 13px;
          border: 0;
          border-radius: 8px;
          color: #17130d;
          background: #d9b45b;
          font-size: 11px;
          font-weight: 800;
        }

        .mx-preview-note {
          margin: 9px 0 0;
          color: #77767d;
          font-size: 9px;
          text-align: center;
        }

        @media (max-width: 600px) {
          .mx-widget {
            flex-basis: 116px;
            width: 116px;
          }

          .mx-meta {
            flex-wrap: wrap;
            gap: 4px;
          }

          .mx-name {
            font-size: 10px;
          }

          .mx-greeting {
            font-size: 9px;
          }

          .mx-open-button {
            padding: 8px 5px;
            font-size: 9px;
          }

          .mx-chat-panel {
            position: fixed;
            top: auto;
            right: 12px;
            bottom: 82px;
            width: calc(100vw - 24px);
            max-width: 340px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mx-character-stage img,
          .mx-aura {
            animation: none;
          }
        }
      `}</style>

      <div className="mx-widget">
        <div className="mx-character-stage">
          <div className="mx-aura" />
          <img
            src="/ai-assistant/maitronx-v1.jpg"
            alt="MaîtronX V1 chess guardian"
          />
        </div>

        <div className="mx-meta">
          <span className="mx-name">MaîtronX V1</span>
          <span className="mx-status">● ONLINE</span>
        </div>

        <p className="mx-greeting">
          Ready for your next move?
        </p>

        <button
          type="button"
          className="mx-open-button"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? 'Close Assistant' : 'Talk to MaîtronX'}
        </button>

        {isOpen && (
          <section
            className="mx-chat-panel"
            role="dialog"
            aria-label="MaîtronX chat preview"
          >
            <div className="mx-chat-header">
              <span>MaîtronX V1</span>
              <button
                type="button"
                className="mx-close-button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            <div className="mx-messages" aria-live="polite">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mx-message ${
                    message.from === 'you' ? 'user' : 'bot'
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <form className="mx-chat-form" onSubmit={handleSubmit}>
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Message MaîtronX..."
                aria-label="Message MaîtronX"
              />
              <button type="submit">Send</button>
            </form>

            <p className="mx-preview-note">
              Frontend preview · AI not connected
            </p>
          </section>
        )}
      </div>
    </>
  )
}

export default MaitronXAssistant
