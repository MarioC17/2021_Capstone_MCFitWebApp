import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

function Header() {
	
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar style={{ background: 'black' }} position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="white"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
            		<MenuIcon style={{color: 'white'}}/>
          			</IconButton>
          			<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            			<Link to ="/" style={{color: 'white', textDecoration: 'none'}}>MCFitness</Link>
          			</Typography>
          			<Link to="/login" style={{color: 'white'}}><Button color="inherit">Login</Button></Link>
				</Toolbar>
      		</AppBar>
    	</Box>
	);
}

export default Header;