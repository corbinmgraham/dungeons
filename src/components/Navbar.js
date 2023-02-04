import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Attributes from './Attributes';
import "./styles/Navbar.css";

const Navbar = () => {
  
  //   const location = useLocation();
    const avatarClicked = localStorage.getItem("avatar");
    useEffect(() => {
        // console.log("token navbar: ", localStorage.getItem("avatar"));
        // setDisplayVal(localStorage.getItem("avatar clicked"));
    }, [localStorage.getItem('avatar')]);
  
  //   const links = [
  //   {
  //     to: "/LogInUser",
  //     text: "Log out",
  //     shouldDisplay: displayVal, 
  //     onClick: () => localStorage.removeItem("token")
  //   },
  // ]
  return (
    <div className='nav'>
      <div className="nav_wrap">
        <button className="avatar_button">Stats</button>
        {/* <button className="avatar_button2">New Game</button> */}
        {/* <h1 className="title"></h1> */}
        {/* <div className="menuitems">
            {avatarClicked != null? <Attributes/>  :
                <button className="avatar_button" onClick={()=>localStorage.setItem('avatar', ' ')}> Stats</button>
            }
        </div> */}
        {/* <div className='player_menu'>
          <ul>
            <li>Test</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;