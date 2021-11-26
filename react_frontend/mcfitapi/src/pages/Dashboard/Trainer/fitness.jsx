import React from 'react';
import { createTheme } from '@mui/material/styles';
import Sidebar from '../../../components/Sidebar';
import CircleIcon from '@mui/icons-material/Circle';

import ExerciseTable from '../../../components/ExerciseTable';
import BlankProfile from '../../../static/img/blankprofile.jpg';
//Stylesheet
import './fitness.css';

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
    return (
        <>
        <Sidebar/> 
        <div style={{backgroundColor: "#f4f4f4", minHeight: "100vh" }} className="trainer-fitness-container">
        
            <div className="dashboard-title">
                Fitness
            </div>
            <div className="profile">   
                <span className="small-title">{props.location.clientProp.name}</span><br/><br/><br/><br/>
                <img className="profile-pic" src={BlankProfile} alt="default image"/><br/><br/>
                <div className="profile-card">
                    <span className="small-title">Info.</span>
                    <div className="profile-info">
                        <div style={{display: 'flex', flexDirection: 'row', alignContent: 'space-between'}}>
                            <span>Birthday: databasestuff</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>Sex: {props.location.clientProp.gender}</span>
                        </div>
                        <span>Address: {props.location.clientProp.location}</span> 
                        <span>Program: databasestuff</span>
                    </div>
                </div>
                <div className="profile-card">
                    <span className="small-title">Goals</span>
                    <div className="profile-info">
                        <span>Strength, Toning, General Fitness</span>
                    </div>
                </div>
                <div className="profile-card">
                    <span className="small-title">Upcoming Payments</span>
                    <div className="profile-info">
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <span>Oct. 30, 2021 </span>
                            <span style={{alignItems: 'center'}}><CircleIcon style={{fill: "orange"}}/>$150.00</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="assign">
                <span className="small-title">Assign Exercise</span><br/><br/><br/><br/>
                <ExerciseTable/>
            </div>
    </div>
    </>
    )
}