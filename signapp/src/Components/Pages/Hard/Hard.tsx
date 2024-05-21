import React, { useEffect, useRef, useState } from 'react';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import HandTrackingComponent from '../../Camera/Camera';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Level } from '../../../Models/Level';
import { cameraQuestion } from '../../../services/questionService';
import { CameraQuestion } from '../../../Models/CameraQuestion';

const Hard = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const navigate = useNavigate();
    const [question, setQuestion] = useState<CameraQuestion | null>(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        const canvasElement = canvasRef.current;

        if (!videoElement || !canvasElement) {
            console.error("Required elements (video or canvas) are not available.");
            return;
        }

        const canvasCtx = canvasElement.getContext('2d');
        if (!canvasCtx) {
            console.error("Cannot obtain 2D context from the canvas element.");
            return;
        }

        const hands = new Hands({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });

        hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        hands.onResults((results) => {
            if (canvasCtx) {
                canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
                results.multiHandLandmarks.forEach(landmarks => {
                    drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
                    drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
                });
            }
        });

        const camera = new Camera(videoElement, {
            onFrame: async () => {
                await hands.send({ image: videoElement });
            },
            width: 640,
            height: 480
        });
        camera.start();

        return () => {
            camera.stop();
            hands.close();
        };
    }, []);
    const goToHomePage = () => {
      navigate('/');
  };

  useEffect(() => {
    fetchQuestion();
    
  }, []);

  async function fetchQuestion() {
    const data = await cameraQuestion(Level.Hard);
    setQuestion(data);
  }
  const wordToImitate = question?.questionContent;

    return (
  
    <div className="container my-5">
            <HandTrackingComponent />
    </div>
  );
};

export default Hard;
