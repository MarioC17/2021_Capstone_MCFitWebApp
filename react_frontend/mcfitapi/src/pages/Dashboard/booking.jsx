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
    weekend: true,
    events: [],
    date: {},
    dateDisplay: {},
    bookingOptions: [],
    selectedEvent: null,
    description: {}
  }
  this.handleOpen = this.handleOpen.bind(this);
  this.handleClose = this.handleClose.bind(this);
}

async handleOpen(eventInfo) {
//  this.state.bookingOptions = ["Test 1","Test 2","Test 3",eventInfo.dateStr];
  this.state.dateDisplay = eventInfo.date.toString().substring(0,15); //Used for user facing popup
  this.state.date = eventInfo.dateStr //Used for API call, YYYY-MM-DD format
  this.state.bookingOptions = await getBookableTimes(this.state.date,this.state.date);
  console.log(this.state.date)
  console.log(this.state.bookingOptions)
  this.setState({ open: true})
}
handleClose() {
  this.setState({ open: false})
  this.setState({selectedEvent: null})
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
      <div style={{backgroundColor: "white", minHeight: "100vh"}} class="booking-container">
        <div class="mini-calendar">
          <img style={{height: '65px'}} src={Sagenda}/>
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="neutral" style={{ display: 'flex',
              justifyContent: 'flex-end', height: '40px', marginBottom: '20px'}}>
            + Create
            </Button>
          </ThemeProvider>
          <MiniCalendar/>
        </div>
        <div class="reminders">
          <span className="small-title">Reminders</span>
          <FullCalendar
          headerToolbar='false'
          plugins={[listPlugin]}
          initialView="listYear"
          weekends={this.state.weekend}
          events={this.state.events}
        />
        </div>
        <div class="main-calendar">
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
            <div class="booking-popup-container">
              <div class="book-popup-ico1"><img style={{height: '65px'}} src={Sagenda}/></div>
              <div class="book-popup-ico2"><AccessTimeFilled/></div>
              <div class="book-popup-ico3"><LocationOn/></div>
              <div class="book-popup-ico4"><Description/></div>
              <div class="book-popup-ico5"><Event/></div>
              <div class="book-popup-title">
                  Book Appointment
              </div>
              {/* add content here curt */}
              <div class="book-popup-date">{this.state.dateDisplay}
              <Select 
                id="time" 
                onChange={
                  (selection)=>(this.setState({selectedEvent:selection.target.value}))}>
              {this.state.bookingOptions.map(
                (item) => (<MenuItem name={item.identifier} value={item.identifier}>{item.from.substring(11,16)}</MenuItem>)
              )}
              </Select></div>
              <div class="book-popup-desc"><TextField label="Add description" onChange={
              (entered)=>(this.setState({description:entered.target.value}))
              }/></div>
              <div class="book-popup-location"><TextField label="Location"/></div>
              <div class="book-popup-event"><Select>
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
                onClick={()=>{
                  if(this.state.selectedEvent != null)
                  {
                    bookEvent(this.state.selectedEvent,"John","Doe","yaremchukc3@mymacewan.ca",this.state.description); //Placeholder, will integrate with logins later
                  }
                }}
                >
                Save
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
    var times = await getBookingsByUser('2021-11-22','2021-12-31','John','Doe'); //Will select dates automatically later
    for(let i = 0;i < times.length;i++)
    {
      times[i]['title'] = 'Appointment';
      times[i]['start'] = times[i]['from'].substring(0,times[i]['from'].length-1)+":00";
      times[i]['end'] = times[i]['to'].substring(0,times[i]['to'].length-1)+":00";
      times[i]['backgroundColor'] = '#a0a0a0';
      times[i]['borderColor'] = '#888888';
      times[i]['textColor'] = '#101010' //Placeholders due to CSS issues
    }
    this.setState({weekend: true})
    this.setState({events: times})
    this.state.bookingOptions = ["Test 1","Test 2","Test 3"];
  }
  
  
  handleEventClick = (clickInfo) => 
  {
    var date = clickInfo.event._instance.range.start;
    if(window.confirm("Are you sure you'd like to cancel your appointment for " + date + "?"))
    {
      var eventID = clickInfo.event._def.extendedProps.eventIdentifier;
      cancelBooking(eventID)
    }
  }
  
  handleDateSelect = (selectInfo) =>
  {
    
    console.log("Date: " + selectInfo.dateStr)
  }
}