import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button'; 
import './LevelChosen.css';
import Logo from '../Logo/Logo';
import { logout } from '../PrivateRoute/helpers/logout';

const LevelChosen = () => {
  const navigate = useNavigate();

  const handleLevelButtonClick = (level: string) => {
    navigate(`/${level}`);
  };

  const handleRankingButtonClick = () => {
    navigate('/ranking');
  };

  const handleLogoutButtonClick = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <Logo />
        <h1>Aplikacja do nauki języka migowego</h1>
        <h2>Wybierz poziom trudności</h2>
      </div>
      <div className="button-container">
        <Button className="button-custom" onClick={() => handleLevelButtonClick('easy')}>Łatwy</Button>
        <Button className="button-custom" onClick={() => handleLevelButtonClick('medium')}>Średni</Button>
        <Button className="button-custom" onClick={() => handleLevelButtonClick('hard')}>Trudny</Button>
      </div>
      <div className="additional-buttons">
        <Button className="button-custom" onClick={() => handleRankingButtonClick()}>Ranking</Button>
        <Button className="button-custom" onClick={() => handleLogoutButtonClick()}>Wyloguj się</Button>
      </div>
    </div>
  );
};

export default LevelChosen;
