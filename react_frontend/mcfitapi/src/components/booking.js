
/*
generateSagendaToken()
PURPOSE: Generate a token for the front-end booking API functions
PARAMS: None
RETURNS: An access token for the Sagenda API endpoints
*/
export async function generateSagendaToken()
{
    var pktHeader = new Headers();
    pktHeader.append("Content-Type", "application/x-www-form-urlencoded");
    const auth_code = '489dc564dac34325825f75cc5e5d58fc' //Account specific, need to change if new sagenda account is created for Mike
    var payload = new URLSearchParams();
    payload.append("grant_type", "api_token");
    payload.append("api_token", auth_code); 
    
    var requestOptions = {
        method: 'POST',
        headers: pktHeader,
        body: payload,
        redirect: 'follow'
    };
    
    const r = await fetch("https://sagenda.net/api/token", requestOptions);
    const response = await r.json();
    return response['access_token'];
    
}

/*
generateBackendToken()
PURPOSE: Generate a token for the back-end booking API functions (viewing current bookings, cancelling bookings)
PARAMS: None
RETURNS: An access token for the Sagenda API endpoints
*/
export async function generateBackendToken()
{
    var pktHeader = new Headers();
    pktHeader.append("Content-Type", "application/x-www-form-urlencoded");

    var payload = new URLSearchParams();
    payload.append("grant_type", "client_credentials");
    payload.append("client_id", "385008f4-4fdd-443c-9936-a325d311f4e8");
    payload.append("client_secret", "Qi/4vuFnMOVJaQ0r8oWdu1iIrJBGKbdFgM5ZZKdq404="); //Needs to be kept private.

    var requestOptions = {
     method: 'POST',
     headers: pktHeader,
     body: payload,
     redirect: 'follow'
    };

    var response = await fetch("https://sagenda.net/api/v3/token", requestOptions)
  .then(response => response.json())
  return response['access_token'];
}

/*
getBookableTimes(startDate, endDate)
PURPOSE: Get a list of bookable time slots in a given date range
PARAMS:
    startDate: The earliest date to search, in YYYY-MM-DD format
    endDate: The latest date to search, in YYYY-MM-DD format
RETURNS: A list of JSON objects representing the available booking slots
*/
export async function getBookableTimes(startDate, endDate)
{
    const token = await generateSagendaToken();
    var pktHeader = new Headers();
    pktHeader.append("Authorization", "Bearer " + token);
    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: pktHeader
    };
    
    var response = await fetch("https://sagenda.net/api/v3/events/" + startDate + "/" + endDate + "/6171f83f83926f4e50e9202c", requestOptions).then(reply => reply.json())
    return response;
}

/*
getEventLock(eventID, token)
PURPOSE: Gets an event lock to be used by the booking API
PARAMS:
    eventID: The identifier of the event being booked
    token: A sagenda access token to use for the API call
RETURNS: An event lock for the specified event
*/
async function getEventLock(eventID, token)
{
    var pktHeader = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    
    var payload = JSON.stringify({
        "eventIdentifier": eventID,
        "participants": 1
    });
    
    var requestOptions = {
        method: 'POST',
        headers: pktHeader,
        body: payload,
        redirect: 'follow'
    };
    
    var response = await fetch("https://sagenda.net/api/v3/eventLocks", requestOptions).then(reply => reply.json());
    return response;
}

/*
bookEvent(eventID, firstName, lastName, email, description)
PURPOSE: Books a specified event for the specified user
PARAMS:
    eventID: The identifier for the event to be booked
    firstName: The first name of the client booking the event
    lastName: The last name of the client booking the event
    email: The email address of the client booking the event
    description: A description/note to add to the booking
RETURNS: true if the booking is successfully created, false otherwise
*/
export async function bookEvent(eventID, firstName, lastName, email, description)
{
    var token = await generateSagendaToken();
    var lock = await getEventLock(eventID, token);
    
    var lockID = lock['identifier'];
    var userID = lock['userIdentifier'];

    var pktHeader = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    if(description === "" || description.length == undefined)
        description = "No description provided";
    var payload = JSON.stringify({
        "eventIdentifier": eventID,
        "lockIdentifier": lockID,
        "member": {
            "email": email,
            "firstName": firstName,
            "lastName": lastName,
            "participants": 1,
            "description": description
      }
    });

    var requestOptions = {
        method: 'POST',
        headers: pktHeader,
        body: payload,
        redirect: 'follow',
        crossDomain: true
    };
    
    var response = await fetch('https://sagenda.net/api/v3/events', requestOptions);
    return (response.status === 201);
}

/*
getBookings(startDate, endDate)
PURPOSE: Get a list of currently made bookings within a specified date range
PARAMS:
    startDate: The earliest date to search, in YYYY-MM-DD format
    endDate: The latest date to search, in YYYY-MM-DD format
RETURNS: A list of JSON objects containing the currently made bookings
*/
export async function getBookings(startDate, endDate)
{
    var token = await generateBackendToken();
    var pktHeader = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: pktHeader
    };

    var bookings = await fetch("https://sagenda.net/api/v3/bookings/" + startDate + "/" + endDate + "?status=booked", requestOptions)
      .then(response => response.json())
    .catch(error => console.log('error', error));
    return bookings;
}  

/*
getBookingsByUser(startDate, endDate, firstName, lastName)
PURPOSE: Get a list of currently made bookings within a specified date range for a given user
PARAMS:
    startDate: The earliest date to search, in YYYY-MM-DD format
    endDate: The latest date to search, in YYYY-MM-DD format
    firstName: The first name of the user to search for
    lastName: The last name of the user to search for
RETURNS: A list of JSON objects containing the currently made bookings
*/
export async function getBookingsByUser(startDate, endDate, firstName, lastName)
{
    var bookings = await getBookings(startDate, endDate);
    var userBookings = [];
    for(let i = 0;i < bookings.length;i++)
    {
        if(bookings[i]['members'][0]['firstName'] === firstName && bookings[i]['members'][0]['lastName'] === lastName)
            userBookings.push(bookings[i]);
    }
    return userBookings;
}

/*
cancelBooking(eventID)
PURPOSE: Cancels a currently made booking
PARAMS: eventID: The identifier of the event to cancel
RETURNS: None
*/
export async function cancelBooking(eventID)
{
    var token = await generateBackendToken();
    var pktHeader = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow',
        headers: pktHeader
    };
    fetch("https://sagenda.net/api/v3/bookings/" + eventID + "/members", requestOptions);
}

/*
blockTimeSlot(eventID)
PURPOSE:Blocks a time slot so that it cannot be booked
PARAMS: eventID: The identifier of the time slot to block
RETURNS: None
*/
export async function blockTimeSlot(eventID)
{

    var token = await generateBackendToken();
    var pktHeader = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    
    var requestOptions = 
    {
        method: 'PUT',
        redirect: 'follow',
        headers: pktHeader
    };

    fetch("https://sagenda.net/api/v3/bookings/" + eventID + "/block", requestOptions).catch(error => console.log('error', error));
}

