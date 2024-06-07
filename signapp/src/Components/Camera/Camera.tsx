import React, { useEffect, useRef } from 'react';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { sendPrediction } from '../../services/predictionService';

interface CameraProps {
  width: number;
  height: number;
  onPrediction: (prediction: string) => void;
}

const HandTrackingComponent: React.FC<CameraProps> = ({ width, height, onPrediction }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const landmarksRef = useRef<number[][] | null>(null); // Ref to store landmarks

  useEffect(() => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement?.getContext('2d');

    if (!canvasCtx) {
      console.error("Failed to get the canvas context.");
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
      if (results.multiHandLandmarks && canvasElement) {
        canvasCtx.save();
        canvasCtx.scale(-1, 1);
        canvasCtx.translate(-canvasElement.width, 0);
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

        results.multiHandLandmarks.forEach(landmarks => {
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
          drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });

          landmarksRef.current = landmarks.map(point => [point.x, point.y, point.z]);
        });

        canvasCtx.restore();
      }
    });

    let camera: Camera | null = null;
    if (videoElement) {
      camera = new Camera(videoElement, {
        onFrame: async () => {
          if (videoRef.current) {
            await hands.send({ image: videoRef.current });
          }
        },
        width: width,
        height: height
      });
      camera.start();
    }

    return () => {
      if (camera) {
        camera.stop();
      }
      hands.close();
    };
  }, [width, height]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (landmarksRef.current) {
        const normalizedData = normalizeLandmarks(landmarksRef.current);
        if (normalizedData) {
          try {
            const response = await sendPrediction(normalizedData);
            onPrediction(response.Prediction);
          } catch (error) {
            console.error('Error sending prediction:', error);
          }
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [onPrediction]);

  const normalizeLandmarks = (landmarks: number[][]) => {
    let rawX = landmarks.map(point => point[0]);
    let rawY = landmarks.map(point => point[1]);

    let minX = Math.min(...rawX);
    let minY = Math.min(...rawY);

    let normalizedX = rawX.map(value => (value - minX).toFixed(4));
    let normalizedY = rawY.map(value => (value - minY).toFixed(4));

    let data: number[] = [];
    for (let i = 0; i < Math.min(normalizedX.length, normalizedY.length); i++) {
      data.push(parseFloat(normalizedX[i]));
      data.push(parseFloat(normalizedY[i]));
    }

    return data.length === 42 ? data : null;
  };

  return (
    <div style={{ width: `${width}px`, height: `${height}px`, position: 'relative' }}>
      <video ref={videoRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, transform: 'scaleX(-1)' }} autoPlay playsInline muted />
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} width={width} height={height} />
    </div>
  );
};

export default HandTrackingComponent;
