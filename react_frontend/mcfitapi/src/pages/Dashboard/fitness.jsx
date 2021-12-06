import React, { Component, useState, useEffect} from 'react';
import { render } from 'react-dom';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Button, IconButton } from '@mui/material/';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import Cookies from 'universal-cookie';
import DatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';

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
const cookie = new Cookies()
export default function Fitness(props) {
    var startDate;
    if(props.location.selectedDate !== undefined)
        startDate = new Date(props.location.selectedDate);
    else
        startDate = new Date();
    const [value, setValue] = React.useState(startDate);
    console.log(value)
    console.log(props)
    
    console.log(value)
    const [stringValue, setStringValue] = React.useState([]);
    const [exerciseNames, setExerciseNames] = useState(new Map());
  
    const getexerciseData = async () => {
      try {
        const data = await axios.get(
          "http://localhost:8000/api/exercises"
        );
        var result = data.data.reduce(function(map, obj) {
            map[obj.exercise_id] = obj.name;
            return map;
        }, {});
        await setExerciseNames(result)
        
      } catch (e) {
        console.log(e);
      }
    };
  
    useEffect(() => {
      getexerciseData();
    }, []);

  

    const [workouts, setWorkouts] = useState([]);

    const getWorkoutData = async () => {


        let user = cookie.get("user_id")

        try {
        const data = await axios.get(
            `http://127.0.0.1:8000/api/workout/user/${user}/`
        );
        setWorkouts(data.data);
        } catch (e) {
        console.log(e);
        }
    };

    useEffect(async () => {
        await getWorkoutData();
    }, []);  


    //The list of workouts for a given user is stored in an array of workouts sorted by date

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
                <span className="small-title">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                        views={['day', 'month', 'year']}
                        minDate={new Date('2021-01-01')}
                        maxDate={new Date('2031-12-31')}
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                            setStringValue(`${value.getFullYear()}-${('0'+(value.getMonth()+1)).slice(-2)}-${('0'+value.getDate()).slice(-2)}`)
                        }}
                        renderInput={(params) => <TextField {...params} helperText={null} />}
                        />
                    </LocalizationProvider>
                </span><br/><br/>
                <div className="workout-container">
                    <div>
                        <span style={{position: 'absolute', marginLeft: '16%', fontWeight: '700'}}>Reps</span>
                        <span style={{position: 'absolute', marginLeft: '26%', fontWeight: '700'}}>Sets</span>
                        <span style={{position: 'absolute', marginLeft: '36%', fontWeight: '700'}}>Rests</span>
                    </div>
                    {workouts.map((exercise) => {
                        if (exercise.date === `${value.getFullYear()}-${('0'+(value.getMonth()+1)).slice(-2)}-${('0'+value.getDate()).slice(-2)}`) {
                            return [
                                <div className="workout-card">
                                    <span className='workout-content'>{exerciseNames[exercise.exercise]}</span>
                                    <span style={{position: 'absolute', marginLeft: '15.5%', fontSize: '24px'}}>{exercise.reps}</span>
                                    <span style={{position: 'absolute', marginLeft: '25.5%', fontSize: '24px'}}>{exercise.sets}</span>
                                    <span style={{position: 'absolute', marginLeft: '35.5%', fontSize: '24px'}}>{exercise.rest}</span>
                                    <ThemeProvider theme={theme}>
                                        <Link to = {
                                            {
                                                pathname: "/fitness/exercise",
                                                clientProp: exercise.exercise
                                            }}>    
                                            <Button className="workout-button" variant="contained" color="neutral" style={{width: '150px'}}>
                                                View
                                            </Button>
                                        </Link>
                                    </ThemeProvider>
                                </div>]
                        }
                    })}
                </div>
            </div>
    </div>
    </>
    )
}