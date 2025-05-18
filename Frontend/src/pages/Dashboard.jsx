import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import axios from "../apis/axiosInstance";
import { findActivityByName } from "../static/activities.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Recommendations() {
  const loggedUser = localStorage.getItem("user");
  const userObject = JSON.parse(loggedUser);
  const [loading, setLoading] = useState(true);
  const [totalPercentage, setTotalPercentage] = useState({
    cognitive_domain: 0,
    affective_domain: 0,
    psychomotor_domain: 0,
    meta_cognitive_domain: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);

  const calculatePercentage = (row) => {
    const typicalChild = findActivityByName(row.activity);

    if (!row.timeTaken || !row.retries || !row.points || !typicalChild) {
      return 0;
    }

    const timeRatio =
      (typicalChild.timeTake - row.timeTaken) / typicalChild.timeTake;
    const retryRatio =
      1 - (typicalChild.retries - row.retries) / (typicalChild.retries + 1);
    const pointsRatio = row.points / 10;
    return (((timeRatio + retryRatio + pointsRatio) / 3) * 100).toFixed(2);
  };

  const mapActivities = (data, response) => {
    return data?.recommendation.map((activityName) => {
      const foundActivity = response.data.data.find(
        (activity) => activity.activity === activityName
      );

      return foundActivity
        ? {
            ...foundActivity,
            points: Number(foundActivity.points),
            retries: Number(foundActivity.retries),
            timeTaken: Number(foundActivity.timeTaken),
            percentage: calculatePercentage(foundActivity),
          }
        : {
            activity: activityName,
            date: "",
            points: 0,
            retries: 0,
            timeTaken: 0,
            email: userObject.email,
            percentage: 0,
          };
    });
  };

  const fetchActivitiesForChart = async () => {
    try {
      const predictions = await axios.get(
        `/get_predictions_for_chart?email=${userObject.email}`
      );
      const activities = await axios.get(
        `/get-activities?email=${userObject.email}`
      );

      const uniqueData = predictions.data.reduce((acc, current) => {
        const isDuplicate = acc.some(
          (item) => item.domain === current.domain && item.date === current.date
        );
        if (!isDuplicate) acc.push(current);
        return acc;
      }, []);

      const updatedChartData = uniqueData.map((x) => {
        let total = 0;

        x.recommendation.forEach((y) => {
          const result = activities.data.data.find(
            (activity) => activity.activity === y && x.date === activity.date
          );

          if (result) total += parseFloat(calculatePercentage(result));
        });

        const averagePercentage =
          x.recommendation.length > 0 ? total / x.recommendation.length : 0;

        return {
          date: x.date,
          domain: x.domain,
          percentage: parseFloat(averagePercentage.toFixed(2)),
        };
      });

      const sortedChartData = updatedChartData.sort((a, b) => {
        const dateA = a.date.split("/").reverse().join("-");
        const dateB = b.date.split("/").reverse().join("-");
        return new Date(dateA) - new Date(dateB); //
      });

      setChartData(sortedChartData);
    } catch (error) {
      console.error("Error fetching activities for chart:", error);
    }
  };

  const fetchDomainPercentages = async () => {
    try {
      setLoading(true);
      const predictions = await axios.get(
        `/get_predictions?email=${userObject.email}`
      );
      const activities = await axios.get(
        `/get-activities?email=${userObject.email}`
      );

      const calculateDomainPercentage = (activitiesList) => {
        const total = activitiesList?.reduce(
          (sum, activity) => sum + parseFloat(activity.percentage),
          0
        );
        return activitiesList?.length ? total / activitiesList?.length : 0;
      };

      const cognitiveDomain = mapActivities(
        predictions.data.find((x) => x.domain === "Cognitive Domain"),
        activities
      );
      const affectiveDomain = mapActivities(
        predictions.data.find((x) => x.domain === "Affective Domain"),
        activities
      );
      const psychomotorDomain = mapActivities(
        predictions.data.find((x) => x.domain === "Psycho-Motor Domain"),
        activities
      );
      const metaCognitiveDomain = mapActivities(
        predictions.data.find((x) => x.domain === "Meta-Cognitive Domain"),
        activities
      );

      setTotalPercentage({
        cognitive_domain: calculateDomainPercentage(cognitiveDomain),
        affective_domain: calculateDomainPercentage(affectiveDomain),
        psychomotor_domain: calculateDomainPercentage(psychomotorDomain),
        meta_cognitive_domain: calculateDomainPercentage(metaCognitiveDomain),
      });
    } catch (error) {
      console.error("Error fetching domain percentages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivitiesForChart();
    fetchDomainPercentages();
  }, [userObject.email]);

  const dates = [...new Set(chartData.map((data) => data.date))];

  const data = {
    labels: dates,
    datasets: [
      "Cognitive Domain",
      "Affective Domain",
      "Psycho-Motor Domain",
      "Meta-Cognitive Domain",
    ].map((domain, index) => {
      const domainData = chartData.filter((data) => data.domain === domain);

      return {
        label: domain,
        data: domainData.map((data) => data.percentage),
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"][index],
        backgroundColor: "rgba(0, 0, 0, 0)",
        tension: 0.4,
      };
    }),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Domain Performance Over Time" },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Percentage" } },
      x: { title: { display: true, text: "Date" } },
    },
  };

  return (
    <div className="min-h-screen flex bg-blue-100 overflow-hidden">
      <Navbar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        toggleNavbar={toggleNavbar}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main className="flex-1 p-10 overflow-hidden">
          {loading ? (
            <div className="flex justify-center min-h-screen">Loading...</div>
          ) : (
            <div className="bg-white rounded-xl shadow-2xl p-6 mb-8 overflow-hidden">
              <h2 className="text-gray-800 font-bold text-xl mb-6">
                Show Progress for: All Domains
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                {Object.entries(totalPercentage).map(([domain, percentage]) => (
                  <div
                    key={domain}
                    className={`flex flex-col items-center justify-center p-4 ${
                      percentage <= 35
                        ? "bg-red-400"
                        : percentage <= 70
                        ? "bg-yellow-400"
                        : "bg-green-400"
                    } rounded-full text-white font-bold text-lg`}
                  >
                    <span className="text-2xl">{percentage.toFixed(2)}%</span>
                    <span className="text-sm font-medium mt-1">
                      {domain
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </span>
                  </div>
                ))}
              </div>

              {chartData.length > 0 && (
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[500px] sm:min-w-full h-[300px] sm:h-[500px] sm:mx-auto">
                    <Line data={data} options={{
          ...options,
          maintainAspectRatio: false, // <-- allows the chart to fill the container
        }}/>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
