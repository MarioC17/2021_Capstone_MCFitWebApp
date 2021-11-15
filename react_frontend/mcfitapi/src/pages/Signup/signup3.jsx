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
                            What are your fitness goals?
                        </span>
                        <p className="bottom-padding"/>
                    </div>
                    <div className="good-button"></div>
                    <div className="side-button">
                        <div className="formField">
                            <ThemeProvider theme={theme}>
                                <Link to="/signup4">
                                    <Button color="neutral" 
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Weightloss
                                    </Button>
                                </Link>

                                <Link to="/signup4">
                                    <Button color="neutral" 
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Bodybuilding
                                    </Button>
                                </Link>

                                <Link to="/signup4">
                                    <Button color="neutral" 
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Strength
                                    </Button>
                                </Link>

                                <br/><br/><br/>

                                <Link to="/signup4">
                                    <Button color="neutral" 
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        General Fitness
                                    </Button>
                                </Link>

                                <Link to="/signup4">
                                    <Button color="neutral" 
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Muscle Tone
                                    </Button>
                                </Link>

                                <Link to="/signup4">
                                    <Button color="neutral" 
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Power lifting
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
