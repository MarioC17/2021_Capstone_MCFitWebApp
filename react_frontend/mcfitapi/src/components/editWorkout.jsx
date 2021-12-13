import React, { Fragment, useState,useEffect} from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom';


    /*
    PURPOSE: Makes a workout card editable in the trainer and client page when edit is selected
    PARAMS: None
    RETURNS: None
    PRE: None
    Note: This code works but hasn't been added to the website due to time constraints with the design
    */
const EditableExerciseCard = (props) => {
    let history = useHistory();
    const [sets, setSets] = useState(props.exercise.sets)
    const [reps, setReps] = useState(props.exercise.reps)
    const [rest, setRest] = useState(props.exercise.rest)

    const theme = createTheme({
        palette: {
          neutral: {
            main: '#000000',
            contrastText: '#ffffff',
          },
        },
      });

return (
            <div className="workout-card">
    <span className='workout-content'>{props.exerciseNames[props.exercise.exercise]}</span>
    <span style={{position: 'absolute', marginLeft: '15.5%', fontSize: '24px'}}>
        <input
        type="reps"
        className="form-control form-control-lg"
        placeholder={props.exercise.reps}
        name="reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        />
    </span>
    <span style={{position: 'absolute', marginLeft: '25.5%', fontSize: '24px'}}>
        <input
            type="sets"
            className="form-control form-control-lg"
            placeholder={props.exercise.sets}
            name="sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            />    
    </span>
    <span style={{position: 'absolute', marginLeft: '35.5%', fontSize: '24px'}}>
        <input
            type="rest"
            className="form-control form-control-lg"
            placeholder={props.exercise.rest}
            name="rest"
            value={rest}
            onChange={(e) => setRest(e.target.value)}
            />
    </span>

    <ThemeProvider theme={theme}>
        <span>
            <Button class="button" variant="contained" color="neutral">
                    Save
            </Button>
            <Button class="button" variant="contained" color="neutral">
                    Unassign
            </Button>
        </span>
    </ThemeProvider>
    </div>


    )

}

export default EditableExerciseCard;


