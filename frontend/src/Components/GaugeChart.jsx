import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const GaugeChart = ({ value, label, max = 100 }) => {
  const displayValue = value !== undefined && value !== null ? value : 0;

  const data = {
    labels: [label, ""],
    datasets: [
      {
        data: [displayValue, max - displayValue],
        backgroundColor: ["#25bc59", "#ddd"],
        borderWidth: 0,
        cutout: "75%",
        circumference: 180,
        rotation: -90,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }, // Enable tooltip on hover
    },
  };

  return (
    <div className="w-full h-[120px] flex flex-col items-center justify-center my-4 cursor-pointer">
      <Doughnut data={data} options={options} />
      <p className="text-xl font-bold mt-[-20px]">
        {displayValue} {label === "Temperature" ? "°C" : "%"}
      </p>
    </div>
  );
};

export default GaugeChart;
