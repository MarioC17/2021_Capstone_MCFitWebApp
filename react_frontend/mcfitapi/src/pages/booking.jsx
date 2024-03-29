import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid'
import React from 'react'
import { bookEvent, getBookableTimes } from '../components/booking'

var myToken;
    
export default class Booking extends React.Component
{
  state = {
  weekend: true,
  events: [{title: 'Test 1',start: '2021-11-12T13:00:00',end: '2021-11-12T14:00:00'}]
}
    
  render() {
    
    return (
      <div style={{backgroundColor: "white", minHeight: "100vh"}}>
      <FullCalendar
        plugins={[ timeGridPlugin ]}
        initialView="timeGridWeek"
        slotMinTime="09:00:00"
        slotMaxTime="17:00:00"
        weekends={this.state.weekend}
        events={this.state.events}
        eventClick={this.handleEventClick}
      />
      </div>
    )
  }
  
  async componentDidMount()
  {
    //console.log("Rendered!")
    var times = await getBookableTimes('2021-11-15','2021-11-19');
    console.log(times)
    for(let i = 0;i < times.length;i++){
        times[i]['title'] = 'Appointment';
        times[i]['start'] = times[i]['from'].substring(0,times[i]['from'].length-1)+":00";
        times[i]['end'] = times[i]['to'].substring(0,times[i]['to'].length-1)+":00";
        times[i]['backgroundColor'] = '#a0a0a0';
        times[i]['borderColor'] = '#888888';
        times[i]['textColor'] = '#101010'
    }
    console.log(times[0])
    this.setState({weekend: false})
    this.setState({events: times})
  }
  
  handleEventClick = (clickInfo) => {
      console.log("Event clicked: " +clickInfo.event._def.extendedProps.identifier);
      console.log(clickInfo.event)
      console.log("Date: " + clickInfo.event._instance.range.start)
      var date = clickInfo.event._instance.range.start;
      if(window.confirm("Are you sure you'd like to book an appointment for " + date + "?"))
      {
      var eventID = clickInfo.event._def.extendedProps.identifier;
      console.log('ID: ' + eventID)
      var success = bookEvent(eventID,'John','Doe','ckpy6@hotmail.com');
      console.log("result" + success);
    }
  }
}
