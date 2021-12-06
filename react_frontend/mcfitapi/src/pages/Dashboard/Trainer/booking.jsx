import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { Button, Modal, Box, Typography, Select, MenuItem, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getBookableTimes, bookEvent, getBookings, cancelBooking, getBookingsByUser, blockTimeSlot } from '../../../components/booking'
import Sidebar from '../../../components/TrainerSidebar';
import Sagenda from '../../../static/img/sagenda.png';
import MiniCalendar from '../../../components/MiniCalendar';
import './booking.css'
import interactionPlugin from '@fullcalendar/interaction'
import { AccessTimeFilled, Description, Event, LocationOn, Person } from '@mui/icons-material/';
import axios from "axios";
var myToken;
    
const theme = createTheme({
  palette: {
    neutral: {
      main: '#62BAB7',
      contrastText: '#ffffff',
    },
  },
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default class UserBookings extends React.Component
{
  state = {
  weekend: true,
  events: [],
  date: {},
  dateDisplay: {},
  bookingOptions: []
}

constructor(props) {
  super(props)
  this.state = {
    open: false,
    openSuccess: false,
    weekend: true,
    events: [],
    date: {},
    dateDisplay: {},
    bookingOptions: [],
    selectedEvent: null,
    selectedUserFirst: null,
    selectedUserLast: null,
    selectedUserEmail: null,
    selectedUserString: null,
    selectedUserFull: null,
    description: "No description provided",
    clientList: [],
    location: "Online"
  }
  this.handleOpen = this.handleOpen.bind(this);
  this.handleClose = this.handleClose.bind(this);
  this.handleOpenSuccess = this.handleOpenSuccess.bind(this);
  this.handleCloseSuccess = this.handleCloseSuccess.bind(this);
  this.handleOpenEventView = this.handleOpenEventView.bind(this);
  this.handleCloseEventView = this.handleCloseEventView.bind(this);
}

async handleOpen(eventInfo) {
  console.log(eventInfo)
//  this.state.bookingOptions = ["Test 1","Test 2","Test 3",eventInfo.dateStr];
  this.state.dateDisplay = eventInfo.date.toString().substring(0,15); //Used for user facing popup
  this.state.date = eventInfo.dateStr //Used for API call, YYYY-MM-DD format
  this.state.bookingOptions = await getBookableTimes(this.state.date,this.state.date);
  this.state.description = "No description provided";
  console.log(this.state.date)
  console.log(this.state.bookingOptions)
  this.setState({ open: true})
}
handleClose() {
  this.setState({ open: false})
  this.setState({selectedEvent: null})
  this.state.description = "No description provided";
}

handleOpenSuccess()
{
  this.setState({openSuccess: true})
}

handleCloseSuccess()
{
  this.setState({openSuccess: false})
  document.location.reload();
}
    
handleOpenEventView()
{
  this.setState({openEventView: true});
}

handleCloseEventView()
{
  this.setState({openEventView: false});
}
  render() {
    const theme = createTheme({
      palette: {
        neutral: {
          main: '#000000',
          contrastText: '#ffffff',
        },
      },
    });
    return (
      <>
      <Sidebar/>
      <div style={{backgroundColor: "white", minHeight: "100vh"}} className="booking-container">
        <div className="mini-calendar">
          <img style={{height: '65px'}} src={Sagenda}/>
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="neutral" style={{ display: 'flex',
              justifyContent: 'flex-end', height: '40px', marginBottom: '20px'}}>
            + Create
            </Button>
          </ThemeProvider>
          <MiniCalendar/>
        </div>
        <div className="reminders">
          <span className="small-title">Reminders</span>
          <FullCalendar
          headerToolbar='false'
          plugins={[listPlugin]}
          initialView="listYear"
          weekends={this.state.weekend}
          events={this.state.events}
        />
        </div>
        <div className="main-calendar">
          <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
          selectable={true}
          selectMirror={true}
          initialView="dayGridMonth"
          weekends={this.state.weekend}
          events={this.state.events}
          eventClick={this.handleEventClick}
          dateClick={this.handleOpen}
        />
        </div>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
            <div className="booking-popup-container">
              <div className="book-popup-ico1"><img style={{height: '65px'}} src={Sagenda}/></div>
              <div className="book-popup-ico2"><AccessTimeFilled/></div>
              <div className="book-popup-ico3"><Person/></div>
              <div className="book-popup-ico4"><Description/></div>
              <div className="book-popup-ico5"><LocationOn/></div>
              <div className="book-popup-title">
                  Book Appointment
              </div>
              {/* add content here curt */}
              <div className="book-popup-date">{this.state.dateDisplay}
              <Select 
                id="time" 
                onChange={
                  (selection)=>(this.setState({selectedEvent:selection.target.value}))}>
              {this.state.bookingOptions.map(
                (item) => (<MenuItem name={item.identifier} value={item.identifier}>{item.from.substring(11,16)}</MenuItem>)
              )}
              </Select></div>
              <div className="book-popup-desc"><TextField label="Add description" onChange={
              (entered)=>(this.setState({description:entered.target.value}))
              }/></div>
              <div className="book-popup-location"><Select id="user" onChange={
                (selection)=>{
                  this.setState({selectedUserEmail: selection.target.value.split(' ')[0]})
                  this.setState({selectedUserFirst: selection.target.value.split(' ')[1]})
                  this.setState({selectedUserLast: selection.target.value.split(' ')[2]})
                  console.log(selection.target.value)
                }}>
                {this.state.clientList.map((user)=>(<MenuItem value={user.selectString}>{user.name}</MenuItem>))}
                </Select>
              </div>
              <div className="book-popup-event"><TextField label="Location" onChange={
              (entered)=>(this.setState({location:entered.target.value}))
              }/></div>
            </div>
            <div style={{textAlign: 'right'}}>
              <ThemeProvider theme={theme}>
                <Button variant="contained" 
                color="neutral" 
                style={{marginBotton: '5%', minWidth: '150px', fontSize: '20px'}}
                onClick={async()=>{
                  if(this.state.selectedEvent != null)
                  {
                    var apiDescription = `${this.state.location}\n${this.state.description}` //API doesn't track location separately, including in description field
                    var success = await bookEvent(this.state.selectedEvent,this.state.selectedUserFirst,this.state.selectedUserLast,this.state.selectedUserEmail,apiDescription); //Placeholder, will use userID when available
                    if(success)
                    {
                      this.handleClose()
                      this.handleOpenSuccess()
                    }
                  }
                }}
                >
                Save
                </Button>   
                <Button variant="contained" 
                color="neutral" 
                style={{marginBotton: '5%', minWidth: '150px', fontSize: '20px'}}
                onClick={()=>{
                  if(this.state.selectedEvent != null)
                  {
                    blockTimeSlot(this.state.selectedEvent);
                  }
                }}
                >
                Block time
                </Button>
              </ThemeProvider>
            </div>
          </Box>
        </Modal>
        <Modal
          open={this.state.openSuccess}
          onClose={this.handleCloseSuccess}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
            <p>An appointment has been made for {this.state.selectedUserFirst} {this.state.selectedUserLast}.  They will receive a booking confirmation via email.</p>
            <p>Appointment:</p>
            <p>{this.state.dateDisplay} {this.state.selectedTime}</p>
          </Box>
        </Modal>
        <Modal
          open={this.state.openEventView}
          onClose={this.handleCloseEventView}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
            <div className="booking-popup-container">
              <div className="book-popup-ico1"><img style={{height: '65px'}} src={Sagenda}/></div>
              <div className="book-popup-ico2"><AccessTimeFilled/></div>
              <div className="book-popup-ico3"><LocationOn/></div>
              <div className="book-popup-ico4"><Description/></div>
              <div className="book-popup-ico5"><Person/></div>
              
              
              <div className="book-popup-title">
                  Appointment Details
              </div>
              {/* add content here curt */}
              <div className="book-popup-date">{this.state.dateDisplay} {this.state.selectedTime}
              </div>
              <div className="book-popup-desc">{this.state.description}</div>
              <div className="book-popup-location">{this.state.location}</div>
              <div className="book-popup-event">{this.state.selectedUserFirst} {this.state.selectedUserLast}</div>
              
            </div>
            <div style={{textAlign: 'right'}}>
              <ThemeProvider theme={theme}>
                <Button variant="contained" 
                color="neutral" 
                style={{marginBotton: '5%', minWidth: '150px', fontSize: '20px'}}
                onClick={async()=>{
                  if(window.confirm("Are you sure you'd like to cancel your appointment for " + this.state.dateDisplay + " at " + this.state.selectedTime + "?"))
                  {
                    cancelBooking(this.state.selectedEvent)
                    this.handleCloseEventView();
                  }
                  
                }}
                >
                Cancel
                </Button>
              </ThemeProvider>
            </div>
          </Box>
        </Modal>
      </div>
      </>
    )
  }
  
  async componentDidMount()
  {
    console.log(this.state)
    const d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    if(day < 10)
      day = "0" + day;
    if(month < 10)
      month = "0" + month;
    var currentDate = `${year}-${month}-${day}`
    
    month = Number(month) + 3; //Assume nobody is booking more than 3 months out, so should be fine with this
    if (month > 12)
    {
      year++;
      month -= 12;
      month = "0" + month;
    }
    if (day > 28)
      day = 28; //Handles varying month lengths.  Don't need exactly 3 months, so this should work
      
    var futureDate = `${year}-${month}-${day}`
    var times = await getBookings(currentDate,futureDate); //Will select dates automatically later
    for(let i = 0;i < times.length;i++)
    {
    
      console.log(times[i])
      times[i]['title'] = times[i]['members'][0]['firstName'] + " " + times[i]['members'][0]['lastName'];
      times[i]['location'] = times[i]['members'][0]['description'].split('\n')[0];
      times[i]['start'] = times[i]['from'].substring(0,times[i]['from'].length-1)+":00";
      times[i]['end'] = times[i]['to'].substring(0,times[i]['to'].length-1)+":00";
      times[i]['backgroundColor'] = '#a0a0a0';
      times[i]['borderColor'] = '#888888';
      times[i]['textColor'] = '#101010' //Placeholders due to CSS issues
    }
    this.setState({events: times})
    var clients = await axios.get('http://localhost:8000/api/clients')
    console.log(clients.data[0].extra_data)
    console.log(JSON.parse(clients.data[0].extra_data))
    var clientsInfo = [];
    console.log(clients.data.length)
    for(let i = 0;i < clients.data.length;i++)
    {
      var currentClient = JSON.parse(clients.data[i].extra_data)
      currentClient.selectString = `${currentClient.email} ${currentClient.given_name} ${currentClient.family_name}`
      console.log(currentClient)
      clientsInfo.push(currentClient);
    }
    await this.setState({clientList: clientsInfo});
  }
  
  
  handleEventClick = (clickInfo) => 
  {
    console.log(clickInfo.event._def.extendedProps.location)
    var dateSplit = clickInfo.event._def.extendedProps.from.substring(0,10).split('-');
    var year = dateSplit[0];
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var month = months[dateSplit[1] - 1];
    var day = dateSplit[2];
    this.state.dateDisplay = `${month} ${day}, ${year}`;
    this.state.selectedTime = clickInfo.event._def.extendedProps.from.substring(11,16)
    var eventID = clickInfo.event._def.extendedProps.eventIdentifier;
    this.state.description = clickInfo.event._def.extendedProps.members[0].description.split('\n')[1];
    this.state.location = clickInfo.event._def.extendedProps.location;
    this.state.selectedEvent = clickInfo.event._def.extendedProps.eventIdentifier;
    this.handleOpenEventView();
    this.setState({selectedUserFirst: clickInfo.event._def.extendedProps.members[0].firstName})
    this.setState({selectedUserLast: clickInfo.event._def.extendedProps.members[0].lastName})
  }
 
  
  handleDateSelect = (selectInfo) =>
  {
    
    console.log("Date: " + selectInfo.dateStr)
  }
}