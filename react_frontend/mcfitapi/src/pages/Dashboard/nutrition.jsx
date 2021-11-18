import React, { Component, useState} from 'react'
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchBar from '../../components/SearchBar';

//Stylesheet
import './nutrition.css';
import target from '../../static/img/target.png'
import scale from '../../static/img/weight-scale.png'
import cutlery from '../../static/img/cutlery.png'

const theme = createTheme({
    palette: {
      neutral: {
        main: '#000000',
        contrastText: '#ffffff',
      },
      reverse: {
        main: '#ffffff',
        contrastText: '#000000',
      }
    },
  });

export default function Fitness() {
    const [Bcomponents, setBComponents] = useState(["Breakfast Component"]);  

    function addSearchBreakfast() { 
        setBComponents([...Bcomponents, "Breakfast Component"])  
    } 

    const [Lcomponents, setLComponents] = useState(["Lunch Component"]); 
    function addSearchLunch() { 
    setLComponents([...Lcomponents, "Lunch Component"])  
    } 

    const [Dcomponents, setDComponents] = useState(["Dinner Component"]);
    function addSearchDinner() { 
    setDComponents([...Dcomponents, "Dinner Component"])  
    } 

    return (
        <div className="dashboard-box">
            <div style={{backgroundColor: "white", minHeight: "100vh"}} class="dashboard-fitness-container">
                <div class="dashboard-name">
                    <span>Nutrition</span>
                </div>
                <div class="goals">
                    <img className="fitness-icons" src={target}/>
                    <span className="dashboard-text">GOALS</span><br/>
                    {/* Change values here */}
                    <span className="fitness-text">Weightloss, Strength, Toning, Flexible Diet</span>
                </div>
                <div class="current-weight">
                    <img className="fitness-icons" src={scale}/>
                    <span className="dashboard-text">CURRENT WEIGHT</span>
                </div>
                <div class="calorie-target">
                    <img className="fitness-icons" src={cutlery}/>
                    <span className="dashboard-text">CALORIE TARGET</span>
                    <br/>
                    <div className='fitness-text'>Based on your weight, height and training this is your calorie target per wekk. Remember, this is only one aspect of your training regimen. Eating correctly is still important.</div></div>
                <ThemeProvider theme={theme}>
                    <Button variant="outlined" color="neutral">
                        <div class="entry-button">
                            + NEW FOOD ENTRY
                        </div>
                    </Button>
                </ThemeProvider>
                <div class="entry-board" >
                    <span className="dashboard-text" style={{color:'white'}}>ENTER YOUR MEAL</span>
                    <div>
                        <span className="fitness-text">breakfast</span>
                        <ThemeProvider theme={theme}>
                            <Button variant="text" color="reverse" onClick={addSearchBreakfast}>
                                +
                            </Button>
                        </ThemeProvider>
                        <br/>
                        {Bcomponents.map((item, i) => ( <SearchBar/> ))} 
                        <span className="fitness-text">lunch</span>
                        <ThemeProvider theme={theme}>
                            <Button variant="text" color="reverse" onClick={addSearchLunch}>
                                +
                            </Button>
                        </ThemeProvider>
                        <br/>
                        {Lcomponents.map((item, i) => ( <SearchBar/> ))} 
                        <span className="fitness-text">dinner</span>
                        <ThemeProvider theme={theme}>
                            <Button variant="text" color="reverse" onClick={addSearchDinner}>
                                +
                            </Button>
                        </ThemeProvider>
                        <br/>
                        {Dcomponents.map((item, i) => ( <SearchBar/> ))} 
                    </div>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="reverse" style={{ display: 'flex',
    justifyContent: 'flex-end', height: '40px', marginBottom: '20px'}}>
                        save
                        </Button>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    )
}