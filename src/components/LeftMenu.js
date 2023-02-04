import React from 'react'
import './styles/LeftMenu.css'

function LeftMenu() {
  return (
    <div className='menu'>
      <div className='menu_wrap'>
        <h2 className='title'>Dungeons</h2>
        <div id="l1">
          <h1 className='list_title'>Enemies</h1>
          <ul>
            <div>
              <li>Stan</li>
              {/* When 'Stan' is clicked, drop down new menu of their stats */}
              <ul>
                <li>Facts</li>
              </ul>
            </div>
            <div>
            <li>Fact</li>
            <li>Fact</li>
            <li>Fact</li>
            <li>Fact</li>
            <li>Fact</li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LeftMenu