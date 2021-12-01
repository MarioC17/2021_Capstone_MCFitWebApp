import React, { Component,useState } from "react";
import './signup.css'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { Avatar, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';


//Components
import Header from '../../components/HeaderW'
import Arrow from "../../static/img/icon-awesome-arrow-alt-circle-right-1@1x.png";


const theme = createTheme({
    palette: {
      neutral: {
        main: 'black',
        contrastText: 'white',
      },
    },
  });

  const Signup5 = (props) => {

    const [selectedDate, handleDateChange] = useState(new Date());
    const onSubmit = e => {
        e.preventDefault();
        const [month, day, year] = [
            selectedDate.getMonth(),
            selectedDate.getDate(),
            selectedDate.getFullYear()
          ];
        let birthday = year + "-" + month + "-" + day;
        props.setFormData({...props.formData,['dob']: birthday});
        props.nextStep();
        
        }

    const onChange = e => props.setFormData({...props.formData,[e.target.name]: e.target.value});

    return (
            <div style={{backgroundColor: "white", minHeight: "100vh"}}>
                <Header/>
                <div className="container2">
                    <div className="welcome-text">
                        <span className="welcome-style">
                            What is your age, weight, and height?
                        </span>
                        <p className="bottom-padding"/>
                    </div>
                    
                    <div className="good-button">
                        <div className="formField">
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                name = "weight"
                                value = {props.weight}
                                onChange={e => onChange(e)}
                                endAdornment={<InputAdornment position="end">lbs</InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                'aria-label': 'weight',
                                }}
                            />
                            
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <FormHelperText id="outlined-weight-helper-text">Height</FormHelperText>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                name = "height"
                                value = {props.height}
                                onChange={e => onChange(e)}
                                endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                'aria-label': 'weight',
                                }}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">

                            <LocalizationProvider dateAdapter={AdapterDateFns}>

                                <DesktopDatePicker
                                        autoOk
                                        label="Date of birth"
                                        minDate={new Date("2000-01-01")}
                                        value={selectedDate}
                                        onChange={date => handleDateChange(date)}
                                        renderInput={props => <TextField {...props} />}
                                    />

                            </LocalizationProvider>
                        </FormControl>
                        <ThemeProvider theme={theme}>
                        
                            
                                <Button color="neutral" 
                                variant="contained"
                                startIcon={<Avatar src={Arrow}/>}
                                onClick={e => onSubmit(e)}
                                >    
                                </Button>

                                <Button color="neutral" 
                                variant="contained"
                                onClick={e => props.previousStep(e)}
                                >
                                    Go Back    
                                </Button>
                            
                        </ThemeProvider>
                            
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }


export default Signup5
