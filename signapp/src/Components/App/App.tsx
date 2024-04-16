import './App.css';
import React from 'react';
import LevelChosen from '../LevelChosen/LevelChosen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Easy from '../Easy/Easy';
import Hard from '../Hard/Hard';
import Medium from '../Medium/Medium';
import Login from '../Login/Login';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/levelchosen" element={<LevelChosen />} />
        <Route path="/easy" element={<Easy />} />
        <Route path="/medium" element={<Medium />} />
        <Route path="/hard" element={<Hard />} />
      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
