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

export class signup2 extends Component {
    render() {
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
                            <Link to="/signup5">
                                    <Button color="neutral" 
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Male
                                    </Button>
                                </Link>

                                <Link to="/signup5">
                                    <Button color="neutral" 
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Female
                                    </Button>
                                </Link>

                                <Link to="/signup5">
                                    <Button color="neutral" 
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Prefer not to say
                                    </Button>
                                </Link>
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default signup2
