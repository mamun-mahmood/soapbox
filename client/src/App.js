import React from 'react'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import PublicProfile from './pages/PublicProfile'
import PageNotFound from './pages/PageNotFound'
import CreatePost from './pages/CreatePost'
import ProtectedRoute from './components/ProtectedRoute'
import IndividualHoot from './pages/IndividualHoot/IndividualHoot'
import "./App.css"
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import HootPage from './pages/HootPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ProtectedRoute page={Home} />
        </Route>
        <Route path="/home">
          <ProtectedRoute page={Home} />
          {/* <Home /> */}
        </Route>
        <Route path="/create">
          <ProtectedRoute page={CreatePost} />
          {/* <CreatePost /> */}
        </Route>
        <Route path="/user/:username">
          <ProtectedRoute page={PublicProfile} />
          {/* <PublicProfile /> */}
        </Route>
        <Route path="/hoot/:id">
          <ProtectedRoute page={IndividualHoot} />
          {/* <IndividualHoot /> */}
        </Route>
        <Route path="/profile/:username">
          <ProtectedRoute page={Profile} />
          {/* <Profile /> */}
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
