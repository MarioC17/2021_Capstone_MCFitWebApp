import { IconButton } from '@material-ui/core';
import { MoreVert } from '@mui/icons-material/';
import { Box } from '@mui/material/';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Loading from '../../../components/loading';
import Sidebar from '../../../components/TrainerSidebar';
import BlankProfile from '../../../static/img/blankprofile.jpg';
import './clients.css';


const Clients = () => {
  const [fullProfiles,setfullProfiles] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [temp,setTemp] = useState(new Map());
  
    switch(loading) {
      case true:
        return(
          <Loading loading = {loading} data={temp} setLoading = {setLoading} setfullProfiles={setfullProfiles} fullProfiles={fullProfiles}></Loading>
        )
      // Full populated client page displays if all client data is loaded in
      case false: 
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

                        <div className="client-grid">
                        {fullProfiles.map((client, index) => (
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
      }}
      

export default Clients;
