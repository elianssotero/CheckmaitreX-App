
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import WatchPage from './pages/WatchPage'
import LearnPage from './pages/LearnPage'
import PuzzlesPage from './pages/PuzzlesPage'
import PuzzleDestinationPage from './pages/PuzzleDestinationPage'
import PlayPuzzlesPage from './pages/PlayPuzzlesPage'
import PuzzleLevelPage from './pages/PuzzleLevelPage'
import AppLayout from './layouts/AppLayout'
import HomePage from './pages/HomePage'
import NotificationsPage from './pages/NotificationsPage'
import StreakPage from './pages/StreakPage'

import ProfilePage, {
  ProfileRatingsPage,
  ProfileGamesPage,
  ProfileFriendsPage,
  ProfileAchievementsPage,
} from './pages/ProfilePage'

import EditProfilePage from './pages/EditProfilePage'
import TitleApplicationPage from './pages/TitleApplicationPage'
import {
  FlairSelectionPage,
  CountrySelectionPage,
} from './pages/ProfileSelectionPages'

import ProfileAvatarSelectionPage from './pages/ProfileAvatarSelectionPage'
import ProfileCoverSelectionPage from './pages/ProfileCoverSelectionPage'

import MorePage from './pages/MorePage'
import CorporatePage from './pages/CorporatePage'
import MaitronXPage from './pages/MaitronXPage'
import PlayPage from './pages/PlayPage'
import PlayDestinationPage from './pages/PlayDestinationPage'
import PlayComputerPage from './pages/PlayComputerPage'
import PlayFriendPage from './pages/PlayFriendPage'
import SendChallengeLinkPage from './pages/SendChallengeLinkPage'
import PlayCoachPage from './pages/PlayCoachPage'
import PlayTournamentsPage from './pages/PlayTournamentsPage'
import SearchPage from './pages/SearchPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route
            path="notifications"
            element={<NotificationsPage />}
          />

          <Route
            path="profile/select-flair"
            element={<FlairSelectionPage />}
          />

          <Route
            path="profile/select-country"
            element={<CountrySelectionPage />}
          />

          <Route
            path="profile/select-avatar"
            element={<ProfileAvatarSelectionPage />}
          />

          <Route
            path="profile/select-cover"
            element={<ProfileCoverSelectionPage />}
          />

          <Route
            path="profile/edit"
            element={<EditProfilePage />}
          />

         <Route
             path="profile/title-application"
            element={<TitleApplicationPage />}
           />
          
          <Route
            path="profile/ratings"
            element={<ProfileRatingsPage />}
          />

          <Route
            path="profile/games"
            element={<ProfileGamesPage />}
          />

          <Route
            path="profile/friends"
            element={<ProfileFriendsPage />}
          />

          <Route
            path="profile/achievements"
            element={<ProfileAchievementsPage />}
          />

          <Route
            path="streak"
            element={<StreakPage />}
          />

          <Route index element={<HomePage />} />

          <Route
            path="profile"
            element={<ProfilePage />}
          />

          <Route
            path="corporate"
            element={<CorporatePage />}
          />

          <Route
            path="more"
            element={<MorePage />}
          />

          <Route
            path="maitronx"
            element={<MaitronXPage />}
          />

          {/* PLAY SECTION */}
          <Route
            path="play"
            element={<PlayPage />}
          />

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
            path="search"
            element={<SearchPage />}
          />

          <Route
            path="invite/:inviteCode"
            element={<PlayDestinationPage title="Friend Invite" />}
          />

          <Route
              path="play/friend/challenge"
             element={<SendChallengeLinkPage />}
          />

          <Route
            path="play/friend/pass-and-play"
            element={<PlayDestinationPage title="Pass & Play" />}
          />

          <Route
            path="play/coach"
            element={<PlayCoachPage />}
          />

          <Route
            path="play/tournaments"
            element={<PlayTournamentsPage />}
          />

          {/* PUZZLE JOURNEY */}
          <Route
            path="puzzles"
            element={<PuzzlesPage />}
          />

          <Route
            path="puzzles/play"
            element={<PlayPuzzlesPage />}
          />

          <Route
            path="puzzles/area/:areaId/level/:level"
            element={<PuzzleLevelPage />}
          />

          <Route
            path="puzzles/:section"
            element={<PuzzleDestinationPage />}
          />

          <Route
            path="learn"
            element={<LearnPage />}
          />

          <Route
            path="watch"
            element={<WatchPage />}
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
