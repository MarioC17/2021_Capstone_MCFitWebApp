import { createTheme } from '@mui/material/styles';
import React, { useState } from "react";
import axios from 'axios';
//Stylesheet
import './signup.css';
import Signup1 from './signup1';
import Signup2 from './signup2';
import Signup3 from './signup3';
import Signup4 from './signup4';
import Signup5 from './signup5';
import Signup6 from './signup6';
import Signup7 from './signup7';
import Signup8 from './signup8';
import Signup9 from './signup9';



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
        <Signup1 nextStep = {nextStep}/>
        </div>
    )
    case 2:
      return(
        <div>
        <Signup2 nextStep = {nextStep}/>
        </div>
    )
    case 3:
      return(
        <div>
        <Signup3 nextStep = {nextStep} prevStep = {[previousStep]}/>
        </div>
    )
    case 4:
      return(
        <div>
        <Signup4 nextStep = {nextStep} prevStep = {[previousStep]}/>
        </div>
    )
    case 5:
      return(
        <div>
        <Signup5 nextStep = {nextStep} prevStep = {[previousStep]}/>
        </div>
    )
    case 6:
      return(
        <div>
        <Signup6 nextStep = {nextStep} prevStep = {[previousStep]}/>
        </div>
    )
    case 7:
      return(
        <div>
        <Signup7 nextStep = {nextStep} prevStep = {[previousStep]}/>
        </div>
    )
    case 8:
      return(
        <div>
        <Signup8 nextStep = {nextStep} prevStep = {[previousStep]}/>
        </div>
    )
    case 9:
      return(
        <div>
        <Signup9 nextStep = {nextStep} prevStep = {[previousStep]}/>
        </div>
    )
  }
};

  export default Signup;