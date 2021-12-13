import { IconButton } from '@material-ui/core';
import { MoreVert } from '@mui/icons-material/';
import { Box } from '@mui/material/';
import React from 'react';
import { Link } from "react-router-dom";
import '../pages/Dashboard/Trainer/clients.css';
import BlankProfile from '../static/img/blankprofile.jpg';

    /*
    PURPOSE: Renders all the client cards on the trainer client page
    PARAMS: Props - has the full list of client profiles
    RETURNS: Client profiles as cards on the client page
    PRE: None
    */
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