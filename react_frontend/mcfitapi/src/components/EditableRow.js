import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
const EditableRow = ({row}) => {

  let history = useHistory();
  const [name, setName] = useState(null)
  const [muscle, setMuscle] = useState(null)
  const [equipment, setEquipment] = useState(null)
  const [description, setDescription] = useState(null)
  const [benefits, setBenefits] = useState(null)
  const [instructions, setInstructions] = useState(null)
  const [video, setVideo] = useState(null)

  const updateExercise = async (event,row) => {
    let formField = new FormData()
    formField.append('name',name)
    formField.append('muscle',muscle)
    formField.append('equipment',equipment)
    formField.append('description',description)
    formField.append('benefits',benefits)
    formField.append('instructions',instructions)
    formField.append('video',video)
    
    await axios({
        method: 'Put',
        url: `http://localhost:8000/api/${row.exercise_id}/edit`,
        data: formField
    }).then(response => {
        console.log(response.data);
        history.push("/");
    })
}

  return (
    <TableRow
        tabIndex={-1}
        key={name}
    >
        <TableCell component="th" scope="row" align = "right">
        <input
              type="text"
              className="form-control form-control-lg"
              placeholder= "Enter a name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
        </TableCell>
        <TableCell align="right">
        <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your muscl"
              name="muscle"
              value={muscle}
              onChange={(e) => setMuscle(e.target.value)}
            />
        </TableCell>
        <TableCell align="right">
        <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your equipment"
              name="equipment"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
            />
        </TableCell>
        <TableCell align="right">
        <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
        </TableCell>
        <TableCell align="right">
        <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your benefits"
              name="benefits"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
            />
        </TableCell>
        <TableCell align="right">
        <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your instructions"
              name="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
        </TableCell>
        <TableCell align="right">
        <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your video"
              name="video"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
            />
        </TableCell>
        <TableCell>
        <button type="button" onClick={(event)=> updateExercise(event,row)}>Edit</button>
        </TableCell>
    </TableRow> )}

export default EditableRow;