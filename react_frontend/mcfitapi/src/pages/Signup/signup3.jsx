import React, { Component } from 'react'
import './signup.css'
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
//Components
import Header from '../../components/HeaderW'

const theme = createTheme({
    palette: {
      neutral: {
        main: '#000000',
        contrastText: '#ffffff',
      },
      reversed: {
        main: '#ffffff',
        contrastText: '#000000',
      },
      progress: {
        main: '#6220F7',
    }
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
                            What are your <span style={{fontWeight: '700'}}>fitness</span> goals?
                        </span>
                        <p className="bottom-padding"/>
                    </div>
                    <div className="good-button">
                        <ThemeProvider theme={theme}>
                            <Button color="reversed" 
                                onClick={e => props.previousStep(e)}
                                variant="contained"
                                style={{maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                >
                                Go back
                            </Button>
                        </ThemeProvider>
                    </div>
                    <div className="side-button">
                        <div className="formField3">
                            <ThemeProvider theme={theme}>
                                    <Button color="neutral"
                                        name='fitness_goal'
                                        
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Weightloss
                                    </Button>
                         

                                
                                    <Button color="neutral" 
                                        name='fitness_goal'
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Bodybuilding
                                    </Button>


               
                                    <Button color="neutral"
                                        name='fitness_goal'
                                        
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Strength
                                    </Button>


                                <br/><br/><br/>

                                    <Button color="neutral" 
                                        name='fitness_goal'
                                        
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        General Fitness
                                    </Button>


                                    <Button color="neutral" 
                                        name='fitness_goal'
                                        
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Muscle Tone
                                    </Button>


                
                                    <Button color="neutral" 
                                        name='fitness_goal'
                                        
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Power lifting
                                    </Button>
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
                <div style={{position: 'fixed', bottom: '0px', height: '30px', width: '100%'}}>
                <ThemeProvider theme={theme}>
                    <Box  sx={{ ml: "9%", width: "80%"}}>
                        <LinearProgress variant="determinate" value={37.5} color='progress'/>
                    </Box>
                </ThemeProvider>
                </div>
            </div>
        )
    }

export default Signup3
