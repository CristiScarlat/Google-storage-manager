import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './pages/auth/login';
import Header from './components/header/header';
import Home from './pages/home/home';
import Bucket from './pages//bucketDetails/bucketDetails';
import { useDispatch } from "react-redux";

function App() {

  const dispatch = useDispatch();
  //persistence of data in store if page is refreshed
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const token_expires_at = localStorage.getItem("token_expires_at");
    const user = localStorage.getItem("user");
    dispatch({
      type: "LOGIN",
      payload: {
        user,
        token,
        token_expires_at
      },
    });
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/bucket-details/:bucket' component={Bucket}/>
        </Switch>
      </div>
    </Router>

  );
}

export default App;