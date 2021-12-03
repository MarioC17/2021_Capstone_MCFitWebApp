import React from 'react'
import { EventAvailable, Fastfood, FitnessCenter, Home, Payment, Settings } from '@material-ui/icons/';
import LogoutIcon from '@mui/icons-material/Logout';
import img from "../static/img/Logo.png";
import { Box } from '@mui/material';
import { Link } from "react-router-dom";
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
        link: "/trainer/booking",
    },
    {
        icon: <Fastfood/>,
        link: "/nutrition",
    },
    {
        icon: <FitnessCenter/>,
        link: "/trainer/fitness",
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