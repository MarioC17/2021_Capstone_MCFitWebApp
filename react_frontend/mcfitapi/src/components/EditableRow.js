import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ReadOnlyRow from "./ReadOnlyRow";

    /*
    PURPOSE: Make an exercise editable in the data table
    PARAMS: Row
    RETURNS: Editable row representing a single exercise
    PRE: None
    */
const EditableRow = ({ row}) => {

  let history = useHistory();
  const [editing, setEditing] = useState("1")
  const [name, setName] = useState(row.name)
  const [muscle, setMuscle] = useState(row.muscle)
  const [equipment, setEquipment] = useState(row.equipment)
  const [description, setDescription] = useState(row.description)
  const [benefits, setBenefits] = useState(row.benefits)
  const [instructions, setInstructions] = useState(row.instructions)
  const [video, setVideo] = useState(row.video)

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
  const handleEditClick = (event) => {
    event.preventDefault();
    setEditing("1");
  };

  const handleDeleteClick = (event,row) => {
    console.log(row.exercise_id);
  };

  if (editing !== null)
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
          <button type="button" onClick={(event)=> updateExercise(event,row)}>Save</button>
          </TableCell>
      </TableRow> )
      else
      {
        return (
          <ReadOnlyRow row={row} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}/>
        )} 
      }

export default EditableRow;