import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../apis/axiosInstance";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function PredictionHistory() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const loggedUser = localStorage.getItem("user");
    const userObject = JSON.parse(loggedUser);
    const navigate = useNavigate();
   

    // Fetch prediction data
    useEffect(() => {
        const fetchPredictions = async () => {
            try {
                const response = await axios.get(`/predictions?email=${userObject.email}`);
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
        <div className="min-h-screen flex bg-gradient-to-r from-cyan-500 to-blue-500">
            {/* Sidebar */}
            <Navbar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header />

                <main className="flex-1 p-10">
                    {/* Recommendation History */}
                    <div className="bg-white rounded-xl shadow-2xl p-6">
                        <h2 className="text-gray-800 font-bold text-xl mb-4">Prediction History:</h2>
                        {loading ? (
                            <p className="text-center text-gray-600">Loading...</p>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
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
                                                } hover:bg-gray-200`}
                                            >
                                                <td className="p-2">{row.date}</td>
                                                <td className="p-2">{row.domain}</td>
                                                <td className="p-2">{row.label}</td>
                                                <td className="p-2">
                                                    <button
                                                        onClick={() => handleViewMore(row)}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-lg shadow-md transition duration-200"
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
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
