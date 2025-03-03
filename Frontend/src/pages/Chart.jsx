import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "../apis/axiosInstance";
import { findActivityByName } from "../static/activities.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = () => {
    const loggedUser = localStorage.getItem("user");
    const userObject = JSON.parse(loggedUser);

    // Use state to manage chart data
    const [chartData, setChartData] = useState([]);

    const mapActivities = (data, response) => {
        const updatedChartData = []; // Temporary array to collect chart data

        data.forEach((x) => {
            let total = 0;

            x.recommendation.forEach((y) => {
                const result = response.data.data.find(
                    (activity) => activity.activity === y && x.date === activity.date
                );

                if (result) {
                    const percentage = calculatePercentage(result);
                    total += parseFloat(percentage);
                }
            });

            // Calculate average percentage
            const averagePercentage = x.recommendation.length > 0
                ? total / x.recommendation.length
                : 0;

            updatedChartData.push({
                date: x.date,
                domain: x.domain,
                percentage: parseFloat(averagePercentage.toFixed(2)), // Rounded to 2 decimals
            });
        });

        return updatedChartData; // Return collected data
    };

    const calculatePercentage = (row) => {
        const typicalChild = findActivityByName(row.activity);

        if (row.timeTaken <= 0 || row.retries <= 0 || row.points <= 0 || !typicalChild) {
            return 0;
        }

        const timeRatio = 1-((typicalChild.timeTake - row.timeTaken) / (typicalChild.timeTake + row.timeTaken));
        const retryRatio = 1 - ((typicalChild.retries - row.retries) / (typicalChild.retries + row.retries + 1));
        const pointsRatio = row.points / 10;
        return ((timeRatio * retryRatio * pointsRatio) * 100).toFixed(2);
    };

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                let predictions = await axios.get(`/get_predictions_for_chart?email=${userObject.email}`);
                let activities = await axios.get(`/get-activities?email=${userObject.email}`);

                const uniqueData = predictions.data.reduce((acc, current) => {
                    const domainEntries = acc.filter((item) => item.domain === current.domain);
                    const isDuplicate = domainEntries.some((item) => item.date === current.date);

                    if (!isDuplicate) {
                        acc.push(current);
                    }
                    return acc;
                }, []);
                console.log(uniqueData, "predictions");

                const updatedChartData = mapActivities(uniqueData, activities);

                // Update state to trigger re-render
                setChartData(updatedChartData);

            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        };

        fetchActivities();
    }, [userObject.email]);

    // Transform data for chart.js
    const dates = [...new Set(chartData.map((data) => data.date))];

    const domains = [
        "Cognitive Domain",
        "Affective Domain",
        "Meta-Cognitive Domain",
        "Psycho-Motor Domain",
    ];

    const datasets = domains.map((domain, index) => {
        const domainData = chartData.filter((data) => data.domain === domain);

        return {
            label: domain,
            data: domainData.map((data) => data.percentage),
            borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"][index],
            backgroundColor: "rgba(0, 0, 0, 0)",
            tension: 0.4,
        };
    });

    const data = {
        labels: dates,
        datasets: datasets,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Domain Performance Over Time",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Percentage",
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Date",
                },
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineChart;
