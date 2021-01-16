import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useGoogleLogin } from "react-google-login";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { googleIcon } from "../../components/svgIcons/googleIcon";

import { login } from "../../redux/actions";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

import "./auth.css";

function Login() {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  const onSuccess = (res) => {
    dispatch({
      type: "LOGIN",
      payload: {
        user: res.profileObj.name,
        token: res.tokenObj.access_token,
        token_expires_at: new Date(res.tokenObj.expires_at),
      },
    });
    setRedirect(true);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    isSignedIn: true,
    accessType: "offline",
    scope: "https://www.googleapis.com/auth/devstorage.full_control",
  });

  return (
    <div className="login-container">
      <div className="login-title mb-4">
        Login to manage your storage buckets.
      </div>
      <FontAwesomeIcon icon={faArrowAltCircleDown} size="8x" color="#485461" />
      <Button variant="light" onClick={signIn} className="button mt-4">
        {googleIcon}
        <span className="pl-2">Sign in with Google</span>
      </Button>
      {redirect && <Redirect to="/" />}
    </div>
  );
}

export default connect(null, { login })(Login);
