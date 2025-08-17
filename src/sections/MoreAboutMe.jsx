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
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    story:
      "🚀 I built 'GARMENTIK' to fly, but needed wings. 'Brandotory' gave me those wings, and now I'm building flight paths for others. Every line of code is a step toward making the impossible possible.",
    journey:
      "💻 My journey began with curiosity and evolved into passion. From debugging my first 'Hello World' to architecting full-stack applications, I've discovered that the best code tells a story - and I'm here to write the next chapter.",
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
      'Docker',
      'AWS',
      'Firebase',
      'Next.js',
      'Vue.js',
      'Python',
      'More +',
    ],
    credentials:
      '🎓 BUET Graduate | IAC Certified Full-Stack Developer | University of Helsinki (Modern Web Development) | ML/AI Certified (National Information Society Agency, South Korea) | Building the future, one commit at a time.',
    projects:
      '🛠️ GARMENTIK (E-commerce Platform) | Brandotory (Digital Agency) | Portfolio Websites | Custom Web Applications | Open Source Contributions',
    contact:
      "📧 Ready to collaborate? Let's build something amazing together! Email: masum@example.com | LinkedIn: /in/masumbillah",
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
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const typeText = (text, callback) => {
    setIsTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        callback(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);
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

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
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
              title="Minimize"
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
              <div className="welcome-text">
                {isMobile
                  ? '👋 Welcome!'
                  : "🚀 Welcome to Masum Billah's Dev Terminal"}
              </div>
              <div className="terminal-info">
                {isMobile
                  ? 'Tap commands below:'
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

            <div className="terminal-input-line">
              <span className="prompt">masum@dev:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyPress={handleKeyPress}
                className="terminal-input"
                placeholder={isMobile ? 'Type here...' : 'Type a command...'}
                disabled={isTyping}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
              />
              <span className={`cursor ${showCursor ? 'visible' : ''}`}>|</span>
            </div>

            <div className="terminal-footer">
              <div className="footer-commands">
                <button
                  className="footer-command help"
                  onClick={() => handleCommandClick('help')}
                >
                  <span className="command-icon">❓</span>
                  help
                </button>
                <button
                  className="footer-command clear"
                  onClick={() => handleCommandClick('clear')}
                >
                  <span className="command-icon">🗑️</span>
                  clear
                </button>
              </div>
              <div className="footer-info">
                <span className="footer-text">
                  Press Enter to execute • Click commands to try
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
