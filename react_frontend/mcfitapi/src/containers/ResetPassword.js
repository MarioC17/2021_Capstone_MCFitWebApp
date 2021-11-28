import React, { Component,useState} from "react";
import GoogleOAuth from "../components/GoogleLogin";
import img from "../static/img/login-image.png";
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import {reset_password} from '../actions/auth';
//Components
import Header from '../components/Header'

//style
import "../pages/login.css";

const theme = createTheme({
  palette: {
    neutral: {
      main: 'white',
      contrastText: 'black',
    },
  },
});



const ResetPassword = ({reset_password}) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email:''
    });

    const {email} = formData;

    const onChange = e => setFormData({...formData,[e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        reset_password(email);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to='/' />
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
        <div className="login-form">
            <span className="sourcesanspro-bold-white-40px" >
            Request Password Reset
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
                <ThemeProvider theme={theme}>
                <Button color="neutral" 
                variant="contained"
                onClick={e => onSubmit(e)}>
                    Reset Password
                </Button>
                </ThemeProvider>
            </div>
            </form>
        </div>
        </div>
    </div>
    );}



export default connect(null,{reset_password}) (ResetPassword);