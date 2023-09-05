import React from 'react'
import image from "./Assets/images-removebg-preview.png"
 function Header({title,onAdd,ShowAdd}) {
 
    return (
            <div className="header">
              <span className="logo">
              <img src={image} alt="Your Logo" style={{ width: '100px', height: 'auto' }}  />
             </span>
              <ul className="nav">
                <li className="nav-item">
                  <a href="/Home" className="nav-link">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    About
                  </a>
                </li>
                <li className="nav-item active">
                  <a href="#" className="nav-link">
                    Check result
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/Login" className="nav-link">
                    Log out
                  </a>
                </li>
                {/* Add more navigation items as needed */}
              </ul>
            </div>
          );
        };

export default Header