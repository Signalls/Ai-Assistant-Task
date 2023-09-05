import React from 'react';

const Answer = ({ answer }) => {
  return (
    <div className="response-panel">
      <div className="response-header">
      </div>
      <div className="response-body">
        <p>{answer}</p>
      </div>
      <div className="response-footer"></div>
    </div>
  );
};

export default Answer;

