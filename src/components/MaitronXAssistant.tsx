import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Mic,
  MicOff,
  Moon,
  ShieldCheck,
} from 'lucide-react'

type Activity = {
  type: 'game' | 'puzzle' | 'lesson' | 'tournament'
  summary: string
}

type Props = {
  recentActivity?: Activity | null
  fullPage?: boolean
  homepageMode?: boolean
}

type Status =
  | 'online'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'connecting'
  | 'sleep'
  | 'offline'
  | 'error'

type RecognitionResult = {
  isFinal: boolean
  0: { transcript: string }
}

type RecognitionEvent = {
  resultIndex: number
  results: ArrayLike<RecognitionResult>
}

type RecognitionError = {
  error: string
}

type Recognition = {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: ((event: RecognitionEvent) => void) | null
  onerror: ((event: RecognitionError) => void) | null
  onend: (() => void) | null
  start(): void
  stop(): void
  abort(): void
}

declare global {
  interface Window {
    SpeechRecognition?: new () => Recognition
    webkitSpeechRecognition?: new () => Recognition
  }
}

function getGreeting(activity?: Activity | null) {
  if (!activity) {
    return 'Hello! Nandito ako. Ano ang gusto mong pag-usapan tungkol sa chess?'
  }

  const greetings: Record<Activity['type'], string> = {
    game: 'Napansin ko ang recent game activity mo. ',
    puzzle: 'May recent puzzle activity ka. ',
    lesson: 'May recent chess lesson activity ka. ',
    tournament: 'May recent tournament activity ka. ',
  }

  return greetings[activity.type] +
    activity.summary +
    ' Gusto mo ba itong pag-aralan natin?'
}

function getPrompts(activity?: Activity | null) {
  if (!activity) {
    return [
      'Help me improve my chess.',
      'Give me a chess tip.',
      'Teach me a new opening.',
    ]
  }

  const prompts: Record<Activity['type'], string[]> = {
    game: [
      'Review my recent game.',
      'What should I improve?',
      'Find my possible mistakes.',
    ],
    puzzle: [
      'Explain the puzzle tactic.',
      'Give me another challenge.',
      'Teach me the pattern.',
    ],
    lesson: [
      'Quiz me about this lesson.',
      'Explain the main concept.',
      'Give me a practical example.',
    ],
    tournament: [
      'Help me prepare for a tournament.',
      'Give me a preparation plan.',
      'What should I focus on?',
    ],
  }

  return prompts[activity.type]
}

function StatusLabel({ status }: { status: Status }) {
  const labels: Record<Status, string> = {
    online: 'ONLINE',
    listening: 'LISTENING',
    thinking: 'THINKING',
    speaking: 'SPEAKING',
    connecting: 'CONNECTING',
    sleep: 'SLEEP MODE',
    offline: 'OFFLINE',
    error: 'ERROR',
  }

  return (
    <span className={`mx-status mx-status-${status}`}>
      <span className="mx-status-dot" />
      {labels[status]}
    </span>
  )
}

