import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import axios from 'axios';
import { Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Medium = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Funkcja inicjująca strumień kamery
const startVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    setStream(stream);
  } catch (error) {
    console.error('Error accessing the webcam', error);
  }
};
const navigate = useNavigate();
const goToHomePage = () => {
  navigate('/levelchosen');
};


  // Ładowanie modelu TensorFlow.js i rozpoczęcie analizy
  const loadModel = async () => {
    // model
    // const model = await tf.loadModel('/path/to/your/model.json');

    // rozpocząć analizę obrazu z kamery
    // ...
  };
  useEffect(() => {
    startVideo();
  
    // Funkcja czyszcząca, która zostanie wywołana przy odmontowywaniu komponentu
    return () => {
      // Stop all active tracks to prevent duplicates
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []); // Pusta tablica zależności, aby uruchomić efekt tylko raz
  
  const imageUrl = "https://zoonews.pl/wp-content/uploads/2021/08/chihuahua-1.jpg";
  const [image, setImage] = useState('');

  useEffect(() => {
    // Funkcja do pobierania URL obrazka z API
    const fetchImage = async () => {
      try {
        const response = await axios.get('http://localhost:5196/api/Hero/image/2');
        setImage(imageUrl); 
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Naśladuj to, co widzisz po lewej stronie</h2>
      <Row className="align-items-center">
        <Col md={6} className="mb-3 d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
          {image && <img src={image} alt="Zadanie" className="img-fluid" style={{ maxHeight: '100%' }} />}
        </Col>
        <Col md={6} className="mb-3 d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: '100%', height: 'auto', maxHeight: '100%' }}
          ></video>
        </Col>
      </Row>
      <Row className="text-center mt-4">
        <Col>
        <Button variant="secondary" onClick={goToHomePage} className="mx-2">
            Strona główna
          </Button>
          <Button variant="success" className="mx-2">
            Następne pytanie
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Medium;
