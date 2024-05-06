import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getScoreBoard } from '../../../services/scoreBoardService';
import { ScoreBoard } from '../../../Models/ScoreBoard';

const HighScores = () => {
    const [scores, setScores] = useState<ScoreBoard>({ easy: [], medium: [], hard: [] });

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const scoreData = await getScoreBoard();
                setScores(scoreData);
            } catch (error) {
                console.error("Failed to fetch high scores:", error);
            }
        };

        fetchScores();
    }, []);

    const renderScoreTable = (levelScores: any[]) => (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Login</th>
                    <th>Correct Answers</th>
                    <th>Total Answers</th>
                    <th>Accuracy</th>
                </tr>
            </thead>
            <tbody>
                {levelScores.map((score, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{score.login}</td>
                        <td>{score.correctAnswers}</td>
                        <td>{score.totalAnswers}</td>
                        <td>{((score.correctAnswers / score.totalAnswers) * 100).toFixed(2)}%</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );

    return (
        <div>
            <h1>High Scores</h1>
            <h2>Easy Level</h2>
            {renderScoreTable(scores.easy)}
            <h2>Medium Level</h2>
            {renderScoreTable(scores.medium)}
            <h2>Hard Level</h2>
            {renderScoreTable(scores.hard)}
        </div>
    );
};

export default HighScores;
