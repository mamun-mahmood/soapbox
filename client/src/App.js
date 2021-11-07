import React from 'react'
import PageNotFound from './pages/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage/LandingPage'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import "./App.css"

import Home from './pages/Home/Home'
import HootPage from './pages/HootPage'
import CreateHoot from './pages/CreateHoot'
import ProfilePage from './pages/ProfilePage'
import EditProfilePage from './pages/EditProfilePage'
import PublicProfilePage from './pages/PublicProfilePage'
import HashtagHootsPage from './pages/HashtagHootsPage';
import StockHootsPage from './pages/StockHootsPage';
import ExplorePage from './pages/ExplorePage';
import PrivacyPage from './pages/PrivacyPage';
import PrivateMessagesPage from './pages/PrivateMessagesPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import EmbedHootPage from './pages/EmbedHootPage';
import PrivateChannelsPage from './pages/PrivateChannelsPage';
import SoapboxHall from './components/VideoAudioCall/SoapboxHall'
import Admin from './components/AdminPanel/Admin';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import MyListPage from './pages/MyListPage';
import recordMessage from './components/VideoAudioCall/recordMessage';
import Reception from './components/VideoAudioCall/reception';
import CreatePrivateHoot from './pages/CreatePrivateHoot'

import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommentsPanel from './pages/CommentsPanel/CommentsPanel';
import AudioHall from './components/VideoAudioCall/AudioHall';
import ReceptionAudio from './components/VideoAudioCall/audioReception';

function App() {
  return (
    <Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        transition={Zoom}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={false}
        className="react-toastify"
        bodyClassName="toast-body"
      />

      <Switch>
        {/* <Route exact path="/"> */}
        <Route path="/login">
          <ProtectedRoute page={LandingPage} />
        </Route>

        {/* <Route path="/home"> */}
        <Route exact path="/">
          {/* <ProtectedRoute page={Home} /> */}
          <Home />
        </Route>

        <Route path="/:FakeData/SoapboxHall/:randomFakeKey?">
          <ProtectedRoute page={SoapboxHall} />
        </Route>
        <Route path="/:FakeData/AudioHall/:randomFakeKey?">
          <ProtectedRoute page={AudioHall} />
        </Route>
        

        <Route path="/:FakeData/RecordMessage/:hallId?/:userName?/:randomFakeKey?">
          <ProtectedRoute page={recordMessage} />
        </Route>

        <Route path="/:FakeData/Reception/:hallId?/:randomFakeKey?">
          <ProtectedRoute page={Reception} />
        </Route>
        <Route path="/:FakeData/ReceptionAudio/:hallId?/:randomFakeKey?">
          <ProtectedRoute page={ReceptionAudio} />
        </Route>
        
        <Route path="/bedb02b7-1893-423a-a545-aea621d3d04b/Admin/bedb02b7-a545-aea621d3d04b-1893-423a">
          <ProtectedRoute page={Admin} />
        </Route>

        <Route path="/d5144033-9806-4e4f-b160-d272935e9c43/CommentsPanel/158ca050-f0b9-4955-a93e-f18d1a6c591d">
          <ProtectedRoute page={CommentsPanel} />
        </Route>

        <Route path="/embed/hoot/:hootId">
          {/* <ProtectedRoute page={EmbedHootPage} /> */}
          <EmbedHootPage />
        </Route>

        <Route path="/create-private">
          <ProtectedRoute page={CreatePrivateHoot} />
        </Route>

        <Route exact path="/create">
          <ProtectedRoute page={CreateHoot} />
        </Route>

        <Route path="/user/:username">
          {/* <ProtectedRoute page={PublicProfilePage} /> */}
          <PublicProfilePage />
        </Route>

        <Route path="/:username/hoot/:id">
          {/* <ProtectedRoute page={HootPage} /> */}
          <HootPage />
        </Route>

        <Route path="/edit/profile/:username">
          <ProtectedRoute page={EditProfilePage} />
        </Route>

        <Route path="/profile/:username">
          <ProtectedRoute page={ProfilePage} />
        </Route>

        <Route path="/hashtags/:hashtag">
          {/* <ProtectedRoute page={HashtagHootsPage} /> */}
          <HashtagHootsPage />
        </Route>

        <Route path="/stocks/:stock">
          {/* <ProtectedRoute page={StockHootsPage} /> */}
          <StockHootsPage />
        </Route>

        <Route path="/explore">
          {/* <ProtectedRoute page={ExplorePage} /> */}
          <ExplorePage />
        </Route>

        <Route path="/privacy-policy">
          {/* <ProtectedRoute page={PrivacyPage} /> */}
          <PrivacyPage />
        </Route>

        <Route path="/private-messages">
          {/* <ProtectedRoute page={PrivateMessagesPage} /> */}
          <PrivateMessagesPage />
        </Route>

        <Route path="/:fakeKey/private/Club/:username/:randomKey">
          <ProtectedRoute page={PrivateChannelsPage} />
          {/* <PrivateChannelsPage /> */}
        </Route>

        <Route path="/TOS">
          {/* <ProtectedRoute page={TermsOfServicePage} /> */}
          <TermsOfServicePage />
        </Route>

        <Route path="/forgot_password">
          {/* <ProtectedRoute page={ForgotPassword} /> */}
          <ForgotPassword />
        </Route>

        <Route path="/reset_password/:token">
          {/* <ProtectedRoute page={ResetPassword} /> */}
          <ResetPassword />
        </Route>

        <Route path="/:username/mylist">
          <MyListPage />
        </Route>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;