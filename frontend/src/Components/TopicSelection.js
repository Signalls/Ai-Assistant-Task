import React, { useState } from 'react';

const TopicSelection = ({ onSelectTopic }) => {
  // Define an array of topics
  const topics = { 
    'Maths': 1,
    'Art': 2,
    'Science':3,
    'English':4,
    'History':5,
    'Tech':6,
  };

  // State to store the selected topic
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Function to handle topic selection
  
  const handleTopicSelection = (topic) => {
    setSelectedTopic(topic);// Pass the selected topic to the parent component
    onSelectTopic(topic);
    console.log(topic) ;
  };
  const handleDisSelection = () => {
    setSelectedTopic(" ");
  };
  const topicArray = Object.entries(topics);
  return (
    <div className="topic-selection">
      <h3>Select subject</h3>
      <ul className="topic-list">
        {topicArray.map(([topic, value])  => (
          <li
            key={topic}
            className={`topic-item ${selectedTopic === topic ? 'selected' : ''}`}
            onClick={() => handleTopicSelection(value)}
            onDoubleClick={handleDisSelection}
          >
            {topic}
          </li>
        ))}
      </ul>
      <p>Selected Topic: {selectedTopic}</p>
    </div>
  );
};

export default TopicSelection;
