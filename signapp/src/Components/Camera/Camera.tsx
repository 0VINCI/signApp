import React, { useEffect, useRef, useState } from 'react';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

const HandTrackingComponent: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [lastPrediction, setLastPrediction] = useState<string>('');

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
                canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
                results.multiHandLandmarks.forEach(landmarks => {
                    drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
                    drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
                });
            }
        });

        if (videoElement) {
            const camera = new Camera(videoElement, {
                onFrame: async () => {
                    if (videoRef.current) {
                        await hands.send({ image: videoRef.current });
                    }
                },
                width: 1280,
                height: 720
            });
            camera.start();

            return () => {
                camera.stop();
                hands.close();
            };
        }
    }, []);

    return (
        <div style={{ position: 'relative', width: '1280px', height: '720px' }}>
            <video ref={videoRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} autoPlay playsInline muted />
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} width="1280" height="720" />
            <div style={{ position: 'absolute', bottom: 0, left: 0, color: 'white', fontSize: '24px' }}>Prediction: {lastPrediction}</div>
        </div>
    );
};

export default HandTrackingComponent;
