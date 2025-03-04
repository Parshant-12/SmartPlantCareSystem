import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Analysis from './Components/Analysis';
import About from './Components/About';
import Contact from './Components/Contact';
import Camera from './Components/Camera';
import Landing from "./Components/Landing";
import plant_logo from './img/plant.png';
import { IoMenu, IoClose } from "react-icons/io5";
import AuthRedirector from "./Components/AuthRedirector"; // Import Redirect Component
import Plantinfo from "./Components/Plantinfo";

function App() {
  const { isAuthenticated } = useAuth0();
  const [data, setData] = useState({
    temperature: "0",
    humidity: "0",
    soil_moisture: "0",
    motion: "0",
    battery: "0",
    threshold:"0",
  });
  const [socket, setSocket] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // Track menu state

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket('ws://Your_esp_IP:81/');
  
      ws.onopen = () => console.log("Connected to WebSocket Server");
  
      ws.onmessage = (event) => {
        console.log("Received Data:", event.data);
        try {
          const receivedData = JSON.parse(event.data);
          setData(receivedData);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };
  
      ws.onerror = (error) => {
        console.error("WebSocket Error:", error);
        setSocket(null); // Set socket to null if the connection fails
      };
  
      ws.onclose = () => {
        console.log("WebSocket Disconnected");
        setSocket(null); // Ensure the website doesn't crash if WebSocket fails
      };
  
      setSocket(ws);
    };
  
    connectWebSocket();
  
    return () => {
      if (socket) socket.close();
    };
  }, []);

  return (
    <Router>
      <AuthRedirector />

      {isAuthenticated && (
        <button className="fixed left-4 top-2 z-50 lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <IoClose className="text-5xl" /> : <IoMenu className="text-5xl" />}
        </button>
      )}
      
      {/* Header (Only for logged-in users) */}
      {isAuthenticated && (
        <h1 className="sticky top-0 bg-[#001202] z-40 text-2xl flex justify-center items-center gap-2 py-2 lg:hidden">
          <img className="w-8" src={plant_logo} alt="" />
          <div>
            <div className="font-semibold text-3xl">
              Smart<span className="text-[#59a45e]">Plant</span>
            </div>
            <div className="border border-[#e77442] rounded-lg mt-1"></div>
          </div>
        </h1>
      )}

      <div className="flex">
        {isAuthenticated && <Navbar className="w-[15%]" menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
        <div className="max-lg:m-4 max-lg:mt-2 relative flex-1 m-6 max-sm:m-2 overflow-hidden rounded-xl w-[85%] bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Dashboard data={data} socket={socket} /> : <Landing />} />
            {isAuthenticated && (
              <>
                <Route path="/Plantinfo" element={<Plantinfo />} />
                <Route path="/Analysis" element={<Analysis />} />
                <Route path="/Camera" element={<Camera />} />
                <Route path="/About" element={<About />} />
                <Route path="/Contact" element={<Contact />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
