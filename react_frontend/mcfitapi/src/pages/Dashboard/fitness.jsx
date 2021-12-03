import React, { Component, useState, useEffect} from 'react';
import { render } from 'react-dom';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Button, IconButton } from '@mui/material/';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Sidebar from '../../components/Sidebar';
import axios from "axios";

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
    
    const [workoutName, setWorkoutName] = useState([]);
    const getWorkoutName = async (exercise) => {
        try {
        const data = await axios.get(
            `http://127.0.0.1:8000/api/exercise/${exercise}` //"http://127.0.0.1:8000/api/workout/user/${user}/     use 1 for testing because it already has workouts"
        );
        setWorkoutName(data.data.name);
        console.log(data.data.name)
        } catch (e) {
        console.log(e);
        }
    };

    const [workouts, setWorkouts] = useState([]);

    const getWorkoutData = async () => {
        try {
        const data = await axios.get(
            "http://127.0.0.1:8000/api/workout/user/1/" //"http://127.0.0.1:8000/api/workout/user/${user}/     use 1 for testing because it already has workouts"
        );
        setWorkouts(data.data);
        } catch (e) {
        console.log(e);
        }
    };

    useEffect(() => {
        getWorkoutData();
    }, []);  

    //The list of workouts for a given user is stored in an array of workouts sorted by date

    let monthNumber = (new Date().getMonth());
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
                        <span className="analytic-content">Weightloss</span>
                    </div>
                    <div className="analytic-card" >
                        <span className="analytic-title">Weight</span>
                        <div className="weight-content">
                            <span className="analytic-content">Target: 120lbs</span>
                            <span className="analytic-content">Starting: 190lbs</span>
                            <span className="analytic-content">Current: 180lbs</span>
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
                <span className="small-title">Exercises {date}</span><br/><br/>
                <div className="workout-container">
                    <div>
                        <span style={{position: 'absolute', marginLeft: '16%', fontWeight: '700'}}>Reps</span>
                        <span style={{position: 'absolute', marginLeft: '26%', fontWeight: '700'}}>Sets</span>
                        <span style={{position: 'absolute', marginLeft: '36%', fontWeight: '700'}}>Rests</span>
                    </div>
                    
                    {workouts.map((exercise, index) => (
                      <div className="workout-card">
                      {/*add in database info*/}
                      {/* {console.log(getExercise(exercise.workout_id))} */}
                        <span id="exerciseData" className="workout-content">{exercise.workout_id}</span>
                        <span style={{position: 'absolute', marginLeft: '15%'}}>{exercise.reps}</span>
                        <span style={{position: 'absolute', marginLeft: '25%'}}>{exercise.sets}</span>
                        <span style={{position: 'absolute', marginLeft: '35%'}}>{exercise.rest}</span>
                      <ThemeProvider theme={theme}>
                          <Button className="workout-button" variant="contained" color="neutral" style={{width: '150px'}}>
                              View
                          </Button>
                      </ThemeProvider>
                      </div>  
                    ))}
                </div>
            </div>
    </div>
    </>
    )
}