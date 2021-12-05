import React, { Fragment, useEffect, useState } from 'react';
import Sidebar from '../components/TrainerSidebar';
import '../pages/Dashboard/Trainer/clients.css'
import { Box, TextField } from '@mui/material/';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading(props) {

  const [profiles,setProfiles] = useState([]);
  const [clientList,setClients] = useState([]);
  const [data,setData] = useState(new Map());
  
  function prof() {
    this.first_name = 'N/A';
    this.id = 'N/A';
    this.last_name = 'N/A';
    this.dob = 'N/A';
    this.email = 'N/A';
    this.gender = 'N/A';
    this.address = 'N/A';
    this.fitness_goal = 'N/A';
    this.emergency_contact = 'N/A';
    this.phone_num = 'N/A';
    this.height = 'N/A';
    this.weight = 'N/A';
  }

  const getProfileData = async () => {
    console.log("getprofdata")
    try {
      const profiles = await axios.get(
        "http://localhost:8000/api/profile"
      );
      setProfiles(profiles.data)
    } catch (e) {
      console.log(e);
    }
  };


  
  const getClientData = async () => {
    console.log("getclientdata")
    try {
      const client = await axios.get(
        "http://localhost:8000/api/clients"
      );
      setClients(client.data)
    } catch (e) {
      console.log(e);
    }
  };

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




  const loadClientInfo = () => {
    clientList.forEach(client => {
      if (data.get(client.user) !== undefined)
      {
        console.log("loading client")
        let current_client = JSON.parse(client.extra_data);
        let current_profile = data.get(client.user)
        current_profile.first_name = current_client.given_name;
        current_profile.last_name = current_client.family_name;
        current_profile.email = current_client.email;
        }
    })
    console.log("CLIETN LOADED")
    props.setfullProfiles(Array.from(data))
  }

  const loadProfileInfo = () => {
    console.log("loadprof")
    profiles.forEach(item => {
      let fullProf = new prof();
      let age = getAge(item.dob)
      fullProf.gender = item.gender;
      fullProf.address = item.address;
      fullProf.fitness_goal = item.fitness_goal;
      fullProf.emergency_contact = item.emergency_contact;
      fullProf.phone_num = item.phone_num;
      fullProf.height = item.height;
      fullProf.weight = item.weight;
      fullProf.dob = age;
      fullProf.id = item.user;
      data.set(item.user,fullProf);
    })
  }


  useEffect(async () => {
      
    await getClientData().then(await getProfileData()).then(await loadProfileInfo()).then(await loadClientInfo());

    if(props.fullProfiles.length > 0){
      props.setLoading(false)
    }
    },[props.fullProfiles]);


    console.log(props.fullProfiles[1])



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
            <Box sx={{ display: 'flex' }}>
            <CircularProgress />
            </Box>
        </div>
    </>
  );
}