
import { useState } from 'react'
import { ArrowLeft, Award, FileText, ShieldCheck, Upload, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type Category = 'FIDE' | 'FOA'

const fide = {
  Open: [
    ['GM', 'Grandmaster'],
    ['IM', 'International Master'],
    ['FM', 'FIDE Master'],
    ['CM', 'Candidate Master'],
  ],
  Women: [
    ['WGM', 'Woman Grandmaster'],
    ['WIM', 'Woman International Master'],
    ['WFM', 'Woman FIDE Master'],
    ['WCM', 'Woman Candidate Master'],
  ],
}

const foa = [
  ['AGM', 'Arena Grandmaster'],
  ['AIM', 'Arena International Master'],
  ['AFM', 'Arena FIDE Master'],
  ['ACM', 'Arena Candidate Master'],
]

export default function TitleApplicationPage() {
  const navigate = useNavigate()

  const [category, setCategory] = useState<Category>('FIDE')
  const [group, setGroup] = useState<'Open' | 'Women'>('Open')
  const [title, setTitle] = useState('GM')
  const [proof, setProof] = useState<File | null>(null)
  const [message, setMessage] = useState('')

  const options = category === 'FIDE' ? fide[group] : foa
  const selected = options.find(item => item[0] === title)

  const changeCategory = (value: Category) => {
    setCategory(value)
    setProof(null)
    setMessage('')
    setTitle(value === 'FIDE' ? (group === 'Open' ? 'GM' : 'WGM') : 'AGM')
  }

  const saveDraft = () => {
    if (!selected || !proof) {
      setMessage('Please select a title and upload its proof.')
      return
    }

    try {
      const saved = JSON.parse(
        localStorage.getItem('cx-title-applications') || '[]'
      )

      saved.unshift({
        id: Date.now(),
        category,
        code: selected[0],
        name: selected[1],
        proofName: proof.name,
        status: 'Local Draft',
        date: new Date().toLocaleDateString(),
      })

      localStorage.setItem(
        'cx-title-applications',
        JSON.stringify(saved)
      )

      setProof(null)
      setMessage('Application draft saved on this device.')
    } catch {
      setMessage('Unable to save the application draft.')
    }
  }

  return (
    <div className="cx-title-page">
      <style>{`
        .cx-title-page {
          min-height:100vh;
          padding-bottom:40px;
          color:var(--cx-text);
          background:var(--cx-bg);
        }

        .cx-title-header {
          position:sticky;
          top:0;
          z-index:20;
          display:grid;
          grid-template-columns:42px 1fr 42px;
          align-items:center;
          padding:12px 16px;
          border-bottom:1px solid var(--cx-border);
          background:rgba(11,11,13,.97);
          backdrop-filter:blur(14px);
        }

        .cx-title-header h1 {
          margin:0;
          text-align:center;
          font-size:17px;
          font-weight:750;
        }

        .cx-title-header button {
          display:grid;
          place-items:center;
          width:38px;
          height:38px;
          border:1px solid transparent;
          border-radius:10px;
          color:var(--cx-text);
          background:transparent;
        }

        .cx-title-content {
          width:min(100% - 32px,680px);
          margin:auto;
          padding:24px 0;
        }

        .cx-title-intro {
          display:flex;
          align-items:center;
          gap:14px;
          margin-bottom:26px;
        }

        .cx-title-icon {
          display:grid;
          place-items:center;
          flex-shrink:0;
          width:54px;
          height:54px;
          border:1px solid rgba(217,180,91,.4);
          border-radius:15px;
          color:var(--cx-gold);
          background:linear-gradient(145deg,rgba(217,180,91,.15),rgba(217,180,91,.03));
        }

        .cx-title-intro small {
          color:var(--cx-gold);
          font-size:9px;
          font-weight:850;
          letter-spacing:1.5px;
        }

        .cx-title-intro h2 {
          margin:5px 0;
          font-size:21px;
          font-weight:800;
        }

        .cx-title-intro p,
        .cx-title-help {
          margin:0;
          color:var(--cx-muted);
          font-size:11px;
          line-height:1.6;
        }

        .cx-title-section-label {
          display:block;
          margin-bottom:10px;
          color:var(--cx-muted);
          font-size:10px;
          font-weight:800;
          letter-spacing:1.1px;
          text-transform:uppercase;
        }

        .cx-title-tabs {
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:10px;
          margin-bottom:25px;
        }

        .cx-title-tabs button {
          position:relative;
          min-height:52px;
          border:1px solid var(--cx-border);
          border-radius:12px;
          color:var(--cx-muted);
          background:linear-gradient(145deg,var(--cx-surface),rgba(20,20,23,.8));
          font-size:13px;
          font-weight:850;
          letter-spacing:1px;
          transition:border-color .2s,background .2s,color .2s;
        }

        .cx-title-tabs button.active {
          border-color:var(--cx-gold);
          color:var(--cx-gold);
          background:linear-gradient(145deg,rgba(217,180,91,.16),rgba(217,180,91,.04));
          box-shadow:inset 0 0 0 1px rgba(217,180,91,.08);
        }

        .cx-title-tabs button.active::after {
          content:'';
          position:absolute;
          bottom:0;
          left:30%;
          width:40%;
          height:2px;
          border-radius:5px;
          background:var(--cx-gold);
        }

        .cx-title-field {
          display:flex;
          flex-direction:column;
          gap:11px;
          margin-bottom:23px;
        }

        .cx-title-field > label {
          font-size:13px;
          font-weight:750;
        }

        .cx-title-toggle {
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:8px;
          padding:4px;
          border:1px solid var(--cx-border);
          border-radius:12px;
          background:rgba(255,255,255,.025);
        }

        .cx-title-toggle button {
          min-height:40px;
          border:1px solid transparent;
          border-radius:9px;
          color:var(--cx-muted);
          background:transparent;
          font-size:12px;
          font-weight:750;
        }

        .cx-title-toggle button.active {
          border-color:rgba(217,180,91,.35);
          color:var(--cx-gold);
          background:rgba(217,180,91,.11);
        }

        .cx-title-options {
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:10px;
        }

        .cx-title-option {
          position:relative;
          display:flex;
          flex-direction:column;
          align-items:flex-start;
          justify-content:center;
          min-height:94px;
          padding:13px;
          overflow:hidden;
          border:1px solid var(--cx-border);
          border-radius:12px;
          color:var(--cx-text);
          background:linear-gradient(145deg,var(--cx-surface),rgba(20,20,23,.75));
          text-align:left;
          transition:border-color .2s,background .2s;
        }

        .cx-title-option.active {
          border-color:var(--cx-gold);
          background:linear-gradient(145deg,rgba(217,180,91,.14),rgba(217,180,91,.035));
          box-shadow:inset 0 0 0 1px rgba(217,180,91,.08);
        }

        .cx-title-option-code {
          color:var(--cx-gold);
          font-size:20px;
          font-weight:900;
          letter-spacing:.5px;
        }

        .cx-title-option-name {
          margin-top:5px;
          color:var(--cx-muted);
          font-size:10px;
          line-height:1.4;
        }

        .cx-title-option.active .cx-title-option-name {
          color:var(--cx-text);
        }

        .cx-title-option-check {
          position:absolute;
          top:9px;
          right:9px;
          display:grid;
          place-items:center;
          width:19px;
          height:19px;
          border-radius:50%;
          color:#111;
          background:var(--cx-gold);
        }

        .cx-title-source,
        .cx-title-summary {
          padding:15px;
          margin-bottom:21px;
          border:1px solid rgba(217,180,91,.28);
          border-radius:12px;
          background:linear-gradient(145deg,rgba(217,180,91,.075),rgba(217,180,91,.02));
        }

        .cx-title-source {
          display:flex;
          align-items:center;
          gap:11px;
          color:var(--cx-gold);
        }

        .cx-title-source strong,
        .cx-title-source small {
          display:block;
        }

        .cx-title-source strong {
          color:var(--cx-text);
          font-size:12px;
        }

        .cx-title-source small {
          margin-top:4px;
          color:var(--cx-muted);
          font-size:10px;
        }

        .cx-title-upload {
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:10px;
          padding:25px 13px;
          border:1px dashed rgba(217,180,91,.55);
          border-radius:12px;
          color:var(--cx-gold);
          background:var(--cx-surface);
          text-align:center;
          cursor:pointer;
        }

        .cx-title-upload strong {
          max-width:100%;
          color:var(--cx-text);
          font-size:12px;
          overflow-wrap:anywhere;
        }

        .cx-title-upload small {
          color:var(--cx-muted);
          font-size:10px;
        }

        .cx-title-upload input {
          display:none;
        }

        .cx-title-summary small {
          color:var(--cx-gold);
          font-size:9px;
          font-weight:850;
          letter-spacing:1.2px;
        }

        .cx-title-summary h3 {
          margin:9px 0 3px;
          color:var(--cx-gold);
          font-size:27px;
        }

        .cx-title-summary strong {
          font-size:13px;
        }

        .cx-title-summary p {
          margin:8px 0 0;
          color:var(--cx-muted);
          font-size:10px;
          line-height:1.5;
        }

        .cx-title-submit {
          display:flex;
          align-items:center;
          justify-content:center;
          gap:9px;
          width:100%;
          min-height:49px;
          border:1px solid var(--cx-gold);
          border-radius:11px;
          color:#111;
          background:linear-gradient(135deg,#e7c878,#c9a34d);
          font-size:12px;
          font-weight:850;
          letter-spacing:.3px;
        }

        .cx-title-message {
          color:var(--cx-gold);
          font-size:11px;
          line-height:1.5;
        }

        .cx-title-note {
          margin-top:15px;
          color:var(--cx-muted);
          font-size:10px;
          line-height:1.6;
          text-align:center;
        }

        @media (max-width:360px) {
          .cx-title-options {
            gap:7px;
          }
          .cx-title-option {
            min-height:88px;
            padding:10px;
          }
          .cx-title-option-code {
            font-size:18px;
          }
        }
      `}</style>

      <header className="cx-title-header">
        <button onClick={() => navigate('/profile/edit')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Title Application</h1>
        <span />
      </header>

      <main className="cx-title-content">
        <section className="cx-title-intro">
          <div className="cx-title-icon">
            <Award size={26} />
          </div>
          <div>
            <small>CHECKMAÎTRÉX CHESS CLUB</small>
            <h2>Official Player Titles</h2>
            <p>Apply for your official chess title.</p>
          </div>
        </section>

        <span className="cx-title-section-label">Title Category</span>

        <div className="cx-title-tabs">
          {(['FIDE', 'FOA'] as Category[]).map(item => (
            <button
              key={item}
              className={category === item ? 'active' : ''}
              onClick={() => changeCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {category === 'FIDE' && (
          <section className="cx-title-field">
            <label>FIDE Title Group</label>
            <div className="cx-title-toggle">
              {(['Open', 'Women'] as const).map(item => (
                <button
                  key={item}
                  className={group === item ? 'active' : ''}
                  onClick={() => {
                    setGroup(item)
                    setTitle(item === 'Open' ? 'GM' : 'WGM')
                    setProof(null)
                    setMessage('')
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="cx-title-field">
          <label>Select your title</label>
          <div className="cx-title-options">
            {options.map(item => (
              <button
                type="button"
                key={item[0]}
                className={`cx-title-option ${title === item[0] ? 'active' : ''}`}
                onClick={() => {
                  setTitle(item[0])
                  setProof(null)
                  setMessage('')
                }}
              >
                {title === item[0] && (
                  <span className="cx-title-option-check">
                    <Check size={12} />
                  </span>
                )}
                <span className="cx-title-option-code">{item[0]}</span>
                <span className="cx-title-option-name">{item[1]}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="cx-title-source">
          <ShieldCheck size={20} />
          <div>
            <strong>
              {category === 'FIDE' ? 'FIDE' : 'World Chess / FOA'}
            </strong>
            <small>Issuing authority reference</small>
          </div>
        </section>

        <section className="cx-title-field">
          <label>Proof of Title</label>
          <label className="cx-title-upload">
            <Upload size={21} />
            <strong>
              {proof?.name || 'Upload certificate or official record'}
            </strong>
            <small>PDF, JPG or PNG · Maximum 10 MB</small>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={event => {
                const file = event.target.files?.[0] || null
                if (file && file.size > 10 * 1024 * 1024) {
                  setProof(null)
                  setMessage('Maximum file size is 10 MB.')
                } else {
                  setProof(file)
                  setMessage('')
                }
                event.currentTarget.value = ''
              }}
            />
          </label>
        </section>

        <section className="cx-title-summary">
          <small>APPLICATION SUMMARY</small>
          <h3>{selected?.[0] || '—'}</h3>
          <strong>{selected?.[1] || 'No title selected'}</strong>
          <p>{category}</p>
          <p>Only approved titles will appear on your public profile.</p>
        </section>

        {message && <p className="cx-title-message">{message}</p>}

        <button className="cx-title-submit" onClick={saveDraft}>
          <FileText size={17} />
          Save Application Draft
        </button>

        <p className="cx-title-note">
          Frontend only. This saves a local draft and proof filename.
          No document is uploaded and no administrator receives it yet.
        </p>
      </main>
    </div>
  )
}
