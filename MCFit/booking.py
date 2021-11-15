import requests
import json

auth_code = '489dc564dac34325825f75cc5e5d58fc' #This needs to be updated if we make a new admin account for the site once it's live

'''
Note: Token related functions should not be needed by the front-end.  The back-end code will obtain a valid token to access the API when required.
'''

'''
generate_sagenda_token()
PURPOSE: Requests a new authentication token from the api, and writes it out to a file.  
PARAMS: None
RETURNS: The authentication token if it is successfully created, None if there is an error
PRE: None
POST: If successful, an authentication token is created and written to sagenda_access_token.txt.  
'''
def generate_sagenda_token():
     headers={"content-type":"application/x-www-form-urlencoed"}
     payload={"grant_type":"api_token","api_token":auth_code}
     r = requests.post('https://sagenda.net/api/v3/token',params={"async":True,"crossDomain":True},headers=headers,data=payload)
     response = json.loads(r.text)
     try:
          token = response['access_token']
          token_file = open('sagenda_access_token.txt','w')
          token_file.write(token)
          token_file.close()
          return token
     except: 
          return None

'''
generate_backend_token()
PURPOSE: Requests a new authentication token from the api for the backend, and writes it out to a file.  
PARAMS: None
RETURNS: The authentication token if it is successfully created, None if there is an error
PRE: None
POST: If successful, an authentication token is created and written to sagenda_access_token.txt.  
'''
def generate_backend_token():
     payload='grant_type=client_credentials&client_id=385008f4-4fdd-443c-9936-a325d311f4e8&client_secret=Qi/4vuFnMOVJaQ0r8oWdu1iIrJBGKbdFgM5ZZKdq404='
     headers = {'Content-Type': 'application/x-www-form-urlencoded'}
     r = requests.post('https://sagenda.net/api/v3/token',headers=headers, data=payload)
     response = json.loads(r.text)
     try:
          token = response['access_token']
          token_file = open('sagenda_backend_token.txt','w')
          token_file.write(token)
          token_file.close()
          return token
     except: 
          return None     
     

'''
verify_sagenda_token(token=None)
PURPOSE: Check whether the current authentication token is still valid
PARAMS: token: The authentication token to check.
RETURNS: True if the token is valid, False if it is not
PRE: None
POST: None
'''
def verify_sagenda_token(token):
     r = requests.get('https://sagenda.net/api/v3/status/oauth',params={"async":True,"crossDomain":True},headers={"Authorization":f"Bearer {token}"})
     return (r.status_code == 200) #Code 200 means the token is still valid, will return status code 401 if the token is expired.

'''
get_sagenda_token()
PURPOSE: Returns a valid sagenda authentication token to the user, either from a file, or from the api
PARAMS: None
RETURNS: A valid sagenda authentication token
PRE: None
POST: A valid, non-expired token exists in sagenda_access_token.txt
'''
def get_sagenda_token():
     try:
          token_file = open('sagenda_access_token.txt','r')
          token = token_file.read()
          token_file.close()
          valid = verify_sagenda_token(token)
     except: #If the token file cannot be read, a new token will be obtained and the file will be written
          valid = False
     if valid: return token
     else: return generate_sagenda_token()
     
'''
get_backend_token()
PURPOSE: Returns a valid sagenda authentication token to the user, either from a file, or from the api
PARAMS: None
RETURNS: A valid sagenda authentication token
PRE: None
POST: A valid, non-expired token exists in sagenda_backend_token.txt
'''
def get_backend_token():
     try:
          token_file = open('sagenda_backend_token.txt','r')
          token = token_file.read()
          token_file.close()
          valid = verify_sagenda_token(token)
     except: #If the token file cannot be read, a new token will be obtained and the file will be written
          valid = False
     if valid: return token
     else: return generate_backend_token()

'''
get_bookable_times(start_date, end_date)
PURPOSE: Get a list of available time slots to be booked within a date range (inclusive)
PARAMS: start_date: The earliest date to search, entered as a string in YYYY-MM-DD format
        end_date: The latest date to search, entered as a string in YYYY-MM-DD format
RETURNS: A json list of available time slots and event identifiers
PRE: - The trainer's availability has been set up on sagenda
     - Only one service, a personal training session, exists.  This will need to be modified if more services are added
POST: None
'''
def get_bookable_times(start_date,end_date):
     token = get_sagenda_token()
     headers={"Authorization":f"Bearer {token}"}
     services_response = requests.get('https://sagenda.net/api/v3/bookableItems',headers=headers)
     services = json.loads(services_response.text)
     service_id = services[0]['identifier'] #Identifier used in the system to identify training session event.
     #print(service_id)
     times_response = requests.get(f'https://sagenda.net/api/v3/events/{start_date}/{end_date}/{service_id}',params={"async":True,"crossDomain":True},headers=headers)
     times = json.loads(times_response.text)
     return times

