import React from 'react';

const BottomWave = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <svg
        viewBox="0 0 1440 320"
        className="w-full h-40"
        preserveAspectRatio="none"
      >
        <path
          fill="#DBEEFC"
          d="M0,96L48,106.7C96,117,192,139,288,165.3C384,192,480,224,576,224C672,224,768,192,864,160C960,128,1056,96,1152,90.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default BottomWave;
