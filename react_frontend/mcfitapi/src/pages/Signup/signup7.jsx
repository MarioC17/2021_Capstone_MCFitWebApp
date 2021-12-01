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
                    
                    <div className="side-button">
                        <div className="formField">
                            <ThemeProvider theme={theme}>
                                    <Button color="neutral" 
                                        name='diet'                   
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        I eat anything
                                    </Button>



                                    <Button color="neutral" 
                                        name='diet'                   
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        I am vegetarian
                                    </Button>



                                    <Button color="neutral" 
                                        name='diet'                   
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        I am vegan
                                    </Button>


                                <br/><br/><br/>

                                    <Button color="neutral" 
                                        name='diet'                   
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        I am pescatarian
                                    </Button>

                                    <Button color="neutral" 
                                        name='diet'                   
                                        onClick={e => onSubmit(e)}
                                        variant="contained"
                                        style={{marginLeft: '15px', maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                                        >
                                        Something else
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


export default Signup7
