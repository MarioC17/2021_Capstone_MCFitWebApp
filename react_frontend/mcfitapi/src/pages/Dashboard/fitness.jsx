import React, { Component, useState} from 'react';
import { render } from 'react-dom';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Button, IconButton } from '@mui/material/';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Sidebar from '../../components/Sidebar';

//Stylesheet
import './fitness.css';
import target from '../../static/img/target.png'
import scale from '../../static/img/weight-scale.png'
import running from '../../static/img/running.png'
import steps from '../../static/img/steps.png'
import wakeup from '../../static/img/wakeup.png'
import weights from '../../static/img/weights.png'

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
    let monthNumber = (new Date().getMonth()+1);
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let monthName = monthNames[monthNumber];    

    const current = new Date();
    const date = `${monthName}. ${current.getDate()} ${current.getFullYear()}`;

    return (
        <>
        <Sidebar/> 
        <div style={{backgroundColor: "#f4f4f4", minHeight: "100vh" }} className="fitness-container">
        
            <div className="dashboard-title">
                Fitness
            </div>
            <div className="analytics">
                <span className="small-title">Overall Progress</span>
                <div className="analytic-container">
                    <div className="analytic-card" >
                        <span className="analytic-title">Goals</span>
                        <span className="analytic-content">Weightloss, Strength, Toning ADD REAL DATA LATER</span>
                    </div>
                    <div className="analytic-card" >
                        <span className="analytic-title">Weight</span>
                        <div className="weight-content">
                            <span className="analytic-content">Target: WEIGHTlbs</span>
                            <span className="analytic-content">Starting: WEIGHTlbs</span>
                            <span className="analytic-content">Current: WEIGHTlbs</span>
                        </div>
                    </div>
                    <div className="analytic-card-library" >
                        <span style={{color: 'white'}} className="analytic-title">Workout Library</span>
                        <IconButton style={{color: 'white'}}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </div>      
                </div>      
            </div>
            
            <div className="workouts">
                <span className="small-title">Exercises</span><br/><br/>
                <span className="sub-title">{date}</span>
                <div className="workout-container">
                    <div className="workout-card">
                        {/*add in database info*/}
                        <span className="workout-content">Exercise name</span>
                        <div>
                            <span className="workout-mini">
                                Reps: NUMBER<br/>
                                Sets: NUMBER<br/>
                                Rests: NUMBER<br/>
                            </span>
                        </div>
                        <span className="workout-mini">Duration: DURATION mins</span>
                        <ThemeProvider theme={theme}>
                            <Button className="workout-button" variant="contained" color="neutral">
                                View
                            </Button>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
    </div>
    </>
    )
}