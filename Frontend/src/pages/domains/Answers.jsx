import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Answers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resData = location.state?.data; // Safely access the passed `res` data

  useEffect(() => {
    if (resData) {
      console.log("Received Data:", resData);
    } else {
      console.warn("No data received. Redirecting to dashboard.");
      navigate("/home"); // Redirect to dashboard if no data
    }
  }, [resData, navigate]);

  const handleDoneClick = () => {
    navigate("/home");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-2xl transform transition-all hover:scale-105">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">{resData?.domain} Domain Level</h1>
          <p className="text-5xl font-black text-red-600 mt-4">
            {resData?.prediction || "N/A"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-6 bg-gray-300 rounded-full overflow-hidden mb-8">
          <div
            className="absolute left-0 top-0 h-full bg-red-500"
            style={{
              width: `${resData?.prediction === 'Severe' ? 75 : resData?.prediction === 'Moderate' ? 50 : 15}%`
            }}
          ></div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-6">Tips & Recommendations</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            {resData?.recommendation?.length > 0 ? (
              resData.recommendation.map((rec, index) => <li key={index}>{rec}</li>)
            ) : (
              <li>No recommendations available</li>
            )}
          </ul>
        </div>

        {/* Done Button */}
        <button
          onClick={handleDoneClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Answers;
