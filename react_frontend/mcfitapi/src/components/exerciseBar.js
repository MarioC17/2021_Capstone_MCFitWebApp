import React, { Component, useState,useEffect} from 'react'
import ExerciseSearch from './ExerciseSearch';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';

    /*
    PURPOSE: Creates a component that handles the form filling of a new workout to be assigned to a client and a search bar for finding exercises in the database
    PARAMS: Client form data
    RETURNS: Search bar
    PRE: None
    */
  const ExerciseSearchBar = (props) => {
    const onChange = e => props.setFormData({...props.formData,[e.target.name]: e.target.value});
      //have to change the class names to make css for this
        return (
          <>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: '2%'}}>
            <ExerciseSearch  formData= {props.formData} data = {props.data} setFormData={props.setFormData} />
              <Input
                id="reps"
                name="reps"
                sx={{ m: 1, width: '15ch' }}
                placeholder = "reps"
                value={props.reps}
                onChange={e => onChange(e)}
                aria-describedby="filled-weight-helper-text"

              />
              <Input
                id="sets"
                name="sets"
                sx={{ m: 1, width: '15ch' }}
                placeholder = "sets"
                value={props.sets}
                onChange={e => onChange(e)}
                aria-describedby="filled-weight-helper-text"

              />
              <Input
                id="load"
                name="load"
                placeholder = "Load"
                sx={{ m: 1, width: '15ch' }}
                value={props.load}
                onChange={e => onChange(e)}
                aria-describedby="filled-weight-helper-text"

              />

              <Input
                id="rir"
                name="rir"
                placeholder = "RIR"
                sx={{ m: 1, width: '15ch' }}
                value={props.rir}
                onChange={e => onChange(e)}
                aria-describedby="filled-weight-helper-text"

              />

                            
              <Input
                id="rest"
                name="rest"
                placeholder = "Rest"
                sx={{ m: 1, width: '15ch' }}
                value={props.rest}
                onChange={e => onChange(e)}
                aria-describedby="filled-weight-helper-text"

              />
          </div>
          <div style={{textAlign: 'right', zIndex: -1}}>
            <Input
            style={{width: '58%', marginRight: '2%', marginTop: '2%'}}
            id="notes"
            name="notes"
            label="notes"
            placeholder = "notes"
            multiline
            rows={4}
            defaultValue=""
            value={props.notes}
            onChange={e => onChange(e)}
            aria-describedby="filled-weight-helper-text"
          />
          </div>
          
          </>
        )
    }


export default ExerciseSearchBar
