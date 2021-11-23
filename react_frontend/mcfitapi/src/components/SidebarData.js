import React from 'react'
import { EventAvailable, Fastfood, FitnessCenter, Home, Payment, Settings } from '@material-ui/icons/';
import img from "../static/img/Logo.png";
import { Box } from '@mui/material';
import { Link } from "react-router-dom";
export const SidebarData = [
    {
        icon: <Box sx={{ flexGrow: 1 }}><Link to ="/"><img align='left' style={{ width: 50, height: 50 }} src={img} alt="" /></Link></Box>

    },
    {
        icon: <Home/>,
        link: "/",
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
    }
]