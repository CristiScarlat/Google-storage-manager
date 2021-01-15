import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useGoogleLogout } from "react-google-login";
import { Button } from 'react-bootstrap'; 

function Logout() {
  const [redirect, setRedirect] = useState(false);

  const onLogoutSuccess = (res) => {
    localStorage.clear();
    setRedirect(true);
  };

  const onFailure = () => {
    console.log("Handle failure cases");
  };

  const { signOut, loaded } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <>
      {redirect && <Redirect to="/login" />}
      <Button variant="outline-light" onClick={signOut}> Sign out </Button>
    </>
  );
}

export default Logout;
