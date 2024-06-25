import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { AuthConsumer } from '../Context/AuthContext';
import axios from 'axios';

function SignUp({ toogleAuthMode }) {
    const [userName, setUserName] = useState("");
    const [userId, setSignUpUserId] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [idAvaliability, setIdAvaliability] = useState(true);
    const navigate = useNavigate();
    const [userList, setUserList] = useState({});
    const {setUserId,setIsLogIn} = AuthConsumer();
    

    useEffect(() => {
        axios.get("http://localhost:3000/users")
            .then(response => setUserList(response.data))
            console.log(userList);
    }, [])



    useEffect(() => {
        if (Object.keys(userList).includes(userId)) {
            setIdAvaliability(false);
            setErrorMessage("userId already exist");
        }
        else
        {
            setIdAvaliability(true);
            setErrorMessage("");
        }
    }, [userId])


    const handleSignUp = (e) => {
        e.preventDefault();
        const userDetails = {
            "password":password,
            "fullName":userName,
            "email":email
        }
        const newUserList = {...userList,[userId]:userDetails};
        axios
        .put("http://localhost:3000/users",newUserList);
        setUserId(userId);
        setIsLogIn(true);
        navigate("/profile");
    }


    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="e.g Jane Doe"
                            value={userName}
                            onChange={(e) => { setUserName(e.target.value) }}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>User ID</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="e.g Jane2002"
                            value={userId}
                            onChange={(e) => { setSignUpUserId(e.target.value) }}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>
                    <div className="text-center text-danger  mt-3">
                        <p>
                            {errorMessage}
                        </p>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" disabled={userName === "" || userId === "" || password === "" || email === "" || !idAvaliability} onClick={(e) => { handleSignUp(e) }} className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <div className="text-center mt-3">
                        Already registered?{" "}
                        <span className="link-primary" onClick={toogleAuthMode}>
                            Sign In
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUp;