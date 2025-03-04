import React from 'react';

function Live_Camera() {
  const ESP32_CAM_IP = "http://your_esp32cam_ip/"; // Change this to your ESP32-CAM IP

  return (
    <div className="flex flex-col items-center min-h-[84vh]">
      <div className="text-3xl font-bold mt-4 mb-2 text-black text-center">Live Camera</div>
      <div className="flex justify-center items-center w-full">
        <iframe
          src={`${ESP32_CAM_IP}`}
          className="w-[75%] h-[80vh] border-4 border-green-500 rounded-lg"
          allowFullScreen
          title="ESP32-CAM Live Stream"
        ></iframe>
      </div>
      {/* <svg className="absolute bottom-0 left-0 rounded-b-xl z-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#4caf50" fillOpacity="1" d="M0,256L48,256C96,256,192,256,288,250.7C384,245,480,235,576,213.3C672,192,768,160,864,165.3C960,171,1056,213,1152,224C1248,235,1344,213,1392,202.7L1440,192V320H0Z"></path>
      </svg> */}
    </div>
  );
}

export default Live_Camera;
