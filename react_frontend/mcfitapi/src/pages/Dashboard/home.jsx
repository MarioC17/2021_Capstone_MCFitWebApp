import React from 'react'
import Sidebar from '../../components/Sidebar';
import './home.css'
import {Button } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function home() {
    let monthNumber = (new Date().getMonth()+1);
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let monthName = monthNames[monthNumber];    

    const current = new Date();
    const date = `${monthName}. ${current.getDate()}, ${current.getFullYear()}`;

    // MODIFY LATER
    const exercises = [
        { name: 'Dumbbell Single Arm Rows' },
        { name: 'Dumbbell Bench Press' },
        { name: 'Dumbbell Chest Press' },
        { name: 'Pull Ups' },
        { name: 'Push Ups' },
        { name: 'Bicep Curls' },
        { name: 'Cycling' },
      ];

    const nutritionData = [
        { name: "Protien", value: "128", measurement: 'g'},
        { name: "Fats", value: "65", measurement: 'g'},
        { name: "Carbohydrates", value: "230", measurement: 'g'},
        { name: "Calories", value: "1700", measurement: 'kcal'},
    ]

    const nutritionalSummary = [
        { name: "Daily calorie goal", value: "1800", measurement: 'kcal'},
        { name: "Total calorie remaining", value: "100", measurement: 'kcal'},
    ]

    const theme = createTheme({
    palette: {
        neutral: {
        main: '#000000',
        contrastText: '#ffffff',
        },
        reversed: {
        main: '#ffffff',
        contrastText: '#000000',
        }
    },
    });
    
    return (
        <div>
        <Sidebar/>
        <div style={{backgroundColor: "#f4f4f4", minHeight: "100vh" }} className="home-container">

            <div className="exercise-overview">
                <span>EXERCISES</span>
                <span>{date}</span>
                <div>
                    {exercises.map(exercise => (
                        <div className="home-exercise-cell">
                            {exercise.name}
                        </div>
                    ))}
                </div>
            </div>
            <div className="nutrition-overview">
                <span>NUTRITION OVERVIEW</span>
                <span>{date}</span>
                <div>
                    {nutritionData.map(data => (
                        <span style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '3%'}}>
                            <span>{data.name}</span>
                            <span>{data.value}{data.measurement}</span>
                        </span>
                    ))}
                </div>
                <div>
                    {nutritionalSummary.map(data => (
                        <span style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '3%'}}>
                        <span style={{fontWeight: '700'}}>{data.name}</span>
                        <span>{data.value}{data.measurement}</span>
                    </span>
                    ))}
                </div>
                <ThemeProvider className="home-meal-nav-button" theme={theme}>
                    <Button variant="contained" color="reversed">
                        ADD A MEAL
                    </Button>
                </ThemeProvider>
            </div>
            <div className="program-overview">
                <div className="program-overview-card">
                    <span>PROGRAM</span><br/><br/>
                    <span>7/12 Weeks Completed</span>
                </div>
                <div className="program-overview-card">
                    <span>UPCOMING PAYMENTS</span>
                </div>
                <div className="program-overview-card">
                    <span>UPCOMING APPOINTMENTS</span>
                </div>
                <div className="program-overview-card">
                    <span>FITNESS GOALS</span><br/><br/>
                    <span>Strength, Weight-loss, Toning </span>
                </div>
                
            </div>
            <div className="header-bar">
                <span className="home-title">Welcome back, NAME!</span>
            </div>
        </div>
        </div>
    )
}

export default home
