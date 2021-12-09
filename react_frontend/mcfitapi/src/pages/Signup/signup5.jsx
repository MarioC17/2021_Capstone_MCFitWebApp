import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Button } from '@mui/material';
import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from "@mui/material/LinearProgress";
import OutlinedInput from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import React, { useState } from "react";
//Components
import Header from '../../components/HeaderW';
import './signup.css';



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

  const Signup5 = (props) => {

    const [selectedDate, handleDateChange] = useState(new Date());
    const onSubmit = e => {
        e.preventDefault();
        props.nextStep();
        }

    const onChange = e => props.setFormData({...props.formData,[e.target.name]: e.target.value});
    
    const onDateChange = e => {
        props.setFormData({...props.formData,['dob']: e.toISOString().split('T')[0]});
        handleDateChange(e)
    }
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
                        <ThemeProvider theme={theme}>
                            <Button color="reversed" 
                            variant="contained"
                            style={{maxWidth: '250px', maxHeight: '110px', minWidth: '250px', minHeight: '110px', fontSize: '20px'}}
                            onClick={e => props.previousStep(e)}>
                                Go Back    
                            </Button>
                        </ThemeProvider>
                    </div>
                    <div className="side-button">
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    name = "weight"
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
                                    onChange={e => onChange(e)}
                                    endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                    'aria-label': 'weight',
                                    }}
                                />
                        </FormControl>

                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" style={{marginTop: '30px'}}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                        autoOk
                                        label="Date of birth"
                                        value={selectedDate}
                                        onChange={date => onDateChange(date)}
                                        renderInput={props => <TextField {...props} />}
                                    />
                            </LocalizationProvider>
                        </FormControl>
                        
                        <div>
                            <ThemeProvider theme={theme}>
                                <Button color="neutral" 
                                variant="contained"
                                style={{minWidth: '150px', minHeight: '50px', marginLeft: '8px', marginTop: '10px'}}
                                onClick={e => onSubmit(e)}
                                >    
                                Enter
                                </Button>
                            </ThemeProvider> 
                        </div>
                    </div>
                </div>
                <div style={{position: 'fixed', bottom: '0px', height: '30px', width: '100%'}}>
                <ThemeProvider theme={theme}>
                    <Box  sx={{ ml: "9%", width: "80%"}}>
                        <LinearProgress variant="determinate" value={62.5} color='progress'/>
                    </Box>
                </ThemeProvider>
                </div>
            </div>
        )
    }


export default Signup5
