import { createContext, useContext, useState } from "react";

const authContext = createContext();

export function AuthConsumer()
{
    return useContext(authContext);
}

export function AuthProvider(props)
{
    const [userId,setUserId] = useState();
    const [isLogIn,setIsLogIn] = useState(false);

    const values = {userId,isLogIn,setUserId,setIsLogIn};

    return <authContext.Provider value={values}>{props.children}</authContext.Provider>
}