'use client';

import { useState, useRef, useEffect } from 'react';
import './MoreAboutMe.css';

const MoreAboutMe = () => {
  const [history, setHistory] = useState([
    {
      type: 'welcome',
      content: "Welcome to Masum Billah's Dev Terminal",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      type: 'output',
      content:
        "Type 'help' to see available commands or click on the suggested commands below.",
    },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const containerRef = useRef(null);

  const commands = {
    story:
      "I built 'GARMENTIK' to fly, but needed wings. 'Brandotory' gave me those wings, and now I'm building flight paths for others.",
    journey:
      "I discovered the power of creating digital experiences that impact people's lives. Through years of learning, experimenting, and building, I've developed a deep understanding of the web ecosystem.",
    skills:
      'JavaScript, Typescript, MongoDB, Express, React, Node, HTML, CSS, TailwindCSS, Material UI, Figma, Inkscape, More +',
    credentials:
      "I'm a Bangladesh University of Engineering and Technology (BUET), and IAC Certified full-stack web developer on a journey of modern web mastery at the University of Helsinki. I'm also certified in Machine Learning AI from the National Information Society Agency, South Korea.",
    stats: '7+ Years Experience | 179 Projects Completed | 119 Happy Clients',
    help: 'Available commands: story, journey, skills, credentials, stats, help, clear',
    clear: 'clear',
  };

  const suggestedCommands = [
    'story',
    'journey',
    'skills',
    'credentials',
    'stats',
    'help',
  ];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (command) => {
    const cmd = command.toLowerCase().trim();

    setHistory((prev) => [
      ...prev,
      {
        type: 'input',
        content: `$ ${command}`,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    setTimeout(() => {
      if (cmd === 'clear') {
        setHistory([
          {
            type: 'welcome',
            content: "Welcome to Masum Billah's Dev Terminal",
            timestamp: new Date().toLocaleTimeString(),
          },
          {
            type: 'output',
            content:
              "Type 'help' to see available commands or click on the suggested commands below.",
          },
        ]);
      } else if (commands[cmd]) {
        setHistory((prev) => [
          ...prev,
          {
            type: 'output',
            content: commands[cmd],
          },
        ]);
      } else if (cmd === '') {
      } else {
        setHistory((prev) => [
          ...prev,
          {
            type: 'output',
            content:
              "Command not found. Type 'help' to see available commands.",
          },
        ]);
      }
      setIsTyping(false);
    }, 500);

    setIsTyping(true);
    setCurrentInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentInput.trim()) {
      executeCommand(currentInput);
    }
  };

  const handleSuggestedCommand = (command) => {
    setCurrentInput(command);
    executeCommand(command);
  };

  const handleTerminalClick = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="terminal-container" ref={containerRef}>
      <div className="terminal-header">
        <div className="terminal-controls">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
        </div>
        <div className="terminal-title">masum@dev-terminal:~</div>
      </div>

      <div
        className="terminal-body"
        ref={terminalRef}
        onClick={handleTerminalClick}
      >
        <div className="terminal-content">
          {history.map((line, index) => (
            <div key={index} className={`terminal-line ${line.type}`}>
              {line.type === 'welcome' && (
                <div className="welcome-message">
                  <div className="ascii-art">
                    {`
    ╔══════════════════════════════════════╗
    ║     Welcome to Masum Billah's        ║
    ║         Dev Terminal v1.0            ║
    ╚══════════════════════════════════════╝
                    `}
                  </div>
                  <div className="welcome-text">{line.content}</div>
                  {line.timestamp && (
                    <div className="timestamp">
                      Session started at {line.timestamp}
                    </div>
                  )}
                </div>
              )}
              {line.type === 'input' && (
                <div className="input-line">
                  <span className="prompt">masum@dev-terminal:~</span>
                  <span className="command">
                    {line.content.replace('$ ', '')}
                  </span>
                </div>
              )}
              {line.type === 'output' && (
                <div className="output-line">{line.content}</div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="terminal-line output">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="input-form">
            <div className="current-input-line">
              <span className="prompt">masum@dev-terminal:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                className="terminal-input"
                placeholder="Type a command..."
                autoComplete="off"
                spellCheck="false"
              />
              <span className="cursor"></span>
            </div>
          </form>
        </div>
      </div>

      <div className="suggested-commands">
        <div className="suggestions-label">Quick Commands:</div>
        <div className="suggestions-list">
          {suggestedCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleSuggestedCommand(cmd)}
              className="suggestion-button"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoreAboutMe;
