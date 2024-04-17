import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getQuestion, checkAnswer } from '../../services/questionService';
import { Question } from '../../Models/Question';

const Easy = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [checkAnswerClicked, setCheckAnswerClicked] = useState(false);
  const navigate = useNavigate();
const [answerChecked, setAnswerChecked] = useState(false);

  useEffect(() => {
    fetchQuestions(); 
  }, []);

  const fetchQuestions = async () => {
    try {
      const questionData = await getQuestion('easy'); 
      setCurrentQuestion(questionData);

      if (questionData) {
        setImage(questionData.url);
        setOptions([questionData.response1, questionData.response2, questionData.response3]);
      }
    } catch (error) {
      console.error('Błąd pobierania pytania:', error);
    }
  }

  const handleCheckAnswer = async () => {
    if (!selectedOption || !currentQuestion) {
      console.error('Wybierz opcję.');
      return;
    }

    try {
      const isCorrect = await checkAnswer(currentQuestion.questionId.toString(), selectedOption);
      setIsAnswerCorrect(isCorrect);
      setAnswerChecked(true);

      setSelectedOption('');
      setIsAnswerCorrect(null);
      setAnswerChecked(false);

      fetchQuestions();
  
    } catch (error) {
      console.error('Wystąpił błąd podczas sprawdzania pytania:', error);
    }
  };

  const goToHomePage = () => {
    navigate('/levelchosen');
  };

  const goToNextQuestion = () => {
    setSelectedOption('');
    setIsAnswerCorrect(null);
    setCheckAnswerClicked(false);
    fetchQuestions();
  };

  const [image, setImage] = useState('');
  const [options, setOptions] = useState<string[]>([]);


  return (
    <div className="app-container">
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
          {answerChecked && (
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
