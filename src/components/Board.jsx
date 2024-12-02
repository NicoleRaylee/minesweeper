import React, { useState, useEffect } from 'react';
import Cell from './Cell';

const Board = ({ gameStatus, setGameStatus, difficulty, addGameResult }) => {
    const [boardData, setBoardData] =
    useState([]);
    const [timer, setTimer] = 
    useState(0);
    const [isRunning, setIsRunning] =
    useState(false);

    useEffect(() => {
        document.documentElement.style.setProperty('--grid-size', difficulty.size);
    }, [difficulty.size]);

        const initBoard = () => {
            const { size, mines } = difficulty;
            let data = createEmptyArray(size);
            data = plantMines(data, size, mines);
            data = calculateAdjacency(data, size);
            setBoardData(data);
            setGameStatus('in-progress');
            setTimer(0);
        };
        
    useEffect(() => {
        initBoard();
    }, [difficulty]);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer((prevTime) =>
                prevTime + 1);
            }, 1000);
        }
        return () => 
            clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        if (gameStatus === 'in-progress') {
            setIsRunning(true);
        } else {
            setIsRunning(false);
            if (gameStatus === 'won' 
                || gameStatus === 'lost') {
                    addGameResult(difficulty.size + 'x'
                        + difficulty.size + 'with' +
                        difficulty.mines + 'mines', timer);
                }
                setTimer(0);
        }
    }, [gameStatus]);

    const createEmptyArray = (size) => {
        return Array.from({ length: size }, () =>
            Array.from({ length: size }, () => ({
                revealed: false,
                mine: false,
                adjacentMines: 0,
                flagged: false,

            }))
        );
    };

    const plantMines = (data, size, mines) => {
        let minesPlanted = 0;
        while (minesPlanted < mines) {
            const x = Math.floor(Math.random() * size);
            const y = Math.floor(Math.random() * size);
            if (!data[x][y].mine) {
                data[x][y].mine = true;
                minesPlanted++;
            }
        }
        return data;
    };

    const calculateAdjacency = (data, size) => {
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                if(!data[x][y].mine) {
                    let count = 0;
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            if (
                                x + i >= 0 &&
                                x + i < size &&
                                y + j >= 0 &&
                                y + j < size &&
                                data[x + i][y + j].mine
                            ) {
                                count++;
                            }
                        }
                    }
                
                data[x][y].adjacentMines = count;
            }
        }
    } 
    return data;
 };

    const revealCell = (x, y) => {
        if (boardData[x][y].revealed || 
            boardData[x][y].flagged) return;

        const newBoardData = [...boardData];
        newBoardData[x][y].revealed = true;

        if (newBoardData[x][y].mine) {
            setGameStatus('lost');
            alert('Game Over, you hit a mine!');
            initBoard();
            return;
        } else if (newBoardData[x][y].adjacentMines === 0) {
            revealAdjacentCells(newBoardData, x, y);
        }

        setBoardData(newBoardData);
        if (checkWinCon(newBoardData)) {
            setGameStatus('won');
            alert('Congratulations! You win!')
            initBoard();
        }
    };

    const revealAdjacentCells = (data, x, y) => {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (
                x + i >= 0 &&
                x + i < data.length &&
                y + j >= 0 &&
                y + j < data[0].length &&
                !data[x + i][y + j].revealed
                ) {
                    revealCell(x + i, y + j);
                }
            }
        }
    };

 return (
    <div className='board'>
        {boardData.map((row, rowIndex) => 
            row.map((cell, colIndex) => (
                <Cell 
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                onClick={() => 
                    revealCell(rowIndex, colIndex)}
                />
        ))
    )} 
    <div className='timer'>Time: {timer}s</div>
 </div>
 );
};

export default Board;