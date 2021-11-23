import React, { Component, useState} from 'react'
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Button, IconButton } from '@mui/material/';
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