import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
//Components
import Header from '../../components/HeaderW';
import './signup.css';

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
                <div style={{marginLeft: '5%'}}>
                    <p className="bottom-padding"/>
                    <div className="welcome-text">
                        <span className="head-style">
                            Thank you for signing up and answering our questions.
                            <br/><br/><br/>
                        </span>
                        <span className="welcome-style">
                            We will contact you within 24 hours using the <br/><br/>
                            informatino you've provided. Talk soon!
                            <br/><br/><br/>
                            In the meantime, check out our pricing options.
                        </span>
                        <p className="bottom-padding"/>
                    </div>
                    
                    <div className="good-button">
                        <div className="formField">
                            <ThemeProvider theme={theme}>
                                <Link to="/memberships">
                                    <Button color="neutral" 
                                        variant="contained"
                                        style={{maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        See pricing
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
