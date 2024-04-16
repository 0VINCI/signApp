import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Easy = () => {
  const [image, setImage] = useState('');
  const [options, setOptions] = useState(['Pies', 'Kot', 'Mysz']);
  const [selectedOption, setSelectedOption] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const correctAnswer = 'Pies';
  const imageUrl = "https://zoonews.pl/wp-content/uploads/2021/08/chihuahua-1.jpg";

  useEffect(() => {

    const fetchImage = async () => {
      try {
        const response = await axios.get('http://localhost:5196/api/Hero/image/2');
        setImage(imageUrl); 
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };  const goToHomePage = () => {
    navigate('/');
  };


    fetchImage();
  }, []);
  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate('/');
  };

  const goToNextQuestion = () => {

    const nextQuestionId = 3; // Przykładowy ID następnego pytania
    navigate(`/question/${nextQuestionId}`);
  };
  
  const handleOptionClick = (option :any) => {
    setSelectedOption(option);
    setIsAnswerCorrect(option === correctAnswer);
  };
  const [checkAnswer, setCheckAnswer] = useState(false);

  const handleCheckAnswer = () => {
    setCheckAnswer(true);
    setIsAnswerCorrect(selectedOption === correctAnswer);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Wybierz poprawną odpowiedź. Co przedstawia obrazek?</h2>
      <Row>
        <Col md={6} className="d-flex align-items-center justify-content-center">
          {image && <img src={image} alt="Zadanie" className="img-fluid" />}
        </Col>
        <Col md={6}>
          <div className="d-flex flex-column align-items-center">
            {options.map((option) => (
              <Card
                key={option}
                className={`mb-3 text-center ${selectedOption === option ? "border-primary" : ""}`}
                onClick={() => setSelectedOption(option)}
                style={{ cursor: 'pointer', width: '100%' }}
              >
                <Card.Body className={selectedOption === option ? "bg-primary text-white" : ""}>
                  {option}
                </Card.Body>
              </Card>
            ))}
            <Button variant="outline-dark" onClick={handleCheckAnswer} className="mt-3">
              Sprawdź odpowiedź
            </Button>
          </div>
          {checkAnswer && (
            <Alert variant={isAnswerCorrect ? 'success' : 'danger'} className="text-center mt-3">
              {isAnswerCorrect ? "Poprawna odpowiedź!" : "Niepoprawna odpowiedź, spróbuj ponownie."}
            </Alert>
          )}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="text-center">
        <Button variant="secondary" onClick={goToHomePage}>
            Strona główna
          </Button>
          {' '}
          <Button variant="success" disabled={!isAnswerCorrect} onClick={goToNextQuestion}>
            Następne pytanie
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Easy;
