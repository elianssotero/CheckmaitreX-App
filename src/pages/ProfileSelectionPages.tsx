
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Check,
  Search,
  Sparkles,
  Shield,
  Crown,
  Star,
  Trophy,
  Zap,
  Target,
  BookOpen,
  Flame,
  Medal,
  Gem,
  Swords,
  Lightbulb,
} from 'lucide-react'
import './ProfilePage.css'

type FlairOption = {
  id: string
  label: string
  icon: typeof Sparkles
}

export const flairOptions: FlairOption[] = [
  { id: 'tactical-mind', label: 'Tactical Mind', icon: Target },
  { id: 'puzzle-master', label: 'Puzzle Master', icon: Lightbulb },
  { id: 'opening-expert', label: 'Opening Expert', icon: BookOpen },
  { id: 'endgame-specialist', label: 'Endgame Specialist', icon: Crown },
  { id: 'ccc-supporter', label: 'CCC Supporter', icon: Shield },
  { id: 'chess-warrior', label: 'Chess Warrior', icon: Swords },
  { id: 'streak-master', label: 'Streak Master', icon: Flame },
  { id: 'champion', label: 'Champion', icon: Trophy },
  { id: 'master-player', label: 'Master Player', icon: Medal },
  { id: 'elite-player', label: 'Elite Player', icon: Gem },
  { id: 'rapid-thinker', label: 'Rapid Thinker', icon: Zap },
  { id: 'star-player', label: 'Star Player', icon: Star },
]

const countryCodes = [
  'AD','AE','AF','AG','AI','AL','AM','AO','AQ','AR','AS','AT','AU','AW','AX','AZ',
  'BA','BB','BD','BE','BF','BG','BH','BI','BJ','BL','BM','BN','BO','BQ','BR','BS',
  'BT','BV','BW','BY','BZ','CA','CC','CD','CF','CG','CH','CI','CK','CL','CM','CN',
  'CO','CR','CU','CV','CW','CX','CY','CZ','DE','DJ','DK','DM','DO','DZ','EC','EE',
  'EG','EH','ER','ES','ET','FI','FJ','FK','FM','FO','FR','GA','GB','GD','GE','GF',
  'GG','GH','GI','GL','GM','GN','GP','GQ','GR','GS','GT','GU','GW','GY','HK','HM',
  'HN','HR','HT','HU','ID','IE','IL','IM','IN','IO','IQ','IR','IS','IT','JE','JM',
  'JO','JP','KE','KG','KH','KI','KM','KN','KP','KR','KW','KY','KZ','LA','LB','LC',
  'LI','LK','LR','LS','LT','LU','LV','LY','MA','MC','MD','ME','MF','MG','MH','MK',
  'ML','MM','MN','MO','MP','MQ','MR','MS','MT','MU','MV','MW','MX','MY','MZ','NA',
  'NC','NE','NF','NG','NI','NL','NO','NP','NR','NU','NZ','OM','PA','PE','PF','PG',
  'PH','PK','PL','PM','PN','PR','PS','PT','PW','PY','QA','RE','RO','RS','RU','RW',
  'SA','SB','SC','SD','SE','SG','SH','SI','SJ','SK','SL','SM','SN','SO','SR','SS',
  'ST','SV','SX','SY','SZ','TC','TD','TF','TG','TH','TJ','TK','TL','TM','TN','TO',
  'TR','TT','TV','TW','TZ','UA','UG','UM','US','UY','UZ','VA','VC','VE','VG','VI',
  'VN','VU','WF','WS','YE','YT','ZA','ZM','ZW',
]

