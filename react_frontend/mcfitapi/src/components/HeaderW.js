import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { Link } from "react-router-dom";
import img from "../static/img/LogoB.png";
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <AppBar style={{ background: 'white' }} position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}><Link to ="/"><img align='left' style={{ width: 50, height: 50 }} src={img} alt="" /></Link></Box>
        <Link to="/memberships" style={{color: 'black'}}><Button color="inherit">Memberships</Button></Link>
        <Link to="/aboutme" style={{color: 'black'}}><Button color="inherit">About Me</Button></Link>
        <Link to="/policy" style={{color: 'black'}}><Button color="inherit">Policy</Button></Link>
        <SearchBar/>
      </Toolbar>
    </AppBar>
  );
}