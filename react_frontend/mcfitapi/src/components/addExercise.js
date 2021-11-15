
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const AddExercise = () => {

    let history = useHistory();

    const [name, setName] = useState(null)
    const [muscle, setMuscle] = useState(null)
    const [equipment, setEquipment] = useState(null)
    const [description, setDescription] = useState(null)
    const [benefits, setBenefits] = useState(null)
    const [instructions, setInstructions] = useState(null)
    const [video, setVideo] = useState(null)


    const addNewexercise = async () => {
        let formField = new FormData()
        formField.append('name',name)
        formField.append('muscle',muscle)
        formField.append('equipment',equipment)
        formField.append('description',description)
        formField.append('benefits',benefits)
        formField.append('instructions',instructions)
        formField.append('video',video)

        await axios({
          method: 'post',
          url:'http://localhost:8000/api/',
          data: formField
        }).then(response=>{
          console.log(response.data);
          history.push('/')
        })
    }
   
    return (
        <div className="container">
            <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A exercise</h2>
        
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
         
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your muscl"
              name="muscle"
              value={muscle}
              onChange={(e) => setMuscle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your equipment"
              name="equipment"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your benefits"
              name="benefits"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your instructions"
              name="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your video"
              name="video"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
            />
          </div>
          <button className="btn btn-primary btn-block" onClick={addNewexercise}>Add exercise</button>
       
      </div>
    </div>
        </div>
    );
};

export default AddExercise;