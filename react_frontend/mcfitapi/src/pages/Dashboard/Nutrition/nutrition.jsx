import React, { Component, useState} from 'react'
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from '../../../components/Sidebar';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

//Stylesheet
import './nutrition.css';

export default function Nutrition() {
    const [value, setValue] = React.useState(null);

    const theme = createTheme({
        palette: {
          neutral: {
            main: '#000000',
            contrastText: '#ffffff',
          },
        },
      });
    return (
        <>
        <Sidebar/>
        <div style={{backgroundColor: "#f4f4f4", minHeight: "100vh" }} className="nutrition-container">
            <div className="nutrition-title">Nutrition</div>
            <div className="food-entry-button">
                <ThemeProvider theme={theme}>
                    <Link to="/nutrition/entry" style={{color: 'white'}}>
                        <Button variant="contained" color="neutral" style={{padding: '5%'}}>
                        + New Food Entry
                        </Button>
                    </Link>
                </ThemeProvider>
            </div>
            <div className="nutrition-date-navigator"></div>
            <div className="nutrition-date-picker">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Select Date"
                        value={value}
                        onChange={(newValue) => {
                        setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div className="progress-text">Overall Progress</div>
            <div className="meal-breakdown">
                <span className="small-title">Meal Breakdown</span><br/><br/><br/>
                <div class="breakdown-container">
                    <div class="meal-name">Breakfast</div>
                    <div class="food-name">Eggs, Large, White**</div>
                    <div class="food-count">2 counts**</div>
                    <div class="hr"><hr/></div>
                    <div class="nutrition-stat-name">
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            Calories<br/>
                            Carbs<br/>
                            Total Fats<br/>
                            Protiens<br/>
                        </div>
                    </div>
                    <div class="nutrition-stat-detail">
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            {/* ADD VALUES HERE */}
                            {}*cal<br/>
                            {}*g<br/>
                            {}*g<br/>
                            {}*g<br/>
                        </div>
                    </div>
                </div>

                <div class="breakdown-container">
                    <div class="meal-name">Snack</div>
                    <div class="food-name">Eggs, Large, White**</div>
                    <div class="food-count">2 counts**</div>
                    <div class="hr"><hr/></div>
                    <div class="nutrition-stat-name">
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            Calories<br/>
                            Carbs<br/>
                            Total Fats<br/>
                            Protiens<br/>
                        </div>
                    </div>
                    <div class="nutrition-stat-detail">
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            {/* ADD VALUES HERE */}
                            {}*cal<br/>
                            {}*g<br/>
                            {}*g<br/>
                            {}*g<br/>
                        </div>
                    </div>
                </div>

                <div class="breakdown-container">
                    <div class="meal-name">Lunch</div>
                    <div class="food-name">Eggs, Large, White**</div>
                    <div class="food-count">2 counts**</div>
                    <div class="hr"><hr/></div>
                    <div class="nutrition-stat-name">
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            Calories<br/>
                            Carbs<br/>
                            Total Fats<br/>
                            Protiens<br/>
                        </div>
                    </div>
                    <div class="nutrition-stat-detail">
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            {/* ADD VALUES HERE */}
                            {}*cal<br/>
                            {}*g<br/>
                            {}*g<br/>
                            {}*g<br/>
                        </div>
                    </div>
                </div>

                <div class="breakdown-container">
                    <div class="meal-name">Dinner</div>
                    <div class="food-name">Eggs, Large, White**</div>
                    <div class="food-count">2 counts**</div>
                    <div class="hr"><hr/></div>
                    <div class="nutrition-stat-name">
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            Calories<br/>
                            Carbs<br/>
                            Total Fats<br/>
                            Protiens<br/>
                        </div>
                    </div>
                    <div class="nutrition-stat-detail">
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            {/* ADD VALUES HERE */}
                            {}*cal<br/>
                            {}*g<br/>
                            {}*g<br/>
                            {}*g<br/>
                        </div>
                    </div>
                </div>

                <div>
                    Calories Consumed:&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{}*out of {}* cal</span>
                </div>
            </div>
            <div className="nutritional-breakdown">
                <span className="small-title">Nutritional Breakdown</span><br/><br/><br/>
                <div class="second-container">
                    <div class="nutrition-breakdown-name">Consumed</div>
                    <div class="hr"><hr/></div>
                    <div class="nutrition-stat-name">
                        Calories<br/>
                        Carbohydrates<br/>
                        Protien<br/>
                        Fats<br/>
                    </div>
                    <div class="nutrition-stat-detail">
                        {}*cal<br/>
                        {}cur*g / total*cal<br/>
                        {}cur*g / total*cal<br/>
                        {}cur*g / total*cal<br/>
                    </div>
                </div>

                <div class="second-container">
                    <div class="nutrition-breakdown-name">Target</div>
                    <div class="hr"><hr/></div>
                    <div class="nutrition-stat-name">
                        Calories<br/>
                        Carbohydrates<br/>
                        Protien<br/>
                        Fats<br/>
                    </div>
                    <div class="nutrition-stat-detail">
                        {}*cal<br/>
                        {}cur*g / total*cal<br/>
                        {}cur*g / total*cal<br/>
                        {}cur*g / total*cal<br/>
                    </div>
                </div>
            </div>
            <div className="overall-breakdown">
                <div className="overall-progress-card">
                    <span className='sub-title'>Goals</span><br/><br/>
                    {/* change value */}
                    Weightloss, Strength, Toning
                </div>
                <div className="overall-progress-card">
                    <span className='sub-title'>Weight</span><br/><br/>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <span>Target {}140lbs</span> 
                        <span>Starting {}190 lbs </span> 
                        <span>Current {}160lbs</span> 
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}