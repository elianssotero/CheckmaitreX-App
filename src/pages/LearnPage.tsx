
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Search, Settings, ChevronRight, Play, BookOpen,
  Puzzle, Trophy, Download, Bookmark,
  Flame, NotebookPen, Crown, Target, Library, Brain, BookMarked,
  Award, Lightbulb, Check,
  Menu, Video, SearchCheck, MessageCircle,
  Sparkles, ClipboardList, Layers, CalendarDays
} from 'lucide-react'
import './LearnPage.css'

type Course = {
  id: number
  title: string
  category: string
  level: string
  instructor: string
  lessons: number
  completed: number
  icon: string
  description: string
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Chess Opening Fundamentals',
    category: 'Openings',
    level: 'Beginner',
    instructor: 'CCC-Team',
    lessons: 8,
    completed: 3,
    icon: '♞',
    description: 'Understand opening principles, development, and center control.'
  },
  {
    id: 2,
    title: 'Tactical Thinking',
    category: 'Tactics',
    level: 'Intermediate',
    instructor: 'CCC-Team',
    lessons: 12,
    completed: 3,
    icon: '♜',
    description: 'Recognize tactical patterns and calculate variations.'
  },
  {
    id: 3,
    title: 'The Art of the Endgame',
    category: 'Endgames',
    level: 'Advanced',
    instructor: 'CCC-Team',
    lessons: 10,
    completed: 0,
    icon: '♔',
    description: 'Learn essential endgame principles and practical techniques.'
  },
  {
    id: 4,
    title: 'Strategic Middlegame Plans',
    category: 'Middlegames',
    level: 'Advanced',
    instructor: 'CCC-Team',
    lessons: 14,
    completed: 0,
    icon: '♛',
    description: 'Build plans based on pawn structures and piece activity.'
  },
  {
    id: 5,
    title: 'The Masters: Famous Games',
    category: 'Master Games',
    level: 'Mastery',
    instructor: 'CCC-Team',
    lessons: 6,
    completed: 0,
    icon: '♚',
    description: 'Study important decisions from historical chess games.'
  },
  {
    id: 6,
    title: 'Chess Strategy Essentials',
    category: 'Strategy',
    level: 'Intermediate',
    instructor: 'CCC-Team',
    lessons: 9,
    completed: 0,
    icon: '♝',
    description: 'Improve your positional understanding and long-term planning.'
  }
]

const categories = [
  { name: 'Openings', icon: '♟', description: 'Opening principles and variations' },
  { name: 'Middlegames', icon: '♜', description: 'Plans, positions, and piece activity' },
  { name: 'Endgames', icon: '♔', description: 'Convert advantages and defend positions' },
  { name: 'Tactics', icon: '♞', description: 'Combinations and tactical patterns' },
  { name: 'Strategy', icon: '♝', description: 'Positional play and planning' },
  { name: 'Master Games', icon: '♛', description: 'Learn from great chess games' }
]

const levels = ['Beginner', 'Intermediate', 'Advanced', 'Mastery']

const learningTools = [
  { title: 'CCC Daily Chess Lesson', subtitle: 'A new lesson every day', icon: CalendarDays, panel: 'daily' },
  { title: 'Practice After Learning', subtitle: 'Apply what you learned', icon: Target, panel: 'practice' },
  { title: 'My Chess Notes', subtitle: 'Your personal study notebook', icon: NotebookPen, panel: 'notes' },
  { title: 'CCC Achievements', subtitle: 'Your learning milestones', icon: Trophy, panel: 'achievements' },
  { title: 'Masterclass & Game Analysis', subtitle: 'Learn from expert games', icon: Video, panel: 'masterclass' },
  { title: 'CCC Opening Explorer', subtitle: 'Explore opening variations', icon: Layers, panel: 'openings' },
  { title: 'Lesson Knowledge Check', subtitle: 'Test your understanding', icon: ClipboardList, panel: 'quiz' },
  { title: 'Annotated Chess Games', subtitle: 'Moves explained step by step', icon: BookMarked, panel: 'games' },
  { title: 'Personalized Learning Path', subtitle: 'A guided learning journey', icon: Brain, panel: 'path' },
  { title: 'CCC Chess Dictionary', subtitle: 'Chess terms and definitions', icon: Library, panel: 'dictionary' },
  { title: 'Ask CCC-Team', subtitle: 'Questions about your lessons', icon: MessageCircle, panel: 'ask' },
  { title: 'Course Certificates', subtitle: 'Your course accomplishments', icon: Award, panel: 'certificates' }
]

