import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { Button, Modal, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getBookableTimes, bookEvent, getBookings, cancelBooking } from '../../components/booking'
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
  events: []
}

constructor(props) {
  super(props)
  this.state = {
    open: false
  }
  this.handleOpen = this.handleOpen.bind(this);
  this.handleClose = this.handleClose.bind(this);
}

handleOpen() {
   this.setState({ open: true})
}
handleClose() {
  this.setState({ open: false})
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
          initialView="listWeek"
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
          eventClick={this.handleOpen}
          dateClick={this.handleDateSelect}
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
              <div class="book-popup-date">date time*****</div>
              <div class="book-popup-desc">Add description or attachments</div>
              <div class="book-popup-location">******</div>
              <div class="book-popup-event">Notify *****</div>
            </div>
            <div style={{textAlign: 'right'}}>
              <ThemeProvider theme={theme}>
                <Button variant="contained" 
                color="neutral" 
                style={{marginBotton: '5%', minWidth: '150px', fontSize: '20px'}}>
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
    var times = await getBookings('2021-11-22','2021-12-31'); //Will select dates automatically later
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
