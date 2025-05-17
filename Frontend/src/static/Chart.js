import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ totalPercentage }) => {
    console.log(totalPercentage, "totalPercentage")
    const data = {
        labels: ["Affective", "Cognitive", "Meta-Cognitive", "Psycomoto"],
        datasets: [
            {
                label: "Domain Percentages",
                data: [
                    totalPercentage.affective_domain,
                    totalPercentage.cognitive_domain,
                    totalPercentage.meta_cognitive_domain,
                    totalPercentage.psycomoto_domain,
                ],
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(75, 192, 192, 1)",
                tension: 0.3, // Smooth curve
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            title: {
                display: true,
                text: "Domain Performance Line Chart",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: "Percentage",
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Domains",
                },
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineChart;
