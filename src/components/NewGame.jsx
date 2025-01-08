/*
import React, { useState, useEffect, useRef } from 'react';
import '../styles/newGame.css';

const NewGame = () => {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState({ x: 1, y: 0 });
    const [isGameOver, setIsGameOver] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [isGameVisible, setIsGameVisible] = useState(false);
    const [difficulty, setDifficulty] = useState(200);
    const intervalRef = useRef(null);
    const boardRef = useRef(null);

    const handleKeyDown = (event) => {
        switch (event.key) {
            case 'ArrowUp':
                if (direction.y === 0) setDirection({ x: 0, y: -1 });
                break;
            case 'ArrowDown':
                if (direction.y === 0) setDirection({ x: 0, y: 1 });
                break;
            case 'ArrowLeft':
                if (direction.x === 0) setDirection({ x: -1, y: 0 });
                break;
            case 'ArrowRight':
                if (direction.x === 0) setDirection({ x: 1, y: 0 });
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const handleMove = () => {
            if (isGameOver || !isRunning) return;

            const newSnake = [...snake];
            let head = {
                x: snake[0].x + direction.x,
                y: snake[0].y + direction.y,
            };

            const boardWidth = boardRef.current.clientWidth;
            const boardHeight = boardRef.current.clientHeight;
            const numCellsX = Math.floor(boardWidth / 20);
            const numCellsY = Math.floor(boardHeight / 20);

            if (head.x < 0) head.x = numCellsX - 1;
            if (head.x >= numCellsX) head.x = 0;
            if (head.y < 0) head.y = numCellsY - 1;
            if (head.y >= numCellsY) head.y = 0;

            for (let segment of snake) {
                if (segment.x === head.x && segment.y === head.y) {
                    setIsGameOver(true);
                    setIsRunning(false);
                    return;
                }
            }

            newSnake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                setFood({
                    x: Math.floor(Math.random() * numCellsX),
                    y: Math.floor(Math.random() * numCellsY),
                });
            } else {
                newSnake.pop();
            }

            setSnake(newSnake);
        };

        if (isRunning) {
            intervalRef.current = setInterval(handleMove, difficulty);
            return () => clearInterval(intervalRef.current);
        }
    }, [snake, direction, isGameOver, isRunning, difficulty]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [direction]);

    const handleStart = () => setIsRunning(true);
    const handlePause = () => setIsRunning(false);
    const handleClose = () => {
        setIsGameVisible(false);
        setIsRunning(false);
        setSnake([{ x: 10, y: 10 }]);
        setFood({ x: 15, y: 15 });
        setDirection({ x: 1, y: 0 });
        setIsGameOver(false);
    };

    const handleToggleGame = () => setIsGameVisible(!isGameVisible);
    const handleDifficultyChange = (event) =>
        setDifficulty(Number(event.target.value));

    return (
        <div className="newGame-container">
            {!isGameVisible && (
                <button
                    className="newGame-toggleButton"
                    onClick={handleToggleGame}>
                    🐍 Play Nostalgic Game
                </button>
            )}
            {isGameVisible && (
                <div>
                    <div className="newGame-controls">
                        <label>
                            Difficulty:
                            <select
                                onChange={handleDifficultyChange}
                                value={difficulty}>
                                <option value="300">Easy</option>
                                <option value="200">Medium</option>
                                <option value="100">Hard</option>
                            </select>
                        </label>
                        <button onClick={handleStart}>▶️</button>
                        <button onClick={handlePause}>⏸️</button>
                        <button onClick={handleClose}>❌</button>
                    </div>
                    <div className="newGame-gameBoard" ref={boardRef}>
                        {isGameOver && (
                            <div className="newGame-gameOver">Game Over</div>
                        )}
                        {snake.map((segment, index) => (
                            <div
                                key={index}
                                className="newGame-snakeSegment"
                                style={{
                                    left: `${segment.x * 20}px`,
                                    top: `${segment.y * 20}px`,
                                }}></div>
                        ))}
                        <div
                            className="newGame-food"
                            style={{
                                left: `${food.x * 20}px`,
                                top: `${food.y * 20}px`,
                            }}></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewGame;
*/

