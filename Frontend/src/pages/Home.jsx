import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const domains = [
    { name: "Cognitive Domain", percentage: 76, color: "blue", route: "/cognitive-questions" },
    { name: "Affective Domain", percentage: 21, color: "blue", route: "/affective-questions" },
    { name: "Meta-Cognitive Domain", percentage: 58, color: "blue", route: "/meta-cognitive-questions" },
    { name: "Psycho-Motor Domain", percentage: 88, color: "blue", route: "/psycomotor-questions" },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-cyan-500 to-blue-500">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        <main className="flex-1 p-10">
          {/* Progress Section */}
          <div className="bg-white rounded-xl shadow-2xl p-8 mb-8">
            <div className="grid grid-cols-2 gap-6">
              {domains.map((domain, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center justify-center p-6 rounded-lg bg-blue-500 text-white font-semibold text-lg shadow-lg hover:bg-pink-500 hover:scale-105 hover:shadow-xl transform transition duration-300 ease-in-out"
                  onClick={() => {
                    navigate(domain.route);
                  }}
                >
                  <span>{domain.name}</span>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
