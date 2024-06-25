import React, { useState } from 'react';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';


function LogIn() {
    const [AuthMode, setAuthMode] = useState(true);
    const toogleAuthMode = () => { AuthMode ? setAuthMode(false) : setAuthMode(true); }
    return (
        <>
            {AuthMode ? <SignIn toogleAuthMode={toogleAuthMode} /> : <SignUp toogleAuthMode={toogleAuthMode} />}
        </>
    );
}

export default LogIn;
