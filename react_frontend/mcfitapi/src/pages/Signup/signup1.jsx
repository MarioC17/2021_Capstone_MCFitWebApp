
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
//Components
import Header from '../../components/HeaderW';
//Stylesheet
import './signup.css';
import Cookies from 'universal-cookie'

const theme = createTheme({
    palette: {
      neutral: {
        main: 'black',
        contrastText: 'white',
      },
    },
  });

const cookies = new Cookies();

const Signup1 = (props) => {
      const onSubmit = e => {
        let user = cookies.get('user_id')
        props.setFormData({...props.formData,['user']: user});
        //checkProfile(user_id);
        e.preventDefault();
        props.nextStep();
        }

    const onChange = e => props.setFormData({...props.formData,[e.target.name]: e.target.value});

    return(
        <div style={{backgroundColor: "white", minHeight: "100vh"}}>
        <Header/>
        <div class="container">
            <div className="a">
                <span className="head-text-style">
                    Let’s connect! Please complete your <br />
                    <br />
                    information so we can get to know you.
                </span>
            </div>
            <div className="b">
                <form className="formFields">
                    
                <div className="formField">
                        <input
                        type="tel"
                        id="phone_num"
                        className="formFieldInput"
                        placeholder="Phone Number"
                        name="phone_num"
                        value={props.phone_num}
                        onChange={e => onChange(e)}
                        required
                        />
                    </div>

                    <div className="formField">
                        <input
                        type="address"
                        id="address"
                        className="formFieldInput"
                        placeholder="Address"
                        name="address"
                        value={props.address}
                        onChange={e => onChange(e)}
                        required
                        />
                    </div>

                    <div className="formField">
                        <input
                        type="tel"
                        id="emergency_contact"
                        className="formFieldInput"
                        placeholder="Emergency Contact"
                        name="emergency_contact"
                        value={props.emergency_contact}
                        onChange={e => onChange(e)}
                        required
                        />
                    </div>

                    <div className="formField">
                        <ThemeProvider theme={theme}>
                            <Button color="neutral" 
                                variant="contained"
                                onClick={e => onSubmit(e)}>
                                Sign Up
                            </Button>
                        </ThemeProvider>
                    </div>
                </form>
            </div>
            <div className="c">                        
            <form className="formFields">
                    <div className="formField">
                        <input
                        type="last_name"
                        id="last_name"
                        className="formFieldInput"
                        placeholder="Last name"
                        name="last_name"
                        value={last_name}
                        onChange={e => onChange(e)}
                        required
                        />
                    </div>

                    <div className="formField">
                        <input
                        type="tel"
                        id="phone_number"
                        className="formFieldInput"
                        placeholder="Phone Number"
                        name="phone_number"
                        value={phone_number}
                        onChange={e => onChange(e)}
                        required
                        />
                    </div>

                    <div className="formField">
                        <input
                        type="password"
                        id="confirm_password"
                        className="formFieldInput"
                        placeholder="Confirm Password"
                        name="re_password"
                        value={re_password}
                        onChange={e => onChange(e)}
                        required
                        />
                    </div>

                    <Link to="/singup2" className="formFieldLink">
                        <span className="sourcesanspro-normal-black-15px"><u>Already have an account? Sign In.</u></span>
                    </Link>
                </form>
            </div>
        </div>
    </div>

)};
  
export default Signup1;