import React, { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';
import { getScoreBoard } from '../../../services/scoreBoardService';
import { ScoreBoard } from '../../../Models/ScoreBoard';
import Logo from '../../Logo/Logo';
import './HighScore.css';
import Button from '../../Button/Button';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();
    const goToHomePage = () => {
        navigate('/levelchosen');
      };
      
    const renderScoreTable = (levelScores: any[]) => (
        <Table striped bordered hover size="sm" className="score-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Użytkownik</th>
                    <th>Liczba poprawnych odpowiedzi</th>
                    <th>Liczba wszystkich odpowiedzi</th>
                    <th>Dokładność</th>
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
        <Container className="high-scores-container">
            <Logo />
            <h1>Tabela wyników</h1>
            <div className="level-section">
                <h2>Poziom łatwy</h2>
                {renderScoreTable(scores.easy)}
            </div>
            <div className="level-section">
                <h2>Poziom średni</h2>
                {renderScoreTable(scores.medium)}
            </div>
            <div className="level-section">
                <h2>Poziom trudny</h2>
                {renderScoreTable(scores.hard)}
            </div>
          <Button className="button-custom" onClick={() => goToHomePage()}>Powrót do strony głównej</Button>
        </Container>
    );
};

export default HighScores;
