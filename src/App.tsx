
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import ProfilePage from './pages/ProfilePage'
import AppLayout from './layouts/AppLayout'
import HomePage from './pages/HomePage'
import MorePage from './pages/MorePage'
import CorporatePage from './pages/CorporatePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="corporate" element={<CorporatePage />} />
          <Route path="more" element={<MorePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
         </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
