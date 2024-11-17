// CRMInterface.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CRMInterface from './CRMInterface';

const Xyz = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (you can use any mechanism such as localStorage, Context API, etc.)
    const user = localStorage.getItem('user');

    setIsAuthenticated(true);

}, [navigate] 
);

//   if (!isAuthenticated) {
//     return <div>Loading...</div>;
//   }

  return (
    <CRMInterface></CRMInterface>
  );
};

export default Xyz;
