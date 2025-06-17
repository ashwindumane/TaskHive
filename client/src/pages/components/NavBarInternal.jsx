import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { MdLogout, MdOutlineDashboard, MdOutlineSettings } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import Avatar from "../../assets/avatar.png"
import Logo from "../../assets/logo.png"




const NavbarInternal = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-red-500 px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white flex items-center">
        <img src={Logo} alt="logo" className="w-10" />

          <span>Taskverse</span>
        </Link>

        <button
          className="sm:hidden text-white text-2xl"
          onClick={() => setMenuOpen(true)}
        >
          <FiMenu />
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 border-2 rounded-full bg-red-300 text-white font-semibold uppercase flex justify-center items-center"
              title={user?.firstName + " " + user?.lastName}
            >
              {user?.firstName?.[0] || "U" + "" + user?.lastName?.[0] || "U"}
            </button>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 bg-slate-200 border shadow-md rounded w-52 z-50"
              >
                <div className="p-3 border-b flex flex-col items-center gap-2">
                  <img src={Avatar} className="w-30"/>
                  <div>
                  <p className="text-sm text-center font-medium">
                    {user?.firstName + " " + user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <ul>
                  <li>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-red-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <MdOutlineDashboard/>
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li
                    onClick={() => {
                      navigate("/profile")
                      setDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-red-100"
                  >
                    <RxAvatar/>
                    <span>Profile</span>
                  </li>
                  <li
                    onClick={() => {
                      setDropdownOpen(false);
                      alert("Settings Page is under construction");
                    }}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-red-100"
                  >
                    <MdOutlineSettings/>
                    <span>Settings</span>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-red-500 hover:text-white"
                    >
                      <MdLogout/>
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Slide-Out Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-red-500">Menu</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl text-gray-600"
                >
                  <FiX />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-3 border-b flex flex-col items-center gap-2">
                  <img src={Avatar} className="w-30"/>
                  <div>
                  <p className="text-sm text-center font-medium">
                    {user?.firstName + " " + user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>

                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-black hover:text-red-500"
                  onClick={() => setMenuOpen(false)}
                >
                  <MdOutlineDashboard/>
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    alert("Profile page coming soon");
                  }}
                  className="flex items-center gap-2 text-left w-full text-black hover:text-red-500"
                >
                  <RxAvatar/>
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    alert("Settings page coming soon");
                  }}
                  className="flex items-center gap-2 text-left w-full text-black hover:text-red-500"
                >
                  <MdOutlineSettings/>
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-left w-full text-red-600 hover:bg-gray-100 mt-4"
                >
                  <MdLogout/>
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarInternal;
