import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../apis/axiosInstance";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function PredictionHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const loggedUser = localStorage.getItem("user");
  const userObject = JSON.parse(loggedUser);
  const navigate = useNavigate();

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);

  // Fetch prediction data
  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get(
          `/predictions?email=${userObject.email}`
        );
        setHistory(response.data); // Assuming response.data contains an array of predictions
      } catch (error) {
        console.error("Error fetching predictions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  const handleViewMore = (rowData) => {
    navigate("/history/recommandations", { state: rowData });
  };

  return (
    <div className="min-h-screen flex bg-blue-100 overflow-x-hidden">
      {/* Sidebar */}
      <Navbar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        toggleNavbar={toggleNavbar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        <main className="flex-1 p-10 overflow-auto">
          {/* Recommendation History */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-gray-800 font-bold text-md mb-4">
              Prediction History:
            </h2>
            {loading ? (
              <p className="text-center text-gray-600">Loading...</p>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[400px] text-left border-collapse">
                  <thead className="sticky top-0 bg-gray-100 z-10">
                    <tr className="text-xs sm:text-sm">
                      <th className="p-2">Date</th>
                      <th className="p-2">Domain</th>
                      <th className="p-2">Level</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.length > 0 ? (
                      history.map((row, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } hover:bg-gray-200 text-xs sm:text-sm`}
                        >
                          <td className="p-2">{row.date}</td>
                          <td className="p-2">{row.domain}</td>
                          <td className="p-2">{row.label}</td>
                          <td className="p-2">
                            <button
                              onClick={() => handleViewMore(row)}
                              className="border border-blue-600 hover:bg-gray-100 text-blue-600 text-xs text-nowrap font-medium py-1 px-3 rounded-lg transition duration-200"
                            >
                              View More
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="p-2 text-center" colSpan={4}>
                          No predictions available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
