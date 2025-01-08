import React, { useState } from 'react';
import '../styles/LetsCode.css';

const LetsCode = () => {
    const [showCode, setShowCode] = useState(false);
    const [codeText] = useState(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
        }
        header {
            background-color: #333;
            color: #fff;
            padding: 10px;
            text-align: center;
        }
        main {
            padding: 20px;
        }
    </style>
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
    </header>
    <main>
        <p>This is a basic HTML and CSS boilerplate.</p>
    </main>
</body>
</html>`);

    const [codeIndex, setCodeIndex] = useState(0);

    const typeCode = () => {
        if (codeIndex < codeText.length) {
            setCodeIndex((prev) => prev + 1);
        }
    };

    const handleToggle = () => {
        setShowCode(!showCode);
        if (!showCode) {
            const interval = setInterval(() => {
                typeCode();
                if (codeIndex >= codeText.length) {
                    clearInterval(interval);
                }
            }, 150); // Realistic typing speed
        } else {
            setCodeIndex(0);
        }
    };

    return (
        <div className="lets-code-component-container">
            <button className="lets-code-toggle-button" onClick={handleToggle}>
                {showCode
                    ? '😀Luckily, we are not in the 90s.!'
                    : 'How were 90s Website codes written?'}
            </button>
            {showCode && (
                <div className="lets-code-code-area">
                    <span
                        className="lets-code-close-button"
                        onClick={handleToggle}>
                        X
                    </span>
                    <pre>{codeText.substring(0, codeIndex)}</pre>
                </div>
            )}
        </div>
    );
};

export default LetsCode;
