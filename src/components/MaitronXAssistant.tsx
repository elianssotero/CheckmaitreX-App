
import { useEffect, useRef, useState } from "react";

type Activity = {
  type: "game" | "puzzle" | "lesson" | "tournament";
  summary: string;
};

type Props = {
  recentActivity?: Activity | null;
};

type RecognitionResult = {
  isFinal: boolean;
  0: { transcript: string };
};

type RecognitionEvent = {
  resultIndex: number;
  results: ArrayLike<RecognitionResult>;
};

type RecognitionError = {
  error: string;
};

type Recognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: RecognitionError) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
};

declare global {
  interface Window {
    SpeechRecognition?: new () => Recognition;
    webkitSpeechRecognition?: new () => Recognition;
  }
}

type Mode = "ready" | "listening" | "thinking";

function getGreeting(activity?: Activity | null) {
  if (!activity) {
    return "Hello! Nandito ako. Ano ang gusto mong pag-usapan ngayon?";
  }

  const greetings: Record<Activity["type"], string> = {
    game: "Napansin kong naglaro ka kamakailan. ",
    puzzle: "May bago kang puzzle activity. ",
    lesson: "May chess lesson kang pinag-aralan. ",
    tournament: "May tournament activity ka kamakailan. ",
  };

  return greetings[activity.type] +
    activity.summary +
    " Gusto mo bang pag-usapan natin ito?";
}

