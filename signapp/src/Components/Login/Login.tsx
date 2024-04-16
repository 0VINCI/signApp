import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { userLogin } from '../../services/loginService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    
    try {
      const user = { login: username, password };
      const data = await userLogin(user);
      navigate('/levelchosen');

      Cookies.set('userToken', data.jwt, { expires: 7 }); // token wygaśnie po 7 dniach
      
      // callback z tokenem, jeśli jest potrzebny w innym miejscu aplikacji
      // onLoginSuccess(data.jwt);

  } catch (error) {
    setError('Nie udało się zalogować. Sprawdź swoje dane logowania.');
  }
};
return (
  <Container>
    <h2>Logowanie</h2>
    {error && <Alert variant="danger">{error}</Alert>}
    <Form onSubmit={handleSubmit}>
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

        <Button variant="primary" type="submit">
          Zaloguj się
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
