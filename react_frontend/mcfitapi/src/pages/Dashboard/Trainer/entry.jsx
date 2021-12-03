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
    const [selectedDate, handleDateChange] = useState(null);
    

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
        setexercise(data.data);
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

    return (
        <div>
        <div className="mini-calendar">
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
        <div className="macro-title">Assign Exercises</div>
        <div className="meal-entry">
            <div>
                <div className="meal-row">
                    <div className="meal-input">
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> 
                            <span className="meal-text">Exercises</span>
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
                        style={{marginBotton: '5%', minWidth: '100px', fontSize: '15px'}}
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
                <hr/>
            </div> 
        </div>
    </div>

    )
}
