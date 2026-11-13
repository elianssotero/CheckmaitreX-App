
import { useState } from 'react'
import { ArrowLeft, Award, FileText, ShieldCheck, Upload } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type Category = 'FIDE' | 'NATIONAL' | 'FOA'

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

const national: Record<string, string[][]> = {
  Brazil: [
    ['MN', 'Mestre Nacional'],
    ['CMN', 'Candidato a Mestre Nacional'],
    ['MNF', 'Mestre Nacional Feminino'],
    ['CMNF', 'Candidata a Mestre Nacional Feminino'],
    ['MNO', 'Mestre Nacional Online'],
    ['CMNO', 'Candidato a Mestre Nacional Online'],
  ],
  England: [
    ['ENM', 'English National Master'],
    ['RM', 'Regional Master'],
    ['CoM', 'County Master'],
    ['ClM', 'Club Master'],
    ['TM', 'Team Master'],
    ['Chess Maestro', 'Chess Maestro'],
  ],
  Canada: [
    ['NM', 'National Master'],
    ['WNM', 'Woman National Master'],
    ['NCM', 'National Candidate Master'],
  ],
  'New Zealand': [
    ['NM', 'National Master'],
    ['CM', 'Candidate Master'],
  ],
}

export default function TitleApplicationPage() {
  const navigate = useNavigate()

  const [category, setCategory] = useState<Category>('FIDE')
  const [group, setGroup] = useState<'Open' | 'Women'>('Open')
  const [country, setCountry] = useState('Brazil')
  const [title, setTitle] = useState('GM')
  const [proof, setProof] = useState<File | null>(null)
  const [message, setMessage] = useState('')

  const options =
    category === 'FIDE'
      ? fide[group]
      : category === 'FOA'
        ? foa
        : national[country] || []

  const selected = options.find(item => item[0] === title)

  const changeCategory = (value: Category) => {
    setCategory(value)
    setProof(null)
    setMessage('')
    setTitle(
      value === 'FIDE'
        ? 'GM'
        : value === 'FOA'
          ? 'AGM'
          : national[country]?.[0]?.[0] || ''
    )
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
        country: category === 'NATIONAL' ? country : '',
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
          position:sticky;top:0;z-index:20;
          display:grid;grid-template-columns:42px 1fr 42px;
          align-items:center;padding:12px 16px;
          border-bottom:1px solid var(--cx-border);
          background:rgba(11,11,13,.96);
        }
        .cx-title-header h1 {
          margin:0;text-align:center;font-size:17px;
        }
        .cx-title-header button {
          display:grid;place-items:center;width:38px;height:38px;
          border:0;border-radius:9px;color:var(--cx-text);
          background:transparent;
        }
        .cx-title-content {
          width:min(100% - 32px,680px);
          margin:auto;padding:24px 0;
        }
        .cx-title-intro {
          display:flex;align-items:center;gap:13px;
          margin-bottom:24px;
        }
        .cx-title-icon {
          display:grid;place-items:center;width:52px;height:52px;
          border:1px solid #806a37;border-radius:14px;
          color:var(--cx-gold);
          background:rgba(217,180,91,.08);
        }
        .cx-title-intro small {
          color:var(--cx-gold);font-size:9px;font-weight:800;
        }
        .cx-title-intro h2 {
          margin:4px 0;font-size:21px;
        }
        .cx-title-intro p,.cx-title-help {
          color:var(--cx-muted);font-size:11px;line-height:1.5;
        }
        .cx-title-tabs {
          display:grid;grid-template-columns:repeat(3,1fr);
          gap:7px;margin-bottom:23px;
        }
        .cx-title-tabs button,.cx-title-toggle button {
          min-height:44px;border:1px solid var(--cx-border);
          border-radius:9px;color:var(--cx-muted);
          background:var(--cx-surface);font-weight:800;
        }
        .cx-title-tabs button.active,.cx-title-toggle button.active {
          border-color:var(--cx-gold);color:var(--cx-gold);
          background:rgba(217,180,91,.1);
        }
        .cx-title-field {
          display:flex;flex-direction:column;gap:9px;
          margin-bottom:20px;
        }
        .cx-title-field label {
          font-size:13px;font-weight:750;
        }
        .cx-title-field select {
          width:100%;min-height:47px;padding:10px 13px;
          border:1px solid var(--cx-border);border-radius:10px;
          outline:none;color:var(--cx-text);
          background:var(--cx-surface);font:inherit;font-size:13px;
        }
        .cx-title-toggle {
          display:grid;grid-template-columns:1fr 1fr;gap:8px;
        }
        .cx-title-source,.cx-title-summary {
          padding:14px;margin-bottom:20px;
          border:1px solid rgba(217,180,91,.3);
          border-radius:11px;background:rgba(217,180,91,.06);
        }
        .cx-title-source {
          display:flex;align-items:center;gap:10px;
          color:var(--cx-gold);
        }
        .cx-title-source strong,.cx-title-source small {
          display:block;
        }
        .cx-title-source strong {
          color:var(--cx-text);font-size:11px;
        }
        .cx-title-source small {
          margin-top:4px;color:var(--cx-muted);font-size:10px;
        }
        .cx-title-upload {
          display:flex;flex-direction:column;align-items:center;
          gap:9px;padding:23px 12px;
          border:1px dashed #92773e;border-radius:12px;
          color:var(--cx-gold);background:var(--cx-surface);
          text-align:center;cursor:pointer;
        }
        .cx-title-upload strong {
          color:var(--cx-text);font-size:12px;
          overflow-wrap:anywhere;
        }
        .cx-title-upload small {
          color:var(--cx-muted);font-size:10px;
        }
        .cx-title-upload input {display:none}
        .cx-title-summary small {
          color:var(--cx-gold);font-size:9px;font-weight:800;
        }
        .cx-title-summary h3 {
          margin:9px 0 4px;color:var(--cx-gold);font-size:24px;
        }
        .cx-title-summary p {
          margin:8px 0 0;color:var(--cx-muted);
          font-size:10px;line-height:1.5;
        }
        .cx-title-submit {
          display:flex;align-items:center;justify-content:center;
          gap:8px;width:100%;min-height:47px;
          border:1px solid var(--cx-gold);border-radius:10px;
          color:#111;background:var(--cx-gold);
          font-weight:800;
        }
        .cx-title-message {
          color:var(--cx-gold);font-size:11px;line-height:1.5;
        }
        .cx-title-note {
          color:var(--cx-muted);font-size:10px;
          line-height:1.5;text-align:center;
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
          <div className="cx-title-icon"><Award size={25} /></div>
          <div>
            <small>CHECKMAÎTRÉX CHESS CLUB</small>
            <h2>Official Player Titles</h2>
            <p>Apply for your official chess title.</p>
          </div>
        </section>

        <div className="cx-title-tabs">
          {(['FIDE', 'NATIONAL', 'FOA'] as Category[]).map(item => (
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
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
        )}

        {category === 'NATIONAL' && (
          <section className="cx-title-field">
            <label>Country / Federation</label>
            <select
              value={country}
              onChange={event => {
                setCountry(event.target.value)
                setTitle(national[event.target.value]?.[0]?.[0] || '')
                setProof(null)
              }}
            >
              {Object.keys(national).map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <p className="cx-title-help">
              Initial verified country records only. More federations
              will be added after official verification.
            </p>
          </section>
        )}

        <section className="cx-title-field">
          <label>Select your title</label>
          <select
            value={selected?.[0] || ''}
            onChange={event => {
              setTitle(event.target.value)
              setProof(null)
            }}
          >
            {options.map(item => (
              <option key={item[0]} value={item[0]}>
                {item[0]} — {item[1]}
              </option>
            ))}
          </select>
        </section>

        <section className="cx-title-source">
          <ShieldCheck size={19} />
          <div>
            <strong>
              {category === 'FIDE'
                ? 'FIDE'
                : category === 'FOA'
                  ? 'World Chess / FOA'
                  : country + ' National Federation'}
            </strong>
            <small>Issuing authority reference</small>
          </div>
        </section>

        <section className="cx-title-field">
          <label>Proof of Title</label>
          <label className="cx-title-upload">
            <Upload size={20} />
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
          <p>
            {category}
            {category === 'NATIONAL' ? ' · ' + country : ''}
          </p>
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
