import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Sidebar from '../../../components/TrainerSidebar';
import './clients.css'
import ClientSearch from '../../../components/ClientSearch';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Box, TextField } from '@mui/material/';
import { FilterList, MoreVert } from '@mui/icons-material/';
import BlankProfile from '../../../static/img/blankprofile.jpg'
import { IconButton } from '@material-ui/core';
import { style } from '@mui/system';
import axios from "axios";
import Loading from '../../../components/loading';
import CircularProgress from '@mui/material/CircularProgress';


const Clients = () => {
    useEffect(async () => {
      
      await getClientData().then(await getProfileData()).then(await loadProfileInfo()).then(await loadClientInfo()).then(await setload());

    },[loading]);
    
    return(
    <>
        <Sidebar/>
        <div className="client-area">
            <div className="client-title">
                Fitness
            </div>
            <div className="client-sub">
                Clients
            </div>
            <Box sx={{ display: 'flex' }}>
            <CircularProgress />
            </Box>
        </div>
    </>
        )        
    }}
      

export default Clients;
