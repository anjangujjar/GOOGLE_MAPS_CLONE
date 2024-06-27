// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './screens/Signup';
import Signin from './screens/Login';
import Home from './screens/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
