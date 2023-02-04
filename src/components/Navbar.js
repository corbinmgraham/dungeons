import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./styles/Navbar.css";

const Navbar = () => {
  const[clicked, setClicked]= useState(false)

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