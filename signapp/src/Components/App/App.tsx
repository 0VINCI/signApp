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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/levelchosen" element={<PrivateRoute><LevelChosen /></PrivateRoute>} />
        <Route path="/easy" element={<PrivateRoute><Easy /></PrivateRoute>} />
        <Route path="/medium" element={<PrivateRoute><Medium /></PrivateRoute>} />
        <Route path="/hard" element={<PrivateRoute><Hard /></PrivateRoute>} />
  <Route path="/ranking" element={<PrivateRoute><HighScores /></PrivateRoute>} />
    {/*      <Route path="/" element={<Login />} />
          <Route path="/levelchosen" element={<LevelChosen />}/>
        <Route path="/easy" element={<Easy />} />
        <Route path="/medium" element={<Medium />} />
        <Route path="/hard" element={<Hard />} />
        <Route path="/ranking" element={<HighScores />} />
  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;