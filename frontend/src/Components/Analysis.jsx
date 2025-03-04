import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const timeRanges = [
  { label: "Last 1 Hour", duration: 1, interval: 5 }, //(5 min intervals)
  { label: "Last 4 Hours", duration: 4, interval: 15 }, //(15 min intervals)
  { label: "Last 12 Hours", duration: 12, interval: 30 }, //(30 min intervals)
  { label: "Last 1 Day", duration: 24, interval: 60 }, //(1 hr intervals)
  { label: "Last Saved Data", duration: null, interval: 5 } //(5 min intervals for last saved data)
];

function Analysis() {
  const [sensorData, setSensorData] = useState([]);
  const [selectedRange, setSelectedRange] = useState(timeRanges[0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:yourport/api/sensordata/archive');
        console.log("Fetched Sensor Data:", response.data);
        setSensorData(response.data);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3600000); // Refresh every 1 hour

    return () => clearInterval(interval);
  }, []);

  const now = new Date();
  const filteredData = [];
  let lastTimestamp = null;

  if (selectedRange.label === "Last Saved Data") {
    const sortedData = [...sensorData].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    sortedData.forEach((data) => {
      const currentTimestamp = new Date(data.timestamp);
      if (!lastTimestamp || (lastTimestamp - currentTimestamp) >= selectedRange.interval * 60 * 1000) {
        filteredData.push(data);
        lastTimestamp = currentTimestamp;
      }
    });
  } else {
    sensorData.forEach((data) => {
      const currentTimestamp = new Date(data.timestamp);
      const timeDiff = (now - currentTimestamp) / (60 * 60 * 1000); // Convert to hours
      if (timeDiff <= selectedRange.duration) {
        if (!lastTimestamp || (currentTimestamp - lastTimestamp) >= selectedRange.interval * 60 * 1000) {
          filteredData.push(data);
          lastTimestamp = currentTimestamp;
        }
      }
    });
  }

  const chartData = {
    labels: filteredData.map(data =>
      data.timestamp ? new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : "N/A"
    ),
    datasets: [
      {
        label: "Temperature (°C)",
        data: filteredData.map(data => data.temperature || 0),
        borderColor: "red",
        fill: false
      },
      {
        label: "Humidity (%)",
        data: filteredData.map(data => data.humidity || 0),
        borderColor: "green",
        fill: false
      },
      {
        label: "Soil Moisture (%)",
        data: filteredData.map(data => data.soil_moisture || 0),
        borderColor: "blue",
        fill: false
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    interaction: {
      mode: 'nearest',
      intersect: true,
    },
    onHover: (event, chartElement) => {
      event.native.target.style.cursor = chartElement.length ? 'pointer' : 'default';
    }
  };

  return (
    <div className="p-4 max-lg:p-2 px-8 flex flex-col items-center min-h-[84vh]">
      <h2 className="text-3xl text-center font-bold text-black my-4 max-lg:my-0 max-lg:mb-2">Data Analysis</h2>

      <select
        className="mb-4 p-2 border-2 rounded text-black border-black"
        value={selectedRange.label}
        onChange={(e) => setSelectedRange(timeRanges.find(r => r.label === e.target.value))}
      >
        {timeRanges.map((range, index) => (
          <option key={index} value={range.label}>{range.label}</option>
        ))}
      </select>
      <div className="w-full max-w-4xl p-4 bg-white shadow-md rounded-lg overflow-x-auto">
      <div className="min-w-[800px]">
        <Line data={chartData} options={options} />
      </div>
    </div>

      <svg className="absolute bottom-0 left-0 rounded-b-xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#4caf50" fillOpacity="1" d="M0,288L80,272C160,256,320,224,480,218.7C640,213,800,235,960,229.3C1120,224,1280,192,1360,176L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
      </svg>
    </div>
  );
}

export default Analysis;