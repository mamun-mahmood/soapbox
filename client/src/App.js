import React from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home/Home'
import HootPage from './pages/HootPage'
import ProfilePage from './pages/ProfilePage'
import CreateHoot from './pages/CreateHoot'
import PageNotFound from './pages/PageNotFound'
import PublicProfilePage from './pages/PublicProfilePage'
import EditProfilePage from './pages/EditProfilePage'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage/LandingPage'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import "./App.css"

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
        {/* <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route> */}
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
