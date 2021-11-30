import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { Fragment, useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { Link,Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie'

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

const cookies = new Cookies();

const createLoginCookies = async (profile) => {
  await axios({
    method: 'Get',
    url: `http://localhost:8000/api/user/${profile.googleId}/`,
}).then(response => {
  cookies.set('user_id', response.data.user, { path: '/' });
  console.log(cookies.get('user_id')); // Pacman
})



}
const Login = () => {
  const [Profile, setProfile] = useState(null);

  const responseGoogle = async(response) => {
    let googleResponse  = await googleLogin(response.accessToken)
    createLoginCookies(response.profileObj); //Stores user info in cookie
    let user_id = cookies.get('user_id')
    await checkProfile(user_id).then(await has_profile())
  }

  const has_profile = () => {
    console.log(Profile)
    if (Profile){
      <Redirect to="/fitness" />
    }
    else{
      <Redirect to="/signup" />
    }
  }

  //check if profile already exists
  const checkProfile = async (user_id) => {
    await axios({
        method: 'GET',
        url: `http://localhost:8000/api/profile/1/`,
    }).then(response => {
      setProfile(true);
      console.log(response);
    }).catch(e => {
      setProfile(false);
      console.log(e);
    });
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
          </div>
            <GoogleLogin
            clientId="35091798775-4a59pnnbajjnmrmh3s06lqr22oqkkgtc.apps.googleusercontent.com"
            buttonText="LOGIN WITH GOOGLE"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
      </div>
    </div>

);}


export default Login;