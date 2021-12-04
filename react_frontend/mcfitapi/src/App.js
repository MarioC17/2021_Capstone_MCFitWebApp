import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
//Pages
import NotFoundPage from "./pages/404";
import Login from "./pages/login";
import Forms from "./pages/forms";
import Home from "./pages/Dashboard/home";
import Exercise from "./pages/Dashboard/exercise";
import Signup from "./pages/Signup/signup";
import Fitness from "./pages/Dashboard/fitness";
import TrainerFitness from "./pages/Dashboard/Trainer/fitness";
import TrainerClients from "./pages/Dashboard/Trainer/clients";
import Nutrition from "./pages/Dashboard/Nutrition/nutrition";
import Entry from "./pages/Dashboard/Nutrition/entry";
import Memberships from "./pages/memberships";
import AboutMe from "./pages/aboutme";
import Policy from "./pages/policy";
import Booking from "./pages/Dashboard/booking";
import TrainerBooking from "./pages/Dashboard/Trainer/booking";
import Profile from "./pages/clientPage";
import store from "./store";
import { Provider } from "react-redux";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact={true} path="/" component={Login} />
            <Route exact path="/404" component={NotFoundPage} />
            <Route exact path="/forms" component={Forms} />
            <Route exact path="/fitness/exercise" component={Exercise} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/fitness" component={Fitness} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/trainer/fitness" component={TrainerFitness} />
            <Route exact path="/trainer/clients" component={TrainerClients} />
            <Route exact path="/nutrition" component={Nutrition} />
            <Route exact path="/nutrition/entry" component={Entry} />
            <Route exact path="/memberships" component={Memberships} />
            <Route exact path="/aboutme" component={AboutMe} />
            <Route exact path="/policy" component={Policy} />
            <Route exact path="/booking" component={Booking} />
            <Route exact path="/trainer/booking" component={TrainerBooking} />
            <Route exact path="/profile" component={Profile} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
