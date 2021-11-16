import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

//Pages
import NotFoundPage from "./pages/404"
import Login from "./pages/login"
import Forms from "./pages/forms"
import Exercise from "./pages/exercise"
import Signup from "./pages/Signup/signup"
import Fitness from "./pages/fitness"
import Signup2 from "./pages/Signup/signup2"
import Signup3 from "./pages/Signup/signup3"
import Signup4 from "./pages/Signup/signup4"
import Signup5 from "./pages/Signup/signup5"
import Signup6 from "./pages/Signup/signup6"
import Signup7 from "./pages/Signup/signup7"
import Signup8 from "./pages/Signup/signup8"
import Signup9 from "./pages/Signup/signup9"
import Memberships from "./pages/memberships"
import AboutMe from "./pages/aboutme"
import Policy from "./pages/policy"
import Booking from "./pages/booking"

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
          <Route exact path="/fitness" component={Fitness}/>
          <Route exact path="/signup2" component={Signup2}/>
          <Route exact path="/signup3" component={Signup3}/>
          <Route exact path="/signup4" component={Signup4}/>
          <Route exact path="/signup5" component={Signup5}/>
          <Route exact path="/signup6" component={Signup6}/>
          <Route exact path="/signup7" component={Signup7}/>
          <Route exact path="/signup8" component={Signup8}/>
          <Route exact path="/signup9" component={Signup9}/>
          <Route exact path="/signup8" component={Booking}/>
          <Route exact path="/memberships" component={Memberships}/>
          <Route exact path="/aboutme" component={AboutMe}/>
          <Route exact path="/policy" component={Policy}/>
          <Route exact path="/booking" component={Booking}/>
          <Redirect to="/404"/>
        </Switch>
      </Router>
    )  
  }
}

export default App;