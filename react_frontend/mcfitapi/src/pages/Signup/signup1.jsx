
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import axios from 'axios';
//Components
import Header from '../../components/HeaderW';
//Stylesheet
import './signup.css';
import Cookies from 'universal-cookie'

const theme = createTheme({
    palette: {
      neutral: {
        main: '#000000',
        contrastText: '#ffffff',
      },
      progress: {
          main: '#6220F7',
      }
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
            </div>
            <div style={{position: 'fixed', bottom: '0px', height: '30px', width: '100%'}}>
                <ThemeProvider theme={theme}>
                    <Box  sx={{ ml: "9%", width: "80%"}}>
                        <LinearProgress variant="determinate" value={12.5} color='progress'/>
                    </Box>
                </ThemeProvider>
            </div>
            
        </div>


)};
  
export default Signup1;