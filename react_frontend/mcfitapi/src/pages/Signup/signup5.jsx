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
                            What is your body type?
                        </span>
                        <p className="bottom-padding"/>
                    </div>
                    
                    <div className="side-button">
                        <div className="formField">
                            <ThemeProvider theme={theme}>
                                <Link to="/signup6">
                                    <Button color="neutral" 
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Ectomorph
                                    </Button>
                                </Link>

                                <Link to="/signup6">
                                    <Button color="neutral" 
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Endomorph
                                    </Button>
                                </Link>

                                <Link to="/signup6">
                                    <Button color="neutral" 
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Mesomorph
                                    </Button>
                                </Link>

                                <br/><br/><br/>

                                <Link to="/signup6">
                                    <Button color="neutral" 
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Ayurvedic
                                    </Button>
                                </Link>

                                <Link to="/signup6">
                                    <Button color="neutral" 
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Not Sure
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
