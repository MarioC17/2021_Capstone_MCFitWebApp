import { createTheme } from '@mui/material/styles';
import React, { useState } from "react";
//Stylesheet
import './signup.css';
import Signup1 from './signup1';
import Signup2 from './signup2';



const theme = createTheme({
    palette: {
      neutral: {
        main: 'black',
        contrastText: 'white',
      },
    },
  });

const Signup = () => {

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
        <Signup1 nextStep = {nextStep} />
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