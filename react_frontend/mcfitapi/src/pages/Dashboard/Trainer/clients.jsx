import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Sidebar from '../../../components/Sidebar';
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

function Clients() {
    const [value, setValue] = React.useState(null);
    const clients = [
        {
          'id': 1, 
          'profilepic': <img style={{height: '60px', width: '60px', borderRadius: '50%'}} src={BlankProfile}/>,
          'name': 'Tina Goulding',
          'age': 23,
          'gender': 'Female', 
          'location': '321 Another Tr.'
        },
        {
          'id': 2, 
          'profilepic': <img style={{height: '60px', width: '60px', borderRadius: '50%'}} src={BlankProfile}/>,
          'name': 'Alex Gabriel',
          'age': 23,
          'gender': 'Male', 
          'location': '123 Someplace Dr.'
        },
        {
          'id': 3, 
          'profilepic': <img style={{height: '60px', width: '60px', borderRadius: '50%'}} src={BlankProfile}/>,
          'name': 'Emma Brooks',
          'age': 28,
          'gender': 'Female', 
          'location': '9720 Crimson Dr.'
        },
    {
        'id': 4, 
        'profilepic': <img style={{height: '60px', width: '60px', borderRadius: '50%'}} src={BlankProfile}/>,
        'name': 'Emma Brooks',
        'age': 28,
        'gender': 'Female', 
        'location': '9720 Crimson Dr.'
        },
        {
        'id': 5, 
        'profilepic': <img style={{height: '60px', width: '60px', borderRadius: '50%'}} src={BlankProfile}/>,
        'name': 'Emma Brooks',
        'age': 28,
        'gender': 'Female', 
        'location': '9720 Crimson Dr.'
        },
        {
        'id': 6, 
        'profilepic': <img style={{height: '60px', width: '60px', borderRadius: '50%'}} src={BlankProfile}/>,
        'name': 'Emma Brooks',
        'age': 28,
        'gender': 'Female', 
        'location': '9720 Crimson Dr.'
        },
        {
        'id': 7, 
        'profilepic': <img style={{height: '60px', width: '60px', borderRadius: '50%'}} src={BlankProfile}/>,
        'name': 'Emma Brooks',
        'age': 28,
        'gender': 'Female', 
        'location': '9720 Crimson Dr.'
        },
        {
        'id': 8, 
        'profilepic': <img style={{height: '60px', width: '60px', borderRadius: '50%'}} src={BlankProfile}/>,
        'name': 'Emma Brooks',
        'age': 28,
        'gender': 'Female', 
        'location': '9720 Crimson Dr.'
        },
      ];
    return (
        <>
            <Sidebar/>
            <div className="client-area">
                <div className="client-title">
                    Fitness
                </div>
                <div className="client-sub">
                    Clients
                </div>
                
                <div style={{display: 'flex', flexDirection: 'row', paddingLeft: '3%'}}>
                    <ClientSearch/>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Select Date"
                        value={value}
                        onChange={(newValue) => {
                        setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
                </div>
                
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '1%'}}>
                    <span>Sort by Recent</span>
                    <IconButton style={{float: 'right'}} color="black" aria-label="View Profile" component="span">
                        <FilterList/>
                    </IconButton>
                </div>

                <div className="client-grid">
                    {clients.map((client, index) => (
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
                                clientProp: client
                            }
                        }
                        style={{textDecoration:'none'}}>
                            <IconButton style={{float: 'right', margin: '-5%'}} color="black" aria-label="View Profile" component="span">
                                <MoreVert/>
                            </IconButton>
                        </Link>
                        <div className="client-info">
                            <span>{client.profilepic}</span>
                            <span>{client.name}</span>
                            <span> {client.age} {client.gender}</span>
                            <span>{client.location}</span>
                        </div>
                        
                        </Box>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Clients