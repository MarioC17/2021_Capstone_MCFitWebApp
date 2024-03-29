import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Button, IconButton } from '@mui/material/';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import Sidebar from '../../components/Sidebar';
//Stylesheet
import './fitness.css';


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
let fGoal = cookie.get('fitness_goal');

export default function Fitness(props) {
    var startDate;
    if(props.location.selectedDate !== undefined)
        startDate = new Date(props.location.selectedDate);
    else
        startDate = new Date();
    const [value, setValue] = React.useState(startDate);
    const [stringValue, setStringValue] = React.useState([]);
    const [exerciseNames, setExerciseNames] = useState(new Map());
  

    //Retrieving exercise data from the database using django rest api
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
    
     //Retrieving workout information for the logged in user
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

    const NoteTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
        ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.white,
            color: 'rgba(0, 0, 0, 0.87)',
            boxShadow: theme.shadows[1],
            fontSize: 11,
        },
        }));
    
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
                        
                        <span className="analytic-content">{fGoal}</span>
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
                        <span style={{position: 'absolute', marginLeft: '20%', fontWeight: '700'}}>Reps</span>
                        <span style={{position: 'absolute', marginLeft: '26%', fontWeight: '700'}}>Sets</span>
                        <span style={{position: 'absolute', marginLeft: '32%', fontWeight: '700'}}>Load</span>
                        <span style={{position: 'absolute', marginLeft: '38%', fontWeight: '700'}}>RIR</span>
                        <span style={{position: 'absolute', marginLeft: '44%', fontWeight: '700'}}>Rests</span>
                    </div>
                    {workouts.map((exercise) => {
                        if (exercise.date === `${value.getFullYear()}-${('0'+(value.getMonth()+1)).slice(-2)}-${('0'+value.getDate()).slice(-2)}`) {
                            return [
                                <div className="workout-card">
                                    <span className='workout-content'>{exerciseNames[exercise.exercise]}</span>
                                    <span style={{position: 'absolute', marginLeft: '19.5%', fontSize: '24px'}}>{exercise.reps}</span>
                                    <span style={{position: 'absolute', marginLeft: '25.5%', fontSize: '24px'}}>{exercise.sets}</span>
                                    <span style={{position: 'absolute', marginLeft: '31.5%', fontSize: '24px'}}>{exercise.load}</span>
                                    <span style={{position: 'absolute', marginLeft: '37.5%', fontSize: '24px'}}>{exercise.rir}</span>
                                    <span style={{position: 'absolute', marginLeft: '43.5%', fontSize: '24px'}}>{exercise.rest}</span>
                                    <span style={{position: 'absolute', marginLeft: '47.5%', fontSize: '24px'}}><NoteTooltip title={exercise.notes}>
                                    <IconButton><StickyNote2Icon/></IconButton></NoteTooltip></span>
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