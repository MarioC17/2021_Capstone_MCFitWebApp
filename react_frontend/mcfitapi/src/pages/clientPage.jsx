import { createTheme } from '@mui/material/styles';
import React from 'react';
import Sidebar from '../components/Sidebar';
//Stylesheet
import './profile.css';




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

export default function profile() {
    return (
        <>
        <Sidebar/> 
        <div style={{backgroundColor: "#f4f4f4", minHeight: "100vh" }} className="profile-container">
                
            </div>
    </>
    )
}