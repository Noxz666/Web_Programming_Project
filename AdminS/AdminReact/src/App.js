import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React,{useState,useEffect} from 'react';
import AdminHome from './components/adminhomepage';
import AdminLog from './components/adminmanagement';
import LogIn from './components/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/Adminhomepage" element={<AdminHome />} />
        <Route path="/AdminManagement" element={<AdminLog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
