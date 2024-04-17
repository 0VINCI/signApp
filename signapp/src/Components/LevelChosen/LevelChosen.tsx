import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button'; 
import './LevelChosen.css';
import Logo from '../Logo/Logo';

const LevelChosen = () => {
  const navigate = useNavigate();

  const handleButtonClick = (level: string) => {
    navigate(`/${level}`);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <Logo />
        <h1>Aplikacja do nauki języka migowego</h1>
        <h2>Wybierz poziom trudności</h2>
      </div>
      <div>
        <Button className="button-custom" onClick={() => handleButtonClick('easy')}>Łatwy</Button>
        <Button className="button-custom" onClick={() => handleButtonClick('medium')}>Średni</Button>
        <Button className="button-custom" onClick={() => handleButtonClick('hard')}>Trudny</Button>
      </div>
    </div>
  );
};

export default LevelChosen;