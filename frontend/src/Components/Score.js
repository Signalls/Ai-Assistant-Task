import React from 'react';

const Score = ({ score, maxScore }) => {
  // Calculate the percentage of completion
  const percentage = (score / maxScore) * 100;
  let count =0;
  return (
    <div className="score-component">
      <div className="circle">
        <svg width="100" height="100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#007bff"
            strokeWidth="8"
          />
          <circle
            className="circle-progress"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#28a745"
            strokeWidth="8"
            strokeDasharray={`${percentage} 100`}
          />
        </svg>
        <div className="score">
          <span>{count + score}</span> / {maxScore}
        </div>
      </div>
    </div>
  );
};

export default Score;
