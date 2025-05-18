import React, { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { GiBrain } from "react-icons/gi";
import { FaHeart } from "react-icons/fa6";
import { IoIosLeaf } from "react-icons/io";
import { FaHandSpock } from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);

  const domains = [
    {
      name: "Cognitive Domain",
      desc: "Understand how your child thinks, learns, and solves problems.",
      icon: <GiBrain />,
      percentage: 76,
      color: {
        bg: "to-blue-300",
        baseBg: "bg-blue-600",
        baseText: "text-blue-800",
      },
      route: "/cognitive-questions",
    },
    {
      name: "Affective Domain",
      desc: "Gain insight into how your child feels and interacts emotionally.",
      icon: <FaHeart />,
      percentage: 21,
      color: {
        bg: "to-red-300",
        baseBg: "bg-red-500",
        baseText: "text-red-800",
      },
      route: "/affective-questions",
    },
    {
      name: "Meta-Cognitive Domain",
      desc:"Discover how your child reflects, plans, and monitors their own learning.",
      icon: <IoIosLeaf />,
      percentage: 58,
      color: {
        bg: "to-green-500",
        baseBg: "bg-green-600",
        baseText: "text-green-700",
      },
      route: "/meta-cognitive-questions",
    },
    {
      name: "Psycho-Motor Domain",
      desc: "Learn how your child develops coordination, movement, and physical skills.",
      icon: <FaHandSpock />,
      percentage: 88,
      color: {
        bg: "to-purple-400",
        baseBg: "bg-purple-500",
        baseText: "text-purple-700",
      },
      route: "/psycomotor-questions",
    },
  ];

  return (
    <div className="min-h-screen flex items-start justify-center bg-blue-100">
      {/* Sidebar */}
      <Navbar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        toggleNavbar={toggleNavbar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full ml-0 transition-all duration-300">
        {/* Header */}
        <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        <main className="flex h-full p-5 sm:p-10">
          <div className="flex bg-white rounded-xl p-5 sm:p-8 mb-8 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {domains.map((domain, index) => (
                <div
                  key={index}
                  className={`flex flex-col w-full gap-4 rounded-xl bg-gradient-to-b from-white ${domain.color.baseBg} min-h-[200px] cursor-pointer p-6 items-start font-semibold hover:shadow-lg transform transition duration-300`}
                  onClick={() => navigate(domain.route)}
                >
                  <div
                    className={`rounded-full p-4 ${domain.color.baseBg} text-white`}
                  >
                    {domain.icon}
                  </div>
                  <span className={`text-md sm:text-md ${domain.color.baseText}`}>
                    {domain.name}
                  </span>
                  <span className="text-xs sm:text-sm text-white font-normal">{domain.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
