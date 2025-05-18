import React from "react";
import { FiList } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Button, Popover } from "antd";

export default function Header({ isCollapsed, setIsCollapsed }) {
  const loggedUser = localStorage.getItem("user");
  const userObject = JSON.parse(loggedUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/settings");
  };

  const popoverContent = (
    <div className="flex flex-col gap-2">
      <Button
        type="link"
        onClick={handleProfile}
        className="text-cyan-600 text-left p-0"
      >
        Profile
      </Button>
      <Button
        type="link"
        onClick={handleLogout}
        className="text-red-500 text-left p-0"
      >
        Logout
      </Button>
    </div>
  );

  return (
    <header className="w-full flex items-center justify-between p-6 bg-blue-100">
      <div className="text-white text-3xl font-bold">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <FiList className="text-blue-500 hover:text-cyan-600 transition duration-200"/>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <Popover content={popoverContent} trigger="click">
          <button className="text-blue-500 font-medium hover:text-cyan-600 focus:outline-none">
            {userObject?.name}
          </button>
        </Popover>
      </div>
    </header>
  );
}
