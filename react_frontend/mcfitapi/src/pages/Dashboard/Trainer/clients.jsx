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

function Clients() {
    const [value, setValue] = React.useState(null);
    const [profiles,setProfiles] = useState([]);
    const [clientList,setClients] = useState([]);
    //const fullProfiles = new Map()
    const [fullProfiles,setfullProfiles] = useState(new Map());
    function prof() {
      this.first_name = null;
      this.id = null;
      this.last_name = null;
      this.dob = null;
      this.email = null;
      this.gender = null;
      this.address = null;
      this.fitness_goal = null;
      this.emergency_contact = null;
      this.phone_num = null;
      this.height = null;
      this.weight = null;
    }

    const getProfileData = async () => {
      try {
        const profiles = await axios.get(
          "http://localhost:8000/api/profile"
        );
        setProfiles(profiles.data)
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
      getProfileData();
    }, []);

    const getClientData = async () => {
      try {
        const client = await axios.get(
          "http://localhost:8000/api/clients"
        );
        setClients(client.data)
      } catch (e) {
        console.log(e);
      }
    };
  
      useEffect(() => {
        getClientData();
      }, []);

    function getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var yearGap = today.getFullYear() - birthDate.getFullYear();
      var monthGap = today.getMonth() - birthDate.getMonth();
      var dayGap = today.getDate() < birthDate.getDate();
      if (monthGap < 0 || (monthGap == 0 && dayGap == true)) {
          yearGap--;
      }

      return yearGap;
  }
    //Puts full profile data into a dictionary of profile objects. Using the user_id as the key  
    const getfullProfileData = () => {
      clientList.forEach(client => {
        let current_client = JSON.parse(client.extra_data);
        let fullProf = new prof();
        fullProf.first_name = current_client.given_name;
        fullProf.last_name = current_client.family_name;
        fullProf.email = current_client.email;
        fullProfiles.set(client.user,fullProf);
      //setClients(clientList)
      })

      profiles.forEach(item => {
        let current_profile = fullProfiles.get(item.user)
        current_profile.gender = item.gender;
        current_profile.address = item.address;
        current_profile.fitness_goal = item.fitness_goal;
        current_profile.emergency_contact = item.emergency_contact;
        current_profile.phone_num = item.phone_num;
        current_profile.height = item.height;
        current_profile.weight = item.weight;
        current_profile.dob = getAge(item.dob);
        current_profile.id = item.user;
      })
    }
  
    useEffect(() => {
      getfullProfileData();
    }, []);
    

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
                {Array.from(fullProfiles).map((client, index) => (
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
            </div>
        </>
    )
}

export default Clients