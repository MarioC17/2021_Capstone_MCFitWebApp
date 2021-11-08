import React from 'react';
import GoogleLogin from 'react-google-login';

class connectionExample extends React.Component {
  componentDidMount() {
    const apiUrl = 'http://localhost:8000/api';
    fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => console.log(data));
  }

  responseGoogle = response => {
    console.log(response);
    console.log(response.profileObj);
  };

  render(){
    return <div><GoogleLogin
    clientId="35091798775-ivbgfssrdghoicrgb8po3vk2a117d4nt.apps.googleusercontent.com"
    buttonText="Login with Google"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    cookiePolicy="single_host_origin"
  /></div>;
  }
}

export default connectionExample;