// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import Xyz from './xyz';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for Google Authentication */}
        <Route path="/" element={<GoogleAuth />} />

        {/* Route for CRM Interface (only accessible after authentication) */}
        <Route path="/crm-interface" element={<Xyz />} />
      </Routes>
    </Router>
  );
};

export default App;
