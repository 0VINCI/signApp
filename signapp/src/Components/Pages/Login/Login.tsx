import React, { useState } from 'react';
import { Form, Container, Alert } from 'react-bootstrap';
import { userLogin } from '../../../services/loginService';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Logo/Logo';
import './Login.css'
import { useDispatch } from 'react-redux';
import { updateUserId } from '../../../slice/temporaryScoreSlice';
import Button from '../../Button/Button';
import { logout } from '../../PrivateRoute/helpers/logout';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    logout()
    try {
      const user = { login: username, password };
      const data = await userLogin(user);
      
      if (data.userId) {
        dispatch(updateUserId(data.userId));
        setError('');
        navigate('/levelchosen');
      } else if (data.error) {
        setError(data.error);
      }
    } catch (error) {
      setError('Nie udało się zalogować. Sprawdź swoje dane logowania.');
    }
  };

  return (
    <div className="app-container">
      <h2>Logowanie</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Logo />
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wprowadź login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button 
          className="button-custom" 
          onClick={() => {
            const fakeEvent = { preventDefault: () => {} } as React.FormEvent<HTMLFormElement>;
            handleSubmit(fakeEvent);
          }}
        >
          Zaloguj się
        </Button>
      </Form>
    </div>
  );
};

export default Login;