export default function MaitronXAssistant({
  recentActivity = null,
  fullPage = false,
  homepageMode = false,
}: Props) {
  const navigate = useNavigate()

  const [status, setStatus] = useState<Status>(
    navigator.onLine ? 'online' : 'offline'
  )
  const [message, setMessage] = useState(() =>
    getGreeting(recentActivity)
  )
  const [transcript, setTranscript] = useState('')
  const [showPrompts, setShowPrompts] = useState(false)
  const [showPermission, setShowPermission] = useState(false)
  const [permissionError, setPermissionError] = useState('')
  const [sleepMode, setSleepMode] = useState(false)

  const recognitionRef = useRef<Recognition | null>(null)
  const activeRef = useRef(false)
  const longPressRef = useRef<number | null>(null)
  const singleTapRef = useRef<number | null>(null)
  const longPressedRef = useRef(false)
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    setMessage(getGreeting(recentActivity))
  }, [recentActivity])

  useEffect(() => {
    const handleOnline = () => {
      if (!activeRef.current && !sleepMode) setStatus('online')
    }

    const handleOffline = () => {
      setStatus('offline')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [sleepMode])

  useEffect(() => {
    return () => {
      activeRef.current = false

      if (longPressRef.current !== null) {
        window.clearTimeout(longPressRef.current)
      }

      if (singleTapRef.current !== null) {
        window.clearTimeout(singleTapRef.current)
      }

      recognitionRef.current?.abort()
    }
  }, [])

  function stopConversation() {
    activeRef.current = false
    recognitionRef.current?.stop()
    recognitionRef.current = null
    setStatus(navigator.onLine ? 'online' : 'offline')
    setTranscript('')
    setMessage('Voice session ended. Nandito ako kapag gusto mong magpatuloy.')
  }

  function startRecognition() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setStatus('error')
      setMessage(
        'Hindi available ang voice recognition sa browser na ito. Gumamit ng updated browser na sumusuporta sa speech recognition.'
      )
      return
    }

    try {
      const recognition = new SpeechRecognition()

      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'fil-PH'

      recognitionRef.current = recognition
      activeRef.current = true

      setStatus('listening')
      setTranscript('')
      setMessage('Nakikinig ako. Maaari kang magsalita nang natural.')

      recognition.onresult = (event) => {
        let current = ''
        let finalText = ''

        for (
          let i = event.resultIndex;
          i < event.results.length;
          i++
        ) {
          const result = event.results[i]
          const spokenText = result[0].transcript

          if (result.isFinal) {
            finalText += spokenText
          } else {
            current += spokenText
          }
        }

        if (current) setTranscript(current)

        if (finalText.trim()) {
          const spoken = finalText.trim()

          setTranscript(spoken)
          setStatus('thinking')
          setMessage(
            `Narinig ko ang sinabi mo: “${spoken}”. Ang AI response ay ikokonekta pa sa CCC backend.`
          )

          window.setTimeout(() => {
            if (activeRef.current) setStatus('listening')
          }, 1200)
        }
      }

      recognition.onerror = (event) => {
        if (
          event.error === 'not-allowed' ||
          event.error === 'service-not-allowed'
        ) {
          activeRef.current = false
          setStatus('error')
          setMessage('Hindi naibigay ang microphone permission.')
          setPermissionError(
            'Hindi pinayagan ang microphone. Maaari mong baguhin ito sa site permissions ng browser.'
          )
        } else if (event.error === 'no-speech') {
          setStatus('listening')
        } else {
          setStatus('error')
          setMessage('Na-interrupt ang voice input. Maaari mong subukan muli.')
        }
      }

      recognition.onend = () => {
        if (activeRef.current) {
          try {
            recognition.start()
            setStatus('listening')
          } catch {
            activeRef.current = false
            setStatus('error')
          }
        }
      }

      recognition.start()
    } catch {
      activeRef.current = false
      setStatus('error')
      setMessage('Hindi masimulan ang voice session.')
    }
  }

  async function requestMicrophone() {
    setPermissionError('')

    if (!navigator.mediaDevices?.getUserMedia) {
      setPermissionError(
        'Hindi suportado ang microphone access. Buksan ang website gamit ang secure HTTPS connection at updated browser.'
      )
      return
    }

    try {
      setStatus('connecting')

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      })

      stream.getTracks().forEach((track) => track.stop())

      setShowPermission(false)
      startRecognition()
    } catch {
      setStatus('error')
      setPermissionError(
        'Hindi naibigay ang microphone permission. Tingnan ang browser site settings at subukan muli.'
      )
    }
  }

  function handleDoubleTap() {
    if (activeRef.current) {
      stopConversation()
      return
    }

    if (sleepMode) {
      setSleepMode(false)
      setStatus('online')
    }

    setShowPermission(true)
  }

  function handlePointerDown(
    event: React.PointerEvent<HTMLButtonElement>
  ) {
    longPressedRef.current = false
    pointerStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    }

    longPressRef.current = window.setTimeout(() => {
      longPressedRef.current = true

      if (!fullPage) {
        navigate('/maitronx')
      }
    }, 650)
  }

    function handlePointerUp(
    event: React.PointerEvent<HTMLButtonElement>
  ) {
  if (longPressRef.current !== null) {
    window.clearTimeout(longPressRef.current)
    longPressRef.current = null
  }

  if (longPressedRef.current) return

  const start = pointerStartRef.current

  if (start) {
    const distance = Math.hypot(
      event.clientX - start.x,
      event.clientY - start.y
    )

    if (distance > 15) return
  }

  if (singleTapRef.current !== null) {
    window.clearTimeout(singleTapRef.current)
    singleTapRef.current = null
    handleDoubleTap()
  } else {
    singleTapRef.current = window.setTimeout(() => {
      singleTapRef.current = null

      if (!homepageMode) {
        setShowPrompts((previous) => !previous)
      }
    }, 270)
  }
  }

  function handlePointerCancel() {
    if (longPressRef.current !== null) {
      window.clearTimeout(longPressRef.current)
      longPressRef.current = null
    }
  }

  function selectPrompt(prompt: string) {
    setMessage(prompt)
    setShowPrompts(false)
    setStatus('online')
  }

  function toggleSleepMode() {
    if (activeRef.current) stopConversation()

    const next = !sleepMode
    setSleepMode(next)
    setStatus(next ? 'sleep' : navigator.onLine ? 'online' : 'offline')
    setMessage(
      next
        ? 'Naka-Sleep Mode ako. Maaari mo akong i-activate anumang oras.'
        : getGreeting(recentActivity)
    )
  }

  return (
    <section className={`mx-assistant ${fullPage ? 'mx-full-page' : ''}`}>
      <style>{`
        .mx-assistant {
          width: 100%;
          color: #f3f1eb;
          font-family: inherit;
        }

        .mx-assistant * { box-sizing: border-box; }

        .mx-widget {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
          max-width: 760px;
          margin: auto;
        }

        .mx-chat {
          flex: 1;
          min-width: 0;
        }

        .mx-bubble {
          padding: 15px;
          border: 1px solid rgba(217,180,91,.38);
          border-radius: 16px 16px 16px 5px;
          background: linear-gradient(145deg,#211e1c,#111114);
          color: #e8e1d3;
          font-size: 12px;
          line-height: 1.7;
          overflow-wrap: anywhere;
          box-shadow: 0 7px 24px #0004;
        }

        .mx-bubble-name {
          display: block;
          margin-bottom: 6px;
          color: #e5bd68;
          font-size: 11px;
          font-weight: 800;
        }

        .mx-prompts {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 10px;
        }

        .mx-prompt {
          padding: 8px 10px;
          border: 1px solid #d9b45b45;
          border-radius: 20px;
          color: #e7d4a7;
          background: #1a1712;
          font-size: 10px;
          text-align: left;
        }

        .mx-prompt:hover {
          border-color: #d9b45b;
          background: #292216;
        }

        .mx-transcript {
          margin-top: 9px;
          padding: 9px 11px;
          border-radius: 9px;
          background: #ffffff08;
          color: #c5bfae;
          font-size: 10px;
          overflow-wrap: anywhere;
        }

        .mx-character {
          flex: 0 0 140px;
          width: 140px;
          text-align: center;
        }

        .mx-head-button {
          display: block;
          width: 100%;
          padding: 0;
          border: 0;
          border-radius: 18px;
          background: transparent;
          cursor: pointer;
          touch-action: pan-y;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
        }

        .mx-head-button:focus { outline: none; }

        .mx-stage {
          display: grid;
          place-items: center;
          width: 100%;
          aspect-ratio: 1;
          border: 1px solid #d9b45b55;
          border-radius: 18px;
          background: radial-gradient(circle,#8a632b44,#161316 70%,#0b0b0d);
          transition: box-shadow .3s, border-color .3s;
        }

        .mx-status-listening .mx-stage {
          box-shadow: 0 0 25px #d9b45b55;
          border-color: #d9b45b;
        }

        .mx-status-thinking .mx-stage {
          box-shadow: 0 0 24px #8b75c955;
        }

        .mx-status-sleep .mx-stage {
          opacity: .55;
          filter: saturate(.4);
        }

        .mx-avatar {
          width: 96%;
          animation: mx-float 3.5s ease-in-out infinite;
        }

        .mx-eyes {
          animation: mx-eyes 3s ease-in-out infinite;
        }

        .mx-mouth {
          transform-box: fill-box;
          transform-origin: center;
          animation: mx-mouth 2s ease-in-out infinite;
        }

        .mx-meta {
          margin-top: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }

        .mx-name {
          color: #e5bd68;
          font-size: 12px;
          font-weight: 800;
        }

        .mx-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #a9a39a;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .mx-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #999;
        }

        .mx-status-online .mx-status-dot { background: #55bd83; }
        .mx-status-listening .mx-status-dot { background: #d9b45b; }
        .mx-status-thinking .mx-status-dot { background: #a48be5; }
        .mx-status-speaking .mx-status-dot { background: #55bd83; }
        .mx-status-connecting .mx-status-dot { background: #d9b45b; }
        .mx-status-offline .mx-status-dot { background: #888; }
        .mx-status-error .mx-status-dot { background: #e16d6d; }

        .mx-full-page {
          max-width: 900px;
          margin: 0 auto;
        }

        .mx-full-page .mx-widget {
          align-items: flex-start;
          gap: 28px;
        }

        .mx-full-page .mx-character {
          flex-basis: 220px;
          width: 220px;
        }

        .mx-full-page .mx-bubble {
          font-size: 14px;
          padding: 20px;
        }

        .mx-full-page .mx-prompt {
          font-size: 12px;
          padding: 10px 13px;
        }

        .mx-tools {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 16px;
        }

        .mx-tool {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 12px;
          border: 1px solid #d9b45b40;
          border-radius: 10px;
          color: #e6d4aa;
          background: #1a1712;
          font-size: 10px;
          font-weight: 700;
        }

        .mx-tool:disabled { opacity: .5; }

        .mx-permission-backdrop {
          position: fixed;
          z-index: 999;
          inset: 0;
          display: grid;
          place-items: center;
          padding: 20px;
          background: #000b;
          backdrop-filter: blur(8px);
        }

        .mx-permission-card {
          width: 100%;
          max-width: 360px;
          padding: 24px;
          border: 1px solid #d9b45b66;
          border-radius: 18px;
          background: linear-gradient(145deg,#211e1c,#101013);
          box-shadow: 0 20px 70px #0009;
        }

        .mx-permission-icon {
          display: grid;
          place-items: center;
          width: 48px;
          height: 48px;
          margin-bottom: 16px;
          border: 1px solid #d9b45b66;
          border-radius: 14px;
          color: #e5bd68;
          background: #d9b45b13;
        }

        .mx-permission-card h3 {
          margin: 0 0 8px;
          color: #f3e4bd;
          font-size: 17px;
        }

        .mx-permission-card p {
          color: #aaa39a;
          font-size: 12px;
          line-height: 1.7;
        }

        .mx-permission-actions {
          display: flex;
          gap: 9px;
          margin-top: 18px;
        }

        .mx-permission-actions button {
          flex: 1;
          padding: 11px;
          border: 1px solid #d9b45b66;
          border-radius: 10px;
          color: #16120b;
          background: #d9b45b;
          font-size: 11px;
          font-weight: 800;
        }

        .mx-permission-actions .mx-cancel {
          color: #c9c1b3;
          background: #ffffff08;
          border-color: #ffffff20;
        }

        .mx-error {
          margin-top: 10px;
          color: #e58c8c;
          font-size: 11px;
          line-height: 1.5;
        }

        @keyframes mx-float {
          0%,100% { transform: translateY(2px); }
          50% { transform: translateY(-5px); }
        }

        @keyframes mx-eyes {
          0%,100% { opacity: .8; }
          50% { opacity: 1; }
        }

        @keyframes mx-mouth {
          0%,100% { transform: scaleY(1); }
          50% { transform: scaleY(.65); }
        }

        @media(max-width:600px) {
          .mx-widget { gap: 10px; }
          .mx-character { flex-basis: 105px; width: 105px; }
          .mx-bubble { padding: 11px; font-size: 10px; }
          .mx-full-page .mx-widget {
            flex-direction: column-reverse;
            align-items: stretch;
          }
          .mx-full-page .mx-character {
            flex-basis: auto;
            width: 145px;
            margin: 0 auto;
          }
          .mx-full-page .mx-bubble { font-size: 12px; }
        }

        @media(max-width:380px) {
          .mx-widget { gap: 7px; }
          .mx-character { flex-basis: 88px; width: 88px; }
          .mx-bubble { padding: 9px; font-size: 9px; }
        }

        @media(prefers-reduced-motion:reduce) {
          .mx-avatar,.mx-eyes,.mx-mouth {
            animation: none !important;
          }
        }
      `}</style>

      <div className="mx-widget">
        <div className="mx-chat">
          <div className="mx-bubble" aria-live="polite">
            <span className="mx-bubble-name">MaîtronX</span>
            {message}
          </div>

          {showPrompts && (
            <div className="mx-prompts">
              {getPrompts(recentActivity).map((prompt) => (
                <button
                  type="button"
                  className="mx-prompt"
                  key={prompt}
                  onClick={() => selectPrompt(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {transcript && (
            <div className="mx-transcript" aria-live="polite">
              <strong>Voice input:</strong> {transcript}
            </div>
          )}

          <div className="mx-tools">
            {activeRef.current ? (
              <button
                type="button"
                className="mx-tool"
                onClick={stopConversation}
              >
                <MicOff size={14} /> End voice
              </button>
            ) : (
              <button
                type="button"
                className="mx-tool"
                onClick={() => setShowPermission(true)}
              >
                <Mic size={14} /> Voice
              </button>
            )}

            {fullPage && (
              <button
                type="button"
                className="mx-tool"
                onClick={toggleSleepMode}
              >
                <Moon size={14} />
                {sleepMode ? 'Wake MaîtronX' : 'Sleep Mode'}
              </button>
            )}
          </div>
        </div>

        <div className="mx-character">
          <button
            type="button"
            className="mx-head-button"
            aria-label="Tap for prompts, double tap for voice, long press for full page"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onContextMenu={(event) => event.preventDefault()}
          >
            <div className="mx-stage">
              <svg
                className="mx-avatar"
                viewBox="0 0 240 190"
                role="img"
                aria-label="MaîtronX animated head"
              >
                <defs>
                  <linearGradient id="mx-metal" x2="1" y2="1">
                    <stop offset="0%" stopColor="#51402b" />
                    <stop offset="55%" stopColor="#171419" />
                    <stop offset="100%" stopColor="#08080a" />
                  </linearGradient>
                  <linearGradient id="mx-gold" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fff0b0" />
                    <stop offset="50%" stopColor="#d9b45b" />
                    <stop offset="100%" stopColor="#8b6228" />
                  </linearGradient>
                </defs>

                <path
                  d="M43 142 L34 91 Q31 35 82 24 L120 10 L158 24 Q209 35 206 91 L197 142 L177 162 L63 162 Z"
                  fill="url(#mx-metal)"
                  stroke="url(#mx-gold)"
                  strokeWidth="3"
                />

                <path
                  d="M83 27 L92 9 L108 22 L120 4 L132 22 L148 9 L157 27"
                  fill="#171419"
                  stroke="url(#mx-gold)"
                  strokeWidth="3"
                />

                <path
                  d="M60 66 Q60 47 82 43 L120 36 L158 43 Q180 47 180 66 L174 126 Q170 151 120 157 Q70 151 66 126 Z"
                  fill="#211e25"
                  stroke="#80602e"
                  strokeWidth="2"
                />

                <g className="mx-eyes">
                  <path
                    d="M76 86 Q91 72 108 87 L104 100 Q90 108 78 98 Z"
                    fill="#d9b45b"
                  />
                  <path
                    d="M132 87 Q149 72 164 86 L162 98 Q149 108 136 100 Z"
                    fill="#d9b45b"
                  />
                  <ellipse cx="93" cy="91" rx="5" ry="7" fill="#fff5cf" />
                  <ellipse cx="147" cy="91" rx="5" ry="7" fill="#fff5cf" />
                </g>

                <path
                  d="M116 99 L111 113 L120 117 L129 113 L124 99"
                  fill="none"
                  stroke="#9a783c"
                  strokeWidth="1.5"
                />

                <path
                  className="mx-mouth"
                  d="M103 132 Q120 140 137 132"
                  fill="none"
                  stroke="#e2bb68"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <path
                  d="M66 143 Q120 169 174 143"
                  fill="none"
                  stroke="url(#mx-gold)"
                  strokeWidth="3"
                />

                <path
                  d="M120 25 L127 32 L120 39 L113 32 Z"
                  fill="#d9b45b"
                />
              </svg>
            </div>
          </button>

          <div className="mx-meta">
            <span className="mx-name">MaîtronX</span>
            <StatusLabel status={status} />
          </div>
        </div>
      </div>

      {showPermission && (
        <div className="mx-permission-backdrop">
          <div
            className="mx-permission-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mx-permission-title"
          >
            <div className="mx-permission-icon">
              <ShieldCheck size={25} />
            </div>

            <h3 id="mx-permission-title">Enable Voice Conversation</h3>

            <p>
              Kailangan ni MaîtronX ang microphone access para marinig ang
              iyong boses. Ang permission request ng Android o browser ay
              lalabas pagkatapos mong magpatuloy.
            </p>

            {permissionError && (
              <div className="mx-error">{permissionError}</div>
            )}

            <div className="mx-permission-actions">
              <button
                type="button"
                onClick={requestMicrophone}
              >
                Enable Microphone
              </button>

              <button
                type="button"
                className="mx-cancel"
                onClick={() => {
                  setShowPermission(false)
                  setStatus(navigator.onLine ? 'online' : 'offline')
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
                            }
