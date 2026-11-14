
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  History,
  Plus,
  Send,
  X,
  MessageSquare,
  Sparkles,
} from 'lucide-react'

import MaitronXAssistant from '../components/MaitronXAssistant'

type ChatMessage = {
  id: number
  role: 'user'
  text: string
}

const suggestedTopics = [
  'Help me improve my chess.',
  'Teach me chess openings.',
  'Explain chess tactics.',
  'How can I improve my endgames?',
  'Help me prepare for tournaments.',
  'Give me a chess training plan.',
]

export default function MaitronXPage() {
  const navigate = useNavigate()

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [showHistory, setShowHistory] = useState(false)

  function sendMessage(value = input) {
    const text = value.trim()

    if (!text) return

    setMessages((previous) => [
      ...previous,
      {
        id: Date.now(),
        role: 'user',
        text,
      },
    ])

    setInput('')
  }

  function startNewConversation() {
    setMessages([])
    setInput('')
    setShowHistory(false)
  }

  return (
    <main className="mx-page">
      <style>{`
        .mx-page {
          width: 100%;
          max-width: 1000px;
          min-height: 80vh;
          margin: 0 auto;
          padding: 20px 16px 40px;
          color: #f3f1eb;
        }

        .mx-page * {
          box-sizing: border-box;
        }

        .mx-page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 24px;
        }

        .mx-page-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #e5bd68;
          font-size: 17px;
          font-weight: 850;
        }

        .mx-page-actions {
          display: flex;
          gap: 8px;
        }

        .mx-page-icon {
          display: grid;
          place-items: center;
          width: 39px;
          height: 39px;
          border: 1px solid #d9b45b35;
          border-radius: 11px;
          color: #e5bd68;
          background: #191713;
          cursor: pointer;
        }

        .mx-page-icon:hover {
          border-color: #d9b45b;
          background: #292216;
        }

        .mx-page-intro {
          margin: 0 auto 24px;
          text-align: center;
        }

        .mx-page-intro h1 {
          margin: 0 0 7px;
          color: #f3e4bd;
          font-size: clamp(22px, 4vw, 30px);
          font-weight: 850;
        }

        .mx-page-intro p {
          margin: 0;
          color: #aaa39a;
          font-size: 12px;
          line-height: 1.7;
        }

        .mx-page-assistant {
          margin-bottom: 28px;
          padding: 18px;
          border: 1px solid #d9b45b25;
          border-radius: 18px;
          background:
            radial-gradient(circle at top, #6c4b2025, transparent 55%),
            #111114;
        }

        .mx-conversation {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 180px;
          max-height: 430px;
          overflow-y: auto;
          padding: 16px;
          border: 1px solid #ffffff12;
          border-radius: 15px;
          background: #0d0d10;
        }

        .mx-conversation-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 145px;
          text-align: center;
        }

        .mx-conversation-empty svg {
          color: #d9b45b;
        }

        .mx-conversation-empty strong {
          color: #e5bd68;
          font-size: 13px;
        }

        .mx-conversation-empty span {
          max-width: 300px;
          color: #99938a;
          font-size: 11px;
          line-height: 1.6;
        }

        .mx-user-message {
          align-self: flex-end;
          max-width: 85%;
          padding: 11px 14px;
          border: 1px solid #d9b45b40;
          border-radius: 14px 14px 4px 14px;
          background: #292216;
          color: #f1e5ca;
          font-size: 12px;
          line-height: 1.65;
          overflow-wrap: anywhere;
        }

        .mx-backend-notice {
          margin-top: 12px;
          padding: 11px 13px;
          border: 1px solid #d9b45b25;
          border-radius: 10px;
          color: #aaa39a;
          background: #d9b45b09;
          font-size: 10px;
          line-height: 1.6;
        }

        .mx-topics {
          margin-top: 24px;
        }

        .mx-topics-title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          color: #e5bd68;
          font-size: 12px;
          font-weight: 800;
        }

        .mx-topic-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 9px;
        }

        .mx-topic {
          display: flex;
          align-items: center;
          min-height: 47px;
          padding: 11px 13px;
          border: 1px solid #d9b45b30;
          border-radius: 11px;
          color: #d9c69f;
          background: #191713;
          font-size: 11px;
          text-align: left;
          cursor: pointer;
          transition: border-color .2s, background .2s;
        }

        .mx-topic:hover {
          border-color: #d9b45b;
          background: #292216;
        }

        .mx-composer {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-top: 14px;
          padding: 7px 8px 7px 14px;
          border: 1px solid #d9b45b55;
          border-radius: 14px;
          background: #191713;
        }

        .mx-composer input {
          flex: 1;
          width: 100%;
          min-width: 0;
          border: 0;
          outline: none;
          color: #f3f1eb;
          background: transparent;
          font: inherit;
          font-size: 12px;
        }

        .mx-composer input::placeholder {
          color: #777168;
        }

        .mx-send {
          display: grid;
          place-items: center;
          flex: 0 0 38px;
          width: 38px;
          height: 38px;
          border: 0;
          border-radius: 10px;
          color: #17130c;
          background: #d9b45b;
          cursor: pointer;
        }

        .mx-send:disabled {
          opacity: .4;
          cursor: not-allowed;
        }

        .mx-history-panel {
          margin-bottom: 16px;
          padding: 15px;
          border: 1px solid #d9b45b35;
          border-radius: 13px;
          background: #191713;
        }

        .mx-history-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          color: #e5bd68;
          font-size: 12px;
          font-weight: 800;
        }

        .mx-history-empty {
          color: #99938a;
          font-size: 11px;
          line-height: 1.6;
        }

        .mx-history-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #c9c1b3;
          font-size: 11px;
        }

        @media(max-width: 520px) {
          .mx-page {
            padding: 14px 11px 30px;
          }

          .mx-page-assistant {
            padding: 11px;
          }

          .mx-topic-grid {
            grid-template-columns: 1fr;
          }

          .mx-conversation {
            padding: 11px;
          }
        }
      `}</style>

      <header className="mx-page-header">
        <button
          type="button"
          className="mx-page-icon"
          aria-label="Back to homepage"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={19} />
        </button>

        <div className="mx-page-brand">
          <Sparkles size={19} />
          MaîtronX
        </div>

        <div className="mx-page-actions">
          <button
            type="button"
            className="mx-page-icon"
            aria-label="Conversation history"
            onClick={() => setShowHistory((previous) => !previous)}
          >
            <History size={18} />
          </button>

          <button
            type="button"
            className="mx-page-icon"
            aria-label="New conversation"
            onClick={startNewConversation}
          >
            <Plus size={19} />
          </button>
        </div>
      </header>

      {showHistory && (
        <section className="mx-history-panel">
          <div className="mx-history-heading">
            <span>Conversation History</span>

            <button
              type="button"
              className="mx-page-icon"
              aria-label="Close history"
              onClick={() => setShowHistory(false)}
            >
              <X size={16} />
            </button>
          </div>

          {messages.length > 0 ? (
            <div className="mx-history-item">
              <MessageSquare size={15} />
              Current conversation
            </div>
          ) : (
            <div className="mx-history-empty">
              Wala pang conversation sa session na ito.
            </div>
          )}
        </section>
      )}

      <section className="mx-page-intro">
        <h1>Meet MaîtronX</h1>
        <p>
          Your chess companion for learning, exploring,
          and improving your game.
        </p>
      </section>

      <section className="mx-page-assistant">
        <MaitronXAssistant fullPage />
      </section>

      <section className="mx-conversation">
        {messages.length === 0 ? (
          <div className="mx-conversation-empty">
            <Sparkles size={25} />
            <strong>Start a conversation</strong>
            <span>
              Mag-type ng tanong o pumili ng topic sa ibaba.
            </span>
          </div>
        ) : (
          messages.map((message) => (
            <div
              className="mx-user-message"
              key={message.id}
            >
              {message.text}
            </div>
          ))
        )}
      </section>

      <div className="mx-backend-notice">
        Frontend preview: Ang message composer at conversation
        interface ay prototype pa lamang. Magiging available
        ang AI responses at synced chat history kapag nakakonekta
        na ang backend.
      </div>

      <section className="mx-topics">
        <div className="mx-topics-title">
          <Sparkles size={15} />
          Explore Chess Topics
        </div>

        <div className="mx-topic-grid">
          {suggestedTopics.map((topic) => (
            <button
              type="button"
              className="mx-topic"
              key={topic}
              onClick={() => sendMessage(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
      </section>

      <form
        className="mx-composer"
        onSubmit={(event) => {
          event.preventDefault()
          sendMessage()
        }}
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask MaîtronX about chess..."
          aria-label="Message MaîtronX"
        />

        <button
          type="submit"
          className="mx-send"
          aria-label="Send message"
          disabled={!input.trim()}
        >
          <Send size={17} />
        </button>
      </form>
    </main>
  )
}

