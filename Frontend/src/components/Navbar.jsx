import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiChevronLeft,
  FiHome,
  FiGrid,
  FiClock,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

export default function Navbar({ isCollapsed, setIsCollapsed, toggleNavbar }) {
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { label: "Home", icon: <FiHome />, route: "/home" },
    { label: "Dashboard", icon: <FiGrid />, route: "/dashboard" },
    { label: "History", icon: <FiClock />, route: "/history" },
    { label: "Settings", icon: <FiSettings />, route: "/settings" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isCollapsed &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setIsCollapsed(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCollapsed, setIsCollapsed]);

  return (
    <div
      ref={navbarRef}
      className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 ${
        isCollapsed ? "translate-x-0 w-64" : "-translate-x-full w-64"
      }`}
    >
      <div className="flex flex-col justify-between h-full p-4">
        <div>
          <div className="flex items-center justify-between mb-8">
            <h1
              className="text-blue-500 text-2xl font-extrabold cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Learnmate.
            </h1>
            <button
              onClick={toggleNavbar}
              className="text-gray-500 hover:text-cyan-500"
            >
              <FiChevronLeft size={20} />
            </button>
          </div>

          <ul className="space-y-6">
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-lg text-gray-500 hover:text-cyan-500 cursor-pointer"
                onClick={() => navigate(item.route)}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center"
          onClick={handleLogout}
        >
          <FiLogOut className="mr-2" /> LOGOUT
        </button>
      </div>
    </div>
  );
}
