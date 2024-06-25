// App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './Context/AuthContext';
import LogIn from './Pages/LogIn';
import NotFound from './Pages/NotFound';
import ValidateAuth from './Components/ValidateAuth';
import Profile from './Pages/Profile';
import Dashboard from './Pages/Dashboard';
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/profile" element={<ValidateAuth><Profile /></ValidateAuth>} />
          <Route path="/dashboard/*" element={<ValidateAuth><Dashboard /></ValidateAuth>} />
          <Route path="*" element={<NotFound title="404 Not Found" message="The page you are looking for does not exist."/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
