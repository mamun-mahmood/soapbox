import React, { lazy, Suspense } from 'react'
import Loadable from 'react-loadable';
import toast, { Toaster } from 'react-hot-toast';
import PageNotFound from './pages/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage/LandingPage'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import "./App.css"
import Loading from './components/Loading/Loading'

import Home from './pages/Home/Home'
import HootPage from './pages/HootPage'
import CreateHoot from './pages/CreateHoot'
import ProfilePage from './pages/ProfilePage'
import EditProfilePage from './pages/EditProfilePage'
import PublicProfilePage from './pages/PublicProfilePage'
import HashtagsPage from './pages/HashtagsPage';
import HashtagHootsPage from './pages/HashtagHootsPage';

// const Home = Loadable({
//   loader: () => import('./pages/Home/Home' /* webpackChunkName: "Home" */),
//   loading() {
//     return <Loading />
//   }
// })
// const HootPage = Loadable({
//   loader: () => import('./pages/HootPage' /* webpackChunkName: "Hoot_Page" */),
//   loading() {
//     return <Loading />
//   }
// })
// const CreateHoot = Loadable({
//   loader: () => import('./pages/CreateHoot' /* webpackChunkName: "Create_Page" */),
//   loading() {
//     return <Loading />
//   }
// })
// const ProfilePage = Loadable({
//   loader: () => import('./pages/ProfilePage' /* webpackChunkName: "Profile_Page" */),
//   loading() {
//     return <Loading />
//   }
// })
// const EditProfilePage = Loadable({
//   loader: () => import('./pages/EditProfilePage' /* webpackChunkName: "Edit_Profile_Page" */),
//   loading() {
//     return <Loading />
//   }
// })
// const PublicProfilePage = Loadable({
//   loader: () => import('./pages/PublicProfilePage' /* webpackChunkName: "Public_Profile_page" */),
//   loading() {
//     return <Loading />
//   }
// })

// const Home = lazy(() => import('./pages/Home/Home' /* webpackChunkName: "Home" */));
// const HootPage = lazy(() => import('./pages/HootPage' /* webpackChunkName: "Hoot_Page" */));
// const CreateHoot = lazy(() => import('./pages/CreateHoot' /* webpackChunkName: "Create_Page" */));
// const ProfilePage = lazy(() => import('./pages/ProfilePage' /* webpackChunkName: "Profile_Page" */));
// const EditProfilePage = lazy(() => import('./pages/EditProfilePage' /* webpackChunkName: "Edit_Profile_Page" */));
// const PublicProfilePage = lazy(() => import('./pages/PublicProfilePage' /* webpackChunkName: "Public_Profile_page" */));

function App() {
  return (
    <Router>
      {/* <Suspense fallback={Loading}> */}
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <Switch>
        <Route exact path="/">
          <ProtectedRoute page={LandingPage} />
        </Route>
        <Route path="/home">
          <ProtectedRoute page={Home} />
        </Route>
        <Route path="/create">
          <ProtectedRoute page={CreateHoot} />
        </Route>
        <Route path="/user/:username">
          <ProtectedRoute page={PublicProfilePage} />
        </Route>
        <Route path="/:username/hoot/:id">
          <ProtectedRoute page={HootPage} />
        </Route>
        <Route path="/edit/profile/:username">
          <ProtectedRoute page={EditProfilePage} />
        </Route>
        <Route path="/profile/:username">
          <ProtectedRoute page={ProfilePage} />
        </Route>
        <Route path="/hashtags/:hashtag">
          <ProtectedRoute page={HashtagHootsPage} />
        </Route>
        <Route path="/hashtags">
          <ProtectedRoute page={HashtagsPage} />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      {/* </Suspense> */}
    </Router>
  );
}

export default App;