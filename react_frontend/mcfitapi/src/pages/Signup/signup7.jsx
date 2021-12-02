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
        main: 'black',
        contrastText: 'white',
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

  const Signup7 = (props) => {
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
                            What is your diet like?
                        </span>
                        <p className="bottom-padding"/>
                    </div>
                    <div className="good-button">
                       <ThemeProvider theme={theme}>
                            <Button color="reversed" 
                            variant="contained"
                            style={{maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                            onClick={e => props.previousStep(e)}>
                                Go Back    
                            </Button>
                        </ThemeProvider>
                    </div>
                    <div className="side-button">
                        <div className="formField3">
                            <ThemeProvider theme={theme}>
                                    <Button color="neutral" 
                                        name='diet'                   
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        I eat anything
                                    </Button>



                                    <Button color="neutral" 
                                        name='diet'                   
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        I am vegetarian
                                    </Button>



                                    <Button color="neutral" 
                                        name='diet'                   
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        I am vegan
                                    </Button>


                                <br/><br/><br/>

                                    <Button color="neutral" 
                                        name='diet'                   
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        I am pescatarian
                                    </Button>

                                    <Button color="neutral" 
                                        name='diet'                   
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Something else
                                    </Button>
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
                <div style={{position: 'fixed', bottom: '0px', height: '30px', width: '100%'}}>
                <ThemeProvider theme={theme}>
                    <Box  sx={{ ml: "9%", width: "80%"}}>
                        <LinearProgress variant="determinate" value={87.5} color='progress'/>
                    </Box>
                </ThemeProvider>
                </div>
            </div>
        )
    }


export default Signup7
