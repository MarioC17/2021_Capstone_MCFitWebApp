import React, { Component, useState, useEffect} from 'react';
import { render } from 'react-dom';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from '../../components/Sidebar';
import StaffSidebar from '../../components/TrainerSidebar';
import Cookies from 'universal-cookie';
import PrintIcon from '@mui/icons-material/Print';
import axios from 'axios';

//Stylesheet
import './exercise.css';
const cookies = new Cookies();
let is_staff = cookies.get('is_staff');

const theme = createTheme({
    palette: {
      neutral: {
        main: '#000000',
        contrastText: '#ffffff',
      },
      reverse: {
        main: '#ffffff',
        contrastText: '#000000',
      }
    },
  });

  export default function Fitness(props) {
    const [workoutDesc, setworkoutDesc] = useState([]);
    const getWorkoutDesc = async () => {

        let workout = props.location.clientProp 

        try {
        const data = await axios.get(
            `http://127.0.0.1:8000/api/exercise/${workout}/`
        );
        setworkoutDesc(data.data);
        } catch (e) {
        console.log(e);
        }
    };

    useEffect(async () => {
        await getWorkoutDesc();
    }, []);  

    return (
        <>
        {is_staff == 'true' ? console.log('yes') : console.log('no')}
        {is_staff == 'true' ? <StaffSidebar/> : <Sidebar/>}
        <div style={{backgroundColor: "#f4f4f4", minHeight: "100vh" }} className="exercise-container">
        
            <div className="exercise-title">
                Fitness
            </div>
            <div className='exercise-description'>
                <div className='exercise-title-card'>
                    <span>{workoutDesc.name}</span>
                    <PrintIcon style={{fontSize: "35px"}}/>
                </div>
                <div className="exercise-explanation">
                    <span style={{fontWeight: '700'}}>Targeted area: &nbsp;</span>{workoutDesc.muscle} <br/><br/>
                    <span style={{fontWeight: '700'}}>How to do this exercise: &nbsp;</span>
                    {workoutDesc.instructions} <br/><br/>
                </div>
                
            </div>
            
        </div>
        </>
    )
}