import React, { Component, useState,useEffect} from 'react'
import ExerciseSearch from './ExerciseSearch';

import '../pages/Dashboard/Trainer/entry.css';

  const ExerciseSearchBar = (props) => {
    const onChange = e => props.setFormData({...props.formData,[e.target.name]: e.target.value});
      //have to change the class names to make css for this
        return (
          <div class="meal-row">
            <div class="meal-input">
            <ExerciseSearch  formData= {props.formData} data = {props.data} setFormData={props.setFormData} />
            </div>
            <div class="meal-stats">
              <input
                id="reps"
                name="reps"
                sx={{ m: 1, width: '15ch' }}
                placeholder = "reps"
                value={props.reps}
                onChange={e => onChange(e)}
                aria-describedby="filled-weight-helper-text"

              />
              <input
                id="sets"
                name="sets"
                sx={{ m: 1, width: '15ch' }}
                placeholder = "sets"
                value={props.sets}
                onChange={e => onChange(e)}
                aria-describedby="filled-weight-helper-text"

              />
              <input
                id="load"
                name="load"
                placeholder = "Load"
                sx={{ m: 1, width: '15ch' }}
                value={props.load}
                onChange={e => onChange(e)}
                aria-describedby="filled-weight-helper-text"

              />

              <input
                id="rir"
                name="rir"
                placeholder = "RIR"
                sx={{ m: 1, width: '15ch' }}
                value={props.rir}
                onChange={e => onChange(e)}
                aria-describedby="filled-weight-helper-text"

              />

                            
              <input
                id="rest"
                name="rest"
                placeholder = "Rest"
                sx={{ m: 1, width: '15ch' }}
                value={props.rest}
                onChange={e => onChange(e)}
                aria-describedby="filled-weight-helper-text"

              />

              <input
                id="notes"
                name="notes"
                placeholder = "Notes"
                sx={{ m: 1, width: '10ch' }}
                value={props.notes}
                onChange={e => onChange(e)}
                aria-describedby="filled-weight-helper-text"

              />
            </div>
          </div>
        )
    }


export default ExerciseSearchBar
