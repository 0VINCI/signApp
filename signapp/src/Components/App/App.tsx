import './App.css';
import React from 'react';
import LevelChosen from '../LevelChosen/LevelChosen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Easy from '../Pages/Easy/Easy';
import Hard from '../Pages/Hard/Hard';
import Medium from '../Pages/Medium/Medium';
import Login from '../Pages/Login/Login';
import HighScores from '../Pages/HighScore/HighScore';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Register from '../Pages/Register/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/levelchosen" element={<PrivateRoute><LevelChosen /></PrivateRoute>} />
        <Route path="/easy" element={<PrivateRoute><Easy /></PrivateRoute>} />
        <Route path="/medium" element={<PrivateRoute><Medium /></PrivateRoute>} />
        <Route path="/hard" element={<PrivateRoute><Hard /></PrivateRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/ranking" element={<PrivateRoute><HighScores /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;