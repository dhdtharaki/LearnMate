import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user from localStorage
    localStorage.removeItem('user');

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <aside className="bg-white w-64 flex flex-col justify-between p-6 shadow-lg">
      <div>
        <h1
          className="text-3xl font-extrabold text-cyan-500 mb-8 cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          <div className="text-blue-500 text-3xl font-bold">Learnmate.</div>
        </h1>
        <ul className="space-y-6">
          <li
            className="text-lg text-gray-500 hover:text-cyan-500 cursor-pointer"
            onClick={() => navigate('/home')}
          >
            Home
          </li>
          <li
            className="text-lg text-gray-500 hover:text-cyan-500 cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </li>
          <li
            className="text-lg text-gray-500 hover:text-cyan-500 cursor-pointer"
            onClick={() => navigate('/history')}
          >
            History
          </li>
          <li
            className="text-lg text-gray-500 hover:text-cyan-500 cursor-pointer"
            onClick={() => navigate('/settings')}
          >
            Settings
          </li>
        </ul>
      </div>
      <button
        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md"
        onClick={handleLogout}
      >
        LOGOUT
      </button>
    </aside>
  );
}
