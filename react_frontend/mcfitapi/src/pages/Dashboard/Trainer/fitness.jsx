import React from 'react';
import Cookies from 'universal-cookie';
import Sidebar from '../../../components/TrainerSidebar';
import BlankProfile from '../../../static/img/blankprofile.jpg';
import Entry from './entry';

import './fitness.css';

const cookies = new Cookies() 



export default function Fitness(props) { 
    /*
    PURPOSE: Puts the selected users information in cookies for easy retrieval on refresh
    RETURNS: None
    */
    const setCookies = () => {
        cookies.set('address', props.location.clientProp.address, { path: '/' ,maxAge:10800});
        cookies.set('gender', props.location.clientProp.gender, { path: '/' ,maxAge:10800});

        cookies.set('age', props.location.clientProp.dob, { path: '/' ,maxAge:10800});

        cookies.set('fitness_goal', props.location.clientProp.fitness_goal, { path: '/' ,maxAge:10800});
    
        cookies.set('first_name', props.location.clientProp.first_name, { path: '/' ,maxAge:10800});

        cookies.set('last_name', props.location.clientProp.last_name, { path: '/' ,maxAge:10800});

        cookies.set('client_id', props.location.clientProp.id, { path: '/' ,maxAge:10800});
    }

    if (props.location.clientProp == undefined) {
        console.log("No profile selected")
        props.location.clientProp = {
            'profilepic': <img style={{height: '60px', width: '60px', borderRadius: '50%'}} src={BlankProfile}/>,
            'first_name': '',
            'last_name':'',
            'dob': 'N/A',
            'gender': 'N/A', 
            'fitness_goal': 'N/A',
            'id':'N/A',
            'address':'N/A',
            
        };

        props.location.clientProp.address = cookies.get('address');
        props.location.clientProp.gender = cookies.get('gender');
        props.location.clientProp.dob = cookies.get('age');
        props.location.clientProp.fitness_goal = cookies.get('fitness_goal');
        props.location.clientProp.first_name = cookies.get('first_name');
        props.location.clientProp.last_name = cookies.get('last_name');
        props.location.clientProp.id = cookies.get('client_id');
    }
    else {
        if (props.location.clientProp.location == null) {
            props.location.clientProp.location = 'N/A'
        }
        else if (props.location.clientProp.gender == null) {
            props.location.clientProp.gender = 'N/A'
        }
        else if (props.location.clientProp.address == null) {
            props.location.clientProp.address = 'N/A'
        }

        setCookies()
        props.location.clientProp.address = cookies.get('address');
        props.location.clientProp.gender = cookies.get('gender');
        props.location.clientProp.dob = cookies.get('age');
        props.location.clientProp.fitness_goal = cookies.get('fitness_goal');
        props.location.clientProp.first_name = cookies.get('first_name');
        props.location.clientProp.last_name = cookies.get('last_name');
        props.location.clientProp.id = cookies.get('client_id');
    }

    
    return (
        <>
        <Sidebar/> 
        <div style={{backgroundColor: "#f4f4f4", minHeight: "100vh" }} className="trainer-fitness-container">
        
            <div className="dashboard-title">
                Fitness
            </div>
            <div className="profile">   
                <span className="small-title">{props.location.clientProp.first_name} {props.location.clientProp.last_name}</span><br/><br/><br/><br/>
                <img className="profile-pic" src={BlankProfile} alt="default image"/><br/><br/>
                <div className="profile-card">
                    <span className="small-title">Info.</span>
                    <div className="profile-info">
                        <div style={{display: 'flex', flexDirection: 'row', alignContent: 'space-between'}}>
                            <span>Age: {props.location.clientProp.dob}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>Sex: {props.location.clientProp.gender}</span>
                        </div>
                        <span>Address: {props.location.clientProp.address}</span> 
                    </div>
                </div>
                <div className="profile-card">
                    <span className="small-title">Goals</span>
                    <div className="profile-info">
                        <span>{props.location.clientProp.fitness_goal}</span>
                    </div>
                </div>
                </div>
            
            <div className="assign">
                <Entry user={props.location.clientProp.id}/>
            </div>
    </div>
    </>
    )
}