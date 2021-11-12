import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

//Pages
import NotFoundPage from "./pages/404"
import Login from "./pages/login"
import Forms from "./pages/forms"
import Exercise from "./pages/excercise"
import Signup from "./pages/Signup/signup"
import Memberships from "./pages/memberships"
import AboutMe from "./pages/aboutme"
import Policy from "./pages/policy"

class App extends Component {
  render(){
    return (
      <Router>
        <Switch>
          <Route exact={true} path="/" component={Login}/>
          <Route exact path="/404" component={NotFoundPage}/>
          <Route exact path="/forms" component={Forms}/>
          <Route exact path="/exercise" component={Exercise}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/memberships" component={Memberships}/>
          <Route exact path="/aboutme" component={AboutMe}/>
          <Route exact path="/policy" component={Policy}/>
          <Redirect to="/404"/>
        </Switch>
      </Router>
    )  
  }
}

export default App;