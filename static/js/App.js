import React, { useRef } from "react";
import GoogleLogin from 'react-google-login';

export default function App() {
    const responseGoogle = (response) => {
        console.log(response);
        var res = response.profileObj;
        console.log(res);
    }

    return (
        <div className={'signature'}>
            <GoogleLogin    
                clientId="405270379582-riu9fkj99btjlmf9knusqofofkl4hvjn.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle} ></GoogleLogin>
        </div>
    );   
}