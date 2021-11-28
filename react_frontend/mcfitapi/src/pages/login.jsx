import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { Fragment, useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';
//Components
import Header from '../components/Header';
import img from "../static/img/login-image.png";
//style
import "./login.css";
import googleLogin from "../services/googleLogin";


const theme = createTheme({
  palette: {
    neutral: {
      main: 'white',
      contrastText: 'black',
    },
  },
});



const Login = () => {
  const [formData, setFormData] = useState({
    email:'',
    password:''
  });

  const {email,password} = formData;

  const onChange = e => setFormData({...formData,[e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();

  };

  const responseGoogle = async(response) => {
    let googleResponse  = await googleLogin(response.accessToken)
    console.log(googleResponse);
    console.log(response); //gets google id of person logging in
  }
return (
  <div>
    <Header/>
    <div className="login-container">
      <div className="empty">
      </div>
      <div className="photo">
        <img src={img} alt=""/>
      </div>
      <div className="some-text">
        <span className="custom-text">
          CUSTOMIZED<br />
          TRAINING <br />
          JUST FOR YOU
        </span>
      </div>
      <div className="login-form">
        <span className="sourcesanspro-bold-white-40px" >
          WELCOME BACK
        </span>
        <p className="bottom-padding"/>
        <form className="formFields" onSubmit={e => onSubmit(e)}>
          <div className="formField">
            <input
              type="email"
              id="email"
              className="loginformFieldInput"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>

          <div className="formField">
            <input
              type="password"
              id="password"
              className="loginformFieldInput"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              minLength='6'
              required
            />
          </div>
            <GoogleLogin
            clientId="35091798775-4a59pnnbajjnmrmh3s06lqr22oqkkgtc.apps.googleusercontent.com"
            buttonText="LOGIN WITH GOOGLE"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
          <div className="formField">
            <ThemeProvider theme={theme}>
              <Button color="neutral" 
              variant="contained"
              onClick={e => onSubmit(e)}>
                Sign In
              </Button>
            </ThemeProvider>
            <br/>
            <Link to="/signup" className="formFieldLink">
              <span className="sourcesanspro-normal-white-17px">Don't have an account? <b>Sign Up Now</b></span>
            </Link>
            <br/>
            <Link to="/reset-password">
              <span className="sourcesanspro-normal-white-17px">Forgot your password? <b>Reset Password</b></span>
            </Link>
            
          </div>
        </form>
      </div>
    </div>
  </div>
);}


export default Login;