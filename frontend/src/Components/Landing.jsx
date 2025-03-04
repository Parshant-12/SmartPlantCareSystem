import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import nature from '../img/pexels-sohi-807598.jpg';

function Landing() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div
      className="h-[94vh] flex flex-col justify-center items-center text-white text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${nature})` }}
    >
      <div className="absolute inset-0 bg-black/80"></div>  
      <div className="backdrop-blur-xl py-6 px-8 max-sm:px-4 rounded-lg bg-black/10 border border-e-white">
        <h1 className="text-4xl font-bold max-sm:text-xl">Welcome to SmartPlantCareSystem</h1>
        <p className="text-lg max-sm:text-base mt-4">Monitor your plants with real-time data & automation.</p>
        <div className="mt-6 space-x-4">
          <button
            onClick={() => loginWithRedirect()}
            className="px-6 py-2 bg-green-500 text-black rounded-lg font-semibold cursor-pointer"
          >
            Login / Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
