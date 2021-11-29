import React from 'react';
import { createTheme } from '@mui/material/styles';
import Sidebar from '../../../components/Sidebar';
import CircleIcon from '@mui/icons-material/Circle';
import BlankProfile from '../../../static/img/blankprofile.jpg';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Box, TextField } from '@mui/material/';
//import { TableHead, TableRow, TableCell, TableSortLabel } from '@material-ui/core/'
//Stylesheet
import './fitness.css';
const theme = createTheme({
    palette: {
      neutral: {
        main: '#000000',
        contrastText: '#ffffff',
      },
      reverse: {
        main: '#ffffff',
        contrastText: '#000000',
      }
    },
  });

const headCells = [
{ id: 'name', numeric: false, disablePadding: true, label: 'Exercise'},
{ id: 'reps', numeric: false, disablePadding: false, label: 'Reps' },
{ id: 'sets', numeric: false, disablePadding: false, label: 'Sets' },
{ id: 'rest', numeric: false, disablePadding: false, label: 'Rest' },
{ id: 'RIR', numeric: false, disablePadding: false, label: 'RIR' },
{ id: 'Load', numeric: false, disablePadding: false, label: 'Load' },
{ id: 'Notes', numeric: false, disablePadding: false, label: 'Notes' },
];

export default function Fitness(props) { 
    if (props.location.clientProp == undefined) {
        console.log("No profile selected")
        props.location.clientProp = {
            'profilepic': <img style={{height: '60px', width: '60px', borderRadius: '50%'}} src={BlankProfile}/>,
            'name': '',
            'age': '',
            'gender': '', 
            'location': ''
        };
    }
    else {
        console.log("Profile selected")
    }
    
    const [value, setValue] = React.useState(null);
    
    return (
        <>
        <Sidebar/> 
        <div style={{backgroundColor: "#f4f4f4", minHeight: "100vh" }} className="trainer-fitness-container">
        
            <div className="dashboard-title">
                Fitness
            </div>
            <div className="profile">   
                <span className="small-title">{props.name}</span><br/><br/><br/><br/>
                <img className="profile-pic" src={BlankProfile} alt="default image"/><br/><br/>
                <div className="profile-card">
                    <span className="small-title">Info.</span>
                    <div className="profile-info">
                        <div style={{display: 'flex', flexDirection: 'row', alignContent: 'space-between'}}>
                            <span>Birthday: databasestuff</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>Sex: {props.gender}</span>
                        </div>
                        <span>Address: {props.location}</span> 
                        <span>Program: databasestuff</span>
                    </div>
                </div>
                <div className="profile-card">
                    <span className="small-title">Goals</span>
                    <div className="profile-info">
                        <span>Strength, Toning, General Fitness</span>
                    </div>
                </div>
                <div className="profile-card">
                    <span className="small-title">Upcoming Payments</span>
                    <div className="profile-info">
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <span>Oct. 30, 2021 </span>
                            <span style={{alignItems: 'center'}}><CircleIcon style={{fill: "orange"}}/>$150.00</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="assign">
                <span className="small-title">Assign Exercise</span><br/><br/><br/><br/>
                <span style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '1%'}}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Select Date"
                            value={value}
                            onChange={(newValue) => {
                            setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </span>
                
                <hr/>
                <span className="small-title">Exercises Summary</span><br/><br/>
                <span>Oct. 20, 2021
                    
                </span> 
            </div>
    </div>
    </>
    )
}