'''
get_event_lock(event_id)
PURPOSE: Gets a lock on a bookable event to prevent two users from attempting to book the same event concurrently.  This will be done automatically by book_event()
PARAMS: event_id: The event identifier of the event to be booked
RETURNS: A json lock object containing a lock id and user id which must be used to book the event.  Returns None if the lock cannot be acquired or the event_id is invalid
PRE: None
POST: If event_id is the valid id of an open event, the event has been locked for booking.
'''
def get_event_lock(event_id):
     token = get_sagenda_token()
     url = "https://sagenda.net/api/v3/eventLocks"
     
     payload = json.dumps({
       "eventIdentifier": event_id,
       "participants": 1
     })
     headers = {
       'Content-Type': 'application/json',
       'Authorization': f"Bearer {token}"
     }
     
     response = requests.request("POST", url, headers=headers, data=payload)
     
     #print(response.text)
     #print(json.loads(response.text)['eventIdentifier'])
     
     try: return json.loads(response.text)
     except: return None

'''
book_event(event_id, first_name, last_name, email)
PURPOSE: Books an event for a user
PARAMS: event_id: the ID of the event to be booked
        first_name: The first name of the client
        last_name: The last name of the client
        email: The clients email, to which their confirmation of booking will be sent
RETURNS: True if the booking is successfully created, False otherwise
PRE: None
POST: The booking is successfully created
'''
def book_event(event_id, first_name, last_name, email):
     url = "https://sagenda.net/api/v3/events"
     token = get_sagenda_token()
     lock = get_event_lock(event_id)
     if lock == None: return False
     lock_id = lock['identifier']
     user_id = lock['userIdentifier']
     print(f'User: {user_id}')
     print(f'Event: {event_id}')
     payload = json.dumps({"eventIdentifier": event_id, 
                           "lockIdentifier": lock_id, 
                           "member":{"email":email,
                                     "firstName":first_name,
                                     "lastName":last_name}
                           })
     headers = {
       'Content-Type': 'application/json',
       'Authorization': f"Bearer {token}"
     }
     response = requests.request("POST", url, headers=headers, data=payload)
     #print(response.text)
     #print(response.status_code) #Code 201 means success
     return (response.status_code == 201)

'''
get_bookings(start_date, end_date)
PURPOSE: Get a list of currently booked items within a date range (inclusive)
PARAMS: start_date: The earliest date to search, entered as a string in YYYY-MM-DD format
        end_date: The latest date to search, entered as a string in YYYY-MM-DD format
RETURNS: A list of json objects containing the details of all booked appointments in the provided range
PRE: None
POST: None
'''
def get_bookings(start_date, end_date):
     token = get_backend_token()
     url = f"https://sagenda.net/api/v3/bookings/{start_date}/{end_date}?status=booked"
     payload={}
     headers = {"Authorization":f"Bearer {token}"}
     response = requests.request("GET", url, headers=headers, data=payload)
     bookings = json.loads(response.text)
     return bookings

'''
get_bookings_by_user(start_date, end_date, first_name, last_name)
PURPOSE: Get a list of bookings for a particular client in a particular date range (inclusive)
PARAMS: start_date: The earliest date to search, entered as a string in YYYY-MM-DD format
        end_date: The latest date to search, entered as a string in YYYY-MM-DD format
        first_name: The client's first name
        last_name: The client's surname
RETURNS: A list of json objects containing the details of all bookings in the provided date range for the specified client
PRE: No clients share the same first and last name
     Each appointment can only be booked by one client
POST: None
'''
def get_bookings_by_user(start_date, end_date, first_name, last_name):
     bookings = get_bookings(start_date, end_date)
     user_bookings = [entry for entry in bookings if entry['members'][0]['firstName'] == first_name and entry['members'][0]['lastName'] == last_name]
     return user_bookings
     
'''
cancel_booking(event_id)
PURPOSE: Cancels a user's booking
PARAMS: event_id: The Event identifier of the booking to cancel
RETURNS: None
PRE: The event is currently booked in the Sagenda API
     Each booking is limited to only one user
POST: The event is no longer booked in the Sagenda API, and is available to book again.  The user and trainer will receive an email confirming the cancellation
'''
def cancel_booking(event_id):
     token = get_backend_token()
     url = f'https://sagenda.net/api/v3/bookings/{event_id}/members'
     headers = {'Authorization':f'Bearer {token}'}
     response = requests.delete(url,headers=headers)
     print(response.text)
     print(response.status_code)
