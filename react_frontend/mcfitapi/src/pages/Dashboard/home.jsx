import React from 'react'
import Sidebar from '../../components/Sidebar';
import './home.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material/';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function home() {
    
    let monthNumber = (new Date().getMonth()+1);
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let monthName = monthNames[monthNumber];    

    const current = new Date();
    const date = `${monthName}. ${current.getDate()}, ${current.getFullYear()}`;

    // MODIFY LATER
    const exercises = [
        { name: 'Dumbbell Single Arm Rows' },
        { name: 'Dumbbell Bench Press' },
        { name: 'Dumbbell Chest Press' },
        { name: 'Pull Ups' },
        { name: 'Push Ups' },
        { name: 'Bicep Curls' },
        { name: 'Cycling' },
      ];

    const nutritionData = [
        { name: "Protien", value: "128", measurement: 'g'},
        { name: "Fats", value: "65", measurement: 'g'},
        { name: "Carbohydrates", value: "230", measurement: 'g'},
        { name: "Calories", value: "1700", measurement: 'kcal'},
    ]

    const nutritionalSummary = [
        { name: "Daily calorie goal", value: "1800", measurement: 'kcal'},
        { name: "Total calorie remaining", value: "100", measurement: 'kcal'},
    ]

    const theme = createTheme({
    palette: {
        neutral: {
        main: '#000000',
        contrastText: '#ffffff',
        },
        reversed: {
        main: '#ffffff',
        contrastText: '#000000',
        }
    },
    });
    
    return (
        <div style={{backgroundColor: "#ffffff", minHeight: "100vh" }} >
        <Sidebar/>
        <div className="home-container">
            <div className="home-title">
                Welcome back, Jane!
            </div>
            <div className="progress-overall">
                <div className="home-sub-title">
                    Progress Overall
                </div>
                <div className="graph-card">

                </div>
            </div>
            <div className="information">
                <div className="home-sub-title">
                    Information
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px'}}>
                    <div className='home-card'>
                        <span style={{fontWeight: '700'}}>PROGRAM</span><br/>
                        Weeks completed
                        <span style={{position: 'fixed', right: '5%', fontSize: '40px', fontWeight: '700'}}>0/12</span>
                    </div>
                    <div className='home-card'>
                        <span style={{fontWeight: '700'}}>FITNESS GOALS</span><br/>
                    </div>
                    <div className='home-card'>
                        <span style={{fontWeight: '700'}}>UPCOMING APPOINTMENTS</span><br/>
                        No upcoming appointment
                    </div>
                    <div className='home-card'>
                        <span style={{fontWeight: '700'}}>UPCOMING PAYMENTS</span>
                        <div>
                            <span style={{float: 'left', width: '50%'}}>Due date</span>
                            <span style={{float: 'center', width: '50%'}}>Amount</span>
                        </div> 
                        <div>
                            <span style={{float: 'left', width: '50%'}}>N/A</span>
                            <span style={{float: 'center', width: '50%'}}> $0.00</span>
                        </div>  
                                 
                        <span style={{fontWeight: '700', textAlign: 'right'}}>Pay Now</span>
                    </div>
                    <div className='home-library-card'>
                        <span style={{color: 'white'}} className="analytic-title">Workout Library</span>
                        <IconButton style={{color: 'white'}}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default home