export default function MaitronXAssistant({
  recentActivity = null,
}: Props) {
  const [mode, setMode] = useState<Mode>("ready");
  const [message, setMessage] = useState(() =>
    getGreeting(recentActivity)
  );
  const [transcript, setTranscript] = useState("");
  const [notice, setNotice] = useState(
    "Tapusin si MaîtronX para magsimula ng voice conversation."
  );
  const [active, setActive] = useState(false);

  const recognitionRef = useRef<Recognition | null>(null);
  const activeRef = useRef(false);
  const restartRef = useRef<number | null>(null);

  useEffect(() => {
    setMessage(getGreeting(recentActivity));
  }, [recentActivity]);

  useEffect(() => {
    return () => {
      activeRef.current = false;
      if (restartRef.current !== null) {
        window.clearTimeout(restartRef.current);
      }
      recognitionRef.current?.abort();
    };
  }, []);

  function stopConversation() {
    activeRef.current = false;
    setActive(false);

    if (restartRef.current !== null) {
      window.clearTimeout(restartRef.current);
      restartRef.current = null;
    }

    recognitionRef.current?.stop();
    setMode("ready");
    setNotice("Voice session ended.");
    setMessage("Salamat sa pakikipag-usap. Nandito lang ako kapag gusto mong magpatuloy.");
  }

  function startConversation() {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setNotice("Hindi suportado ang voice recognition sa browser na ito.");
      setMessage("Subukan ang updated Google Chrome at payagan ang microphone access.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "fil-PH";

      recognitionRef.current = recognition;
      activeRef.current = true;
      setActive(true);
      setMode("listening");
      setTranscript("");
      setNotice("LISTENING · Magsalita nang natural.");
      setMessage("Nakikinig ako. Magsalita ka nang natural.");

      recognition.onresult = (event) => {
        let current = "";
        let finalText = "";

        for (
          let i = event.resultIndex;
          i < event.results.length;
          i++
        ) {
          const result = event.results[i];
          const text = result[0].transcript;

          if (result.isFinal) {
            finalText += text;
          } else {
            current += text;
          }
        }

        if (current) {
          setTranscript(current);
        }

        if (finalText.trim()) {
          const spoken = finalText.trim();

          setTranscript(spoken);
          setMode("thinking");
          setNotice("VOICE INPUT RECEIVED");
          setMessage(
            "Narinig ko ang sinabi mo: “" +
            spoken +
            "” Ang AI response at tunay na voice conversation ay ikokonekta natin sa backend."
          );

          window.setTimeout(() => {
            if (activeRef.current) {
              setMode("listening");
              setNotice("LISTENING · Maaari ka pang magsalita.");
            }
          }, 1200);
        }
      };

      recognition.onerror = (event) => {
        if (
          event.error === "not-allowed" ||
          event.error === "service-not-allowed"
        ) {
          activeRef.current = false;
          setActive(false);
          setMode("ready");
          setNotice("MICROPHONE ACCESS DENIED");
          setMessage(
            "Payagan muna ang microphone access sa browser settings."
          );
        } else if (event.error === "no-speech") {
          setNotice("LISTENING · Maaari kang magsalita.");
        } else {
          setNotice("VOICE INPUT INTERRUPTED");
        }
      };

      recognition.onend = () => {
        if (activeRef.current) {
          restartRef.current = window.setTimeout(() => {
            if (!activeRef.current) return;

            try {
              recognition.start();
              setMode("listening");
            } catch {
              activeRef.current = false;
              setActive(false);
              setMode("ready");
              setNotice("VOICE SESSION PAUSED");
            }
          }, 300);
        }
      };

      recognition.start();
    } catch {
      activeRef.current = false;
      setActive(false);
      setMode("ready");
      setNotice("VOICE INPUT UNAVAILABLE");
    }
  }

  function toggleConversation() {
    if (activeRef.current) {
      stopConversation();
    } else {
      startConversation();
    }
  }

  return (
    <div className={`mx-widget mx-${mode}`}>
      <style>{`
        .mx-widget {
          width: 100%;
          max-width: 650px;
          margin: auto;
          display: flex;
          align-items: center;
          gap: 18px;
          font-family: inherit;
        }

        .mx-chat {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 11px;
        }

        .mx-bubble {
          width: 100%;
          box-sizing: border-box;
          padding: 15px;
          border: 1px solid rgba(217,180,91,.4);
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

        .mx-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 15px;
          min-height: 40px;
          border: 1px solid #b18a42;
          border-radius: 10px;
          background: #211c14;
          color: #f0d48a;
          font-size: 10px;
          font-weight: 800;
          cursor: pointer;
        }

        .mx-button.active {
          background: #d9b45b;
          color: #15120c;
        }

        .mx-button:focus-visible,
        .mx-head-button:focus-visible {
          outline: 2px solid #f0d48a;
          outline-offset: 4px;
        }

        .mx-notice {
          color: #969087;
          font-size: 9px;
          line-height: 1.5;
        }

        .mx-transcript {
          width: 100%;
          box-sizing: border-box;
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
          width: 100%;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
        }

        .mx-stage {
          display: grid;
          place-items: center;
          width: 100%;
          aspect-ratio: 1;
          border: 1px solid #d9b45b55;
          border-radius: 18px;
          background: radial-gradient(
            circle,
            #8a632b44,
            #161316 70%,
            #0b0b0d
          );
          transition: box-shadow .3s;
        }

        .mx-listening .mx-stage {
          box-shadow: 0 0 25px #d9b45b44;
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
          gap: 4px;
        }

        .mx-name {
          color: #e5bd68;
          font-size: 12px;
          font-weight: 800;
        }

        .mx-state {
          color: #999187;
          font-size: 9px;
          letter-spacing: 1px;
        }

        .mx-listening .mx-state,
        .mx-thinking .mx-state {
          color: #e5bd68;
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
          .mx-button { padding: 9px 10px; font-size: 9px; }
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

      <div className="mx-chat">
        <div className="mx-bubble" aria-live="polite">
          <span className="mx-bubble-name">MaîtronX</span>
          {message}
        </div>

        {transcript && (
          <div className="mx-transcript">
            <strong>Voice input:</strong> {transcript}
          </div>
        )}

        <button
          type="button"
          className={`mx-button ${active ? "active" : ""}`}
          onClick={toggleConversation}
          aria-pressed={active}
        >
          {active ? "■ End conversation" : "● Start conversation"}
        </button>

        <span className="mx-notice" aria-live="polite">
          {notice}
        </span>
      </div>

      <div className="mx-character">
        <button
          type="button"
          className="mx-head-button"
          onClick={toggleConversation}
          aria-label={
            active
              ? "End MaîtronX voice session"
              : "Start MaîtronX voice session"
          }
          aria-pressed={active}
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
          <span className="mx-state">
            {mode === "listening"
              ? "● LISTENING"
              : mode === "thinking"
              ? "● THINKING"
              : "● READY"}
          </span>
        </div>
      </div>
    </div>
  );
}
