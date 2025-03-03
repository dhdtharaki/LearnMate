import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const loggedUser = localStorage.getItem('user');
    const userObject = JSON.parse(loggedUser);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove user from localStorage
        localStorage.removeItem('user');

        // Redirect to the login page
        navigate('/login');
    };

    return (
        <header className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="text-white text-3xl font-bold"></div>
            <div className="flex items-center space-x-4">
                <div className="text-white font-medium">{userObject?.name}</div>
                <button
                    onClick={handleLogout}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center focus:outline-none"
                >
                    <i className="fas fa-user text-cyan-500"></i>
                </button>
            </div>
        </header>
    );
}
