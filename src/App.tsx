
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import AppLayout from './layouts/AppLayout'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import MorePage from './pages/MorePage'
import CorporatePage from './pages/CorporatePage'
import MaitronXPage from './pages/MaitronXPage'
import PlayPage from './pages/PlayPage'
import PlayDestinationPage from './pages/PlayDestinationPage'
import PlayComputerPage from './pages/PlayComputerPage'
import PlayFriendPage from './pages/PlayFriendPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="corporate" element={<CorporatePage />} />
          <Route path="more" element={<MorePage />} />
          <Route path="maitronx" element={<MaitronXPage />} />

          {/* PLAY SECTION */}
          <Route path="play" element={<PlayPage />} />

          <Route
            path="play/now"
            element={<PlayDestinationPage title="Play Now" />}
          />

          <Route
            path="play/computer"
            element={<PlayComputerPage />}
          />

          <Route
            path="play/friend"
            element={<PlayFriendPage />}
          />

          <Route
            path="play/coach"
            element={<PlayDestinationPage title="Play with Coach" />}
          />

          <Route
            path="play/tournaments"
            element={<PlayDestinationPage title="Tournaments" />}
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
