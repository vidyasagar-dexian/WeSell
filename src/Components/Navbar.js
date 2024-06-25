import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthConsumer } from '../Context/AuthContext';
import { useSelector } from 'react-redux';
import userImage from "../Assets/nouser.png";
import { getProfilePic } from '../DataBase/profileDB';
import { useEffect } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const cartProducts = useSelector(state => state.cartSlice)
    const { userId, setIsLogIn } = AuthConsumer();
    const [profilePicUrl, setProfilePicUrl] = useState(null);

    useEffect(() => {
        getProfilePic(userId)
            .then(url => {
                setProfilePicUrl(url || userImage);
            })
            .catch(error => {
                console.error('Error fetching profile picture:', error);
            });
    }, [userId]);


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand text-secondary">WeSell Website</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>
                    <form className="d-flex">
                        <button className="btn btn-outline-secondary me-2" onClick={() => navigate("/dashboard/cart")} type='button'>Cart {cartProducts.length}</button>
                        <button className="btn btn-outline-primary me-2" onClick={() => navigate("/profile")} type="button">
                            <img src={profilePicUrl} alt="User Avatar" className="rounded-circle me-1" style={{ width: '30px', height: '30px' }} />
                            {userId}</button>
                        <button className="btn btn-outline-danger" onClick={() => setIsLogIn(false)} type="button">SignOut</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
