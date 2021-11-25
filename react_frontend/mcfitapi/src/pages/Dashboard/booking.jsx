import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getBookableTimes, bookEvent, getBookings, cancelBooking } from '../../components/booking'
import Sidebar from '../../components/Sidebar';
import Sagenda from '../../static/img/sagenda.png';
import MiniCalendar from '../../components/MiniCalendar';
import './booking.css'
import interactionPlugin from '@fullcalendar/interaction'
var myToken;
    
const theme = createTheme({
  palette: {
    neutral: {
      main: '#62BAB7',
      contrastText: '#ffffff',
    },
  },
});

export default class UserBookings extends React.Component
{
  state = {
  weekend: true,
  events: []
}
    
  render() {
    
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
          eventClick={this.handleEventClick}
          dateClick={this.handleDateSelect}
        />
        </div>
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
