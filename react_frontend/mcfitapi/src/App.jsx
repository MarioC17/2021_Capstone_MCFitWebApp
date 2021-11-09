import "./App.css";
import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import FitnessDailyEntry from "./components/FitnessDailyEntry";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:path(|fitness-daily-entry)">
          <FitnessDailyEntry {...fitnessDailyEntryData} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
const component33Data = {
    overlapGroup3: "/img/union-4@1x.png",
    typography: "Training Regimen",
};

const component43Data = {
    overlapGroup4: "/img/union-6@1x.png",
    typography: "Progress",
};

const component23Data = {
    overlapGroup5: "/img/union-2@1x.png",
    typography: "Goals",
};

const component13Data = {
    overlapGroup6: "/img/union-1@1x.png",
    typography: "Daily entry",
};

const fitnessDailyEntryData = {
    path317: "/img/path-317-1@1x.png",
    path318: "/img/path-318-1@1x.png",
    iconAwesomeWpforms: "/img/icon-awesome-wpforms-1@1x.png",
    subtraction1: "/img/subtraction-1@1x.png",
    iconAwesomeHeartbeat: "/img/icon-awesome-heartbeat@1x.png",
    iconAwesomeCalendarCheck: "/img/icon-awesome-calendar-check@1x.png",
    path3172: "/img/path-317-1@1x.png",
    path3182: "/img/path-318-1@1x.png",
    iconAwesomeWpforms2: "/img/icon-awesome-wpforms-1@1x.png",
    iconAwesomeAppleAlt: "/img/icon-awesome-apple-alt@1x.png",
    iconAwesomeHome: "/img/icon-awesome-home@1x.png",
    path388: "/img/path-388@1x.png",
    iconFeatherMessageSquare: "/img/icon-feather-message-square@1x.png",
    notificationIcon: "/img/notification-icon@1x.png",
    username: "Jane Doe",
    smallDown: "/img/path-26@1x.png",
    typography: "Fitness",
    typography2: "Exercise 1",
    typography3: "Exercise 3",
    typography4: "Exercise 2",
    typography5: "Exercise 4",
    iconIonicIosAddCircle: "/img/icon-ionic-ios-add-circle-1@1x.png",
    iconIonicIosAddCircle2: "/img/icon-ionic-ios-add-circle-1@1x.png",
    iconIonicIosAddCircle3: "/img/icon-ionic-ios-add-circle-1@1x.png",
    iconIonicIosAddCircle4: "/img/icon-ionic-ios-add-circle-1@1x.png",
    spanText: "This information will automatically upload to your calendar. You can disable this anytime. ",
    spanText2: "Show me.",
    typography6: "You can enter exercises you’ve worked on here.",
    typography7: "Sets",
    typography8: "Reps",
    typography9: "Load",
    typography10: "RIR",
    component33Props: component33Data,
    component43Props: component43Data,
    component23Props: component23Data,
    component13Props: component13Data,
};

