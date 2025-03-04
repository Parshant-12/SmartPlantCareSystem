import React from 'react';

function About() {
  return (
    <div className="text-black">
      <div className='container mx-auto px-3 py-4 pb-[100px]'>
        <div className='flex flex-col justify-center items-center'>
          <div className='text-black font-medium text-3xl pt-4 max-sm:pt-0 px-3 max-sm:text-2xl'>Smart <span className='text-green-700'>Plant</span> Care System</div>
          <div className='border border-[#e77442] rounded-lg mt-1 mb-4 w-[300px]'></div>
        </div>

        <h2 className='text-black text-xl font-semibold py-4 max-sm:text-2xl'>What is the Smart Plant Care System?</h2>
        <p className='text-black text-lg leading-relaxed max-sm:text-base'>
          The Smart Plant Care System is an IoT-based automated system designed to monitor and maintain plant health using 
          real-time data. It features an ESP8266 microcontroller connected to multiple sensors, including a soil moisture sensor, 
          temperature and humidity sensor, motion sensor, and an ESP32-CAM for live monitoring. The system automatically controls 
          irrigation and spraying based on sensor readings and user commands through a web dashboard.
        </p>

        <h2 className='text-black text-xl font-semibold py-4 max-sm:text-2xl'>Key Features</h2>
        <ul className='list-disc list-inside text-black text-lg max-sm:text-base'>
          <li>Automated soil moisture detection and watering system.</li>
          <li>Temperature and humidity monitoring for optimized plant care.</li>
          <li>Motion sensor integration for security and activity detection.</li>
          <li>ESP32-CAM for live video streaming and remote plant monitoring.</li>
          <li>Web-based dashboard for real-time data visualization and manual controls.</li>
          <li>WiFi-enabled for remote access and control.</li>
          <li>Manual pesticide sprayer using web dashboard.</li>
        </ul>

        <h2 className='text-black text-xl font-semibold py-4 max-sm:text-2xl'>How It Works</h2>
        <p className='text-black text-lg leading-relaxed max-sm:text-base'>
          The system continuously collects sensor data and transmits it to a web dashboard using WebSockets. If soil moisture 
          drops below a certain threshold, the relay automatically turns on the water pump. Users can manually control the spray 
          system and monitor the live plant environment remotely. In case of connectivity loss, the system ensures failsafe 
          conditions by <br /> defaulting to safe states.
        </p>
      </div>

      <svg className="absolute bottom-0 left-0 rounded-b-xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#4caf50" fillOpacity="1" d="M0,288L40,261.3C80,235,160,181,240,186.7C320,192,400,256,480,266.7C560,277,640,235,720,208C800,181,880,171,960,170.7C1040,171,1120,181,1200,160C1280,139,1360,85,1400,58.7L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
      </svg>
    </div>
  );
}

export default About;