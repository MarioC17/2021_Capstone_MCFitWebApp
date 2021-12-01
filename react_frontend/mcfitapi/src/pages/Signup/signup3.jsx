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

  const Signup3 = (props) => {
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
                            What are your fitness goals?
                        </span>
                        <p className="bottom-padding"/>
                    </div>
                    <div className="good-button"></div>
                    <div className="side-button">
                        <div className="formField">
                            <ThemeProvider theme={theme}>
                                    <Button color="neutral"
                                        name='fitness_goal'
                                        
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Weightloss
                                    </Button>
                         

                                
                                    <Button color="neutral" 
                                        name='fitness_goal'
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Bodybuilding
                                    </Button>


               
                                    <Button color="neutral"
                                        name='fitness_goal'
                                        
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Strength
                                    </Button>


                                <br/><br/><br/>

                                    <Button color="neutral" 
                                        name='fitness_goal'
                                        
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        General Fitness
                                    </Button>


                                    <Button color="neutral" 
                                        name='fitness_goal'
                                        
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Muscle Tone
                                    </Button>


                
                                    <Button color="neutral" 
                                        name='fitness_goal'
                                        
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Power lifting
                                    </Button>


                                    <Button color="neutral" 
                                        onClick={e => props.previousStep(e)}
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Go back
                                    </Button>


                            </ThemeProvider>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }

export default Signup3
