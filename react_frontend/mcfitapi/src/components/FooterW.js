import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Avatar, Button } from '@mui/material/';
import React from 'react';
import socialIconInstagram from "../static/img/instagram.png";
import socialIconLinkedIn from "../static/img/linkedin.png";
import img from "../static/img/LogoB.png";

const useStyles = makeStyles((theme) => ({
	footer: {
		borderTop: `1px solid ${theme.palette.divider}`,
		marginTop: theme.spacing(8),
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.spacing(6),
			paddingBottom: theme.spacing(6),
		},
	},
}));

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'© '}
			{new Date().getFullYear()}
			{' '}
			<Link color="inherit" href="/">
				MikeCatui
			</Link>{' '}
			{'| All rights reserved.'}
		</Typography>
	);
}

const footers = [
	{
		title: 'About Me',
		description: ['Mike Catui', 'My Clients'],
	},
	{
		title: 'Pricing',
		description: [
			'How it works',
			'Online',
			'In-person',
		],
	},
	{
		title: 'Resources',
		description: [
			'Tutorials',
			"Terms & Policy",
			"Contact Us",
		],
	},
];

function Footer() {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Container maxWidth="md" component="footer" className={classes.footer}>
				<Grid container spacing={2} justify="space-evenly">
					<Grid xs={4}>
						<img align='left' style={{ width: 100, height: 100 }} src={img} alt="" />
						<Typography variant="h6" color="textPrimary" gutterBottom>Let me help you<br/> reach your goal.</Typography>
						<Button 
							href="https://www.instagram.com/mcauti_pft" 
							target="_blank"
							rel="noopener"
							startIcon={<Avatar src={socialIconInstagram}/>}/>
						<Button
							href="https://www.linkedin.com/in/mike-cauti-326b66135"
							target="_blank" 
							rel="noopener"
							startIcon={<Avatar src={socialIconLinkedIn} />}/>
					</Grid>
					<Grid xs={2}/>
					{footers.map((footer) => (
						<Grid item xs={2} key={footer.title}>
							<Typography variant="h6" color="textPrimary" gutterBottom>
								{footer.title}
							</Typography>
							<ul>
								{footer.description.map((item) => (
									<li key={item}>
										<Link href="#" variant="subtitle1" color="textSecondary">
											{item}
										</Link>
									</li>
								))}
							</ul>
						</Grid>
					))}
				</Grid>
				<Box mt={5}>
					<Copyright />
				</Box>
			</Container>
		</React.Fragment>
	);
}

export default Footer;