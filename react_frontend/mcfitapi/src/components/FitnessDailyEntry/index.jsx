import React from "react";
import Component33 from "../Component33";
import Component43 from "../Component43";
import Component23 from "../Component23";
import Component13 from "../Component13";
import "./FitnessDailyEntry.css";

function FitnessDailyEntry(props) {
  const {
    path317,
    path318,
    iconAwesomeWpforms,
    subtraction1,
    iconAwesomeHeartbeat,
    iconAwesomeCalendarCheck,
    path3172,
    path3182,
    iconAwesomeWpforms2,
    iconAwesomeAppleAlt,
    iconAwesomeHome,
    path388,
    iconFeatherMessageSquare,
    notificationIcon,
    username,
    smallDown,
    typography,
    typography2,
    typography3,
    typography4,
    typography5,
    iconIonicIosAddCircle,
    iconIonicIosAddCircle2,
    iconIonicIosAddCircle3,
    iconIonicIosAddCircle4,
    spanText,
    spanText2,
    typography6,
    typography7,
    typography8,
    typography9,
    typography10,
    component33Props,
    component43Props,
    component23Props,
    component13Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="fitness-daily-entry screen">
        <div className="overlap-group9">
          <div className="overlap-group">
            <img className="path-317" src={path317} />
            <img className="path-318" src={path318} />
          </div>
          <img className="icon-awesome-wpforms" src={iconAwesomeWpforms} />
          <img className="subtraction-1" src={subtraction1} />
          <img className="icon-awesome-heartbeat" src={iconAwesomeHeartbeat} />
          <img className="icon-awesome-calendar-check" src={iconAwesomeCalendarCheck} />
          <div className="overlap-group">
            <img className="path-317" src={path3172} />
            <img className="path-318" src={path3182} />
          </div>
          <img className="icon-awesome-wpforms" src={iconAwesomeWpforms2} />
          <img className="icon-awesome-apple-alt" src={iconAwesomeAppleAlt} />
          <img className="icon-awesome-home" src={iconAwesomeHome} />
          <div className="group-274">
            <div className="group-273">
              <div className="rectangle-311"></div>
              <div className="overlap-group-1">
                <div className="rectangle-310"></div>
                <div className="rectangle-312"></div>
                <div className="rectangle-313"></div>
              </div>
            </div>
            <img className="path-388" src={path388} />
            <div className="rectangle-309"></div>
          </div>
        </div>
        <div className="overlap-group8">
          <img className="icon-feather-message-square" src={iconFeatherMessageSquare} />
          <div className="overlap-group1">
            <img className="notification-icon" src={notificationIcon} />
            <div className="notification-badge"></div>
          </div>
          <div className="divider"></div>
          <div className="user-menu">
            <div className="username">{username}</div>
            <div className="small-down" style={{ backgroundImage: `url(${smallDown})` }}></div>
          </div>
          <div className="rectangle-160"></div>
        </div>
        <div className="flex-col">
          <h1 className="typography">{typography}</h1>
          <div className="overlap-group7">
            <Component33 overlapGroup3={component33Props.overlapGroup3} typography={component33Props.typography} />
            <Component43 overlapGroup4={component43Props.overlapGroup4} typography={component43Props.typography} />
            <Component23 overlapGroup5={component23Props.overlapGroup5} typography={component23Props.typography} />
            <Component13 overlapGroup6={component13Props.overlapGroup6} typography={component13Props.typography} />
            <div className="typography-1 sourcesanspro-semi-bold-black-25px">{typography2}</div>
            <div className="typography-2 sourcesanspro-semi-bold-black-25px">{typography3}</div>
            <div className="typography-3 sourcesanspro-semi-bold-black-25px">{typography4}</div>
            <div className="typography-4 sourcesanspro-semi-bold-black-25px">{typography5}</div>
            <div className="rectangle-1551"></div>
            <div className="rectangle-1555"></div>
            <div className="rectangle-1556"></div>
            <div className="rectangle-1557"></div>
            <div className="rectangle-1553"></div>
            <div className="rectangle-1566"></div>
            <div className="rectangle-1570"></div>
            <div className="rectangle-1574"></div>
            <div className="rectangle-1559"></div>
            <div className="rectangle-1564"></div>
            <div className="rectangle-1568"></div>
            <div className="rectangle-1573"></div>
            <div className="rectangle-1560"></div>
            <div className="rectangle-1565"></div>
            <div className="rectangle-1569"></div>
            <div className="rectangle-1572"></div>
            <div className="rectangle-1561"></div>
            <div className="rectangle-1563"></div>
            <div className="rectangle-1567"></div>
            <div className="rectangle-1571"></div>
            <img className="icon-ionic-ios-add-circle" src={iconIonicIosAddCircle} />
            <img className="icon-ionic-ios-add-circle-1" src={iconIonicIosAddCircle2} />
            <img className="icon-ionic-ios-add-circle-2" src={iconIonicIosAddCircle3} />
            <img className="icon-ionic-ios-add-circle-3" src={iconIonicIosAddCircle4} />
            <div className="typography-5">
              <span className="span0">{spanText}</span>
              <span>{spanText2}</span>
            </div>
            <div className="typography-6">{typography6}</div>
            <div className="typography-7 sourcesanspro-semi-bold-chicago-25px">{typography7}</div>
            <div className="typography-8 sourcesanspro-semi-bold-chicago-25px">{typography8}</div>
            <div className="typography-9 sourcesanspro-semi-bold-chicago-25px">{typography9}</div>
            <div className="typography-10 sourcesanspro-semi-bold-chicago-25px">{typography10}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FitnessDailyEntry;
