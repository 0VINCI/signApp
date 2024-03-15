import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import axios from 'axios';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Hard = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const navigate = useNavigate();

  const stopVideoStream = () => {
    // Bezpośrednie użycie refa video do zatrzymania strumienia
    if (videoRef.current && videoRef.current.srcObject) {
      const mediaStream = videoRef.current.srcObject as MediaStream;
      mediaStream.getTracks().forEach((track) => track.stop());
      // Ustawienie srcObject na null, aby w pełni uwolnić zasoby kamery
      videoRef.current.srcObject = null;
    }
  };

  const startVideo = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream); 
      }
    } catch (error) {
      console.error('Error accessing the webcam', error);
    }
  };

  const goToHomePage = () => {
    stopVideoStream();
    navigate('/');
  };

  useEffect(() => {
    startVideo();
    return () => stopVideoStream();
  }, []);

  const wordToImitate = 'siusiak';

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Naśladuj to słowo</h1>
      <h2 className="text-center mb-4">{wordToImitate}</h2>
      <Row className="justify-content-md-center mb-4">
        <Col md={6} className="d-flex justify-content-center">
          <video ref={videoRef} autoPlay playsInline muted className="w-100" />
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <Button variant="secondary" className="mx-2" onClick={goToHomePage}>
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

export default Hard;
