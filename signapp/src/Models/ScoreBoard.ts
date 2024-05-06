export interface HighScoreEntry {
    login: string;
    correctAnswers: number;
    totalAnswers: number;
}

export interface ScoreBoard {
    easy: HighScoreEntry[];
    medium: HighScoreEntry[];
    hard: HighScoreEntry[];
}