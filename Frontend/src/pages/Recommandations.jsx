import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../apis/axiosInstance";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { findActivityByName } from "../static/activities.js";

export default function Recommendations() {
  const location = useLocation();
  const rowData = location.state;
  const loggedUser = localStorage.getItem("user");
  const userObject = JSON.parse(loggedUser);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [formValues, setFormValues] = useState({
    activity: "",
    timeTaken: "",
    points: "",
    retries: "",
  });

  const [totalPercentage, setTotalPercentage] = useState(0); // State for total percentage
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);

  // Fetch activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/get-activities?email=${userObject.email}&prediction_id=${rowData._id}`
        );
        const activitiesList = rowData.recommendation.map((activityName) => {
          const foundActivity = response.data.data.find(
            (activity) => activity.activity === activityName
          );

          return foundActivity
            ? {
                ...foundActivity,
                points: Number(foundActivity.points),
                retries: Number(foundActivity.retries),
                timeTaken: Number(foundActivity.timeTaken),
                precentage: calculatePercentage(foundActivity),
              }
            : {
                activity: activityName,
                date: "",
                points: 0,
                retries: 0,
                timeTaken: 0,
                email: userObject.email,
                precentage: 0,
              };
        });

        console.log(activitiesList, "activitiesList");

        setActivities(activitiesList);

        // Update total percentage after fetching activities
        const total = activitiesList.reduce((sum, activity) => {
          return sum + activity.precentage * 1;
        }, 0);

        setTotalPercentage(total / activitiesList.length || 0);
      } catch (error) {
        console.error("Error fetching activities:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch activities. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [userObject.email, rowData.recommendation]);

  // Helper to calculate percentage
  const calculatePercentage = (row) => {
    const typicalChild = findActivityByName(row.activity);

    // Validate inputs
    if (row.timeTaken <= 0 || row.retries <= 0 || row.points <= 0) {
      return 0;
    }
    if (!typicalChild) {
      return 0;
    }

    // Calculate percentage
    const timeRatio =
      (typicalChild.timeTake - row.timeTaken) / typicalChild.timeTake;
    const retryRatio =
      1 - (typicalChild.retries - row.retries) / (typicalChild.retries + 1);
    const pointsRatio = row.points / 10;

    return (((timeRatio + retryRatio + pointsRatio) / 3) * 100).toFixed(2);
  };

  const handleEditClick = (row) => {
    setCurrentRow(row);
    setFormValues({
      activity: row.activity,
      timeTaken: row.timeTaken,
      points: row.points,
      retries: row.retries,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRow(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await Swal.fire({
        title: "Do you want to save changes to this activity?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      });

      if (result.isConfirmed) {
        const updatedValues = {
          ...formValues,
          email: userObject.email,
          prediction_id: rowData._id,
        };

        await axios.post("/save-activity", updatedValues);

        Swal.fire("Activity updated successfully!", "", "success");

        window.location.reload();

        closeModal();
      } else {
        Swal.fire("Changes were not saved.", "", "info");
      }
    } catch (error) {
      console.error("Error saving activity:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to save activity. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-blue-100 overflow-x-hidden">
      <Navbar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        toggleNavbar={toggleNavbar}
      />

      <div className="flex-1 flex flex-col  overflow-x-hidden">
        <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
        <main className="flex-1 p-10  overflow-x-hidden">
          <div className="bg-white rounded-xl shadow-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-gray-900 font-extrabold text-sm sm:text-2xl tracking-wide flex flex-col sm:flex-row items-center gap-2">
                Show Progress for
                <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-lg shadow-sm">
                  {rowData.domain}
                </span>
              </h2>

              {/* <select className="border border-gray-300 p-2 rounded-md">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>All Time</option>
                            </select> */}
            </div>
            <div className="flex flex-col rounded-xl items-center justify-center p-6 bg-gradient-to-br from-green-400 to-green-500 shadow-xl text-white">
              <span className="text-5xl font-extrabold">
                {totalPercentage.toFixed(2)}%
              </span>
              <p className="text-sm font-medium mt-2 tracking-wide opacity-90">
                Overall Progress
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-2xl p-6">
            <h2 className="text-gray-800 font-bold text-sm sm:text-xl mb-4">
              Recommendation History:
            </h2>
            {loading ? (
              <p>Loading activities...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className=" text-left border-collapse min-w-[700px] sm:min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2">Activity</th>
                      <th className="p-2">Time Taken (Min)</th>
                      <th className="p-2">Total Points</th>
                      <th className="p-2">Re-tries</th>
                      <th className="p-2">Percentage</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((row, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-gray-200`}
                      >
                        <td className="p-2">{row.activity}</td>
                        <td className="p-2">{row.timeTaken}</td>
                        <td className="p-2">{row.points}</td>
                        <td className="p-2">{row.retries}</td>
                        <td className="p-2">{row.precentage}%</td>
                        <td className="p-2">
                          <button
                            onClick={() => handleEditClick(row)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-lg shadow-md transition duration-200"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-96">
            <h3 className="text-xl font-bold mb-4">Edit Recommendation</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Activity
                </label>
                <input
                  type="text"
                  name="activity"
                  value={formValues.activity}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Time Taken (Min)
                </label>
                <input
                  type="number"
                  name="timeTaken"
                  value={formValues.timeTaken}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Total Points
                </label>
                <input
                  type="number"
                  name="points"
                  value={formValues.points}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Re-tries
                </label>
                <input
                  type="number"
                  name="retries"
                  value={formValues.retries}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
