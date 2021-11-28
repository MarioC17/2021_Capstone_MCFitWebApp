
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import React, { Component,useState} from "react";
import { signup } from '../../actions/auth';
//Components
import Header from '../../components/HeaderW';
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


const Signup1 = (props) => {
    const [accountCreated, setAccountCreated] = useState(false);

    const [formData, setFormData] = useState({
        email:'',
        password:'',
        first_name:'',
        last_name:'',
        phone_number:'',
        re_password:''
      });
    
      const {email,password,re_password,first_name,last_name,phone_number} = formData;
    
      const onChange = e => setFormData({...formData,[e.target.name]: e.target.value});
    
      const onSubmit = e => {
        e.preventDefault();
        //check if all fields are filled and valid here
        if (password === re_password) {
            props.signup(email,password,re_password,first_name,last_name,phone_number);
            setAccountCreated(true);
            props.nextStep();
        }
    
        else {
            //change this to something better to tell user to fill out fields
            alert("Please fill all form fields")
        }
      };

    if (props.isAuthenticated) {
    return <Redirect to='/' />
    }
    
    if (accountCreated) {
        return <Redirect to='/' />
    }

    return(
        <div style={{backgroundColor: "white", minHeight: "100vh"}}>
        <Header/>
        <div class="container">
            <div className="a">
                <span className="head-text-style">
                    Let’s connect! Please complete your <br />
                    <br />
                    information so we can get to know you.
                </span>
            </div>
            <div className="b">
                <form className="formFields">
                    
                    <div className="formField">
                        <input
                        type="firstname"
                        id="firstname"
                        className="formFieldInput"
                        placeholder="First name"
                        name="first_name"
                        value={first_name}
                        onChange={e => onChange(e)}
                        required
                        />
                    </div>

                    <div className="formField">
                        <input
                        type="email"
                        id="email"
                        className="formFieldInput"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                        />
                    </div>

                    <div className="formField">
                        <input
                        type="password"
                        id="password"
                        className="formFieldInput"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        required
                        />
                    </div>

                    <div className="formField">
                        <ThemeProvider theme={theme}>
                            <Button color="neutral" 
                                variant="contained"
                                onClick={e => onSubmit(e)}>
                                Sign Up
                            </Button>
                        </ThemeProvider>
                    </div>
                </form>
            </div>
            <div className="c">                        
            <form className="formFields">
                    <div className="formField">
                        <input
                        type="last_name"
                        id="last_name"
                        className="formFieldInput"
                        placeholder="Last name"
                        name="last_name"
                        value={last_name}
                        onChange={e => onChange(e)}
                        required
                        />
                    </div>

                    <div className="formField">
                        <input
                        type="tel"
                        id="phone_number"
                        className="formFieldInput"
                        placeholder="Phone Number"
                        name="phone_number"
                        value={phone_number}
                        onChange={e => onChange(e)}
                        required
                        />
                    </div>

                    <div className="formField">
                        <input
                        type="password"
                        id="confirm_password"
                        className="formFieldInput"
                        placeholder="Confirm Password"
                        name="re_password"
                        value={re_password}
                        onChange={e => onChange(e)}
                        required
                        />
                    </div>

                    <Link to="/" className="formFieldLink">
                        <span className="sourcesanspro-normal-black-15px"><u>Already have an account? Sign In.</u></span>
                    </Link>
                </form>
            </div>
        </div>
    </div>


)};

const mapStatetoProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  
export default connect(mapStatetoProps,{signup}) (Signup1);