
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
