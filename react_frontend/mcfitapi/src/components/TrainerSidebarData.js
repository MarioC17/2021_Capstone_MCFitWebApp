import { EventAvailable, FitnessCenter, Settings } from '@material-ui/icons/';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/material';
import React from 'react';
import { Link } from "react-router-dom";
import img from "../static/img/Logo.png";
export const SidebarData = [
    {
        icon: <Box sx={{ flexGrow: 1 }}><Link to ="/"><img align='left' style={{ width: 50, height: 50 }} src={img} alt="" /></Link></Box>

    },
    {
        icon: <EventAvailable/>,
        link: "/trainer/booking",
    },
    {
        icon: <FitnessCenter/>,
        link: "/trainer/clients",
    },
    {
        icon: <Settings/>,
        link: "/",
    },
    {
        title: 'logout',
        icon: <LogoutIcon/>,
        link: "/"
    }
]