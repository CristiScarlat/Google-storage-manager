import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useGoogleLogin } from "react-google-login";

function Login() {
  const [redirect, setRedirect] = useState(false);

  const onSuccess = (res) => {
    localStorage.setItem("access_token", res.tokenObj.access_token);
    localStorage.setItem("token_expires_at", new Date(res.tokenObj.expires_at));
    setRedirect(true)
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    //isSignedIn: true,
    accessType: "offline",
    scope: process.env.REACT_APP_OAUTH_SCOPE,
    //responseType: 'code',
    //prompt: 'consent',
    //uxMode: 'redirect',
    //redirectUri: 'login'
  });

  return (
    <>
      <button onClick={signIn} className="button">
        Sign in with Google
      </button>
      {redirect && <Redirect to="/" />}
    </>
  );
}

export default Login;