export const alpha3: Record<string, string> = {
  AD:'AND', AE:'ARE', AF:'AFG', AG:'ATG', AI:'AIA', AL:'ALB', AM:'ARM',
  AO:'AGO', AQ:'ATA', AR:'ARG', AS:'ASM', AT:'AUT', AU:'AUS', AW:'ABW',
  AX:'ALA', AZ:'AZE', BA:'BIH', BB:'BRB', BD:'BGD', BE:'BEL', BF:'BFA',
  BG:'BGR', BH:'BHR', BI:'BDI', BJ:'BEN', BL:'BLM', BM:'BMU', BN:'BRN',
  BO:'BOL', BQ:'BES', BR:'BRA', BS:'BHS', BT:'BTN', BV:'BVT', BW:'BWA',
  BY:'BLR', BZ:'BLZ', CA:'CAN', CC:'CCK', CD:'COD', CF:'CAF', CG:'COG',
  CH:'CHE', CI:'CIV', CK:'COK', CL:'CHL', CM:'CMR', CN:'CHN', CO:'COL',
  CR:'CRI', CU:'CUB', CV:'CPV', CW:'CUW', CX:'CXR', CY:'CYP', CZ:'CZE',
  DE:'DEU', DJ:'DJI', DK:'DNK', DM:'DMA', DO:'DOM', DZ:'DZA', EC:'ECU',
  EE:'EST', EG:'EGY', EH:'ESH', ER:'ERI', ES:'ESP', ET:'ETH', FI:'FIN',
  FJ:'FJI', FK:'FLK', FM:'FSM', FO:'FRO', FR:'FRA', GA:'GAB', GB:'GBR',
  GD:'GRD', GE:'GEO', GF:'GUF', GG:'GGY', GH:'GHA', GI:'GIB', GL:'GRL',
  GM:'GMB', GN:'GIN', GP:'GLP', GQ:'GNQ', GR:'GRC', GS:'SGS', GT:'GTM',
  GU:'GUM', GW:'GNB', GY:'GUY', HK:'HKG', HM:'HMD', HN:'HND', HR:'HRV',
  HT:'HTI', HU:'HUN', ID:'IDN', IE:'IRL', IL:'ISR', IM:'IMN', IN:'IND',
  IO:'IOT', IQ:'IRQ', IR:'IRN', IS:'ISL', IT:'ITA', JE:'JEY', JM:'JAM',
  JO:'JOR', JP:'JPN', KE:'KEN', KG:'KGZ', KH:'KHM', KI:'KIR', KM:'COM',
  KN:'KNA', KP:'PRK', KR:'KOR', KW:'KWT', KY:'CYM', KZ:'KAZ', LA:'LAO',
  LB:'LBN', LC:'LCA', LI:'LIE', LK:'LKA', LR:'LBR', LS:'LSO', LT:'LTU',
  LU:'LUX', LV:'LVA', LY:'LBY', MA:'MAR', MC:'MCO', MD:'MDA', ME:'MNE',
  MF:'MAF', MG:'MDG', MH:'MHL', MK:'MKD', ML:'MLI', MM:'MMR', MN:'MNG',
  MO:'MAC', MP:'MNP', MQ:'MTQ', MR:'MRT', MS:'MSR', MT:'MLT', MU:'MUS',
  MV:'MDV', MW:'MWI', MX:'MEX', MY:'MYS', MZ:'MOZ', NA:'NAM', NC:'NCL',
  NE:'NER', NF:'NFK', NG:'NGA', NI:'NIC', NL:'NLD', NO:'NOR', NP:'NPL',
  NR:'NRU', NU:'NIU', NZ:'NZL', OM:'OMN', PA:'PAN', PE:'PER', PF:'PYF',
  PG:'PNG', PH:'PHL', PK:'PAK', PL:'POL', PM:'SPM', PN:'PCN', PR:'PRI',
  PS:'PSE', PT:'PRT', PW:'PLW', PY:'PRY', QA:'QAT', RE:'REU', RO:'ROU',
  RS:'SRB', RU:'RUS', RW:'RWA', SA:'SAU', SB:'SLB', SC:'SYC', SD:'SDN',
  SE:'SWE', SG:'SGP', SH:'SHN', SI:'SVN', SJ:'SJM', SK:'SVK', SL:'SLE',
  SM:'SMR', SN:'SEN', SO:'SOM', SR:'SUR', SS:'SSD', ST:'STP', SV:'SLV',
  SX:'SXM', SY:'SYR', SZ:'SWZ', TC:'TCA', TD:'TCD', TF:'ATF', TG:'TGO',
  TH:'THA', TJ:'TJK', TK:'TKL', TL:'TLS', TM:'TKM', TN:'TUN', TO:'TON',
  TR:'TUR', TT:'TTO', TV:'TUV', TW:'TWN', TZ:'TZA', UA:'UKR', UG:'UGA',
  UM:'UMI', US:'USA', UY:'URY', UZ:'UZB', VA:'VAT', VC:'VCT', VE:'VEN',
  VG:'VGB', VI:'VIR', VN:'VNM', VU:'VUT', WF:'WLF', WS:'WSM',
  YE:'YEM', YT:'MYT', ZA:'ZAF', ZM:'ZMB', ZW:'ZWE',
}

