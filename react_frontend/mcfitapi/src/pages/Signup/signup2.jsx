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

const Signup2 = (props) => {
        return (
            <div style={{backgroundColor: "white", minHeight: "100vh"}}>
                <Header/>
                <div className="container2">
                    <div className="welcome-text">
                        <span className="welcome-style">
                            Great! Now that you have an account,
                            <br />
                            <br />
                            tell us more about yourself.
                        </span>
                        <p className="bottom-padding"/>
                    </div>
                    
                    <div className="good-button">
                        <div className="formField2">
                            <ThemeProvider theme={theme}>
                                <Button color="reversed" 
                                    onClick={e => props.previousStep(e)}
                                    variant="contained"
                                    style={{maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}>
                                    Go back
                                </Button>
                                <Button color="neutral" 
                                    onClick={e => props.nextStep(e)}
                                    variant="contained"
                                    style={{maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}>
                                    Sounds Good!
                                </Button>
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
                <div style={{position: 'fixed', bottom: '0px', height: '30px', width: '100%'}}>
                <ThemeProvider theme={theme}>
                    <Box  sx={{ ml: "9%", width: "80%"}}>
                        <LinearProgress variant="determinate" value={25} color='progress'/>
                    </Box>
                </ThemeProvider>
                </div>
            </div>
)};

export default Signup2;
