import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  Building2,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Plus,
  Search,
  ShieldCheck,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import { Link } from 'react-router-dom'

type Tab =
  | 'Overview'
  | 'Organization'
  | 'Departments'
  | 'Divisions'
  | 'Positions'
  | 'Personnel'
  | 'Recruitment'
  | 'Onboarding'

type Person = {
  id: string
  name: string
  position: string
  department: string
  division: string
  type: string
  status: string
}

const tabs: { label: Tab; icon: typeof LayoutDashboard }[] = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Organization', icon: Building2 },
  { label: 'Departments', icon: BriefcaseBusiness },
  { label: 'Divisions', icon: Building2 },
  { label: 'Positions', icon: ClipboardList },
  { label: 'Personnel', icon: Users },
  { label: 'Recruitment', icon: UserPlus },
  { label: 'Onboarding', icon: GraduationCap },
]

const departments = [
  {
    name: 'Corporate Administration',
    head: 'To be assigned',
    description: 'Corporate operations, administration, and executive coordination.',
    status: 'Established',
  },
  {
    name: 'Finance & Accounting',
    head: 'To be assigned',
    description: 'Budget planning, financial reporting, and accounting coordination.',
    status: 'Established',
  },
  {
    name: 'Human Resources',
    head: 'To be assigned',
    description: 'Personnel administration, recruitment, and workforce development.',
    status: 'Established',
  },
  {
    name: 'Legal & Compliance',
    head: 'To be assigned',
    description: 'Legal coordination, policies, governance, and compliance.',
    status: 'Established',
  },
  {
    name: 'Technology & Development',
    head: 'To be assigned',
    description: 'Software, infrastructure, technology operations, and security.',
    status: 'Established',
  },
  {
    name: 'Marketing & Communications',
    head: 'To be assigned',
    description: 'Brand management, marketing, communications, and public relations.',
    status: 'Established',
  },
  {
    name: 'Research & Innovation',
    head: 'To be assigned',
    description: 'Research, experimentation, product concepts, and innovation.',
    status: 'Established',
  },
]

const divisions = [
  'CheckmaîtréX Platform',
  'CheckmaîtréX Academy',
  'CheckmaîtréX Chess Club',
  'Creator Program',
  'Events & Activities',
  'Shop & Marketplace',
  'News & Publications',
]

const samplePersonnel: Person[] = [
  {
    id: 'DEMO-001',
    name: 'Sample Executive',
    position: 'Chief Executive Officer',
    department: 'Executive Office',
    division: 'Corporate',
    type: 'Executive',
    status: 'Sample',
  },
  {
    id: 'DEMO-002',
    name: 'Sample Manager',
    position: 'Department Manager',
    department: 'Corporate Administration',
    division: 'Corporate',
    type: 'Manager',
    status: 'Sample',
  },
  {
    id: 'DEMO-003',
    name: 'Sample Specialist',
    position: 'Technology Specialist',
    department: 'Technology & Development',
    division: 'CheckmaîtréX Platform',
    type: 'Project-Based',
    status: 'Sample',
  },
]

const positionGroups = [
  {
    title: 'Executive Leadership',
    roles: [
      'Chief Executive Officer (CEO)',
      'Chief Operating Officer (COO)',
      'Chief Financial Officer (CFO)',
      'Chief Technology Officer (CTO)',
      'Chief Marketing Officer (CMO)',
      'Chief Human Resources Officer (CHRO)',
      'General Counsel',
      'Chief Strategy Officer',
    ],
  },
  {
    title: 'Department Leadership',
    roles: [
      'Department Director',
      'Department Head',
      'Department Manager',
      'Assistant Department Manager',
    ],
  },
  {
    title: 'Division Leadership',
    roles: [
      'Division Director',
      'Division Manager',
      'Operations Manager',
      'Program Coordinator',
    ],
  },
  {
    title: 'Workforce & Specialists',
    roles: [
      'Full-Time Personnel',
      'Part-Time Personnel',
      'Project-Based Personnel',
      'Contractor',
      'Intern / Trainee',
      'Volunteer',
      'Advisor / Consultant',
    ],
  },
]

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="hr-section-title">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

function OrganizationHRPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Overview')
  const [search, setSearch] = useState('')
  const [personnel, setPersonnel] = useState(samplePersonnel)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newPosition, setNewPosition] = useState('')
  const [newDepartment, setNewDepartment] = useState('Corporate Administration')
  const [newType, setNewType] = useState('Project-Based')

  const filteredPersonnel = useMemo(() => {
    const query = search.toLowerCase().trim()

    if (!query) return personnel

    return personnel.filter((person) =>
      [
        person.id,
        person.name,
        person.position,
        person.department,
        person.division,
        person.type,
      ]
        .join(' ')
        .toLowerCase()
        .includes(query),
    )
  }, [personnel, search])

  function addSamplePersonnel() {
    if (!newName.trim() || !newPosition.trim()) return

    const newPerson: Person = {
      id: `DEMO-${String(personnel.length + 1).padStart(3, '0')}`,
      name: newName.trim(),
      position: newPosition.trim(),
      department: newDepartment,
      division: 'Corporate',
      type: newType,
      status: 'Sample',
    }

    setPersonnel((current) => [...current, newPerson])
    setNewName('')
    setNewPosition('')
    setShowAddForm(false)
  }

  return (
    <div className="hr-page">
      <div className="hr-topbar">
        <Link to="/corporate" className="hr-back-link">
          <ArrowLeft size={17} />
          Corporate Management
        </Link>
        <span className="hr-demo-label">FRONTEND DEMO</span>
      </div>

      <header className="hr-hero">
        <div className="hr-hero-icon">
          <Users size={27} />
        </div>
        <div className="hr-hero-copy">
          <span>CHECKMAÎTRÉX COMPANY</span>
          <h1>Organization & HR Management</h1>
          <p>
            Manage the corporate structure, departments, divisions,
            positions, and workforce administration.
          </p>
        </div>
      </header>

      <div className="hr-notice">
        <ShieldCheck size={18} />
        <div>
          <strong>Demo environment</strong>
          <p>
            All personnel entries are sample records. No real employee
            information or employment records are stored.
          </p>
        </div>
      </div>

      <div className="hr-layout">
        <aside className="hr-navigation">
          <div className="hr-navigation-label">HR WORKSPACE</div>
          {tabs.map((tab) => {
            const Icon = tab.icon

            return (
              <button
                key={tab.label}
                className={`hr-nav-item ${
                  activeTab === tab.label ? 'active' : ''
                }`}
                onClick={() => setActiveTab(tab.label)}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
                <ChevronRight size={15} />
              </button>
            )
          })}
        </aside>

        <main className="hr-content">
          {activeTab === 'Overview' && (
            <>
              <SectionTitle
                eyebrow="WORKFORCE CONTROL CENTER"
                title="HR Overview"
                description="A centralized view of the proposed corporate structure and workforce functions."
              />

              <div className="hr-stat-grid">
                <div className="hr-stat-card">
                  <Building2 size={20} />
                  <strong>{departments.length}</strong>
                  <span>Corporate Departments</span>
                </div>
                <div className="hr-stat-card">
                  <BriefcaseBusiness size={20} />
                  <strong>{divisions.length}</strong>
                  <span>Business Divisions</span>
                </div>
                <div className="hr-stat-card">
                  <Users size={20} />
                  <strong>{personnel.length}</strong>
                  <span>Sample Personnel Records</span>
                </div>
                <div className="hr-stat-card">
                  <UserPlus size={20} />
                  <strong>0</strong>
                  <span>Open Recruitment Requests</span>
                </div>
              </div>

              <div className="hr-panel">
                <div className="hr-panel-heading">
                  <div>
                    <h3>Corporate Governance Structure</h3>
                    <p>Central oversight with delegated operations.</p>
                  </div>
                  <button
                    className="hr-text-button"
                    onClick={() => setActiveTab('Organization')}
                  >
                    View structure <ChevronRight size={15} />
                  </button>
                </div>

                <div className="hr-org-preview">
                  <div className="hr-org-node main">
                    <span>COMPANY LEVEL</span>
                    <strong>CheckmaîtréX Company</strong>
                    <small>Corporate oversight and governance</small>
                  </div>
                  <div className="hr-org-connector" />
                  <div className="hr-org-node">
                    <span>EXECUTIVE OFFICE</span>
                    <strong>Executive Leadership</strong>
                    <small>CEO · COO · Executive Office</small>
                  </div>
                  <div className="hr-org-connector" />
                  <div className="hr-org-departments">
                    {departments.map((department) => (
                      <div key={department.name}>
                        {department.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hr-two-column">
                <div className="hr-panel">
                  <div className="hr-panel-heading">
                    <div>
                      <h3>HR Management Functions</h3>
                      <p>Core workforce administration areas.</p>
                    </div>
                  </div>
                  {[
                    'Personnel records and assignments',
                    'Recruitment and candidate tracking',
                    'Onboarding and offboarding',
                    'Work schedules, attendance, and leave',
                    'Performance and development',
                    'HR policies and documentation',
                  ].map((item) => (
                    <div className="hr-check-row" key={item}>
                      <CheckCircle2 size={17} />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="hr-panel">
                  <div className="hr-panel-heading">
                    <div>
                      <h3>Workforce Categories</h3>
                      <p>Available personnel classifications.</p>
                    </div>
                  </div>
                  {[
                    'Executive',
                    'Department Head',
                    'Division Director',
                    'Manager',
                    'Full-Time / Part-Time',
                    'Project-Based / Contractor',
                    'Intern / Volunteer',
                    'Advisor / Consultant',
                  ].map((item) => (
                    <div className="hr-simple-row" key={item}>
                      <span>{item}</span>
                      <span className="hr-muted">Available type</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'Organization' && (
            <>
              <SectionTitle
                eyebrow="CORPORATE GOVERNANCE"
                title="Organizational Structure"
                description="The proposed reporting structure of CheckmaîtréX Company."
              />

              <div className="hr-org-full">
                <div className="hr-org-node main">
                  <span>PARENT COMPANY</span>
                  <strong>CheckmaîtréX Company</strong>
                  <small>Corporate governance and strategic oversight</small>
                </div>
                <div className="hr-org-connector" />
                <div className="hr-org-node">
                  <span>EXECUTIVE OFFICE</span>
                  <strong>Executive Leadership</strong>
                  <small>CEO · COO · Executive Office</small>
                </div>
                <div className="hr-org-connector" />
                <div className="hr-org-departments">
                  {departments.map((department) => (
                    <article key={department.name}>
                      <Building2 size={19} />
                      <strong>{department.name}</strong>
                      <span>{department.head}</span>
                    </article>
                  ))}
                </div>
              </div>

              <div className="hr-info-card">
                <strong>Hybrid governance model</strong>
                <p>
                  Company-level leadership provides strategic direction,
                  policies, and oversight. Departments manage their
                  specialized functions, while business divisions handle
                  their assigned operations under delegated authority.
                </p>
              </div>
            </>
          )}

          {activeTab === 'Departments' && (
            <>
              <SectionTitle
                eyebrow="CORPORATE STRUCTURE"
                title="Department Directory"
                description="The central departments responsible for company-wide functions."
              />

              <div className="hr-card-list">
                {departments.map((department, index) => (
                  <article className="hr-department-card" key={department.name}>
                    <div className="hr-card-index">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="hr-card-main">
                      <h3>{department.name}</h3>
                      <p>{department.description}</p>
                      <span>Department Head: {department.head}</span>
                    </div>
                    <span className="hr-status">{department.status}</span>
                  </article>
                ))}
              </div>
            </>
          )}

          {activeTab === 'Divisions' && (
            <>
              <SectionTitle
                eyebrow="BUSINESS OPERATIONS"
                title="Division Directory"
                description="Business units operating under CheckmaîtréX Company."
              />

              <div className="hr-division-grid">
                {divisions.map((division, index) => (
                  <article className="hr-division-card" key={division}>
                    <div className="hr-division-number">
                      DIV-{String(index + 1).padStart(2, '0')}
                    </div>
                    <Building2 size={22} />
                    <h3>{division}</h3>
                    <p>
                      Operational division under the corporate governance
                      framework.
                    </p>
                    <span>Director: To be assigned</span>
                  </article>
                ))}
              </div>
            </>
          )}

          {activeTab === 'Positions' && (
            <>
              <SectionTitle
                eyebrow="POSITION MANAGEMENT"
                title="Position Directory"
                description="A structured catalog of proposed corporate roles. Positions may remain vacant or be combined where appropriate."
              />

              {positionGroups.map((group) => (
                <div className="hr-panel hr-position-panel" key={group.title}>
                  <h3>{group.title}</h3>
                  <div className="hr-position-grid">
                    {group.roles.map((role) => (
                      <div className="hr-position-item" key={role}>
                        <BriefcaseBusiness size={17} />
                        {role}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'Personnel' && (
            <>
              <SectionTitle
                eyebrow="WORKFORCE DIRECTORY"
                title="Personnel Records"
                description="A sample directory for testing personnel search and record presentation."
              />

              <div className="hr-toolbar">
                <div className="hr-search">
                  <Search size={17} />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search name, ID, position, or department..."
                  />
                  {search && (
                    <button onClick={() => setSearch('')} aria-label="Clear search">
                      <X size={15} />
                    </button>
                  )}
                </div>
                <button
                  className="hr-primary-button"
                  onClick={() => setShowAddForm(true)}
                >
                  <Plus size={17} /> Add sample record
                </button>
              </div>

              {showAddForm && (
                <div className="hr-form-panel">
                  <div className="hr-panel-heading">
                    <div>
                      <h3>Add Sample Personnel Record</h3>
                      <p>This creates a temporary frontend demo entry.</p>
                    </div>
                    <button
                      className="hr-close-button"
                      onClick={() => setShowAddForm(false)}
                      aria-label="Close form"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="hr-form-grid">
                    <label>
                      Sample name
                      <input
                        value={newName}
                        onChange={(event) => setNewName(event.target.value)}
                        placeholder="Enter sample name"
                      />
                    </label>
                    <label>
                      Position
                      <input
                        value={newPosition}
                        onChange={(event) => setNewPosition(event.target.value)}
                        placeholder="Enter position"
                      />
                    </label>
                    <label>
                      Department
                      <select
                        value={newDepartment}
                        onChange={(event) => setNewDepartment(event.target.value)}
                      >
                        {departments.map((department) => (
                          <option key={department.name}>
                            {department.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Personnel type
                      <select
                        value={newType}
                        onChange={(event) => setNewType(event.target.value)}
                      >
                        <option>Executive</option>
                        <option>Manager</option>
                        <option>Full-Time</option>
                        <option>Part-Time</option>
                        <option>Project-Based</option>
                        <option>Contractor</option>
                        <option>Intern / Trainee</option>
                        <option>Volunteer</option>
                        <option>Advisor / Consultant</option>
                      </select>
                    </label>
                  </div>

                  <div className="hr-form-actions">
                    <button
                      className="hr-secondary-button"
                      onClick={() => setShowAddForm(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="hr-primary-button"
                      onClick={addSamplePersonnel}
                      disabled={!newName.trim() || !newPosition.trim()}
                    >
                      Add demo record
                    </button>
                  </div>
                </div>
              )}

              <div className="hr-table-wrap">
                <table className="hr-personnel-table">
                  <thead>
                    <tr>
                      <th>Personnel ID</th>
                      <th>Name & Position</th>
                      <th>Department</th>
                      <th>Type</th>
                      <th>Record</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPersonnel.map((person) => (
                      <tr key={person.id}>
                        <td>{person.id}</td>
                        <td>
                          <strong>{person.name}</strong>
                          <span>{person.position}</span>
                        </td>
                        <td>{person.department}</td>
                        <td>{person.type}</td>
                        <td><span className="hr-status">{person.status}</span></td>
                      </tr>
                    ))}
                    {filteredPersonnel.length === 0 && (
                      <tr>
                        <td colSpan={5} className="hr-empty">
                          No matching sample records.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'Recruitment' && (
            <>
              <SectionTitle
                eyebrow="TALENT ACQUISITION"
                title="Recruitment Management"
                description="A future-ready workspace for tracking recruitment requests and candidates."
              />

              <div className="hr-stat-grid">
                <div className="hr-stat-card">
                  <ClipboardList size={20} />
                  <strong>0</strong>
                  <span>Position Requests</span>
                </div>
                <div className="hr-stat-card">
                  <Users size={20} />
                  <strong>0</strong>
                  <span>Demo Candidates</span>
                </div>
                <div className="hr-stat-card">
                  <CalendarDays size={20} />
                  <strong>0</strong>
                  <span>Interviews Scheduled</span>
                </div>
                <div className="hr-stat-card">
                  <CheckCircle2 size={20} />
                  <strong>0</strong>
                  <span>Completed Hires</span>
                </div>
              </div>

              <div className="hr-panel">
                <h3>Recruitment Workflow</h3>
                <div className="hr-workflow">
                  {[
                    'Workforce Request',
                    'Approval Review',
                    'Job Opening',
                    'Candidate Screening',
                    'Interview',
                    'Selection',
                    'Offer & Acceptance',
                  ].map((step, index) => (
                    <div className="hr-workflow-step" key={step}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{step}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hr-info-card">
                <strong>Recruitment controls</strong>
                <p>
                  Recruitment requests should be reviewed against approved
                  workforce plans, available budgets, role requirements,
                  and applicable employment rules before any hiring activity.
                </p>
              </div>
            </>
          )}

          {activeTab === 'Onboarding' && (
            <>
              <SectionTitle
                eyebrow="PERSONNEL INTEGRATION"
                title="Onboarding & Offboarding"
                description="A structured process for personnel entry, role assignment, and departure."
              />

              <div className="hr-two-column">
                <div className="hr-panel">
                  <div className="hr-panel-heading">
                    <div>
                      <h3>Onboarding Workflow</h3>
                      <p>Proposed new personnel process.</p>
                    </div>
                    <GraduationCap size={20} />
                  </div>
                  {[
                    'Approved personnel engagement',
                    'Required documentation',
                    'Policy and handbook orientation',
                    'Department and supervisor assignment',
                    'Role-specific training',
                    'Access authorization review',
                    'Initial performance check-in',
                  ].map((step, index) => (
                    <div className="hr-process-row" key={step}>
                      <span>{index + 1}</span>
                      {step}
                    </div>
                  ))}
                </div>

                <div className="hr-panel">
                  <div className="hr-panel-heading">
                    <div>
                      <h3>Offboarding Workflow</h3>
                      <p>Proposed personnel exit process.</p>
                    </div>
                    <FileText size={20} />
                  </div>
                  {[
                    'Authorized departure documentation',
                    'Knowledge and task handover',
                    'Company property return',
                    'Access removal and security review',
                    'Final records and documentation',
                    'Exit feedback, where appropriate',
                    'Record retention review',
                  ].map((step, index) => (
                    <div className="hr-process-row" key={step}>
                      <span>{index + 1}</span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      <footer className="hr-footer">
        CHECKMAÎTRÉX COMPANY · ORGANIZATION & HR MANAGEMENT
        <span>Frontend demonstration · No backend connected</span>
      </footer>
    </div>
  )
}

export default OrganizationHRPage