function flagFromCode(code: string) {
  return String.fromCodePoint(
    ...code.split('').map((letter) => 127397 + letter.charCodeAt(0))
  )
}

function PageHeader({ title }: { title: string }) {
  const navigate = useNavigate()

  return (
    <header className="cx-profile-page-header">
      <button
        type="button"
        className="cx-profile-back"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <ArrowLeft size={21} />
      </button>
      <h1>{title}</h1>
      <span className="cx-profile-header-spacer" />
    </header>
  )
}

export function FlairSelectionPage() {
  const navigate = useNavigate()
  const [selected] = useState(
    localStorage.getItem('cx-profile-flair') || ''
  )

  const chooseFlair = (value: string) => {
    localStorage.setItem('cx-profile-flair', value)
    navigate('/profile/edit')
  }

  return (
    <div className="cx-profile-subpage">
      <PageHeader title="Choose Flair" />

      <main className="cx-profile-selection-content">
        <p className="cx-profile-selection-description">
          Choose an icon that represents your chess identity.
        </p>

        <button
          type="button"
          className={`cx-profile-flair-option ${selected === '' ? 'selected' : ''}`}
          onClick={() => chooseFlair('')}
        >
          <span className="cx-profile-flair-option-icon">—</span>
          <span>
            <strong>No Flair</strong>
            <small>Remove your current flair</small>
          </span>
          {selected === '' && <Check size={18} />}
        </button>

        <div className="cx-profile-flair-grid">
          {flairOptions.map(({ id, label, icon: Icon }) => (
            <button
              type="button"
              key={id}
              className={`cx-profile-flair-option ${selected === id ? 'selected' : ''}`}
              onClick={() => chooseFlair(id)}
            >
              <span className="cx-profile-flair-option-icon">
                <Icon size={23} />
              </span>
              <span>
                <strong>{label}</strong>
                <small>Sample flair</small>
              </span>
              {selected === id && <Check size={18} />}
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}

export function CountrySelectionPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selected] = useState(
    localStorage.getItem('cx-profile-country') || 'PH'
  )

  const displayNames = useMemo(
    () => new Intl.DisplayNames(['en'], { type: 'region' }),
    []
  )

  const countries = useMemo(() => {
    return countryCodes
      .map((code) => ({
        code,
        name: displayNames.of(code) || code,
        alpha3: alpha3[code],
        flag: flagFromCode(code),
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [displayNames])

  const filteredCountries = countries.filter((country) =>
    `${country.name} ${country.code} ${country.alpha3}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  )

  const chooseCountry = (code: string) => {
    localStorage.setItem('cx-profile-country', code)
    navigate('/profile/edit')
  }

  return (
    <div className="cx-profile-subpage">
      <PageHeader title="Choose Country" />

      <main className="cx-profile-selection-content">
        <div className="cx-profile-country-search">
          <Search size={18} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search countries..."
            aria-label="Search countries"
          />
        </div>

        <p className="cx-profile-selection-description">
          Select your country or region.
        </p>

        <div className="cx-profile-country-list">
          {filteredCountries.map((country) => (
            <button
              type="button"
              key={country.code}
              className={`cx-profile-country-option ${selected === country.code ? 'selected' : ''}`}
              onClick={() => chooseCountry(country.code)}
            >
              <strong>{country.name}</strong>
              <span>{country.alpha3}</span>
              <span className="cx-profile-country-flag">
                {country.flag}
              </span>
              {selected === country.code && <Check size={17} />}
            </button>
          ))}

          {filteredCountries.length === 0 && (
            <p className="cx-profile-country-empty">
              No matching country found.
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
