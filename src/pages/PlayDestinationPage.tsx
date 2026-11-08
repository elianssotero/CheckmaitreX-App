
import { ArrowLeft, Construction } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type Props = {
  title: string
}

function PlayDestinationPage({ title }: Props) {
  const navigate = useNavigate()

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/play')
    }
  }

  return (
    <main className="cx-play-destination">
      <header className="cx-play-header">
        <button
          type="button"
          className="cx-play-back"
          onClick={goBack}
          aria-label="Go back"
        >
          <ArrowLeft size={21} />
        </button>

        <div className="cx-play-title">
          <h1>{title}</h1>
        </div>

        <div className="cx-play-header-space" />
      </header>

      <section className="cx-play-placeholder">
        <div className="cx-play-placeholder-icon">
          <Construction size={32} />
        </div>

        <h2>{title}</h2>

        <p>
          This page is being prepared.
          Its frontend will be designed separately.
        </p>

        <button
          type="button"
          onClick={() => navigate('/play')}
        >
          Back to Play Chess
        </button>
      </section>
    </main>
  )
}

export default PlayDestinationPage
