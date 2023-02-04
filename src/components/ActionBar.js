import React, { useState, useEffect } from "react";

import './styles/ActionBar.css'

function ActionBar() {



  const attack = () =>{

    localStorage.setItem('playerHealth', 0)
    localStorage.setItem('enemyHealth', 80)
    localStorage.setItem('dead', "dead");

    window.location.reload()
    
 
  }

  return (
    <div className='action_bar'>
      <div className='action_wrap'>
          <button className='action_button' onClick={()=>attack()}>Attack</button>
          <button className='action_button'>Interrogate</button>
          <button className='action_button'>Retreat</button>
      </div>
    </div>
  )
}

export default ActionBar