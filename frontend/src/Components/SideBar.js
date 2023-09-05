import React from 'react';
import image from './Assets/download.png'


const SideBar = ({user}) => {
  
  
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
      <ul className='nav-links'>
        <li className='nav-link'>
          <a href='#'>Profile</a>
        </li>
        <li className='nav-link'>
          <a href='#'>Settings</a>
        </li>
        <li className='nav-link'>
          <a href='/Login'>Logout</a>
        </li>
      </ul>    
    </div>
  );
};

export default SideBar;
