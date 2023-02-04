import React from 'react'
import './styles/LeftMenu.css'

function LeftMenu() {
  return (
    <div className='menu'>
      <div className='menu_wrap'>
        <h2 className='title'>Dungeons</h2>
    {localStorage.getItem('story')? 
    <>
       <div id="l1">
          <h1 className='list_title'>{localStorage.getItem('playerName')}</h1>
          <ul>
            <div>
              <li>Weapon: {localStorage.getItem("playerWeapon")}</li>
              <ul>
                <li>Weapon Damage: {localStorage.getItem("playerWeaponDamage")}</li>
              </ul>
            </div>
            <div>
            <li>Trait(s): {localStorage.getItem("playerTraits")? localStorage.getItem("playerTraits"): "none"}</li>
            <li>Health: {localStorage.getItem("playerHealth")}</li>
            </div>
          </ul>
        </div> 
        <div id="l2">
               <h1 className='list_title2'>{localStorage.getItem('enemyName')}</h1>
               <ul>
                 <div>
                   <li>Weapon: {localStorage.getItem("enemyWeapon")}</li>
                   <ul>
                     <li>Weapon Damage: {localStorage.getItem("enemyWeaponDamage")}</li>
                   </ul>
                 </div>
                 <div>
                 <li>Trait(s): {localStorage.getItem("enemyTraits")}</li>
                 <li>Health: {localStorage.getItem("enemyHealth")}</li>
                 </div>
               </ul>
             </div> 
             </>
        : null
        }
      </div>
    </div>
    
  )
}

export default LeftMenu