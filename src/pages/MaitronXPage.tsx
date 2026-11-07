import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import MaitronXAssistant from '../components/MaitronXAssistant'

export default function MaitronXPage() {
  const navigate = useNavigate()

  return (
    <div className="mx-page">
      <style>{`
        .mx-page {
          min-height: 100vh;
          padding: 25px;
          color: #f3f1eb;
          background:
            radial-gradient(circle at 50% 20%,#33271955,transparent 40%),
            #0b0b0d;
        }

        .mx-page-header {
          display: flex;
          align-items: center;
          gap: 14px;
          max-width: 900px;
          margin: 0 auto 35px;
          padding-bottom: 18px;
          border-bottom: 1px solid #ffffff12;
        }

        .mx-page-back {
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          border: 1px solid #d9b45b44;
          border-radius: 11px;
          color: #e5bd68;
          background: #1b1916;
        }

        .mx-page-heading h1 {
          margin: 0;
          color: #e5bd68;
          font-size: 19px;
        }

        .mx-page-heading p {
          margin: 4px 0 0;
          color: #89847d;
          font-size: 10px;
          letter-spacing: 1.2px;
        }

        .mx-page-content {
          max-width: 900px;
          margin: 0 auto;
        }

        .mx-page-intro {
          margin-bottom: 30px;
          text-align: center;
        }

        .mx-page-intro h2 {
          margin: 0 0 9px;
          color: #f1e5ca;
          font-size: clamp(23px,4vw,32px);
        }

        .mx-page-intro p {
          max-width: 520px;
          margin: auto;
          color: #99938a;
          font-size: 12px;
          line-height: 1.7;
        }

        .mx-page-note {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 35px;
          padding: 14px;
          border: 1px solid #d9b45b25;
          border-radius: 12px;
          color: #aaa39a;
          background: #ffffff05;
          font-size: 11px;
          line-height: 1.6;
        }

        .mx-page-note svg {
          flex-shrink: 0;
          color: #d9b45b;
        }

        @media(max-width:600px) {
          .mx-page { padding: 18px 14px; }
          .mx-page-header { margin-bottom: 25px; }
        }
      `}</style>

      <header className="mx-page-header">
        <button
          type="button"
          className="mx-page-back"
          onClick={() => navigate('/')}
          aria-label="Back to homepage"
        >
          <ArrowLeft size={19} />
        </button>

        <div className="mx-page-heading">
          <h1>MaîtronX</h1>
          <p>CHECKMAÎTRÉX CHESS CLUB AI</p>
        </div>
      </header>

      <main className="mx-page-content">
        <div className="mx-page-intro">
          <h2>Your Chess Assistant</h2>
          <p>
            Makipag-usap tungkol sa chess, mag-review ng games,
            mag-aral ng tactics, at maghanda para sa competition.
          </p>
        </div>

        <MaitronXAssistant fullPage />

        <div className="mx-page-note">
          <ShieldCheck size={18} />
          <span>
            Ang voice input ay frontend prototype pa lamang. Ang AI
            responses, voice output, at personalized player history ay
            ikokonekta sa CCC backend sa susunod na development phase.
          </span>
        </div>
      </main>
    </div>
  )
}
