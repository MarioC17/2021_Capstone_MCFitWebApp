import React, { Component } from "react";
import { Link } from "react-router-dom";
import GoogleOAuth from "../components/GoogleLogin";
import img from "../static/img/login-image.png";
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//Components
import Header from '../components/Header'

//style
import "./login.css";

const theme = createTheme({
  palette: {
    neutral: {
      main: 'white',
      contrastText: 'black',
    },
  },
});

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("The form was submitted with the following data:");
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="container">
          <div className="empty">
          </div>
          <div className="photo">
            <img src={img} alt=""/>
          </div>
          <div className="some-text">
            <span className="text-1">
              CUSTOMIZED<br />
              TRAINING <br />
              JUST FOR YOU
            </span>
          </div>
          <div className="login">
            <span className="sourcesanspro-bold-white-40px" >
              WELCOME BACK
            </span>
            <p className="bottom-padding"/>
            <form className="formFields" onSubmit={this.handleSubmit}>
              <div className="formField">
                <input
                  type="username"
                  id="username"
                  className="formFieldInput"
                  placeholder="Enter your username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>

              <div className="formField">
                <input
                  type="password"
                  id="password"
                  className="formFieldInput"
                  placeholder="Enter your password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>

              <div className="formField">
                <ThemeProvider theme={theme}>
                  <Button color="neutral" 
                  variant="contained"
                  onClick={this.handleSubmit}>
                    Sign In
                  </Button>
                </ThemeProvider>
                
                <GoogleOAuth/>
                <Link to="/signup" className="formFieldLink">
                  <span className="sourcesanspro-normal-white-17px">Don't have an account? <b>Sign Up Now</b></span>
                </Link>
              </div>
            </form>

          </div>
        </div>
        
      </div>
    );
  }
}

export default Login;