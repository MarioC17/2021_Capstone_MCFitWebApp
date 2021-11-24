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

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <span>Breakfast</span>
                </div>
                <hr/>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    Lunch
                </div>
                <hr/>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    Dinner
                </div>
                <hr/>
            </div>
            <div className="nutritional-breakdown">
                <span className="small-title">Nutritional Breakdown</span><br/><br/><br/>
            </div>
            <div className="progress-breakdown">
                <div className="progress-card">Goals</div>
                <div className="progress-card">Weight</div>
            </div>
        </div>
        
        </>
    )
}