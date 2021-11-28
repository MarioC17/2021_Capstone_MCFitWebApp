import React, { Component,useState} from "react";
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signup } from '../../actions/auth';

//Components
import Header from '../../components/HeaderW'
import Signup1 from './signup1';
import Signup2 from './signup2';
//Stylesheet
import './signup.css';


const theme = createTheme({
    palette: {
      neutral: {
        main: 'black',
        contrastText: 'white',
      },
    },
  });

const Signup = ({signup, isAuthenticated }) => {

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1)
  }

  const previousStep = () => {
    setStep(step - 1)
  }

  switch(step) {
    case 1:
      return(
        <div>
        <Signup1 nextStep = {nextStep} signup = {signup} isAuthenticated = {isAuthenticated} />
        </div>
    )
    case 2:
      return(
        <Signup2 nextStep = {nextStep}/>
    )
    case 3:
      return(
        <h1>step 1</h1>
    )
    case 4:
      return(
        <h1>step 1</h1>
    )
    case 5:
      return(
        <h1>step 1</h1>
    )
    case 6:
      return(
        <h1>step 1</h1>
    )
    case 7:
      return(
        <h1>step 1</h1>
    )
    case 8:
      return(
        <h1>step 1</h1>
    )
    case 9:
      return(
        <h1>step 1</h1>
    )
  }
  ;}

  export default Signup;