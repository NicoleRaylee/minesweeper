import React, { useState } from 'react';
import Board from './Board';

const Game = () => {
    const [gameStatus, setGameStatus] = 
    useState('in-progress');
    const [difficulty, setDifficulty] =
    useState('medium');
    const [recentGames, setRecentGames] =
    useState([]);

    const difficulties = {
        easy: { size: 5, mines: 5 },
        medium: { size: 10, mines: 10},
        hard: { size: 15, mines: 30},
    };
    
    const addGameResult = (difficulty, time) => {
        setRecentGames((prevGames) => 
        [...prevGames, {difficulty, time}]);   
        
    };

    const handleDifficultyChange = (e) => {
        setDifficulty(e.target.value);
        setGameStatus('in-progress');
    };


return (
    <div className="game">
        <h1>Minesweeper</h1>
        <div>
            <label htmlFor='difficulty'>Select Difficulty:</label>
            <select id="difficulty" value={difficulty}
            onChange={handleDifficultyChange}>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
            </select>
        </div>
        <Board gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        difficulty={difficulties[difficulty]}
        addGameResult={addGameResult}
        />
        <h2>Recently Played</h2>
        <ul>
            {recentGames.map((game, index) => (
                <li key={index}>
                    Difficulty:
                    {game.difficulty}, Time {game.time}s
                </li>
            ))}
        </ul>

    </div>
  );
};

export default Game;