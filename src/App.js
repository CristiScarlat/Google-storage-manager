import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './pages/auth/login';
import Header from './components/header/header';
import Home from './pages/home/home';

function App() {
  const token = localStorage.getItem('access_token')
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;