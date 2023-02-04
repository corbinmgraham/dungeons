import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Attributes from './Attributes';
import "./styles/Navbar.css";

const Navbar = () => {
  const[clicked, setClicked]= useState(false)
  //   const location = useLocation();
  
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



      </div>
      <button className="avatar_button" onClick={()=> {localStorage.removeItem('story') 
        localStorage.removeItem('dead');
       window.location.reload()}}>New Game</button>
    </div>
  );
}

export default Navbar;