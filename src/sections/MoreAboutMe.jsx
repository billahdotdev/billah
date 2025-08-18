'use client';

import { useState, useEffect, useRef } from 'react';
import './MoreAboutMe.css';

const MoreAboutMe = () => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    story:
      'I used to have a clothing business, which taught me a lot about solving problems. While doing that, I discovered a love for coding. The pandemic gave me the perfect chance to put those two things together.',
    journey:
      "I discovered the power of creating digital experiences that impact people's lives. Through years of learning, experimenting, and building, I've developed a deep understanding of the web ecosystem.",
    skills: [
      'JavaScript',
      'TypeScript',
      'MongoDB',
      'Express',
      'React',
      'Node.js',
      'HTML5',
      'CSS3',
      'TailwindCSS',
      'Material UI',
      'Figma',
      'Inkscape',
      'Git',
      'More +',
    ],
    credentials: '',
    contact: 'Email: billahdotdev@gmail.com | LinkedIn: /in/billahdotdev',
    help: 'Available commands: story, journey, skills, credentials, projects, contact, clear, help',
    clear: 'CLEAR_TERMINAL',
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTouchDevice(
        'ontouchstart' in window || navigator.maxTouchPoints > 0
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const typeText = (text, callback) => {
    setIsTyping(true);
    let index = 0;
    const speed = isMobile ? 20 : 30; // Faster on mobile for better UX
    const interval = setInterval(() => {
      if (index < text.length) {
        callback(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);
  };

  const executeCommand = (cmd) => {
    const command = cmd.toLowerCase().trim();

    if (command === 'clear') {
      setCommandHistory([]);
      return;
    }

    const newEntry = {
      command: cmd,
      timestamp: new Date().toLocaleTimeString(),
      output: null,
    };

    if (commands[command]) {
      if (command === 'skills') {
        newEntry.output = { type: 'skills', data: commands[command] };
      } else {
        newEntry.output = { type: 'text', data: commands[command] };
      }
    } else {
      newEntry.output = {
        type: 'error',
        data: `❌ Command '${cmd}' not found. Type 'help' for available commands.`,
      };
    }

    setCommandHistory((prev) => [...prev, newEntry]);

    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTo({
          top: terminalRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  const handleCommandClick = (cmd) => {
    // Add haptic feedback on touch devices
    if (isTouchDevice && navigator.vibrate) {
      navigator.vibrate(50);
    }

    setCurrentCommand(cmd);
    executeCommand(cmd);
    setCurrentCommand('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (currentCommand.trim()) {
        executeCommand(currentCommand);
        setCurrentCommand('');
      }
    }
  };

  const handleTerminalClick = (e) => {
    // Prevent focus on mobile when clicking command buttons
    if (
      e.target.closest('.command-suggestion') ||
      e.target.closest('.footer-command')
    ) {
      return;
    }

    if (inputRef.current && !isMobile) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  return (
    <div className="more-about-section">
      <div className="container">
        <h2 className="section-title">
          <span className="title-text">More About Me</span>
          <span className="title-subtitle">Interactive Developer Terminal</span>
        </h2>
      </div>

      <div className={`terminal-container ${isMinimized ? 'minimized' : ''}`}>
        <div className="terminal-header">
          <div className="terminal-controls">
            <button
              className="control-dot red"
              onClick={() => setIsMinimized(!isMinimized)}
              title={isMinimized ? 'Expand' : 'Minimize'}
              aria-label={isMinimized ? 'Expand terminal' : 'Minimize terminal'}
            ></button>
            <span className="control-dot yellow"></span>
            <span className="control-dot green"></span>
          </div>
          <div className="terminal-title">
            {isMobile ? "Masum's Terminal" : "Masum Billah's Dev Terminal"}
          </div>
          <div className="terminal-status">
            <span className="status-dot"></span>
            <span className="status-text">Online</span>
          </div>
        </div>

        {!isMinimized && (
          <div
            className="terminal-body"
            ref={terminalRef}
            onClick={handleTerminalClick}
          >
            <div className="terminal-welcome">
              <div className="terminal-info">
                {isMobile
                  ? 'Tap commands below to explore:'
                  : 'Type a command or click on the suggestions below:'}
              </div>
            </div>

            <div className="command-suggestions">
              <div className="suggestions-title">💡 Quick Commands:</div>
              <div className="suggestions-grid">
                {Object.keys(commands)
                  .filter((cmd) => cmd !== 'help' && cmd !== 'clear')
                  .map((cmd) => (
                    <button
                      key={cmd}
                      className="command-suggestion"
                      onClick={() => handleCommandClick(cmd)}
                      title={`Execute ${cmd} command`}
                      aria-label={`Execute ${cmd} command`}
                    >
                      <span className="command-prompt">&gt;</span>
                      <span className="command-name">{cmd}</span>
                    </button>
                  ))}
              </div>
            </div>

            <div className="terminal-history">
              {commandHistory.map((entry, index) => (
                <div key={index} className="history-entry">
                  <div className="command-line">
                    <span className="prompt">masum@dev:~$</span>
                    <span className="command">{entry.command}</span>
                    <span className="timestamp">[{entry.timestamp}]</span>
                  </div>

                  {entry.output && (
                    <div className="command-output">
                      {entry.output.type === 'error' ? (
                        <div className="error-output">{entry.output.data}</div>
                      ) : entry.output.type === 'skills' ? (
                        <div className="skills-output">
                          <div className="skills-grid">
                            {entry.output.data.map((skill, i) => (
                              <span key={i} className="skill-tag">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-output">{entry.output.data}</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!isMobile && (
              <div className="terminal-input-line">
                <span className="prompt">masum@dev:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="terminal-input"
                  placeholder="Type a command..."
                  disabled={isTyping}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  aria-label="Terminal command input"
                />
                <span className={`cursor ${showCursor ? 'visible' : ''}`}>
                  |
                </span>
              </div>
            )}

            <div className="terminal-footer">
              <div className="footer-commands">
                <button
                  className="footer-command help"
                  onClick={() => handleCommandClick('help')}
                  aria-label="Show help"
                >
                  <span className="command-icon">❓</span>
                  help
                </button>
                <button
                  className="footer-command clear"
                  onClick={() => handleCommandClick('clear')}
                  aria-label="Clear terminal"
                >
                  <span className="command-icon">🗑️</span>
                  clear
                </button>
              </div>
              <div className="footer-info">
                <span className="footer-text">
                  {isMobile
                    ? 'Tap commands to explore'
                    : 'Press Enter to execute • Click commands to try'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreAboutMe;
