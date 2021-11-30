
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
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

    const [formData, setFormData] = useState({
        phone_num:'',
        address:'',
        emergency_contact:'',
      });
    
      const {phone_num,address,emergency_contact} = formData;
    
      const onChange = e => setFormData({...formData,[e.target.name]: e.target.value});

      //create profile
      const createProfile = async (user_id) => {
        let formField = new FormData()
        formField.append('phone_num',phone_num)
        formField.append('address',address)
        formField.append('emergency_contact',emergency_contact)
        //add user id from cookie or local storage????
        formField.append('user_id',user_id)

        await axios({
          method: 'post',
          url:'http://localhost:8000/api/profile',
          data: formField
        }).then(response=>{
          console.log(response.data);
        })
        }

        //edit profile
        const updateProfile = async (user_id) => {
            let formField = new FormData()
            formField.append('phone_num',phone_num)
            formField.append('address',address)
            formField.append('emergency_contact',emergency_contact)
            //add user id from cookie or local storage????
            formField.append('user_id',user_id)
    
            await axios({
                method: 'Put',
                url: `http://localhost:8000/api/profile/edit/${user_id}/`,
                data: formField
            }).then(response => {
                console.log(response.data)
            })
        }
        
        //check if profile already exists
        const checkProfile = async (user_id) => {
            await axios({
                method: 'GET',
                url: `http://localhost:8000/api/profile/${user_id}/`,
            }).then(response => {
                console.log(response.data)
                //if exists return true
            })
        }
      const onSubmit = e => {

        //checkProfile(user_id);
        e.preventDefault();
        props.nextStep();
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
                        type="tel"
                        id="phone_num"
                        className="formFieldInput"
                        placeholder="Phone Number"
                        name="phone_num"
                        value={phone_num}
                        onChange={e => onChange(e)}
                        required
                        />
                    </div>

                    <div className="formField">
                        <input
                        type="address"
                        id="address"
                        className="formFieldInput"
                        placeholder="Address"
                        name="address"
                        value={address}
                        onChange={e => onChange(e)}
                        required
                        />
                    </div>

                    <div className="formField">
                        <input
                        type="tel"
                        id="emergency_contact"
                        className="formFieldInput"
                        placeholder="Emergency Contact"
                        name="emergency_contact"
                        value={emergency_contact}
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
               
            </div>
        </div>


)};
  
export default Signup1;