import React, { useState } from "react";

const plantsData = [
  { name: "Aloe Vera", moisture: "30-50%", temperature: "18-24°C", humidity: "40-50%" },
  { name: "Basil", moisture: "40-60%", temperature: "18-25°C", humidity: "40-60%" },
  { name: "Cactus", moisture: "10-30%", temperature: "20-30°C", humidity: "10-30%" },
  { name: "Fern", moisture: "60-80%", temperature: "16-24°C", humidity: "60-80%" },
  { name: "Lavender", moisture: "30-50%", temperature: "15-25°C", humidity: "30-50%" },
  { name: "Mint", moisture: "40-60%", temperature: "17-25°C", humidity: "50-70%" },
  { name: "Orchid", moisture: "50-70%", temperature: "18-28°C", humidity: "50-70%" },
  { name: "Rose", moisture: "40-60%", temperature: "15-25°C", humidity: "40-60%" },
  { name: "Snake Plant", moisture: "20-40%", temperature: "18-27°C", humidity: "30-50%" },
  { name: "Tomato", moisture: "50-70%", temperature: "18-27°C", humidity: "50-70%" },
  { name: "LivingStone Daisy", moisture: "20-60%", temperature: "18-24°C", humidity: "40-60%" }
];

function PlantMoisture() {
  const [search, setSearch] = useState("");

  const filteredPlants = plantsData.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center p-6 text-black">
      <h1 className="text-3xl font-bold mb-4 text-center">Plant Moisture Guide</h1>
      <input
        type="text"
        placeholder="Search for a plant..."
        className="p-2 border rounded w-full max-w-md mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="w-full max-w-4xl p-4 rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full border-collapse border border-black min-w-[600px]">
          <thead>
            <tr className="bg-green-500 text-black">
              <th className="p-2 border">Plant Name</th>
              <th className="p-2 border">Avg Moisture Level</th>
              <th className="p-2 border">Avg Temperature</th>
              <th className="p-2 border">Avg Humidity</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlants.length > 0 ? (
              filteredPlants.map((plant, index) => (
                <tr key={index} className="text-center border">
                  <td className="p-2 border">{plant.name}</td>
                  <td className="p-2 border">{plant.moisture}</td>
                  <td className="p-2 border">{plant.temperature}</td>
                  <td className="p-2 border">{plant.humidity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No plants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <svg className="absolute bottom-0 left-0 rounded-b-xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#25bc59" fillOpacity="1" d="M0,288L60,282.7C120,277,240,267,360,245.3C480,224,600,192,720,197.3C840,203,960,245,1080,240C1200,235,1320,181,1380,154.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg>
    </div>
  );
}

export default PlantMoisture;