const dictionary = [
  ['Castling', 'A special king and rook move used to improve king safety.'],
  ['Check', 'A direct attack against the opponent’s king.'],
  ['Checkmate', 'A position where the king is in check and no legal escape exists.'],
  ['Fork', 'A tactic where one piece attacks two or more targets.'],
  ['Pin', 'A piece is restricted because moving it exposes a more valuable piece.'],
  ['Skewer', 'An attack on a valuable piece that exposes another target behind it.'],
  ['Zugzwang', 'A position where any legal move worsens the player’s position.'],
  ['Tempo', 'A unit of time represented by one move.']
]

const panelTitles: Record<string, string> = {
  daily: 'CCC Daily Chess Lesson',
  practice: 'Practice After Learning',
  notes: 'My Chess Notes',
  achievements: 'CCC Achievements',
  masterclass: 'Masterclass & Game Analysis',
  openings: 'CCC Opening Explorer',
  quiz: 'Lesson Knowledge Check',
  games: 'Annotated Chess Games',
  path: 'Personalized Learning Path',
  dictionary: 'CCC Chess Dictionary',
  ask: 'Ask CCC-Team',
  certificates: 'Course Certificates',
  library: 'CCC-Lesson Library',
  downloads: 'Downloads',
  later: 'Watch Later',
  dashboard: 'My Learning Dashboard'
}

function LearnPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeLevel, setActiveLevel] = useState('All')
  const [search, setSearch] = useState('')
  const [panel, setPanel] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [saved, setSaved] = useState<number[]>([2])
  const [notes, setNotes] = useState('')
  const [quizAnswer, setQuizAnswer] = useState('')
  const [quizChecked, setQuizChecked] = useState(false)
  const [question, setQuestion] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [dictionarySearch, setDictionarySearch] = useState('')

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const categoryMatch = activeCategory === 'All' || course.category === activeCategory
      const levelMatch = activeLevel === 'All' || course.level === activeLevel
      const searchMatch = `${course.title} ${course.category} ${course.level}`
        .toLowerCase().includes(search.toLowerCase())
      return categoryMatch && levelMatch && searchMatch
    })
  }, [activeCategory, activeLevel, search])

  const openPanel = (value: string) => {
    setPanel(value)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleSaved = (id: number) => {
    setSaved(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id]
    )
  }

  const totalLessons = courses.reduce((sum, course) => sum + course.lessons, 0)
  const completedLessons = courses.reduce((sum, course) => sum + course.completed, 0)
  const progress = Math.round((completedLessons / totalLessons) * 100)

  const filteredDictionary = dictionary.filter(item =>
    `${item[0]} ${item[1]}`.toLowerCase().includes(dictionarySearch.toLowerCase())
  )

  return (
    <div className="learn-page">
      <header className="learn-header">
        <button className="learn-icon-btn" onClick={() => panel ? setPanel('') : navigate('/')} aria-label="Back">
          <ArrowLeft size={20} />
        </button>

        <div className="learn-header-title">
          <span>CHECKMAÎTRÉX CHESS CLUB</span>
          <h1>{panel ? panelTitles[panel] : 'Learn'}</h1>
        </div>

        <div className="learn-header-actions">
          <button className="learn-icon-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Learning menu">
            <Menu size={20} />
          </button>
          <button className="learn-icon-btn" onClick={() => openPanel('dashboard')} aria-label="Learning dashboard">
            <Settings size={19} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="learn-menu">
          {[
            ['CCC-Lesson Library', 'library'],
            ['Downloads', 'downloads'],
            ['Watch Later', 'later'],
            ['My Learning Dashboard', 'dashboard'],
            ['CCC Chess Dictionary', 'dictionary']
          ].map(([label, value]) => (
            <button key={value} onClick={() => openPanel(value)}>
              {label}<ChevronRight size={16} />
            </button>
          ))}
        </div>
      )}

      {panel ? (
        <section className="learn-panel">
          <button className="learn-back-link" onClick={() => setPanel('')}>
            <ArrowLeft size={16} /> Back to Learn
          </button>
          <PanelContent
            panel={panel}
            notes={notes}
            setNotes={setNotes}
            quizAnswer={quizAnswer}
            setQuizAnswer={setQuizAnswer}
            quizChecked={quizChecked}
            setQuizChecked={setQuizChecked}
            question={question}
            setQuestion={setQuestion}
            submitted={submitted}
            setSubmitted={setSubmitted}
            dictionarySearch={dictionarySearch}
            setDictionarySearch={setDictionarySearch}
            filteredDictionary={filteredDictionary}
          />
        </section>
      ) : (
        <main className="learn-content">
          <section className="learn-welcome">
            <div>
              <span className="learn-eyebrow">YOUR CHESS JOURNEY STARTS HERE</span>
              <h2>Learn. Improve. <em>Master.</em></h2>
              <p>Build your chess knowledge with structured lessons and guided training.</p>
              <button className="learn-primary-btn" onClick={() => openPanel('library')}>
                Explore Academy <ChevronRight size={16} />
              </button>
            </div>
            <div className="learn-hero-piece">♞</div>
          </section>

          <section className="learn-section">
            <div className="learn-section-heading">
              <div>
                <span className="learn-eyebrow">START YOUR JOURNEY</span>
                <h2>Featured Course</h2>
              </div>
              <button className="learn-text-link" onClick={() => openPanel('library')}>View all <ChevronRight size={15} /></button>
            </div>
            <article className="learn-featured-course">
              <div className="learn-featured-art">
                <span>♟</span>
                <small>CCC ACADEMY · FEATURED</small>
              </div>
              <div className="learn-featured-info">
                <span className="learn-gold-label">FEATURED MASTERCLASS</span>
                <h3>Master the Art of Chess</h3>
                <p>Learn essential principles, understand positions, and develop a stronger chess foundation.</p>
                <button className="learn-primary-btn" onClick={() => openPanel('masterclass')}>
                  <Play size={15} fill="currentColor" /> Start Learning
                </button>
              </div>
            </article>
          </section>

          <section className="learn-section">
            <div className="learn-section-heading">
              <div>
                <span className="learn-eyebrow">EXPLORE THE GAME</span>
                <h2>Learning Categories</h2>
              </div>
              <button className="learn-text-link" onClick={() => { setActiveCategory('All'); openPanel('library') }}>
                View all <ChevronRight size={15} />
              </button>
            </div>
            <div className="learn-category-grid">
              {categories.map(category => (
                <button className="learn-category-card" key={category.name} onClick={() => {
                  setActiveCategory(category.name)
                  openPanel('library')
                }}>
                  <span>{category.icon}</span>
                  <strong>{category.name}</strong>
                  <small>{category.description}</small>
                </button>
              ))}
            </div>
          </section>

          <section className="learn-section">
            <div className="learn-section-heading">
              <div>
                <span className="learn-eyebrow">CHOOSE YOUR CHALLENGE</span>
                <h2>Learning Levels</h2>
              </div>
            </div>
            <div className="learn-level-grid">
              {levels.map((level, index) => (
                <button key={level} className="learn-level-card" onClick={() => {
                  setActiveLevel(level)
                  openPanel('library')
                }}>
                  <span className="learn-level-number">0{index + 1}</span>
                  <strong>{level}</strong>
                  <small>{['Build your foundation', 'Develop your skills', 'Refine your understanding', 'Advanced mastery'][index]}</small>
                </button>
              ))}
            </div>
          </section>

          <section className="learn-section">
            <div className="learn-section-heading">
              <div>
                <span className="learn-eyebrow">PICK UP WHERE YOU LEFT OFF</span>
                <h2>Continue Learning</h2>
              </div>
              <button className="learn-text-link" onClick={() => openPanel('library')}>View all <ChevronRight size={15} /></button>
            </div>
            <div className="learn-course-list">
              {courses.filter(course => course.completed > 0).map(course => (
                <CourseCard key={course.id} course={course} saved={saved.includes(course.id)} onSave={() => toggleSaved(course.id)} onOpen={() => openPanel('masterclass')} />
              ))}
            </div>
          </section>

          <section className="learn-section">
            <div className="learn-section-heading">
              <div>
                <span className="learn-eyebrow">YOUR PERSONAL STUDY SPACE</span>
                <h2>My Learning</h2>
              </div>
              <button className="learn-text-link" onClick={() => openPanel('dashboard')}>Dashboard <ChevronRight size={15} /></button>
            </div>
            <div className="learn-dashboard-preview">
              <div className="learn-progress-ring">
                <strong>{progress}%</strong>
                <small>Progress</small>
              </div>
              <div className="learn-progress-details">
                <h3>Your learning progress</h3>
                <p>{completedLessons} of {totalLessons} sample lessons completed</p>
                <div className="learn-progress-bar"><span style={{ width: `${progress}%` }} /></div>
                <div className="learn-stats-row">
                  <span><BookOpen size={14} /> {completedLessons} Lessons</span>
                  <span><Flame size={14} /> 1 Day Streak</span>
                </div>
              </div>
            </div>
          </section>

          <section className="learn-section">
            <div className="learn-section-heading">
              <div>
                <span className="learn-eyebrow">LEARN SOMETHING NEW</span>
                <h2>Academy Features</h2>
              </div>
            </div>
            <div className="learn-tools-grid">
              {learningTools.map(tool => {
                const Icon = tool.icon
                return (
                  <button className="learn-tool-card" key={tool.panel} onClick={() => openPanel(tool.panel)}>
                    <span className="learn-tool-icon"><Icon size={20} /></span>
                    <span className="learn-tool-text">
                      <strong>{tool.title}</strong>
                      <small>{tool.subtitle}</small>
                    </span>
                    <ChevronRight size={16} />
                  </button>
                )
              })}
            </div>
          </section>

          <section className="learn-section">
            <div className="learn-section-heading">
              <div>
                <span className="learn-eyebrow">YOUR STUDY COLLECTION</span>
                <h2>Your Library</h2>
              </div>
            </div>
            <div className="learn-library-grid">
              <button onClick={() => openPanel('library')}><Library size={23} /><strong>CCC-Lesson Library</strong><small>Browse all courses</small></button>
              <button onClick={() => openPanel('downloads')}><Download size={23} /><strong>Downloads</strong><small>Saved learning materials</small></button>
              <button onClick={() => openPanel('later')}><Bookmark size={23} /><strong>Watch Later</strong><small>Your saved lessons</small></button>
            </div>
          </section>

          <footer className="learn-footer">
            <strong>CHECKMAÎTRÉX CHESS CLUB</strong>
            <span>Calculate. Conquer. Checkmate.</span>
          </footer>
        </main>
      )}
    </div>
  )
}

