import React, { useState, useEffect, useRef } from 'react';
import { Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import HandTrackingComponent from '../../Camera/Camera';
import { Question } from '../../../Models/Question';
import { getQuestion } from '../../../services/questionService';
import { Level } from '../../../Models/Level';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { sendTemporaryScore } from '../../../services/temporaryScoreService';
import { incrementAllAnswer, incrementCorrectandAllAnswer } from '../../../slice/temporaryScoreSlice';

const Medium = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [predictions, setPredictions] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [showMotivation, setShowMotivation] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isAnswerCorrectRef = useRef<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const goToHomePage = () => {
    navigate('/levelchosen');
  };

  const fetchQuestion = async () => {
    const data = await getQuestion(Level.Medium);
    setQuestion(data);
    setPredictions([]);
    setIsCorrect(false);
    setMessage('');
    setShowMotivation(false);
    isAnswerCorrectRef.current = false;
    clearTimeout(timerRef.current!);
    startMotivationTimer();
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handlePrediction = (prediction: string) => {
    if (!isAnswerCorrectRef.current) {
      setPredictions((prev) => [...prev, prediction]);
    }
  };

  useEffect(() => {
    if (predictions.length >= 3) {
      const lastThree = predictions.slice(-3);
      const isConsistent = lastThree.every(pred => pred === lastThree[0]);
      if (isConsistent && question && lastThree[0].toLowerCase() === question.response1.toLowerCase()) {
        setIsCorrect(true);
        setMessage('Poprawna odpowiedź!');
        isAnswerCorrectRef.current = true;
        clearTimeout(timerRef.current!);
        dispatch(incrementCorrectandAllAnswer({ levelId: Level.Medium }));
      }
    }
  }, [predictions, question]);

  const startMotivationTimer = () => {
    timerRef.current = setTimeout(() => {
      if (!isAnswerCorrectRef.current) {
        setShowMotivation(true);
        setMessage('Nie poddawaj się!');
        setTimeout(() => {
          setShowMotivation(false);
          setMessage('');
          if (!isAnswerCorrectRef.current) {
            startMotivationTimer();
          }
        }, 2000); 
      }
    }, 5000); 
  };

  const saveAndBackHandler = () => {
    dispatch(sendTemporaryScore());
    goToHomePage();
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current!);
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Naśladuj to, co widzisz po prawej stronie:</h2>
      <Row>
        <Col md={6}>
          <HandTrackingComponent width={640} height={480} onPrediction={handlePrediction} />
        </Col>
        <Col md={6} className="d-flex justify-content-center align-items-center">
          {question && (
            <img src={question.url} alt="Instruction" />
          )}
        </Col>
      </Row>
      {message && (
        <Alert variant={isCorrect ? 'success' : showMotivation ? 'info' : 'secondary'} className="mt-4">
          {message}
        </Alert>
      )}
      <Row className="text-center mt-4">
        <Col>
          <Button variant="secondary" onClick={saveAndBackHandler} className="mx-2">
            Zapisz i wróć do strony głównej
          </Button>
          <Button variant="success" className="mx-2" disabled={!isCorrect} onClick={fetchQuestion}>
            Następne pytanie
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Medium;
