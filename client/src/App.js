import React, { Suspense } from "react";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage/LandingPage";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";

import Home from "./pages/Home/Home";
import HootPage from "./pages/HootPage";
import CreateHoot from "./pages/CreateHoot";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import PublicProfilePage from "./pages/PublicProfilePage";
import HashtagHootsPage from "./pages/HashtagHootsPage";
import StockHootsPage from "./pages/StockHootsPage";
// import ExplorePage from "./pages/ExplorePage";
import PrivacyPage from "./pages/PrivacyPage";
import PrivateMessagesPage from "./pages/PrivateMessagesPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import EmbedHootPage from "./pages/EmbedHootPage";
import PrivateChannelsPage from "./pages/PrivateChannelsPage";
import SoapboxHall from "./components/VideoAudioCall/SoapboxHall";
import Admin from "./components/AdminPanel/Admin";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import MyListPage from "./pages/MyListPage";
import recordMessage from "./components/VideoAudioCall/recordMessage";
import Reception from "./components/VideoAudioCall/reception";
import CreatePrivateHoot from "./pages/CreatePrivateHoot";

import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommentsPanel from "./pages/CommentsPanel/CommentsPanel";
import AudioHall from "./components/VideoAudioCall/AudioHall";
import ReceptionAudio from "./components/VideoAudioCall/audioReception";
import StripePage from "./components/Stripe/StripePage";
import RequestPrivateClubPage from "./pages/RequestPrivateClubPage";

import CreateHootBoxMobile from "./pages/CreateHootBoxMobile";
// import SoapboxClubs from "./pages/SoapboxClubs";
import InboxMessagePublic from "./components/PrivateChannels/inboxMessagePublic";
import Loading from "./components/Loading/Loading";

const SoapboxClubs = React.lazy(() => import("./pages/SoapboxClubs"));
const ExplorePage = React.lazy(() => import("./pages/ExplorePage"));

function App() {
  const userInformation = JSON.parse(localStorage.getItem("loggedIn"));
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
      

        <Route path="/bedb02b7-1893-423a-a545-aea621d3d04b/Admin/bedb02b7-a545-aea621d3d04b-1893-423a">
          <ProtectedRoute page={Admin} />
        </Route>

        
      </Switch>
    </Router>
  );
}

export default App;