function CourseCard({
  course, saved, onSave, onOpen
}: {
  course: Course
  saved: boolean
  onSave: () => void
  onOpen: () => void
}) {
  const percent = Math.round((course.completed / course.lessons) * 100)
  return (
    <article className="learn-course-card">
      <div className="learn-course-thumb"><span>{course.icon}</span></div>
      <div className="learn-course-info">
        <div className="learn-course-tags"><span>{course.category}</span><span>{course.level}</span></div>
        <h3>{course.title}</h3>
        <p>{course.instructor} · {course.lessons} Lessons</p>
        <div className="learn-progress-bar"><span style={{ width: `${percent}%` }} /></div>
        <small>{course.completed} of {course.lessons} lessons completed</small>
        <button className="learn-course-open" onClick={onOpen}>Continue <ChevronRight size={14} /></button>
      </div>
      <button className={`learn-save-btn ${saved ? 'is-saved' : ''}`} onClick={onSave} aria-label="Save course">
        <Bookmark size={17} fill={saved ? 'currentColor' : 'none'} />
      </button>
    </article>
  )
}

function PanelContent({
  panel, notes, setNotes, quizAnswer, setQuizAnswer, quizChecked, setQuizChecked,
  question, setQuestion, submitted, setSubmitted, dictionarySearch,
  setDictionarySearch, filteredDictionary
}: {
  panel: string
  notes: string
  setNotes: (value: string) => void
  quizAnswer: string
  setQuizAnswer: (value: string) => void
  quizChecked: boolean
  setQuizChecked: (value: boolean) => void
  question: string
  setQuestion: (value: string) => void
  submitted: boolean
  setSubmitted: (value: boolean) => void
  dictionarySearch: string
  setDictionarySearch: (value: string) => void
  filteredDictionary: string[][]
}) {
  const [filter, setFilter] = useState('All')
  const [selectedOpening, setSelectedOpening] = useState('Italian Game')
  const [dailyDone, setDailyDone] = useState(false)

  if (panel === 'library' || panel === 'downloads' || panel === 'later') {
    const list = panel === 'downloads' ? courses.slice(0, 1) : panel === 'later' ? courses.filter(course => course.id === 2) : courses
    const visible = list.filter(course => filter === 'All' || course.level === filter)
    return (
      <>
        <PanelIntro eyebrow="CCC ACADEMY" title={panelTitles[panel]} description="Explore structured lessons and build your chess knowledge." />
        <div className="learn-panel-filters">
          {['All', ...levels].map(level => <button className={filter === level ? 'active' : ''} key={level} onClick={() => setFilter(level)}>{level}</button>)}
        </div>
        <div className="learn-course-list">
          {visible.map(course => <CourseCard key={course.id} course={course} saved={false} onSave={() => {}} onOpen={() => setDailyDone(true)} />)}
        </div>
        {dailyDone && <p className="learn-inline-notice">Sample lesson selected. Lesson player will be connected in a later phase.</p>}
      </>
    )
  }

  if (panel === 'dashboard') {
    return (
      <>
        <PanelIntro eyebrow="YOUR PROGRESS" title="My Learning Dashboard" description="A snapshot of your chess education and study activity." />
        <div className="learn-dashboard-cards">
          <Stat icon={<BookOpen />} value="6" label="Courses" />
          <Stat icon={<Check />} value="6" label="Lessons completed" />
          <Stat icon={<Flame />} value="1" label="Learning streak" />
          <Stat icon={<Trophy />} value="2" label="Achievements" />
        </div>
        <div className="learn-panel-card">
          <h3>Overall Learning Progress</h3>
          <div className="learn-progress-bar"><span style={{ width: '18%' }} /></div>
          <p>6 sample lessons completed across your courses.</p>
        </div>
        <div className="learn-panel-card">
          <h3>Continue your journey</h3>
          <p>Chess Opening Fundamentals · 3 of 8 lessons completed</p>
          <p>Tactical Thinking · 3 of 12 lessons completed</p>
        </div>
        <div className="learn-panel-card">
          <h3>Recommended next step</h3>
          <p>Continue studying opening principles before moving to advanced variations.</p>
        </div>
      </>
    )
  }

  if (panel === 'notes') {
    return (
      <>
        <PanelIntro eyebrow="PERSONAL STUDY SPACE" title="My Chess Notes" description="Record important ideas, positions, and concepts from your lessons." />
        <textarea className="learn-notes-area" value={notes} onChange={event => setNotes(event.target.value)} placeholder="Write your chess notes here..." />
        <div className="learn-note-footer"><span>{notes.length} characters</span><span>Local preview only</span></div>
        <div className="learn-panel-card"><h3>Suggested note topics</h3><p>Opening principles · Tactical patterns · Endgame rules · Game observations</p></div>
      </>
    )
  }

  if (panel === 'quiz') {
    return (
      <>
        <PanelIntro eyebrow="KNOWLEDGE CHECK" title="Lesson Knowledge Check" description="Sample question to demonstrate the quiz interface." />
        <div className="learn-panel-card">
          <span className="learn-gold-label">QUESTION 01 · OPENING PRINCIPLES</span>
          <h3>What is one important goal during the opening?</h3>
          {['Develop your pieces toward useful squares', 'Move the same piece repeatedly without reason', 'Keep your king in the center forever'].map(answer => (
            <button key={answer} className={`learn-answer-option ${quizAnswer === answer ? 'selected' : ''}`} onClick={() => { setQuizAnswer(answer); setQuizChecked(false) }}>{answer}</button>
          ))}
          <button className="learn-primary-btn" disabled={!quizAnswer} onClick={() => setQuizChecked(true)}>Check Answer</button>
          {quizChecked && <p className={quizAnswer.startsWith('Develop') ? 'learn-correct' : 'learn-incorrect'}>{quizAnswer.startsWith('Develop') ? 'Correct. Piece development is a key opening principle.' : 'Not quite. Review the opening principles lesson and try again.'}</p>}
        </div>
      </>
    )
  }

  if (panel === 'dictionary') {
    return (
      <>
        <PanelIntro eyebrow="CHESS KNOWLEDGE" title="CCC Chess Dictionary" description="Search common chess terms and their meanings." />
        <div className="learn-search-box"><Search size={17} /><input value={dictionarySearch} onChange={event => setDictionarySearch(event.target.value)} placeholder="Search chess terms..." /></div>
        <div className="learn-dictionary-list">
          {filteredDictionary.map(([term, definition]) => <article key={term}><strong>{term}</strong><p>{definition}</p></article>)}
          {!filteredDictionary.length && <p>No matching terms found.</p>}
        </div>
      </>
    )
  }

  if (panel === 'ask') {
    return (
      <>
        <PanelIntro eyebrow="ACADEMY SUPPORT" title="Ask CCC-Team" description="Write a question about a lesson or chess concept." />
        <div className="learn-panel-card">
          <label className="learn-field-label">Your question</label>
          <textarea className="learn-notes-area" value={question} onChange={event => { setQuestion(event.target.value); setSubmitted(false) }} placeholder="What would you like to understand?" />
          <button className="learn-primary-btn" disabled={!question.trim()} onClick={() => setSubmitted(true)}>Submit Question</button>
          {submitted && <p className="learn-inline-notice">Your sample question has been added to this preview. No message has been sent.</p>}
        </div>
      </>
    )
  }

  if (panel === 'openings') {
    const openings = ['Italian Game', 'Ruy Lopez', 'Sicilian Defense', 'French Defense', 'Queen’s Gambit']
    return (
      <>
        <PanelIntro eyebrow="OPENING STUDY" title="CCC Opening Explorer" description="Choose an opening to view a sample learning summary." />
        <div className="learn-opening-layout">
          <div className="learn-opening-board">
            {['♜','♞','♝','♛','♚','♝','♞','♜','♟','♟','♟','♟','♟','♟','♟','♟'].map((piece, index) => <span className={Math.floor(index / 4) % 2 === index % 2 ? 'light' : 'dark'} key={index}>{piece}</span>)}
          </div>
          <div className="learn-opening-list">
            {openings.map(opening => <button className={selectedOpening === opening ? 'active' : ''} key={opening} onClick={() => setSelectedOpening(opening)}>{opening}<ChevronRight size={15} /></button>)}
          </div>
        </div>
        <div className="learn-panel-card"><h3>{selectedOpening}</h3><p>Explore the opening’s ideas, common plans, key positions, and typical strategic themes.</p></div>
      </>
    )
  }

  if (panel === 'practice') {
    return (
      <>
        <PanelIntro eyebrow="APPLY YOUR KNOWLEDGE" title="Practice After Learning" description="Reinforce lessons with related activities." />
        <div className="learn-feature-list">
          <FeatureRow icon={<Puzzle />} title="Opening Principles" detail="Practice piece development and center control." />
          <FeatureRow icon={<Target />} title="Tactical Patterns" detail="Train forks, pins, skewers, and discovered attacks." />
          <FeatureRow icon={<Crown />} title="Endgame Basics" detail="Review king activity and pawn promotion concepts." />
        </div>
      </>
    )
  }

  if (panel === 'daily') {
    return (
      <>
        <PanelIntro eyebrow="DAILY TRAINING" title="CCC Daily Chess Lesson" description="A featured daily topic to keep your learning consistent." />
        <div className="learn-daily-card"><span>♞</span><small>DAILY LESSON</small><h3>Why Piece Development Matters</h3><p>Learn how developing pieces helps create coordination, control, and attacking opportunities.</p><button className="learn-primary-btn" onClick={() => setDailyDone(true)}>{dailyDone ? <><Check size={16} /> Completed</> : <><Play size={15} /> Mark as Completed</>}</button></div>
      </>
    )
  }

  if (panel === 'achievements' || panel === 'certificates') {
    const isCert = panel === 'certificates'
    return (
      <>
        <PanelIntro eyebrow="YOUR ACCOMPLISHMENTS" title={panelTitles[panel]} description={isCert ? 'Certificates earned after completing course requirements.' : 'Milestones that recognize your learning progress.'} />
        <div className="learn-achievement-grid">
          {(isCert ? ['Opening Fundamentals Certificate', 'Tactical Thinking Certificate'] : ['First Lesson', 'Learning Explorer', 'Daily Learner', 'Course Finisher']).map((item, index) => (
            <article key={item}><span>{isCert ? '✦' : ['♟','♞','♜','♛'][index]}</span><strong>{item}</strong><small>{isCert ? 'Locked · Sample' : index < 2 ? 'Sample achievement' : 'Not yet unlocked'}</small></article>
          ))}
        </div>
      </>
    )
  }

  if (panel === 'masterclass' || panel === 'games') {
    return (
      <>
        <PanelIntro eyebrow="STUDY THE GAME" title={panelTitles[panel]} description="Learn through expert instruction and annotated chess examples." />
        <div className="learn-video-placeholder"><Play size={34} /><span>LESSON VIDEO PREVIEW</span></div>
        <div className="learn-panel-card"><span className="learn-gold-label">CCC-TEAM · SAMPLE COURSE</span><h3>{panel === 'games' ? 'A Classic Strategic Game' : 'Master the Art of Chess'}</h3><p>Explore key moments, understand important decisions, and review the ideas behind each move.</p></div>
        <div className="learn-feature-list">
          <FeatureRow icon={<BookOpen />} title="Introduction" detail="Understand the position and main ideas." />
          <FeatureRow icon={<SearchCheck />} title="Critical Moments" detail="Review the most important decisions." />
          <FeatureRow icon={<Lightbulb />} title="Key Takeaways" detail="Remember the strategic lessons." />
        </div>
      </>
    )
  }

  if (panel === 'path') {
    return (
      <>
        <PanelIntro eyebrow="YOUR PERSONAL CURRICULUM" title="Personalized Learning Path" description="A suggested sequence that builds knowledge step by step." />
        <div className="learn-path-list">
          {['Opening Fundamentals', 'Tactical Awareness', 'Middlegame Planning', 'Endgame Technique', 'Master Game Study'].map((item, index) => <article key={item}><span>{index + 1}</span><div><strong>{item}</strong><small>{index === 0 ? 'Recommended starting point' : 'Suggested next stage'}</small></div><ChevronRight size={17} /></article>)}
        </div>
      </>
    )
  }

  return (
    <>
      <PanelIntro eyebrow="CCC ACADEMY" title={panelTitles[panel] || 'Learn'} description="This section is part of the CCC Chess Academy frontend preview." />
      <div className="learn-panel-card"><Sparkles size={25} /><h3>Coming together in the Academy</h3><p>This is a frontend sample. Real course content, progress tracking, downloads, and account features will be connected in a later development phase.</p></div>
    </>
  )
}

function PanelIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="learn-panel-intro"><span className="learn-eyebrow">{eyebrow}</span><h2>{title}</h2><p>{description}</p></div>
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return <article className="learn-stat-card"><span>{icon}</span><strong>{value}</strong><small>{label}</small></article>
}

function FeatureRow({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return <article className="learn-feature-row"><span>{icon}</span><div><strong>{title}</strong><small>{detail}</small></div><ChevronRight size={17} /></article>
}

export default LearnPage
