"use client";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
var Chart = function () {
    var _a = useState({
        datasets: []
    }), chartData = _a[0], setChartData = _a[1];
    var _b = useState({}), chartOptions = _b[0], setChartOptions = _b[1];
    useEffect(function () {
        setChartData({
            labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
            datasets: [
                {
                    label: "Sales $",
                    data: [15324, 22874, 10762, 26372, 9746, 21111, 18463],
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.4)"
                }
            ]
        });
        setChartOptions({
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: true,
                    text: "Daily revenue"
                }
            },
            maintainAspectRatio: false,
            responsive: true
        });
    }, []);
    return (<div className="h-[300px] col-span-5">
      <Bar data={chartData} options={chartOptions}/>
    </div>);
};
export default Chart;
