import React, { lazy, Suspense } from 'react'
import Home from './pages/Home/Home'
import HootPage from './pages/HootPage'
import CreateHoot from './pages/CreateHoot'
import ProfilePage from './pages/ProfilePage'
import PageNotFound from './pages/PageNotFound'
import EditProfilePage from './pages/EditProfilePage'
import ProtectedRoute from './components/ProtectedRoute'
import PublicProfilePage from './pages/PublicProfilePage'
import LandingPage from './pages/LandingPage/LandingPage'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import "./App.css"
import Loading from './components/Loading'

// const Home = lazy(() => import('./pages/Home/Home'));
// const HootPage = lazy(() => import('./pages/HootPage'));
// const CreateHoot = lazy(() => import('./pages/CreateHoot'));
// const ProfilePage = lazy(() => import('./pages/ProfilePage'));
// const PageNotFound = lazy(() => import('./pages/PageNotFound'));
// const EditProfilePage = lazy(() => import('./pages/EditProfilePage'));
// const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
// const PublicProfilePage = lazy(() => import('./pages/PublicProfilePage'));
// const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'));

function App() {
  return (
    <Router>
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
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
