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
                        <div className="formField">
                            <ThemeProvider theme={theme}>
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
                
            </div>
)};

export default Signup2;
