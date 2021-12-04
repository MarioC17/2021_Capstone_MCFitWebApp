import React from "react";
import "../App.css";
import { SidebarData } from './TrainerSidebarData';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Sidebar = () => {
  const history = useHistory();

  function handleLogout() {
    var cookies = new Cookies();
    cookies.remove('user_id');
    cookies.remove('first_name');
    cookies.remove('last_name');
    cookies.remove('email');
    return history.push("/");
  };  

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
                handleLogout();
                console.log("logout")
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

export default Sidebar