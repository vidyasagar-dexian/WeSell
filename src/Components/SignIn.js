import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthConsumer } from '../Context/AuthContext';

function SignIn({ toogleAuthMode }) {
    const [userLogInId, setUserLogInId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [userList, setUserList] = useState();
    const {setUserId,setIsLogIn} = AuthConsumer();

    useEffect(() => {
        axios.get("http://localhost:3000/users")
            .then(response => setUserList(response.data))
    }, [])

    const handleSignIn = (e) => {
        e.preventDefault();
        const userExist = Object.keys(userList).includes(userLogInId);
        if (userExist) {
            if (userList[userLogInId]["password"] !== password) {
                setErrorMessage("wrong password");
            }
            else {
                setUserId(userLogInId);
                setIsLogIn(true);
                navigate("/dashboard");
            }
        }
        else {
            setErrorMessage("user doesn't exist");
        }
        setUserLogInId("");
        setPassword("");
    }
    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>User ID</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            value={userLogInId}
                            onChange={(e) => { setUserLogInId(e.target.value) || setErrorMessage("") }}
                            placeholder="Enter UserId"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) || setErrorMessage("") }}
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="text-center text-danger  mt-3">
                        <p>
                            {errorMessage}
                        </p>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button disabled={userLogInId === "" | password === ""} type="submit" className="btn btn-primary" onClick={(e) => { handleSignIn(e) }}>
                            Submit
                        </button>
                    </div>
                    <div className="text-center mt-3">
                        Not registered yet?{" "}
                        <span className="link-primary" onClick={toogleAuthMode}>
                            Sign Up
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignIn;