import React from 'react';
import TopicSelection from './TopicSelection';
import Button from './Button';
import Score from './Score';
import { useState} from 'react';
import LoadQuestionsComponent from './LoadOptions';



const RightBar = ({onLoadQuestion, selectedTopic,updateScore,onSelectTopic,onClick,text,ShowAdd}) => {
 
  return (
    
    
    <div className='right-bar'>   
      <TopicSelection onSelectTopic={onSelectTopic}/>
      <div className='sidebutton'>
      <Button onClick={onClick} text={text} color={ShowAdd ? 'red' : '#000ff'} />
      <LoadQuestionsComponent onClick={onLoadQuestion} />

      
      </div>
    </div>
  );
};

export default RightBar;

