import React from 'react';
import { useGoogleLogout } from 'react-google-login';

function Logout() {
  
  const onLogoutSuccess = (res) => {
    logout()
  };

  const onFailure = () => {
    console.log('Handle failure cases');
  };

  const { signOut, loaded } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onLogoutSuccess,
    onFailure,
  });

  const logout = () => {
    if (window.gapi) {
        const auth2 = window.gapi.auth2.getAuthInstance()
        console.log(auth2)
        if (auth2 != null) {
            auth2.signOut().then(() => {
                console.log('auth2')
                localStorage.clear()
                auth2.disconnect()
                .then(res => {
                    console.log('logout successfully')
                    onLogoutSuccess()
                })
                .catch(error => {
                    console.log(error)
                })
            }
            )
        }
    }
  }

  return loaded ? <button onClick={signOut}> Sign out </button> : null

}

export default Logout;