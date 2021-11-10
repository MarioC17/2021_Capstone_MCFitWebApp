import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";

//Components
import Header from './components/Header'
import Footer from './components/Footer'

//Pages
import HomePage from "./pages"
import NotFoundPage from "./pages/404"
import Login from "./pages/login"
import Forms from "./pages/forms"
import Exercise from "./pages/excercise"
import Signup from "./pages/Signup/signup"

class App extends Component {
  render(){
    return (
      <Router>
        <Header/>
        <Switch>
          <Route exact={true} path="/" component={HomePage}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/404" component={NotFoundPage}/>
          <Route exact path="/forms" component={Forms}/>
          <Route exact path="/exercise" component={Exercise}/>
          <Route exact path="/signup" component={Signup}/>
          <Redirect to="/404"/>
        </Switch>
        <Footer/>
      </Router>
    )  
  }
}

export default App;