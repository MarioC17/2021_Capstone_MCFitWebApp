import React, { Component,useState } from 'react'
import './signup.css'
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
//Components
import Header from '../../components/HeaderW'
import Cookies from 'universal-cookie'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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
    const history = useHistory();

    const cookies = new Cookies();

    const createProfile = async (e) => {
        e.preventDefault()
        await axios({
          method: 'post',
          url:'http://localhost:8000/api/profile',
          data: props.formData
        }).then(response=>{
          console.log(response.data);
          history.push("/fitness")//Change to dashboard
        })
        }

    return (
        <div style={{backgroundColor: "white", minHeight: "100vh"}}>
            <Header/>
            <div className="container2">
                <div className="welcome-text">
                    <span className="welcome-style">
                        Thank you for answering our questions.
                    </span>
                    <p className="bottom-padding"/>
                </div>
            <div className="good-button">
                <div className="formField3">
                    <ThemeProvider theme={theme}>
                        <Button color="reversed" 
                            onClick={e => props.previousStep(e)}
                            variant="contained"
                            style={{maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                            >
                            Go Back
                        </Button>
                        <Button color="neutral" 
                            onClick={e => createProfile(e)}
                            variant="contained"
                            style={{maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                            >
                            Click here to finish signing up
                        </Button>
                    </ThemeProvider>
                </div>
                </div>
            </div>
            <div style={{position: 'fixed', bottom: '0px', height: '30px', width: '100%'}}>
                <ThemeProvider theme={theme}>
                    <Box  sx={{ ml: "9%", width: "80%"}}>
                        <LinearProgress variant="determinate" value={100} color='progress'/>
                    </Box>
                </ThemeProvider>
            </div>
        </div>
    )






      /*
      OLD
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
                            information you've provided. Talk soon!
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
    */
    }


export default Signup7