import React, { useState, useEffect, useRef } from 'react';
import '../styles/newGame.css';

const NewGame = () => {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState({ x: 1, y: 0 });
    const [isGameOver, setIsGameOver] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [isGameVisible, setIsGameVisible] = useState(false);
    const [difficulty, setDifficulty] = useState(200);
    const intervalRef = useRef(null);
    const boardRef = useRef(null);

    const handleKeyDown = (event) => {
        switch (event.key) {
            case 'ArrowUp':
                if (direction.y === 0) setDirection({ x: 0, y: -1 });
                break;
            case 'ArrowDown':
                if (direction.y === 0) setDirection({ x: 0, y: 1 });
                break;
            case 'ArrowLeft':
                if (direction.x === 0) setDirection({ x: -1, y: 0 });
                break;
            case 'ArrowRight':
                if (direction.x === 0) setDirection({ x: 1, y: 0 });
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const handleMove = () => {
            if (isGameOver || !isRunning) return;

            const newSnake = [...snake];
            let head = {
                x: snake[0].x + direction.x,
                y: snake[0].y + direction.y,
            };

            const boardWidth = boardRef.current.clientWidth;
            const boardHeight = boardRef.current.clientHeight;
            const numCellsX = Math.floor(boardWidth / 20);
            const numCellsY = Math.floor(boardHeight / 20);

            if (head.x < 0) head.x = numCellsX - 1;
            if (head.x >= numCellsX) head.x = 0;
            if (head.y < 0) head.y = numCellsY - 1;
            if (head.y >= numCellsY) head.y = 0;

            for (let segment of snake) {
                if (segment.x === head.x && segment.y === head.y) {
                    setIsGameOver(true);
                    setIsRunning(false);
                    return;
                }
            }

            newSnake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                setFood({
                    x: Math.floor(Math.random() * numCellsX),
                    y: Math.floor(numCellsY * Math.random()),
                });
            } else {
                newSnake.pop();
            }

            setSnake(newSnake);
        };

        if (isRunning) {
            intervalRef.current = setInterval(handleMove, difficulty);
            return () => clearInterval(intervalRef.current);
        }
    }, [snake, direction, isGameOver, isRunning, difficulty]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [direction]);

    const handleStart = () => setIsRunning(true);
    const handlePause = () => setIsRunning(false);
    const handleClose = () => {
        setIsGameVisible(false);
        setIsRunning(false);
        setSnake([{ x: 10, y: 10 }]);
        setFood({ x: 15, y: 15 });
        setDirection({ x: 1, y: 0 });
        setIsGameOver(false);
    };

    const handleToggleGame = () => setIsGameVisible(!isGameVisible);
    const handleDifficultyChange = (event) =>
        setDifficulty(Number(event.target.value));

    return (
        <div className="newGame-container">
            {!isGameVisible && (
                <button
                    className="newGame-toggleButton"
                    onClick={handleToggleGame}>
                    🐍 Play Nostalgic Game
                </button>
            )}
            {isGameVisible && (
                <div>
                    <div className="newGame-controls">
                        <label>
                            Difficulty:
                            <select
                                onChange={handleDifficultyChange}
                                value={difficulty}>
                                <option value="300">Easy</option>
                                <option value="200">Medium</option>
                                <option value="100">Hard</option>
                            </select>
                        </label>
                        <button onClick={handleStart}>▶️</button>
                        <button onClick={handlePause}>⏸️</button>
                        <button onClick={handleClose}>❌</button>
                    </div>
                    <div className="newGame-gameBoard" ref={boardRef}>
                        {isGameOver && (
                            <div className="newGame-gameOver">Game Over</div>
                        )}
                        {snake.map((segment, index) => (
                            <div
                                key={index}
                                className="newGame-snakeSegment"
                                style={{
                                    left: `${segment.x * 20}px`,
                                    top: `${segment.y * 20}px`,
                                }}></div>
                        ))}
                        <div
                            className="newGame-food"
                            style={{
                                left: `${food.x * 20}px`,
                                top: `${food.y * 20}px`,
                            }}></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewGame;
