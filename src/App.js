import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from './components/signup';
import Login from './components/login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/dashboard';
import EmailActivation from './components/emailActivate';
import CreateTask from './components/createTask';
import './App.css';

function App() {
  return (
    <div  className="App">
      <BrowserRouter>
        <div>
         <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/emailActivate/:hashToken" element={<EmailActivation />} />
            <Route path="/createTask" element={<CreateTask />} />
          </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App
