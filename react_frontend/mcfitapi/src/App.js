import React, { Component } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
//Pages
import NotFoundPage from "./pages/404";
import AboutMe from "./pages/aboutme";
import Profile from "./pages/clientPage";
import Booking from "./pages/Dashboard/booking";
import Exercise from "./pages/Dashboard/exercise";
import Fitness from "./pages/Dashboard/fitness";
import Home from "./pages/Dashboard/home";
import Entry from "./pages/Dashboard/Nutrition/entry";
import Nutrition from "./pages/Dashboard/Nutrition/nutrition";
import TrainerBooking from "./pages/Dashboard/Trainer/booking";
import TrainerClients from "./pages/Dashboard/Trainer/clients";
import TrainerFitness from "./pages/Dashboard/Trainer/fitness";
import Forms from "./pages/forms";
import Login from "./pages/login";
import Memberships from "./pages/memberships";
import Policy from "./pages/policy";
import Signup from "./pages/Signup/signup";
import store from "./store";

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
