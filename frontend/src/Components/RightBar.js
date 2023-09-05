import React from 'react';
import TopicSelection from './TopicSelection';
import Button from './Button';
import Score from './Score';
import { useState} from 'react';



const RightBar = ({ selectedTopic,updateScore,onSelectTopic,onClick,text,ShowAdd}) => {
  let [scoreone, setScore] = useState(0);
 
  return (
    
    
    <div className='right-bar'>   
      <TopicSelection onSelectTopic={onSelectTopic} />
      <div className='sidebutton'>
      <Button onClick={onClick} text={text} color={ShowAdd ? 'red' : '#000ff'} />

      </div>
      <a href="/Admin" className="Settindsbtn">Settings</a>
    </div>
  );
};

export default RightBar;

