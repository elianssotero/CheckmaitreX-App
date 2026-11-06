
import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Cloud,
  FileText,
  FolderKanban,
  Handshake,
  Headphones,
  Landmark,
  LockKeyhole,
  Megaphone,
  Package,
  Search,
  ShieldCheck,
  Users,
  Wallet,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  BookOpen,
  Settings,
  Bell,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type ModuleItem = {
  id: string
  label: string
  description: string
  icon: LucideIcon
  status: string
}

const modules: ModuleItem[] = [
  {
    id: 'organization',
    label: 'Organization',
    description: 'Company structure, leadership, departments and divisions.',
    icon: Building2,
    status: 'Active',
  },
  {
    id: 'hr',
    label: 'Human Resources',
    description: 'Personnel, recruitment, positions and workforce management.',
    icon: Users,
    status: 'Planned',
  },
  {
    id: 'projects',
    label: 'Projects & Workflows',
    description: 'Projects, tasks, milestones, teams and deliverables.',
    icon: FolderKanban,
    status: 'Planned',
  },
  {
    id: 'knowledge',
    label: 'Knowledge & Records',
    description: 'Company documents, policies, manuals and records.',
    icon: BookOpen,
    status: 'Planned',
  },
  {
    id: 'finance',
    label: 'Finance & Accounting',
    description: 'Budgets, income, expenses and financial reporting.',
    icon: Wallet,
    status: 'Planned',
  },
  {
    id: 'business',
    label: 'Business Development',
    description: 'Clients, sales opportunities and partnerships.',
    icon: Handshake,
    status: 'Planned',
  },
  {
    id: 'marketing',
    label: 'Marketing & Brand',
    description: 'Brand identity, campaigns, social media and PR.',
    icon: Megaphone,
    status: 'Planned',
  },
  {
    id: 'technology',
    label: 'Technology & IT',
    description: 'Applications, infrastructure, domains and IT assets.',
    icon: Cloud,
    status: 'Planned',
  },
  {
    id: 'legal',
    label: 'Legal & Compliance',
    description: 'Governance, contracts, risks and compliance records.',
    icon: ShieldCheck,
    status: 'Planned',
  },
  {
    id: 'procurement',
    label: 'Procurement',
    description: 'Purchasing, vendors, suppliers and purchase orders.',
    icon: Package,
    status: 'Planned',
  },
  {
    id: 'support',
    label: 'Customer Support',
    description: 'Customer inquiries, support tickets and service operations.',
    icon: Headphones,
    status: 'Planned',
  },
  {
    id: 'analytics',
    label: 'Business Intelligence',
    description: 'Company analytics, reporting and performance monitoring.',
    icon: ChartNoAxesCombined,
    status: 'Planned',
  },
]

