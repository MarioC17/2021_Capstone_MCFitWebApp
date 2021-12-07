import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { Fragment, useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { Link, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie'

//Components
import Header from '../components/Header';
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
  cookies.set('user_id', response.data.user, { path: '/' ,maxAge:10800});
  cookies.set('first_name', profile.givenName, { path: '/' ,maxAge:10800});
  cookies.set('last_name', profile.familyName, { path: '/' ,maxAge:10800});
  cookies.set('email', profile.email, { path: '/' ,maxAge:10800});
})

}
const Login = () => {
  const responseGoogle = async(response) => {
    let googleResponse  = await googleLogin(response.accessToken)
    //Storing required information in cookies
    //console.log(response)
    await createLoginCookies(response.profileObj); //Stores user info in cookie
    let user_id = cookies.get('user_id')
    await checkProfile(user_id)
  }

  const history = useHistory();
  let isLoggedIn = useState(false);

  const checkStaff = async (user) => {
    await axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/api/Auth/${user}/`,
    }).then(response => {
      if (response.data.is_staff) {
        console.log("Is Staff")
        cookies.set('is_staff', true);
        return history.push("/trainer/clients");
      }
      else {
        console.log("Not Staff")
        cookies.set('is_staff', false);
        return history.push("/home")
      }
    }).catch(e => {
      console.log("error")
    })
  }

  //check if profile already exists
  const checkProfile = async (user_id) => {
    await axios({
        method: 'GET',
        url: `http://localhost:8000/api/profile/${user_id}/`,
    }).then(response => {
      console.log("PROFILE FOUND");
      console.log(response);
      cookies.set('fitness_goal', response.data.fitness_goal);
      return checkStaff(user_id)
    }).catch(e => {
      console.log("PROFILE NOT FOUND");
      console.log(e);
      
      return history.push("/signup");
    });
        }

return (
  <div>
    <Header/>
    <div className="login-container">
      <div className="login-side" style={{textAlign: 'center'}}>
        <span className="welcome-text" >
          WELCOME BACK
        </span>
        <p className="bottom-padding"/>
        <div style={{textAlign: 'center'}}>
          <GoogleLogin
            clientId="35091798775-4a59pnnbajjnmrmh3s06lqr22oqkkgtc.apps.googleusercontent.com"
            buttonText="LOGIN WITH GOOGLE"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </div>  
      </div>
      <div className="image-side">
        <span className="custom-text">
          CUSTOMIZED<br />
          TRAINING <br />
          TO MEET YOUR <br/>
          GOALS
        </span>
      </div>
    </div>
  </div>

);}


export default Login;