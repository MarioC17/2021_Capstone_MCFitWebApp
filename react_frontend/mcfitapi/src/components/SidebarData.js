import { EventAvailable, Fastfood, FitnessCenter, Home, Payment, Settings } from '@material-ui/icons/';
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
        icon: <Home/>,
        link: "/home",
    },
    {
        icon: <EventAvailable/>,
        link: "/booking",
    },
    {
        icon: <Fastfood/>,
        link: "/nutrition",
    },
    {
        icon: <FitnessCenter/>,
        link: "/fitness",
    },
    {
        icon: <Payment/>,
        link: "/memberships",
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