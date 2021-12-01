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

  const Signup6 = (props) => {
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
                        What is your level of physical activity?
                    </span>
                    <p className="bottom-padding"/>
                </div>
                
                <div className="side-button">
                    <div className="formField">
                        <ThemeProvider theme={theme}>
                                <Button color="neutral" 
                                    name='physical_activity'
                                        
                                    onClick={e => onSubmit(e)}
                                    variant="contained"
                                    style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                    >
                                    Not Active
                                </Button>



                                <Button color="neutral" 
                                    name='physical_activity'
                                            
                                    onClick={e => onSubmit(e)}
                                    variant="contained"
                                    style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                    >
                                    Somewhat Active
                                </Button>


                            <br/><br/><br/>
                                <Button color="neutral" 
                                    name='physical_activity'
                                            
                                    onClick={e => onSubmit(e)}
                                    variant="contained"
                                    style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                    >
                                    Highly Active
                                </Button>

                                <Button color="neutral" 
                                    name='physical_activity'
                                            
                                    onClick={e => onSubmit(e)}
                                    variant="contained"
                                    style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                    >
                                    Extremely Active
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


export default Signup6
