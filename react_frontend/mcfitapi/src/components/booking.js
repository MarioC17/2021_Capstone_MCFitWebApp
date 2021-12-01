const auth_code = '489dc564dac34325825f75cc5e5d58fc'

export async function generateSagendaToken()
{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "api_token");
    urlencoded.append("api_token", auth_code); 
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };
    
    const r = await fetch("https://sagenda.net/api/token", requestOptions);
    const response = await r.json();
    
    //console.log(response['access_token']);
    return response['access_token'];
    
}

export async function generateBackendToken()
{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", "385008f4-4fdd-443c-9936-a325d311f4e8");
    urlencoded.append("client_secret", "Qi/4vuFnMOVJaQ0r8oWdu1iIrJBGKbdFgM5ZZKdq404=");

    var requestOptions = {
     method: 'POST',
     headers: myHeaders,
     body: urlencoded,
     redirect: 'follow'
    };

    var response = await fetch("https://sagenda.net/api/v3/token", requestOptions)
  .then(response => response.json())
  .catch(error => console.log('error', error));
  //console.log(response);
  return response['access_token'];
}

export async function verifyToken(token)
{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
    crossDomain: true
    };
    var response = await fetch("https://sagenda.net/api/v3/status/oauth", requestOptions);
    ////console.log(response.status);
    return (response.status === 200)
}

export async function getBookableTimes(startDate, endDate)
{
    const token = await generateSagendaToken();
    const status = await verifyToken(token);
    //console.log("Status: " + status);
    var myHeaders = new Headers();
    //console.log(token);
    myHeaders.append("Authorization", "Bearer " + token);
    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    
    var response = await fetch("https://sagenda.net/api/v3/events/" + startDate + "/" + endDate + "/6171f83f83926f4e50e9202c", requestOptions).then(reply => reply.json())
    ////console.log(response[0]);
    return response;
}

async function getEventLock(eventID, token)
{
    //console.log('Token ' + token)
    //console.log('Event: ' + eventID)
    var myHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
    };
    
    var raw = JSON.stringify({
      "eventIdentifier": eventID,
      "participants": 1
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    var response = await fetch("https://sagenda.net/api/v3/eventLocks", requestOptions).then(reply => reply.json());
    //console.log("Lock: " + response['identifier']);
    return response;
}

export async function bookEvent(eventID, firstName, lastName, email, description)
{
    var token = await generateSagendaToken();
    var lock = await getEventLock(eventID, token);
    
    var lockID = lock['identifier'];
    var userID = lock['userIdentifier'];
    //console.log(lockID);

    var myHeaders = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    //console.log(myHeaders);
    if(description === "" || description.length == undefined)
        description = "No description provided";
    var raw = JSON.stringify({
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
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      crossDomain: true
    };
    
    var response = await fetch('https://sagenda.net/api/v3/events', requestOptions);
    console.log(response);
    console.log(response.status);
    return (response.status === 201);
    
}

export async function getBookings(startDate, endDate)
{
    var token = await generateBackendToken();
    var myHeaders = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    };

    var bookings = await fetch("https://sagenda.net/api/v3/bookings/" + startDate + "/" + endDate + "?status=booked", requestOptions)
      .then(response => response.json())
    .catch(error => console.log('error', error));
    //console.log(bookings);
    return bookings;
}  

export async function getBookingsByUser(startDate, endDate, firstName, lastName)
{
    var bookings = await getBookings(startDate, endDate);
    console.log(bookings);
    //return bookings;
    var userBookings = [];
    for(let i = 0;i < bookings.length;i++)
    {
        if(bookings[i]['members'][0]['firstName'] === firstName && bookings[i]['members'][0]['lastName'] === lastName)
            userBookings.push(bookings[i]);
    }
    console.log(userBookings);
    return userBookings;
}

export async function cancelBooking(eventID)
{
    var token = await generateBackendToken();
    var myHeaders = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow',
        headers: myHeaders
    };
    var response = await fetch("https://sagenda.net/api/v3/bookings/" + eventID + "/members", requestOptions).then(reply => reply.text).then(reply => console.log(reply));
}

export async function blockTimeSlot(eventID)
{

    var token = await generateBackendToken();
    var myHeaders = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    
    var requestOptions = 
    {
        method: 'PUT',
        redirect: 'follow',
        headers: myHeaders
    };

    var response = await fetch("https://sagenda.net/api/v3/bookings/" + eventID + "/block", requestOptions).catch(error => console.log('error', error));
    console.log(response)
    console.log(response.json())
}

