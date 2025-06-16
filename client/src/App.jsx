import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import NavBarLanding from "./pages/components/NavBarLanding"
import NavBarInternal from "./pages/components/NavBarInternal";
import { AnimatePresence } from 'framer-motion';

import { AuthContext, AuthProvider } from './context/AuthContext';
import ProfilePage from './pages/ProfilePage';

function App() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
 const isPublicPath = ["/", "/login", "/register"].includes(location.pathname);
  return (
    <>
    
    {/* <Router> */}
      {(user && location.pathname === "/") || !isPublicPath ? (
        <NavBarInternal />
      ) : (
        <NavBarLanding />
      )}
      <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
      </AnimatePresence>
    {/* </Router> */}
    </>
  );
}

export default App;