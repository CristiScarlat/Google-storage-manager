import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './pages/auth/login';
import Logout from './pages/auth/logout';
import Home from './pages/home/home';
//import { main } from './services/GoogleStorageApi'

function App() {
  const token = localStorage.getItem('access_token')
  return (
    <Router>
      <div className="App">
        <Logout />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;