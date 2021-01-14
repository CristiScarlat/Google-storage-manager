import React from 'react'
import { Redirect } from "react-router-dom";

function Home() {
    const token = localStorage.getItem('access_token');
    return(
    <>    
    {!token && <Redirect to='/login'/>}
    <div>Home</div>
    </>
    )
}

export default Home;