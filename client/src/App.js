import React, { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast';
import PageNotFound from './pages/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage/LandingPage'
import {
  BrowserRouter as Router,
  Route,
  Switch
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
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
function App() {
  return (
    <Router>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
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
        <Route exact path="/">
          {/* <ProtectedRoute page={Home} /> */}
          <Home />
        </Route>
        <Route path="/:FakeData/SoapboxHall/:hallId?/:userName?/:randomFakeKey?">
          <ProtectedRoute page={SoapboxHall} />
        </Route>
        <Route path="/embed/hoot/:hootId">
          {/* <ProtectedRoute page={EmbedHootPage} /> */}
          <EmbedHootPage />
        </Route>

        <Route path="/create">
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

        <Route path="/:fakeKey/private/channels/:username/:randomKey">
          {/* <ProtectedRoute page={PrivateChannelsPage} /> */}
          <PrivateChannelsPage />
        </Route>

        <Route path="/TOS">
          {/* <ProtectedRoute page={TermsOfServicePage} /> */}
          <TermsOfServicePage />
        </Route>

        <Route path="/forgot_password">
          {/* <ProtectedRoute page={TermsOfServicePage} /> */}
          <ForgotPassword />
        </Route>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;