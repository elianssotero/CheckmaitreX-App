
import { useState, type FormEvent } from 'react'

type Message = {
  id: number
  from: 'you' | 'maitronx'
  text: string
}

function MaitronXAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
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
      { id: Date.now(), from: 'you', text: message },
      {
        id: Date.now() + 1,
        from: 'maitronx',
        text: 'This is a frontend preview. My AI connection will be added in a later phase.',
      },
    ])

    setDraft('')
    setIsSpeaking(true)
    window.setTimeout(() => setIsSpeaking(false), 1800)
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
          display: grid;
          place-items: center;
          width: 100%;
          aspect-ratio: 1.2 / 1;
          overflow: hidden;
          border: 1px solid rgba(217,180,91,.24);
          border-radius: 16px;
          background:
            radial-gradient(ellipse at center,
              rgba(130,25,28,.22),
              rgba(217,180,91,.08) 48%,
              #0b0b0d 78%);
        }

        .mx-aura {
          position: absolute;
          width: 68%;
          height: 68%;
          border-radius: 50%;
          background: rgba(217,180,91,.19);
          filter: blur(27px);
          animation: mx-glow 3.5s ease-in-out infinite;
        }

        .mx-avatar {
          position: relative;
          z-index: 2;
          width: 88%;
          max-height: 100%;
          overflow: visible;
          animation: mx-float 4s ease-in-out infinite;
        }

        .mx-head {
          transform-box: fill-box;
          transform-origin: center;
          animation: mx-head-tilt 7s ease-in-out infinite;
        }

        .mx-eye-glow {
          animation: mx-eye-pulse 3s ease-in-out infinite;
        }

        .mx-pupil {
          animation: mx-look 6s ease-in-out infinite;
        }

        .mx-eyelid {
          transform-box: fill-box;
          transform-origin: center top;
          animation: mx-blink 5s infinite;
        }

        .mx-mouth {
          transform-box: fill-box;
          transform-origin: center;
          animation: mx-mouth-idle 3s ease-in-out infinite;
        }

        .mx-widget.is-speaking .mx-mouth {
          animation: mx-talk  .19s ease-in-out infinite alternate;
        }

        @keyframes mx-float {
          0%, 100% { transform: translateY(2px); }
          50% { transform: translateY(-6px); }
        }

        @keyframes mx-head-tilt {
          0%, 35%, 65%, 100% { transform: rotate(0deg); }
          45% { transform: rotate(-2deg); }
          55% { transform: rotate(2deg); }
        }

        @keyframes mx-glow {
          0%, 100% { opacity: .35; transform: scale(.9); }
          50% { opacity: .85; transform: scale(1.12); }
        }

        @keyframes mx-eye-pulse {
          0%, 100% { opacity: .75; }
          50% { opacity: 1; }
        }

        @keyframes mx-look {
          0%, 30%, 100% { transform: translateX(0); }
          40%, 55% { transform: translateX(3px); }
          65%, 80% { transform: translateX(-2px); }
        }

        @keyframes mx-blink {
          0%, 43%, 47%, 100% { transform: scaleY(0); }
          45% { transform: scaleY(1); }
        }

        @keyframes mx-mouth-idle {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(.72); }
        }

        @keyframes mx-talk {
          from { transform: scaleY(.45); }
          to { transform: scaleY(1.5); }
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

          .mx-name { font-size: 10px; }
          .mx-greeting { font-size: 9px; }

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
          .mx-avatar,
          .mx-head,
          .mx-aura,
          .mx-eye-glow,
          .mx-pupil,
          .mx-eyelid,
          .mx-mouth {
            animation: none !important;
          }
        }
      `}</style>

      <div className={`mx-widget ${isSpeaking ? 'is-speaking' : ''}`}>
        <div className="mx-character-stage">
          <div className="mx-aura" />

          <svg
            className="mx-avatar"
            viewBox="0 0 240 190"
            role="img"
            aria-label="Animated MaîtronX AI chatbot head"
          >
            <defs>
              <linearGradient id="mx-helmet" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#39302a" />
                <stop offset="48%" stopColor="#111114" />
                <stop offset="100%" stopColor="#050506" />
              </linearGradient>

              <linearGradient id="mx-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fff0b0" />
                <stop offset="50%" stopColor="#d9b45b" />
                <stop offset="100%" stopColor="#8b6228" />
              </linearGradient>

              <radialGradient id="mx-face">
                <stop offset="0%" stopColor="#343037" />
                <stop offset="100%" stopColor="#111014" />
              </radialGradient>

              <filter id="mx-glow-filter">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g className="mx-head">
              {/* Outer helmet */}
              <path
                d="M43 142 L34 91 Q31 35 82 24 L120 10 L158 24 Q209 35 206 91 L197 142 L177 162 L63 162 Z"
                fill="url(#mx-helmet)"
                stroke="url(#mx-gold)"
                strokeWidth="3"
              />

              {/* Crown */}
              <path
                d="M83 27 L92 9 L108 22 L120 4 L132 22 L148 9 L157 27"
                fill="#171419"
                stroke="url(#mx-gold)"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              <path
                d="M94 27 L120 15 L146 27"
                fill="none"
                stroke="#d9b45b"
                strokeWidth="2"
              />

              {/* Side armor */}
              <path
                d="M42 83 L22 98 L34 137 L54 145 L57 111 Z"
                fill="#171419"
                stroke="#b68d43"
                strokeWidth="2"
              />

              <path
                d="M198 83 L218 98 L206 137 L186 145 L183 111 Z"
                fill="#171419"
                stroke="#b68d43"
                strokeWidth="2"
              />

              {/* Face plate */}
              <path
                d="M60 66 Q60 47 82 43 L120 36 L158 43 Q180 47 180 66 L174 126 Q170 151 120 157 Q70 151 66 126 Z"
                fill="url(#mx-face)"
                stroke="#80602e"
                strokeWidth="2"
              />

              {/* Brow detail */}
              <path
                d="M75 69 L104 61 L120 65 L136 61 L165 69"
                fill="none"
                stroke="#d9b45b"
                strokeWidth="2"
                opacity=".8"
              />

              {/* Eye glow */}
              <g className="mx-eye-glow" filter="url(#mx-glow-filter)">
                <path
                  d="M76 86 Q91 72 108 87 L104 100 Q90 108 78 98 Z"
                  fill="#d9b45b"
                  opacity=".95"
                />
                <path
                  d="M132 87 Q149 72 164 86 L162 98 Q149 108 136 100 Z"
                  fill="#d9b45b"
                  opacity=".95"
                />
              </g>

              {/* Pupils */}
              <g className="mx-pupil">
                <ellipse cx="93" cy="91" rx="5" ry="7" fill="#fff5cf" />
                <ellipse cx="147" cy="91" rx="5" ry="7" fill="#fff5cf" />
              </g>

              {/* Eyelids */}
              <g className="mx-eyelid">
                <path d="M75 82 Q92 69 109 83 L107 96 L77 96 Z" fill="#242027" />
                <path d="M131 83 Q148 69 165 82 L163 96 L133 96 Z" fill="#242027" />
              </g>

              {/* Nose detail */}
              <path
                d="M116 99 L111 113 L120 117 L129 113 L124 99"
                fill="none"
                stroke="#9a783c"
                strokeWidth="1.5"
                opacity=".7"
              />

              {/* Animated mouth */}
              <path
                className="mx-mouth"
                d="M103 132 Q120 140 137 132"
                fill="none"
                stroke="#e2bb68"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Gold cheek details */}
              <path d="M68 112 L83 118" stroke="#d9b45b" strokeWidth="2" />
              <path d="M172 112 L157 118" stroke="#d9b45b" strokeWidth="2" />

              {/* Lower helmet edge */}
              <path
                d="M66 143 Q120 169 174 143"
                fill="none"
                stroke="url(#mx-gold)"
                strokeWidth="3"
              />

              {/* Center jewel */}
              <path
                d="M120 25 L127 32 L120 39 L113 32 Z"
                fill="#d9b45b"
                filter="url(#mx-glow-filter)"
              />
            </g>
          </svg>
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
