import React from "react";
import {SidebarData} from './SidebarData'
import "../App.css"
import {connect} from 'react-redux'
import {logout} from '../actions/auth'


const Sidebar = ({logout}) => {

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
              if (val.title === 'logout'){
                logout();
              }
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

export default connect(null,{logout})(Sidebar)