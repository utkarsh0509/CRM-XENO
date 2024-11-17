// GoogleAuth.js
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    if (response?.profileObj) {
      // Successful login, navigate to CRM interface
      navigate('/crm-interface');
    } else {
      console.log('Authentication failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <GoogleLogin
        clientId="Insert your Client ID"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

export default GoogleAuth;