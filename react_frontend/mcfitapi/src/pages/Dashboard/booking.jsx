import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { Button, Modal, Box, Typography, Select, MenuItem, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getBookableTimes, bookEvent, getBookings, cancelBooking, getBookingsByUser } from '../../components/booking'
import Sidebar from '../../components/Sidebar';
import Sagenda from '../../static/img/sagenda.png';
import MiniCalendar from '../../components/MiniCalendar';
import './booking.css'
import interactionPlugin from '@fullcalendar/interaction'
import { AccessTimeFilled, Description, Event, LocationOn } from '@mui/icons-material/';
import Cookies from 'universal-cookie';


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
    openError: false,
    openEventView: false,
    weekend: true,
    events: [],
    date: {},
    dateDisplay: {},
    bookingOptions: [],
    selectedEvent: null,
    selectedTime: null,
    description: "No description provided",
    location: "Online",
    email: "",
    firstName: "",
    lastName: ""
  }
  this.handleOpen = this.handleOpen.bind(this);
  this.handleClose = this.handleClose.bind(this);
  this.handleOpenSuccess = this.handleOpenSuccess.bind(this);
  this.handleCloseSuccess = this.handleCloseSuccess.bind(this);
  this.handleOpenError = this.handleOpenError.bind(this);
  this.handleCloseError = this.handleCloseError.bind(this);
  this.handleOpenEventView = this.handleOpenEventView.bind(this);
  this.handleCloseEventView = this.handleCloseEventView.bind(this);
}

async handleOpen(eventInfo) {
//  this.state.bookingOptions = ["Test 1","Test 2","Test 3",eventInfo.dateStr];
  this.state.dateDisplay = eventInfo.date.toString().substring(0,15); //Used for user facing popup
  this.state.date = eventInfo.dateStr //Used for API call, YYYY-MM-DD format
  this.state.bookingOptions = await getBookableTimes(this.state.date,this.state.date);
  this.state.description = "No description provided"
  console.log(this.state.date)
  console.log(this.state.bookingOptions)
  this.setState({ open: true})
}
handleClose() {
  this.setState({ open: false})
  //this.setState({selectedEvent: null})
  this.state.description = "No description provided"
}

handleOpenSuccess()
{
  this.setState({openSuccess: true})
}

handleCloseSuccess()
{
  this.setState({openSuccess: false})
  this.setState({selectedEvent: null})
}

handleOpenError()
{
  this.setState({openError: true})
}

handleCloseError()
{
  this.setState({openError: false})
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
          plugins={[ dayGridPlugin, interactionPlugin ]}
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
              <div className="book-popup-ico3"><LocationOn/></div>
              <div className="book-popup-ico4"><Description/></div>
              <div className="book-popup-ico5"><Event/></div>
              <div className="book-popup-title">
                  Book Appointment
              </div>
              {/* add content here curt */}
              <div className="book-popup-date">{this.state.dateDisplay}
              <Select 
                id="time" 
                onChange={
                  async(selection)=>{
                    await this.setState({selectedEvent:selection.target.value});
                    var booking = this.state.bookingOptions.find(element => (element['identifier'] === this.state.selectedEvent))
                    var time = booking.from.substring(11,16)
                    await this.setState({selectedTime:time})
                  }}>
              {this.state.bookingOptions.map(
                (item) => (<MenuItem name={item.from.substring(11,16)} value={item.identifier}>{item.from.substring(11,16)}</MenuItem>)
              )}
              </Select></div>
              <div className="book-popup-desc"><TextField label="Add description" onChange={
              (entered)=>(this.setState({description:entered.target.value}))
              }/></div>
              <div className="book-popup-location"><TextField label="Location" onChange={
              (entered)=>(this.setState({location:entered.target.value}))
              }/></div>
              <div className="book-popup-event"><Select>
                <MenuItem value="1">1 day before</MenuItem>
                <MenuItem value="2">2 days before</MenuItem>
                <MenuItem value="3">3 days before</MenuItem>
                </Select></div>
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
                    console.log(apiDescription)
                    var success = await bookEvent(this.state.selectedEvent,this.state.firstName,this.state.lastName,this.state.email,apiDescription)
                    console.log(success)
                    if(success)
                    {
                      this.handleClose();
                      this.handleOpenSuccess();
                    }
                    else
                    {
                      this.handleClose();
                      this.handleOpenError();
                    }
                  }
                }}
                >
                Save
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
            <h1>Thank you</h1>
            <p>Your request has been approved.  You will receive a booking confirmation via email.</p>
            <p>Appointment</p>
            <p>{this.state.dateDisplay} {this.state.selectedTime}</p>
          </Box>
        </Modal>
        <Modal
          open={this.state.openError}
          onClose={this.handleCloseError}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
            There was an error booking your appointment.  Please refresh the page and try again.
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
              <div className="book-popup-ico5"><Event/></div>
              <div className="book-popup-title">
                  Appointment Details
              </div>
              {/* add content here curt */}
              <div className="book-popup-date">{this.state.dateDisplay} {this.state.selectedTime}
              </div>
              <div className="book-popup-desc">{this.state.description}</div>
              <div className="book-popup-location">{this.state.location}</div>
              <div className="book-popup-event"></div>
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
    var cookies = new Cookies();
    var fName = cookies.get('first_name')
    var lName = cookies.get('last_name')
    var userEmail = cookies.get('email')
    console.log(fName);
    await this.setState({
      email: userEmail,
      firstName: fName,
      lastName: lName
    });
    console.log(this.state);
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
    console.log(futureDate)
    
    console.log(currentDate)
    var times = await getBookingsByUser(currentDate,futureDate,this.state.firstName,this.state.lastName);
    for(let i = 0;i < times.length;i++)
    {
      times[i]['title'] = times[i]['members'][0]['description'].split('\n')[1];
      times[i]['location'] = times[i]['members'][0]['description'].split('\n')[0];
      times[i]['start'] = times[i]['from'].substring(0,times[i]['from'].length-1)+":00";
      times[i]['end'] = times[i]['to'].substring(0,times[i]['to'].length-1)+":00";
      times[i]['backgroundColor'] = '#a0a0a0';
      times[i]['borderColor'] = '#888888';
      times[i]['textColor'] = '#101010' //Placeholders due to CSS issues
    }
    this.setState({weekend: true})
    this.setState({events: times})
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
    this.state.description = clickInfo.event._def.title;
    this.state.location = clickInfo.event._def.extendedProps.location;
    this.state.selectedEvent = clickInfo.event._def.extendedProps.eventIdentifier;
    this.handleOpenEventView();
  }
  
  handleDateSelect = (selectInfo) =>
  {
    
    console.log("Date: " + selectInfo.dateStr)
  }
}