import React from 'react';
import image from './Assets/download.png'
import Score from './Score';
import  { useState } from "react";

const SideBar = ({user, score,updateScore}) => {
  let [scoreone, setScore] = useState(0);
  

    return (
    <div className='sidebar'>
      <div className='user-profile'>
        <img
          src={image} // Replace with user's profile picture URL
          alt='User Profile'
          className='profile-picture'
        />
        <h3 className='user-name'>Welcome, {user}</h3>
      </div>


      <div className='score-container'> 
         <Score score={scoreone += updateScore} maxScore={100}/>
      </div>
      <label className='btn'>Scores</label>
      
    </div>
  );
};

export default SideBar;
