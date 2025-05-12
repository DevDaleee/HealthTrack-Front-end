import React from 'react';
interface props {
  progressPercentage: number;
}
const CircularProgressIndicator = ({ progressPercentage }: props) => {
  return (
    <div className=" flex justify-end">
      <div className="relative w-25 h-25 p-1">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <path
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#eee"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#4CAF50"
            strokeWidth="3"
            strokeDasharray={`${progressPercentage}, 100`}
          />
          <text
            x="18"
            y="20.35"
            className="text-x font-bold"
            textAnchor="middle"
            fill="#333"
          >
            {Math.round(progressPercentage)}%
          </text>
        </svg>
      </div>
    </div>
  );
};

export default CircularProgressIndicator;
