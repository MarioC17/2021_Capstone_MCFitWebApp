import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Sidebar from './TrainerSidebar';
import ClientSearch from './ClientSearch';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Box, TextField } from '@mui/material/';
import { FilterList, MoreVert } from '@mui/icons-material/';
import BlankProfile from '../static/img/blankprofile.jpg'
import { IconButton } from '@material-ui/core';
import { style } from '@mui/system';
import axios from "axios";
import '../pages/Dashboard/Trainer/clients.css'

function ClientList(props) {
    return (
        <div className="client-grid">
        {Array.from(props.fullProfiles).map((client, index) => (
          <Box sx={{
            width: 242,
              height: 200,
              borderRadius: '10px',
              padding: '1%',
              backgroundColor: '#D6D6D6',
              '&:hover': {
                backgroundColor: '#D6D6D6',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
            data-index={index}>
                
          <Link to = {
              {
                  pathname: "/trainer/fitness",
                  clientProp: client[1]
              }
          }
          style={{textDecoration:'none'}}>
              <IconButton style={{float: 'right', margin: '-5%'}} color="black" aria-label="View Profile" component="span">
                  <MoreVert/>
              </IconButton>
          </Link>
          <div className="client-info">
              <span><img style={{height: '60px', width: '60px', borderRadius: '50%'}} src={BlankProfile}/></span>
              <span>{client[1].first_name} {client[1].last_name}</span>
              <span>{client[1].gender} {client[1].dob}</span>
              <span>{client[1].address}</span>
          </div>
          
          </Box>
        ))}
        </div>
    )
}

export default ClientList