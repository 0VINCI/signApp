import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { incrementAllAnswer, incrementCorrectandAllAnswer } from '../../../slice/temporaryScoreSlice';
import { Level } from '../../../Models/Level';
import { checkAnswer, getQuestion } from '../../../services/questionService';
import { Question } from '../../../Models/Question';
import { sendTemporaryScore } from '../../../services/temporaryScoreService';
import type { AppDispatch } from '../../../store/index';

const Easy = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [checkAnswerClicked, setCheckAnswerClicked] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestion();
  }, []);

  async function fetchQuestion() {
    const data = await getQuestion(Level.Easy);
    setQuestion(data);
    setSelectedOption('');
    setAlertVisible(false);
    setIsAnswerCorrect(false); 
  }

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setCheckAnswerClicked(false);
    setAlertVisible(false);
  };

  const handleCheckAnswer = async () => {
    if (!question || !selectedOption) return;

    const result = await checkAnswer({
      questionId: question.questionId,
      selectedOption: selectedOption
  });

  setCheckAnswerClicked(true);
    setAlertVisible(true); 
    dispatch(result.correctAnswer ? incrementCorrectandAllAnswer({ levelId: Level.Easy }) : incrementAllAnswer({ levelId: Level.Easy }));
    setIsAnswerCorrect(result.correctAnswer);

  };

  const goToHomePage = () => {
    navigate('/levelchosen');
  };

  const saveAndBackHandler = () => {
    dispatch(sendTemporaryScore());
    goToHomePage();
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Wybierz odpowiedź. Co przedstawia obrazek?</h2>
      <Row>
        <Col md={6} className="d-flex align-items-center justify-content-center">
          {question && <img src={question.url} alt="Zadanie" className="img-fluid" />}
        </Col>
        <Col md={6}>
          <div className="d-flex flex-column align-items-center">
            {question && [question.response1, question.response2, question.response3].map((option) => (
              <Card
                key={option}
                className={`mb-3 text-center ${selectedOption === option ? "border-primary" : ""}`}
                onClick={() => handleOptionClick(option)}
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
          {checkAnswerClicked && alertVisible && (
            <Alert variant={isAnswerCorrect ? 'success' : 'danger'} className="text-center mt-3">
              {isAnswerCorrect ? "Poprawna odpowiedź!" : "Niepoprawna odpowiedź, spróbuj ponownie."}
            </Alert>
          )}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="text-center">
          <Button variant="secondary" onClick={saveAndBackHandler}>
            Zapisz i wróć do strony głównej
          </Button>
          {' '}
          <Button variant="success" disabled={!isAnswerCorrect} onClick={fetchQuestion}>
            Następne pytanie
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Easy;
