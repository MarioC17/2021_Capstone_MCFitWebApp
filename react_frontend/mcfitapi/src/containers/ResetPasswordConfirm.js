import React, { Component,useState} from "react";
import GoogleOAuth from "../components/GoogleLogin";
import img from "../static/img/login-image.png";
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import {reset_password_confirm} from '../actions/auth';
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



const ResetPasswordConfirm = ({match, reset_password_confirm}) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password:'',
        re_new_password: ''
    });

    const {new_password,re_new_password} = formData;

    const onChange = e => setFormData({...formData,[e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;

        reset_password_confirm(uid,token,new_password,re_new_password);
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
                type="password"
                className="loginformFieldInput"
                placeholder="New password"
                name="new_password"
                value={new_password}
                onChange={e => onChange(e)}
                minLength='6'
                required
                />
            </div>

            <div className="formField">
                <input
                type="password"
                className="loginformFieldInput"
                placeholder="Confirm new password"
                name="re_new_password"
                value={re_new_password}
                onChange={e => onChange(e)}
                minLength='6'
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



export default connect(null,{reset_password_confirm}) (ResetPasswordConfirm);