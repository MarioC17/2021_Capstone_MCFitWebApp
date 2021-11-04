# MCFitWebApp

Uses django rest framework api to handle adding items to database and retrieving items from database

Installation:

First install Postgres 13.4 and NPM:
\n
https://www.postgresql.org/download/
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Then pip install the following in a venv or your environment:
```
pip install djangorestframework
pip install coverage
pip install django-cors-headers
```
Then inside the react_frontend\mcfitapi folder install the following npm packages:
Note: these have to be installed while in the mcfitapi directory
```
npm install react-router-dom
npm install @material-ui/core
```
To start the server you need 2 terminals:
Terminal 1 
in django_backend directory run the following command:
```
python3 manage.py runserver
```
Terminal 2
and in react_frontend/mcfitapi directory run the following command:
```
npm start
```
