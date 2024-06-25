// Dashboard.jsx

import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Products from '../Components/Products';
import Cart from '../Components/Cart';
import NotFound from './NotFound';
import { Provider } from 'react-redux';
import store from '../Redux-store/Store';

function Dashboard() {
    return (
        <Provider store={store}>
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
            <Outlet />
        </div>
        </Provider>
    );
}

export default Dashboard;
