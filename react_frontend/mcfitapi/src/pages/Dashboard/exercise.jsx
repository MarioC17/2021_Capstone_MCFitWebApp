import PrintIcon from '@mui/icons-material/Print';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Sidebar from '../../components/Sidebar';
import StaffSidebar from '../../components/TrainerSidebar';
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
    const print = () => {
        window.print()
    }
    const [workoutDesc, setworkoutDesc] = useState([]);
    const getWorkoutDesc = async () => {
        let workout = props.location.clientProp
        if (workout === undefined || workout === null || workout === "") {
            workout = cookies.get("workout_desc_id")
        }
        else{
            cookies.set('workout_desc_id', workout, { path: '/' ,maxAge:10800});
        }

        try {
        const data = await axios.get(
            `http://127.0.0.1:8000/api/exercise/${workout}/`
        );
        setworkoutDesc(data.data);
        } catch (e) {
        console.log(e);
        }
    };

    function getId(url) {
        url = url.toString()
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
    
        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
    }


    useEffect(async () => {
        await getWorkoutDesc();
    }, []);  

    return (
        <>
        {is_staff == 'true' ? <StaffSidebar/> : <Sidebar/>}
        <div style={{backgroundColor: "#f4f4f4", minHeight: "100vh" }} className="exercise-container">
        
            <div className="exercise-title">
                Fitness
            </div>
            <Fragment>
                {workoutDesc.video === "" || workoutDesc.video === undefined ? null : (
                <div className="exercise-video">
                <iframe 
                width="150%" 
                height="50%" 
                src= {"//www.youtube.com/embed/" + getId(workoutDesc.video)} 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>

                </iframe>
                </div>
                )}
            </Fragment>
            <div className='exercise-description'>
                <div className='exercise-title-card'>
                    <span>{workoutDesc.name}</span>
                    <PrintIcon style={{fontSize: "35px"}} onClick={e => print(e)}/>
                </div>
                <div className="exercise-explanation">
                    <span style={{fontWeight: '700'}}>Targeted area: &nbsp;</span>{workoutDesc.muscle} <br/><br/>
                    <span style={{fontWeight: '700'}}>How to do this exercise: &nbsp;</span>
                    
                    {workoutDesc.instructions === "" || workoutDesc.instructions === undefined ? null : (
                    workoutDesc.instructions.replace(/\\n/g, '').replace(/(?:\\(.))/g, '') )} <br/><br/>
                </div>
            </div>
            
        </div>
        </>
    )
}
