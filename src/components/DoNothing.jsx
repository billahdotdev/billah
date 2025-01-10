import React, { useState, useEffect, useRef } from 'react';
import '../styles/DoNothing.css'; // Add styles for the component

const DoNothing = () => {
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
    const [isActive, setIsActive] = useState(false);
    const soundRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        // Cleanup on component unmount
        return () => clearInterval(timerRef.current);
    }, []);

    const startTimer = () => {
        if (isActive) return;

        setIsActive(true);
        setTimeLeft(120);

        // Play sound
        if (soundRef.current) {
            soundRef.current.currentTime = 0;
            soundRef.current.play();
        }

        // Start countdown
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setIsActive(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const resetTimer = () => {
        clearInterval(timerRef.current);
        setTimeLeft(120);
        setIsActive(false);
        if (soundRef.current) soundRef.current.pause();
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div
            className="do-nothing"
            style={{
                backgroundImage:
                    'url(https://images.unsplash.com/photo-1547628641-ec2098bb5812?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            }}>
            <audio
                ref={soundRef}
                src="https://dataup.sdasofia.org/MUSIC/nova-xr-musika/Nature%20sound%20of%20Relax/%20-%20Track08.mp3"
                preload="auto"></audio>
            <div className="heading">
                <h1>Do Nothing for 2 Minutes</h1>
            </div>
            <div className="content">
                {!isActive ? (
                    <button className="start-button" onClick={startTimer}>
                        Start
                    </button>
                ) : (
                    <div className="timer">
                        <span>{formatTime(timeLeft)}</span>
                        <button className="close-button" onClick={resetTimer}>
                            X
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoNothing;
