import React, { Component, useState} from 'react'
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Button, IconButton } from '@mui/material/';
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
    return (
        <>
        <Sidebar/> 
        <div style={{backgroundColor: "#f4f4f4", minHeight: "100vh" }} className="fitness-container">
        
            <div className="dashboard-title">
                Fitness
            </div>
            <div className="fitness-goals">
                <span className="small-title">Goals</span>
                <div className="fitness-goals-box" >
                    stuff
                </div>
                
            </div>
            
            <div className="performance-chart">
                <span className="small-title">Performance</span>
                <div className="performance-box">
                    add chart
                </div>
                
            </div>
            <div className="task-buttons">
                <span className="small-title">Tasks</span>
                <div className="task-container">
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" style={{minWidth: '250px', minHeight: '200px', borderRadius: '25px', margin: '5px'}} color="reverse" startIcon={
                        <Avatar sx={{ width: 80, height: 80 }} variant="square" src={running} />}/>
                    </ThemeProvider>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" style={{minWidth: '250px', minHeight: '200px', borderRadius: '25px', margin: '5px'}} color="reverse" startIcon={
                        <Avatar sx={{ width: 80, height: 80 }} variant="square" src={weights} />}/>   
                    </ThemeProvider><br/>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" style={{minWidth: '250px', minHeight: '200px', borderRadius: '25px', margin: '5px'}} color="reverse" startIcon={
                        <Avatar sx={{ width: 80, height: 80 }} variant="square" src={wakeup} />}/>
                    </ThemeProvider>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" style={{minWidth: '250px', minHeight: '200px', borderRadius: '25px', margin: '5px'}} color="reverse" startIcon={
                        <Avatar sx={{ width: 80, height: 80 }} variant="square" src={steps} />}/>
                    </ThemeProvider>
                </div>
            </div>
            <div className="workouts">
                <span className="small-title">Workouts</span>
                <div className="workout-container">
                    <div className="workout-card">
                        <span className="workout-content">Warm ups</span>
                    </div>
                    <div className="workout-card">
                        <span className="workout-content">Low intensity</span>
                    </div>
                    <div className="workout-card">
                        <span className="workout-content">Insert workout</span>
                    </div>
                    <div className="workout-card">
                        <span className="workout-content">Insert workout</span>
                    </div>
                </div>
            </div>
    </div>
    </>
    )
}