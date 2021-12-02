import { createTheme } from '@mui/material/styles';
import React, { useState } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie'
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

  const [formData, setFormData] = useState({
    phone_num:'',
    address:'',
    emergency_contact:'',
    fitness_goal:'',
    gender:'',
    weight:'',
    dob:'',
    height:'',
    physical_activity:'',
    diet:'',
    user:'',
  });

  const {phone_num,address,emergency_contact,fitness_goal,gender,weight,dob,height,physical_activity,diet} = formData;

  

  switch(step) {
    case 1:
      return(
        <div>
        <Signup1 nextStep = {nextStep} setFormData = {setFormData} formData = {formData} phone_num={phone_num} address={address} emergency_contact = {emergency_contact}/>
        </div>
    )
    case 2:
      return(
        <div>
        <Signup2 nextStep = {nextStep} previousStep = {previousStep}/>
        </div>
    )
    case 3:
      return(
        <div>
        <Signup3 nextStep = {nextStep} previousStep = {previousStep} setFormData = {setFormData} formData = {formData}/>
        </div>
    )
    case 4:
      return(
        <div>
        <Signup4 nextStep = {nextStep} previousStep = {previousStep} setFormData = {setFormData} formData = {formData}/>
        </div>
    )
    case 5:
      return(
        <div>
        <Signup5 nextStep = {nextStep} previousStep = {previousStep} setFormData = {setFormData} formData = {formData}/>
        </div>
    )
    case 6:
      return(
        <div>
        <Signup6 nextStep = {nextStep} previousStep = {previousStep} setFormData = {setFormData} formData = {formData}/>
        </div>
    )
    case 7:
      return(
        <div>
        <Signup7 nextStep = {nextStep} previousStep = {previousStep} setFormData = {setFormData} formData = {formData}/>
        </div>
    )
    case 8:
      return(
        <div>
        <Signup8 previousStep = {previousStep} setFormData = {setFormData} formData = {formData}/>
        </div>
    )
  }
};

  export default Signup;