const departments = [
  {
    name: 'Corporate Administration',
    responsibility: 'Company governance and administration',
    lead: 'To be assigned',
  },
  {
    name: 'Finance & Accounting',
    responsibility: 'Financial planning and reporting',
    lead: 'To be assigned',
  },
  {
    name: 'Human Resources',
    responsibility: 'Personnel and workforce operations',
    lead: 'To be assigned',
  },
  {
    name: 'Technology & Development',
    responsibility: 'Software and infrastructure',
    lead: 'To be assigned',
  },
  {
    name: 'Marketing & Communications',
    responsibility: 'Brand and public communications',
    lead: 'To be assigned',
  },
  {
    name: 'Legal & Compliance',
    responsibility: 'Legal documentation and compliance',
    lead: 'To be assigned',
  },
  {
    name: 'Research & Innovation',
    responsibility: 'Research and product innovation',
    lead: 'To be assigned',
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

const sectionDescriptions: Record<string, string> = {
  organization: 'Manage the company hierarchy, departments, divisions and reporting structure.',
  hr: 'Manage personnel administration, recruitment, assignments and workforce development.',
  projects: 'Coordinate company projects, project teams, tasks, milestones and workflows.',
  knowledge: 'Organize company documents, knowledge articles, policies and official records.',
  finance: 'Monitor corporate budgets, financial records, expenses and reporting.',
  business: 'Manage client relationships, sales opportunities and institutional partnerships.',
  marketing: 'Coordinate brand identity, campaigns, content and public relations.',
  technology: 'Manage company applications, cloud infrastructure, domains and IT services.',
  legal: 'Manage corporate governance, agreements, compliance and risk records.',
  procurement: 'Manage purchasing requests, vendors, suppliers and procurement approvals.',
  support: 'Coordinate customer support, complaints, tickets and service quality.',
  analytics: 'Monitor company performance, operational indicators and business reports.',
}

function CorporatePage() {
  const [activeModule, setActiveModule] = useState('overview')
  const [search, setSearch] = useState('')

  const activeItem = modules.find((item) => item.id === activeModule)

  const filteredModules = useMemo(() => {
    const term = search.trim().toLowerCase()

    if (!term) return modules

    return modules.filter((item) =>
      `${item.label} ${item.description}`.toLowerCase().includes(term),
    )
  }, [search])

  const selectModule = (id: string) => {
    setActiveModule(id)
    setSearch('')
  }

  return (
    <div className="page-container corporate-page">
      <header className="corporate-header">
        <div>
          <div className="corporate-eyebrow">
            CHECKMAÎTRÉX COMPANY
          </div>
          <h1>Corporate <span>Management</span></h1>
          <p>
            Centralized management of company operations, departments,
            projects and business divisions.
          </p>
        </div>

        <button className="corporate-icon-button" type="button" aria-label="Notifications">
          <Bell size={19} />
        </button>
      </header>

      <section className="corporate-hero">
        <div className="corporate-hero-content">
          <span className="corporate-label">
            <Building2 size={14} />
            CORPORATE HEADQUARTERS
          </span>

          <h2>
            One company.
            <br />
            <span>Connected operations.</span>
          </h2>

          <p>
            A unified workspace for CheckmaîtréX Company and its
            departments, divisions and operational teams.
          </p>

          <button
            className="btn btn-primary"
            type="button"
            onClick={() => selectModule('organization')}
          >
            View Organization <ArrowRight size={16} />
          </button>
        </div>

        <div className="corporate-hero-symbol">
          <Landmark size={94} strokeWidth={1} />
        </div>
      </section>

      <section className="corporate-metrics">
        <MetricCard
          icon={Building2}
          label="Business Divisions"
          value={String(divisions.length)}
          note="Configured divisions"
        />
        <MetricCard
          icon={BriefcaseBusiness}
          label="Departments"
          value={String(departments.length)}
          note="Proposed structure"
        />
        <MetricCard
          icon={FolderKanban}
          label="Project Workspace"
          value="Ready"
          note="Frontend framework"
        />
        <MetricCard
          icon={ShieldCheck}
          label="Governance"
          value="Hybrid"
          note="Central oversight"
        />
      </section>

      <section className="corporate-section">
        <div className="corporate-section-heading">
          <div>
            <h2>Management Systems</h2>
            <p>Access the company management workspaces.</p>
          </div>

          <span className="corporate-count">
            {modules.length} SYSTEMS
          </span>
        </div>

        <div className="corporate-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search management systems..."
            aria-label="Search management systems"
          />
        </div>

        {activeModule !== 'overview' && (
          <button
            className="corporate-back"
            type="button"
            onClick={() => selectModule('overview')}
          >
            <ArrowRight size={15} />
            Back to Corporate Overview
          </button>
        )}

        {activeModule === 'overview' ? (
          <div className="corporate-module-grid">
            {filteredModules.map((item) => {
              const Icon = item.icon

              return (
                <button
                  className="corporate-module-card"
                  key={item.id}
                  type="button"
                  onClick={() => selectModule(item.id)}
                >
                  <div className="corporate-module-top">
                    <span className="corporate-module-icon">
                      <Icon size={21} />
                    </span>
                    <ChevronRight size={18} className="corporate-chevron" />
                  </div>

                  <h3>{item.label}</h3>
                  <p>{item.description}</p>

                  <div className="corporate-module-bottom">
                    <span className={`corporate-status ${item.status === 'Active' ? 'is-active' : ''}`}>
                      {item.status}
                    </span>
                    <span className="corporate-open-label">Open workspace</span>
                  </div>
                </button>
              )
            })}

            {filteredModules.length === 0 && (
              <div className="corporate-empty">
                No management systems match your search.
              </div>
            )}
          </div>
        ) : (
          <ModuleWorkspace
            module={activeItem}
            description={sectionDescriptions[activeModule]}
            onBack={() => selectModule('overview')}
          />
        )}
      </section>

      {activeModule === 'overview' && (
        <>
          <section className="corporate-section">
            <div className="corporate-section-heading">
              <div>
                <h2>Business Divisions</h2>
                <p>Separate operational units under CheckmaîtréX Company.</p>
              </div>
            </div>

            <div className="corporate-division-list">
              {divisions.map((division, index) => (
                <div className="corporate-division-row" key={division}>
                  <span className="corporate-division-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{division}</span>
                  <span className="corporate-status">Configured</span>
                </div>
              ))}
            </div>
          </section>

          <section className="corporate-section">
            <div className="corporate-section-heading">
              <div>
                <h2>Department Directory</h2>
                <p>Proposed corporate departments and responsibilities.</p>
              </div>
              <button
                className="corporate-text-button"
                type="button"
                onClick={() => selectModule('organization')}
              >
                View structure <ArrowRight size={15} />
              </button>
            </div>

            <div className="corporate-table-wrap">
              <table className="corporate-table">
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Responsibility</th>
                    <th>Department Head</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((department) => (
                    <tr key={department.name}>
                      <td>{department.name}</td>
                      <td>{department.responsibility}</td>
                      <td>{department.lead}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      <footer className="corporate-footer">
        <span>CHECKMAÎTRÉX COMPANY</span>
        <span>Corporate Management · Frontend Preview</span>
      </footer>
    </div>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: LucideIcon
  label: string
  value: string
  note: string
}) {
  return (
    <div className="corporate-metric-card">
      <div className="corporate-metric-top">
        <span>{label}</span>
        <Icon size={18} />
      </div>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  )
}

function ModuleWorkspace({
  module,
  description,
  onBack,
}: {
  module?: ModuleItem
  description?: string
  onBack: () => void
}) {
  if (!module) return null

  const Icon = module.icon

  return (
    <div className="corporate-workspace">
      <div className="corporate-workspace-header">
        <span className="corporate-module-icon large">
          <Icon size={27} />
        </span>
        <div>
          <span className="corporate-eyebrow">CORPORATE WORKSPACE</span>
          <h3>{module.label}</h3>
          <p>{description}</p>
        </div>
      </div>

      <div className="corporate-workspace-notice">
        <Activity size={19} />
        <div>
          <strong>Frontend module framework</strong>
          <p>
            This workspace is included in the approved Corporate blueprint.
            Its detailed management screens will be implemented as part of
            the integrated frontend development.
          </p>
        </div>
      </div>

      <div className="corporate-workspace-grid">
        <WorkspaceItem icon={ClipboardList} title="Management Overview" />
        <WorkspaceItem icon={FileText} title="Records & Documentation" />
        <WorkspaceItem icon={CalendarDays} title="Schedules & Activities" />
        <WorkspaceItem icon={LockKeyhole} title="Roles & Permissions" />
        <WorkspaceItem icon={CircleDollarSign} title="Reports & Performance" />
        <WorkspaceItem icon={Settings} title="Configuration" />
      </div>

      <div className="corporate-workspace-actions">
        <span className="corporate-status">Demo interface</span>
        <button className="btn btn-secondary" type="button" onClick={onBack}>
          Return to Overview
        </button>
      </div>
    </div>
  )
}

function WorkspaceItem({
  icon: Icon,
  title,
}: {
  icon: LucideIcon
  title: string
}) {
  return (
    <div className="corporate-workspace-item">
      <Icon size={19} />
      <span>{title}</span>
      <ChevronRight size={16} />
    </div>
  )
}

export default CorporatePage
