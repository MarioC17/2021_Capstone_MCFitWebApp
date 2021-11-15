import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//Components
import Header from '../../components/HeaderW'
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

export class signup extends Component {
    constructor() {
        super();
    
        this.state = {
          firstname: "",
          lastname: "",
          username: "",
          password: "",
          confirmpassword: "",
          email: ""
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        let target = event.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
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
                <div class="container">
                    <div className="a">
                        <span className="head-text-style">
                            Let’s connect! Please complete your <br />
                            <br />
                            information so we can get to know you.
                        </span>
                    </div>
                    <div className="b">
                        <form className="formFields" onSubmit={this.handleSubmit}>
                            <div className="formField">
                                <input
                                type="firstname"
                                id="firstname"
                                className="formFieldInput"
                                placeholder="First name"
                                name="firstname"
                                value={this.state.firstname}
                                onChange={this.handleChange}
                                />
                            </div>

                            <div className="formField">
                                <input
                                type="username"
                                id="username"
                                className="formFieldInput"
                                placeholder="Username"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                                />
                            </div>

                            <div className="formField">
                                <input
                                type="password"
                                id="confirmpassword"
                                className="formFieldInput"
                                placeholder="Confirm Password"
                                name="confirmpassword"
                                value={this.state.confirmpassword}
                                onChange={this.handleChange}
                                />
                            </div>

                            <div className="formField">
                                <ThemeProvider theme={theme}>
                                    <Button color="neutral" 
                                        variant="contained"
                                        onClick={this.handleSubmit}>
                                        Sign Up
                                    </Button>
                                </ThemeProvider>
                            </div>
                        </form>
                    </div>
                    <div className="c">                        <form className="formFields" onSubmit={this.handleSubmit}>
                            <div className="formField">
                                <input
                                type="lastname"
                                id="lastname"
                                className="formFieldInput"
                                placeholder="Last name"
                                name="lastname"
                                value={this.state.lastname}
                                onChange={this.handleChange}
                                />
                            </div>

                            <div className="formField">
                                <input
                                type="password"
                                id="password"
                                className="formFieldInput"
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                />
                            </div>

                            <div className="formField">
                                <input
                                type="email"
                                id="email"
                                className="formFieldInput"
                                placeholder="Email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                />
                            </div>

                            <Link to="/" className="formFieldLink">
                                <span className="sourcesanspro-normal-black-15px"><u>Already have an account? Sign In.</u></span>
                            </Link>

                            <button><Link to="/signup2">TEMP NAV DELETE LATER</Link></button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default signup
