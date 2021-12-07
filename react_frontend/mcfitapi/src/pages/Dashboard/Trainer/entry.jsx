import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button, IconButton } from '@mui/material';
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
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

//Stylesheet
import './entry.css';
import EditableExerciseCard from '../../../components/editWorkout';
const cookies = new Cookies() 
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
    const [editExercise, setEditExercise] = useState(0);
    const [deleteExercise,setDeleteExercise] = useState(null)
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
/*
    const updateExercise = async (event,row) => {
        setEditing("1")
        event.preventDefault()
        let formField = new FormData()
        formField.append('name',name)
        formField.append('muscle',muscle)
        formField.append('equipment',equipment)
        formField.append('description',description)
        formField.append('benefits',benefits)
        formField.append('instructions',instructions)
        formField.append('video',video)
    
        row.muscle = muscle
        row.name = name
        row.equipment = equipment
        row.description = description
        row.benefits = benefits
        row.instructions = instructions
        row.video = video
        
        await axios({
            method: 'Put',
            url: `http://localhost:8000/api/exercise/edit/${row.exercise_id}/`,
            data: formField
        }).then(response => {
            console.log(response.data)
            setEditing(null);
        })
    }
    
      const handleEditClick = (event,exercise) => {
    event.preventDefault();
    setEditExerciseId(exercise.exercise_id)
  };
*/

const handleUnassignClick = async (event,workout) => {
    event.preventDefault()
    setDeleteExercise(workout.workout_id)
    for (let i = 0; i < workouts.length; i++){
        if (workouts[i].workout_id === workout.workout_id){
            workouts.splice(i, 1);
            }
    } 
    await axios({
        method: 'Delete',
        url: `http://127.0.0.1:8000/api/workout/delete/${workout.workout_id}/`,
    }).then(response => {
        console.log(response.data)
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

    const onEditClick = (event,exercise) => {
        event.preventDefault();
        setEditExercise(exercise)
        console.log(exercise)
        }

    const onDateChange = e => {
        setFormData({...formData,['date']: e.getFullYear()+'-'+('0'+(e.getMonth()+1)).slice(-2)+'-'+('0'+(e.getDate()))});
        handleDateChange(e);
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

        setExerciseNames(result);
        } catch (e) {
        console.log(e);
        }
    };

    useEffect(() => {
        getexerciseData();
        setFormData({...formData,['date']: selectedDate.getFullYear()+'-'+('0'+(selectedDate.getMonth()+1)).slice(-2)+'-'+('0'+(selectedDate.getDate()))});
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
      const handleClose = () => {
          setOpen(false);
          window.location.reload(false);
          
        }

    
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
                        <span style={{position: 'absolute', marginLeft: '20%', fontWeight: '700'}}>Reps</span>
                        <span style={{position: 'absolute', marginLeft: '26%', fontWeight: '700'}}>Sets</span>
                        <span style={{position: 'absolute', marginLeft: '32%', fontWeight: '700'}}>Load</span>
                        <span style={{position: 'absolute', marginLeft: '38%', fontWeight: '700'}}>RIR</span>
                        <span style={{position: 'absolute', marginLeft: '44%', fontWeight: '700'}}>Rests</span>
                    </div>
                    {workouts.map((exercise) => {
                        if (exercise.date === selectedDate.getFullYear()+'-'+('0'+(selectedDate.getMonth()+1)).slice(-2)+'-'+('0'+(selectedDate.getDate()))) {  
                            return [
                                <Fragment>
                                  {editExercise === exercise.workout_id ? <EditableExerciseCard exerciseNames={exerciseNames} exercise={exercise}/> : (
                                      deleteExercise === exercise.workout_id ? null : (
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
                                            <span>
                                            <Link to = {
                                                {
                                                    pathname: "/fitness/exercise",
                                                    clientProp: exercise.exercise
                                                }}>    
                                                <Button class="button" variant="contained" color="neutral">
                                                    View
                                                </Button>
                                            </Link>
                                                {/*     Edit still in progress. Not ready for demo
                                                <Button class="button" variant="contained" color="neutral" onClick= {e => onEditClick(e,exercise.exercise)}>
                                                        Edit
                                                </Button>
                                                */}
                                                <Button class="button" variant="contained" color="neutral" onClick= {e => handleUnassignClick(e,exercise)}>
                                                        Unassign
                                                </Button>
                                            </span>
                                        </ThemeProvider>
                                    </div>
                                  ))}
                                </Fragment>

                            ];

                        }
                    })}
                </div>
            </div> 
        </div>
    </div>

    )
}
