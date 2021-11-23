import React from "react";
import {SidebarData} from './SidebarData'
import "../App.css"
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
      {SidebarData.map((val, key) => {
        return (
          <li 
            key={key} 
            className="row"
            onClick={()=> {
              window.location.pathname = val.link;
            }}
          >
            <div id="icon">{val.icon}</div>
          </li>
        );
      })}
      </ul>
    </div>
  )
}

export default Sidebar
