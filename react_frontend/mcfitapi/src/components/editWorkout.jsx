import React, { Fragment, useState,useEffect} from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom';



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
    /*
  const updateExercise = async (event,row) => {
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
  const handleEditClick = (event) => {
    event.preventDefault();
    setEditing("1");
  };

  const handleDeleteClick = (event,row) => {
    console.log(row.exercise_id);
  };
 */   

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


