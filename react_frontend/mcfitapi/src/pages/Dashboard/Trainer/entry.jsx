import React, { Component, useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ExerciseSearchBar from '../../../components/exerciseBar';
import { Box, Modal, Typography, TextField } from '@mui/material/';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios'
import Cookies from 'universal-cookie';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
//Stylesheet
import './entry.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  export default function Entry(props) {
    //   console.log(`${props.date.getFullYear()}-${('0'+(props.date.getMonth()+1)).slice(-2)}-${('0'+props.date.getDate()).slice(-2)}`);

    const addNewWorkout = async (formData) => {
        
        await axios({
          method: 'post',
          url:'http://localhost:8000/api/workout',
          data: formData
        }).then(response=>{
          console.log(response.data);
        }).catch(e => {
            console.log(e)
        })
    }

    const [formData, setFormData] = useState({
        user:props.user,
        exercise:'',
        reps:'',
        sets:'',
        rest:'',
        rir:'',
        load: '',
        date: '',
        notes:'',
        });

    const {user,exercise,reps,sets,rest,rir,load,date,notes} = formData;
    const [exercises, setexercise] = useState([]);
    const [selectedDate, handleDateChange] = useState(new Date());
    const [exerciseNames, setExerciseNames] = useState(new Map());


    const onAdd = e => {
        e.preventDefault();
        addNewWorkout(formData)
        setOpen(true)
        }

    const onDateChange = e => {
        setFormData({...formData,['date']: e.toISOString().split('T')[0]});
        handleDateChange(e)
    }

    const getexerciseData = async () => {
        try {
        const data = await axios.get(
            "http://localhost:8000/api/exercises"
        );
        var result = data.data.reduce(function(map, obj) {
            map[obj.exercise_id] = obj.name;
        return map;}, {});
        setexercise(data.data);
        console.log(result);
        setExerciseNames(result);
        } catch (e) {
        console.log(e);
        }
    };

    useEffect(() => {
        getexerciseData();
    }, []);  

    const theme = createTheme({
        palette: {
          neutral: {
            main: '#000000',
            contrastText: '#ffffff',
          },
        },
      });

      //saved modal
      const [open, setOpen] = React.useState(false);
      const handleClose = () => setOpen(false);

    
      const [workouts, setWorkouts] = useState([]);

      const getWorkoutData = async () => {
  
          try {
          const data = await axios.get(
              `http://127.0.0.1:8000/api/workout/user/${props.user}/`
          );
          setWorkouts(data.data);
          } catch (e) {
          console.log(e);
          }
      };
  
      useEffect(async () => {
          await getWorkoutData();
      }, []);  
  
    return (
        <div>
        <div className="macro-title">Assign Exercises</div>
        <div className="mini-calendar" style={{marginRight: '2%'}}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                    autoOk
                    label="Date"
                    value={selectedDate}
                    onChange={date => onDateChange(date)}
                    renderInput={props => <TextField {...props} />}
                />
        </LocalizationProvider>
        </div>
        <div className="meal-entry">
            <div>
                <div className="meal-row">
                    <div className="meal-input">
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> 
                            <ThemeProvider theme={theme}>
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
                <ExerciseSearchBar data={exercises} setFormData = {setFormData} formData = {formData} user = {user} reps={reps} sets={sets} rest={rest} rir={rir} load={load} notes={notes}/>
                        <div style={{textAlign: 'right'}}>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" 
                        color="neutral" 
                        style={{marginTop: '2%', marginBotton: '5%', marginRight: '2%', minWidth: '100px', padding: '10px', fontSize: '15px'}}
                        onClick={e => onAdd(e)}>
                        Add Workout
                        </Button>
                    </ThemeProvider>
                    <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <div style={{textAlign: 'center'}}><CheckIcon style={{fontSize: '50px'}}/></div>
                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign: 'center'}}>
                        Exercise Added!
                        </Typography>
                    </Box>
                    </Modal>
                </div>
                <div style={{marginTop: '3%'}} className="macro-title">Workout Summary</div>
                <hr/>

                <div className="workout-container">
                    <div>
                        <span style={{position: 'absolute', marginLeft: '16%', fontWeight: '700'}}>Reps</span>
                        <span style={{position: 'absolute', marginLeft: '26%', fontWeight: '700'}}>Sets</span>
                        <span style={{position: 'absolute', marginLeft: '36%', fontWeight: '700'}}>Rests</span>
                    </div>
                    {workouts.map((exercise) => {
                        if (exercise.date === selectedDate.toISOString().split('T')[0]) {  
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
    </div>

    )
}
