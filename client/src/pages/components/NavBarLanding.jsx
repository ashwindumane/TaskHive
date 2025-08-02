import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png"

const NavbarLanding = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-red-500 px-4 py-3">
      <div className="flex justify-between items-center">
        
        <Link to="/" className="flex items-center  ">
        <img src={logo} className="w-12 h-12 object-contain"/>
          <span className="text-white text-2xl font-bold">TaskHive</span>
        </Link>

        {/* Hamburger Button for Small Screens */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-4 items-center">
          <a href="#features" className="text-white hover:underline">
            Features
          </a>
          <a href="#reviews" className="text-white hover:underline">
            Reviews
          </a>
          <a href="#faqs" className="text-white hover:underline">
            FAQs
          </a>
          <Link
            to="/login"
            className="bg-white text-red-500 px-4 py-2 rounded hover:bg-gray-100"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="sm:hidden mt-3 space-y-2 flex flex-col items-start"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <a href="#features" className="text-white hover:underline">
              Features
            </a>
            <a href="#reviews" className="text-white hover:underline">
              Reviews
            </a>
            <a href="#faqs" className="text-white hover:underline">
              FAQs
            </a>
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-white text-red-500 px-4 py-2 rounded hover:bg-gray-100"
            >
              Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavbarLanding;
