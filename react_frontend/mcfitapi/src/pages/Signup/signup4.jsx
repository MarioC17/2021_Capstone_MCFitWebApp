import React, { Component } from 'react'
import './signup.css'
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//Components
import Header from '../../components/HeaderW'

const theme = createTheme({
    palette: {
      neutral: {
        main: 'black',
        contrastText: 'white',
      },
    },
  });

  const Signup4 = (props) => {

    const onSubmit = e => {
        e.preventDefault();
        props.setFormData({...props.formData,[e.target.name]: e.target.textContent});
        props.nextStep();
        }
        return (
            <div style={{backgroundColor: "white", minHeight: "100vh"}}>
                <Header/>
                <div className="container2">
                    <div className="welcome-text">
                        <span className="welcome-style">
                            This is essential to create a &nbsp;&nbsp;
                            <br />
                            <br />
                            personalized program for your goals.
                        </span>
                        <p className="bottom-padding"/>
                    </div>
                    
                    <div className="side-button">
                        <div className="formField">
                            <ThemeProvider theme={theme}>
                                    <Button color="neutral" 
                                        name='gender'
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Male
                                        </Button>
                                    <Button color="neutral" 
                                        name='gender'
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Female
                                    </Button>

                                    <Button color="neutral" 
                                        name='gender'
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Non-Binary
                                    </Button>
                                    
                                    <Button color="neutral" 
                                        name='gender'
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Prefer not to say
                                    </Button>
                                    
                                    <Button color="neutral" 
                                        onClick={e => props.previousStep(e)}
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Go Back
                                    </Button>

                            </ThemeProvider>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }


export default Signup4
