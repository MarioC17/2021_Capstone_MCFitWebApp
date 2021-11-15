import React, { Component } from "react";
import './signup.css'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { Avatar, Button } from '@mui/material';
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

class signup2 extends Component {
    constructor() {
        super();
    
        this.state = {
            age: '',
            weight: '',
            height: '',
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (event) {
        let target = event.target;
        let value = target.type === target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("The form was submitted with the following data:");
        console.log(this.state);
    }

    render() {
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
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                name = "weight"
                                value = {this.state.weight}
                                onChange={this.handleChange}
                                endAdornment={<InputAdornment position="end">lbs</InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                'aria-label': 'weight',
                                }}
                            />
                            <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>

                            <OutlinedInput
                                id="outlined-adornment-weight"
                                name = "weight"
                                value = {this.state.weight}
                                onChange={this.handleChange}
                                endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                'aria-label': 'weight',
                                }}
                            />
                            <FormHelperText id="outlined-weight-helper-text">Height</FormHelperText>

                            <OutlinedInput
                                id="outlined-adornment-weight"
                                name = "weight"
                                value = {this.state.weight}
                                onChange={this.handleChange}
                                endAdornment={<InputAdornment position="end">yrs</InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                'aria-label': 'weight',
                                }}
                            />
                            <FormHelperText id="outlined-weight-helper-text">Age</FormHelperText>
                        </FormControl>
                        
                        <ThemeProvider theme={theme}>
                            <Button color="neutral" 
                             variant="contained"
                             startIcon={<Avatar src={Arrow}/>}
                             onClick={this.handleSubmit}>
                            </Button>
                        </ThemeProvider>
                            
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default signup2
