import { useState, useEffect } from "react";
import GaugeChart from "./GaugeChart";
import { IoBatteryHalf } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";

function Dashboard({ data, socket }) {
  const [showInfo, setShowInfo] = useState(false);
  const [motion, setMotion] = useState(false);
  const [spray, setSpray] = useState(false);
  const [threshold, setThreshold] = useState(50);
  const [currthreshold, setcurrthreshold] = useState(0);
  const [plantHealth, setPlantHealth] = useState({
    value: 0,
    color: "bg-gray-500",
    text: "Calculating...",
  });

  const sendCommand = (command) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(command);
    } else {
      console.error("WebSocket is not connected");
    }
  };

  const toggleSpray = () => {
    const newSprayState = !spray;
    setSpray(newSprayState);
    sendCommand(newSprayState ? "spray_on" : "spray_off");
  };
  const updateThreshold = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(`threshold:${threshold}`);
      console.log("Threshold sent:", threshold);
    }
  };

  useEffect(() => {
    setcurrthreshold(data.threshold);
  }, [data.threshold]);

  useEffect(() => {
    if (data.motion && Notification.permission === "granted") {
      setMotion(true);
      new Notification("Motion Detected!", {
        body: "A movement was detected near your plant.",
        icon: "/alert-icon.png",
      });
    } else {
      setMotion(false); // Reset motion to false when no motion is detected
    }
  }, [data.motion]);
  

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const calculatePlantHealth = () => {
      const { soil_moisture = 0, temperature = 0, humidity = 0 } = data;
      let newHealth = { value: 0, color: "bg-gray-500", text: "Unknown" };

      if (
        soil_moisture >= 40 &&
        soil_moisture <= 80 &&
        temperature >= 18 &&
        temperature <= 30 &&
        humidity >= 50 &&
        humidity <= 70
      ) {
        newHealth = { value: 100, color: "bg-green-700", text: "Healthy 🌿" };
      } else if (
        soil_moisture >= 20 &&
        soil_moisture <= 75 &&
        temperature >= 15 &&
        temperature <= 35 &&
        humidity >= 40 &&
        humidity <= 80
      ) {
        newHealth = { value: 60, color: "bg-yellow-500", text: "Moderate ⚠️" };
      } else {
        newHealth = { value: 30, color: "bg-red-500", text: "Unhealthy ❌" };
      }

      setPlantHealth(newHealth);
    };

    calculatePlantHealth();
  }, [data]);

  return (
    <div className="flex flex-col text-black max-lg:min-h-[90vh]">
      <div className="w-[70%] m-auto max-xl:w-[100%] max-xl:px-8 max-lg:px-4 max-lg:m-0 max-md:px-16 max-sm:px-4">
        <div className=" mt-6 mb-12 flex items-center justify-center max-lg:mb-4 max-lg:mt-4">
          <h2 className="text-3xl font-bold text-center">Live Sensors Data</h2>
        </div>


        <div className="grid grid-cols-3 gap-6 max-xl:gap-3 max-md:grid-cols-2 max-md:mb-44" >
          <div className="border border-green-300 p-4 text-center rounded-lg bg-white shadow-md">
            <h3 className="text-lg max-sm:text-base font-semibold">🌡 Temperature</h3>
            <GaugeChart value={data.temperature} label="Temperature" max={100} />
          </div>

          <div className="border border-green-300 text-center p-4 rounded-lg bg-white shadow-md">
            <h3 className="text-lg max-sm:text-base font-semibold">💧 Soil Moisture</h3>
            <GaugeChart value={data.soil_moisture} label="Soil Moisture" max={100} />
          </div>

          <div className="border border-green-300 p-4 text-center rounded-lg bg-white shadow-md">
            <h3 className="text-lg max-sm:text-base font-semibold">🌬 Humidity</h3>
            <GaugeChart value={data.humidity} label="Humidity" max={100} />
          </div>

          <div className="border border-green-300 p-4 text-center rounded-lg bg-white shadow-md">
            <h3 className="text-lg max-sm:text-base font-semibold max-md:mb-6">Motion</h3>
            <div className="flex items-center justify-center">
              <div className={`text-2xl font-bold rounded-full w-[60px] h-[60px] max-md:w-[80px] max-md:h-[80px] outline-2 ${motion ? "bg-red-500" : "bg-green-500"}`}></div>
            </div>
          </div>

          <div className="relative border border-green-300 p-4 text-center rounded-lg bg-white shadow-md max-sm:col-span-2">
            <div
              className="absolute top-2 right-2 text-3xl cursor-pointer"
              onClick={() => setShowInfo(!showInfo)}
            >
              <IoMdInformationCircleOutline />
            </div>

            {showInfo && (
              <div className="absolute top-10 right-2 bg-gray-800 text-white text-sm p-3 rounded-md shadow-lg max-w-xs">
                💡 Tip: Use the <strong>Plant Info</strong> tab to check the recommended threshold for your plant.
              </div>
            )}

            <h3 className="text-lg max-sm:text-base font-semibold pb-2 max-sm:pb-3">
              Moisture Threshold: <span>{currthreshold}</span>
            </h3>
            <div className="flex items-center justify-center gap-2">
              <input
                className="border border-black rounded-md py-0.5 max-sm:pl-2"
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                min="0"
                max="100"
              />
              <button
                className="cursor-pointer px-4 py-1 font-bold text-white rounded-lg bg-blue-600 hover:shadow-[0_0_20px_#153eff] transition-all duration-300"
                onClick={updateThreshold}
              >
                Update
              </button>
            </div>
          </div>

          <div className="border border-green-300 p-4 max-sm:pt-2 text-center rounded-lg bg-white shadow-md max-sm:col-span-2">
            <h3 className="text-lg max-sm:text-base font-semibold flex items-center justify-center gap-1 max-sm:pb-1">
              <lord-icon
                src="https://cdn.lordicon.com/towyhafz.json"
                trigger={spray ? "loop" : ""}
                style={{ width: "30px", height: "30px" }}>
              </lord-icon>
              <div>Spray Pesticide</div>
            </h3>
            <button className={`cursor-pointer mt-2 px-6 py-2 font-bold text-white rounded-lg  ${spray ? "bg-red-500 hover:shadow-[0_0_20px_#ff2c2c] transition-all duration-300" : "bg-green-500 hover:shadow-[0_0_20px_#25bc59] transition-all duration-200"}`} onClick={toggleSpray}>
              {spray ? "Turn OFF" : "Turn ON"}
            </button>
          </div>

          <div className="border border-green-300 p-4 text-center rounded-lg bg-white shadow-md">
            <h3 className="text-lg max-sm:text-base font-semibold flex items-center justify-center gap-1 ">
              <IoBatteryHalf className="text-3xl" />
              <div>Battery</div>
            </h3>
            <div className="font-medium text-2xl">{data.battery}%</div>
          </div>

          <div className="border border-green-300 p-4 text-center rounded-lg bg-white shadow-md lg:hidden">
            <p className="text-center text-lg font-semibold mb-2 max-xl:text-base">🌱 Plant Health: {plantHealth.text}</p>
            <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden shadow-md">
              <div
                className={`h-full ${plantHealth.color} transition-all duration-1000`}
                style={{ width: `${plantHealth.value}%` }}
              ></div>
            </div>
          </div>

        </div>
      </div>
      <svg className="absolute bottom-0 left-0 rounded-b-xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#25bc59" fillOpacity="1" d="M0,128L48,154.7C96,181,192,235,288,234.7C384,235,480,181,576,181.3C672,181,768,235,864,218.7C960,203,1056,117,1152,69.3C1248,21,1344,11,1392,5.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>

      <div className="absolute w-[25%] mx-auto mt-10 mb-6 bottom-0 left-[35%] max-xl:mb-2 max-xl:w-[30%] max-lg:w-[35%] max-lg:left-[30%] max-md:hidden">
        <p className="text-center text-lg font-semibold mb-2 max-xl:text-base">🌱 Plant Health: {plantHealth.text}</p>
        <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden shadow-md">
          <div
            className={`h-full ${plantHealth.color} transition-all duration-1000`}
            style={{ width: `${plantHealth.value}%` }}
          ></div>
        </div>
      </div>

      <lord-icon
        src="https://cdn.lordicon.com/pixusvzc.json"
        trigger="loop"
        stroke="light"
        state="hover-play"
        delay="5000"
        className="absolute right-0 bottom-0 drop-shadow-xl w-[220px] h-[220px] max-xl:w-[180px] max-xl:h-[180px] max-lg:w-[140px] max-lg:h-[140px] max-sm:right-[-20px] max-sm:bottom-[-10px] max-sm:w-[150px] max-sm:h-[150px]"
      ></lord-icon>

      <lord-icon
        src="https://cdn.lordicon.com/elmzpfao.json"
        trigger="hover"
        stroke="light"
        className="absolute left-0 bottom-0 drop-shadow-xl cursor-pointer w-[110px] h-[110px] max-xl:w-[80px] max-xl:h-[80px] max-lg:w-[68px] max-lg:h-[68px] max-sm:bottom-[-5px]"
      ></lord-icon>


    </div>
  );
}

export default Dashboard;
