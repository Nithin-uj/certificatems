import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Admin from './Admin';
import axios from 'axios';

function ValidateAuth({ setIsLoggedIn }) {
  const location = useLocation(); // Access the current location

  useEffect(() => {
    // console.log(`Validating authentication for path: ${location.pathname}`); // Log current path
    axios
      .get('http://localhost:8090/')
      .then((res) => {
        // console.log('API Response:', res.data);
        if (res.data.Status === 'Success') {
          setIsLoggedIn(true); // User is logged in
        } else {
          setIsLoggedIn(false); // User is not logged in
        }
      })
      .catch((err) => {
        console.error('Error during API call:', err);
        setIsLoggedIn(false); // Invalidate on error
      });
  }, [location.pathname,setIsLoggedIn]); // Effect runs on every path change
  
  return null; // No visible content
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <ValidateAuth setIsLoggedIn={setIsLoggedIn} /> {/* Validate on every path change */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={!isLoggedIn ? <Login /> : <Navigate to="/admin" />} /> {/* Redirect if logged in */}
          <Route path='/admin' element={isLoggedIn ? <Admin /> : <Navigate to='/login' />} /> {/* Redirect if not logged in */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
