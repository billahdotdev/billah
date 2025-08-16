'use client';

import { useState, useEffect, useRef } from 'react';
import './MoreAboutMe.css';

const MoreAbout = () => {
  const [activeTerminal, setActiveTerminal] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [scanlinePosition, setScanlinePosition] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [commandOutput, setCommandOutput] = useState('');
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const [activeCommandCategory, setActiveCommandCategory] =
    useState('navigation');
  const [showCommandPalette, setShowCommandPalette] = useState(true);
  const [commandBuilder, setCommandBuilder] = useState([]);
  const [isCommandMode, setIsCommandMode] = useState(false);
  const inputRef = useRef(null);

  const commandCategories = {
    navigation: {
      name: 'Navigation',
      icon: '🧭',
      color: '#00ff88',
      commands: [
        { cmd: 'ls', desc: 'List files', icon: '📁', params: [] },
        {
          cmd: 'cd',
          desc: 'Change directory',
          icon: '📂',
          params: ['directory'],
        },
        { cmd: 'pwd', desc: 'Current location', icon: '📍', params: [] },
        { cmd: 'tree', desc: 'Directory tree', icon: '🌳', params: [] },
      ],
    },
    files: {
      name: 'File Operations',
      icon: '📄',
      color: '#00aaff',
      commands: [
        { cmd: 'cat', desc: 'Read file', icon: '👁️', params: ['filename'] },
        { cmd: 'find', desc: 'Search files', icon: '🔍', params: ['query'] },
        {
          cmd: 'grep',
          desc: 'Search content',
          icon: '🔎',
          params: ['pattern'],
        },
        { cmd: 'echo', desc: 'Display text', icon: '💬', params: ['text'] },
      ],
    },
    system: {
      name: 'System Info',
      icon: '⚙️',
      color: '#ff6b00',
      commands: [
        { cmd: 'whoami', desc: 'User info', icon: '👤', params: [] },
        { cmd: 'ps', desc: 'Processes', icon: '⚡', params: [] },
        { cmd: 'top', desc: 'System stats', icon: '📊', params: [] },
        { cmd: 'uptime', desc: 'System uptime', icon: '⏰', params: [] },
      ],
    },
    personal: {
      name: 'About Me',
      icon: '👨‍💻',
      color: '#ff0088',
      commands: [
        { cmd: 'skills', desc: 'Technical skills', icon: '🛠️', params: [] },
        { cmd: 'projects', desc: 'My projects', icon: '🚀', params: [] },
        { cmd: 'contact', desc: 'Contact info', icon: '📧', params: [] },
        { cmd: 'status', desc: 'Current status', icon: '📈', params: [] },
      ],
    },
    utilities: {
      name: 'Utilities',
      icon: '🔧',
      color: '#aa00ff',
      commands: [
        { cmd: 'help', desc: 'Show help', icon: '❓', params: [] },
        { cmd: 'history', desc: 'Command history', icon: '📜', params: [] },
        { cmd: 'clear', desc: 'Clear screen', icon: '🧹', params: [] },
        { cmd: 'date', desc: 'Current date', icon: '📅', params: [] },
      ],
    },
  };

  const quickActions = [
    { name: 'About Me', commands: ['whoami', 'skills', 'contact'], icon: '👋' },
    {
      name: 'Explore Files',
      commands: ['ls', 'tree', 'cat story'],
      icon: '🗂️',
    },
    { name: 'System Check', commands: ['ps', 'top', 'uptime'], icon: '🔍' },
    {
      name: 'Find Skills',
      commands: ['find javascript', 'grep react', 'cat skills'],
      icon: '💡',
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fileSystem = {
    '~': {
      type: 'directory',
      files: ['story', 'journey', 'skills', 'education', 'projects', 'contact'],
      description: 'Home directory',
    },
    '~/story': {
      type: 'file',
      content:
        "I built 'GARMENTIK' to fly, but needed wings. 'Brandotory' gave me those wings, and now I'm building flight paths for others.",
      size: '2.1KB',
    },
    '~/journey': {
      type: 'file',
      content:
        "I discovered the power of creating digital experiences that impact people's lives. Through years of learning, experimenting, and building, I've developed a deep understanding of the web ecosystem.",
      size: '3.4KB',
    },
    '~/skills': {
      type: 'file',
      content:
        'JavaScript, Typescript, MongoDB, Express, React, Node, HTML, CSS, TailwindCSS, Material UI, Figma, Inkscape, More +',
      size: '1.8KB',
    },
    '~/education': {
      type: 'file',
      content:
        "I'm a Bangladesh University of Engineering and Technology (BUET), and IAC Certified full-stack web developer on a journey of modern web mastery at the University of Helsinki. I'm also certified in Machine Learning AI from the National Information Society Agency, South Korea.",
      size: '4.2KB',
    },
    '~/projects': {
      type: 'directory',
      files: ['garmentik', 'brandotory', 'portfolio', 'ai-tools'],
      description: 'Projects directory',
    },
    '~/contact': {
      type: 'file',
      content:
        'Email: contact@masumbillah.dev\nLinkedIn: /in/masumbillah\nGitHub: /masumbillah\nPortfolio: masumbillah.dev',
      size: '0.8KB',
    },
  };

  const terminals = [
    {
      id: 'story',
      title: 'PERSONAL_LOG.txt',
      prompt: 'user@masum:~/story$',
      content:
        "I built 'GARMENTIK' to fly, but needed wings. 'Brandotory' gave me those wings, and now I'm building flight paths for others.",
      type: 'log',
    },
    {
      id: 'journey',
      title: 'LEARNING_ODYSSEY.md',
      prompt: 'user@masum:~/journey$',
      content:
        "I discovered the power of creating digital experiences that impact people's lives. Through years of learning, experimenting, and building, I've developed a deep understanding of the web ecosystem.",
      type: 'markdown',
    },
    {
      id: 'skills',
      title: 'TECH_STACK.json',
      prompt: 'user@masum:~/skills$',
      content:
        'JavaScript, Typescript, MongoDB, Express, React, Node, HTML, CSS, TailwindCSS, Material UI, Figma, Inkscape, More +',
      type: 'json',
    },
    {
      id: 'education',
      title: 'CREDENTIALS.cert',
      prompt: 'user@masum:~/education$',
      content:
        "I'm a Bangladesh University of Engineering and Technology (BUET), and IAC Certified full-stack web developer on a journey of modern web mastery at the University of Helsinki. I'm also certified in Machine Learning AI from the National Information Society Agency, South Korea.",
      type: 'cert',
    },
    {
      id: 'projects',
      title: 'PROJECTS_FOLDER',
      prompt: 'user@masum:~/projects$',
      content: 'garmentik, brandotory, portfolio, ai-tools',
      type: 'directory',
    },
    {
      id: 'contact',
      title: 'CONTACT_INFO.txt',
      prompt: 'user@masum:~/contact$',
      content:
        'Email: contact@masumbillah.dev\nLinkedIn: /in/masumbillah\nGitHub: /masumbillah\nPortfolio: masumbillah.dev',
      type: 'file',
    },
  ];

  // ... existing useEffect hooks ...

  useEffect(() => {
    const savedTheme = localStorage.getItem('terminal-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('terminal-theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode ? 'dark' : 'light'
    );
  }, [isDarkMode]);

  useEffect(() => {
    if (isTyping) {
      const text = terminals[activeTerminal].content;
      let index = 0;
      setTypingText('');

      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setTypingText(text.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(typeInterval);
        }
      }, 30);

      return () => clearInterval(typeInterval);
    }
  }, [isTyping, activeTerminal, terminals]);

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanlinePosition((prev) => (prev + 1) % 100);
    }, 100);

    return () => clearInterval(scanInterval);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  const executeCommand = (commandObj, params = []) => {
    const fullCommand =
      params.length > 0
        ? `${commandObj.cmd} ${params.join(' ')}`
        : commandObj.cmd;
    processCommand(fullCommand);
    setCommandBuilder([]);
  };

  const executeQuickAction = (action) => {
    action.commands.forEach((cmd, index) => {
      setTimeout(() => {
        processCommand(cmd);
      }, index * 1000);
    });
  };

  const addToCommandBuilder = (commandObj) => {
    setCommandBuilder((prev) => [...prev, commandObj]);
  };

  // ... existing processCommand function ...

  const processCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const [command, ...args] = trimmedCmd.split(' ');
    const lowerCommand = command.toLowerCase();

    let output = '';

    switch (lowerCommand) {
      case 'help':
        output = `Available commands:\n${Object.values(commandCategories)
          .flatMap((cat) =>
            cat.commands.map((c) => `  ${c.cmd.padEnd(15)} - ${c.desc}`)
          )
          .join(
            '\n'
          )}\n\nTip: Use the visual command palette or type commands directly`;
        break;

      case 'ls':
        const currentPath = currentDirectory === '~' ? '~' : currentDirectory;
        const currentItem = fileSystem[currentPath];
        if (currentItem && currentItem.type === 'directory') {
          output = currentItem.files
            .map((file) => {
              const filePath =
                currentPath === '~' ? `~/${file}` : `${currentPath}/${file}`;
              const fileItem = fileSystem[filePath];
              const type = fileItem?.type === 'directory' ? 'DIR' : 'FILE';
              const size = fileItem?.size || '1.0KB';
              return `${file.padEnd(20)} ${type.padEnd(8)} ${size}`;
            })
            .join('\n');
        } else {
          output = 'No files found in current directory';
        }
        break;

      case 'cat':
        if (args.length === 0) {
          output =
            "cat: missing file operand\nTry 'cat [filename]' or 'help' for more information.";
        } else {
          const filename = args[0];
          const filePath = filename.startsWith('~/')
            ? filename
            : `${currentDirectory}/${filename}`;
          const file = fileSystem[filePath];
          if (file && file.type === 'file') {
            output = file.content;
            const terminalIndex = terminals.findIndex(
              (t) =>
                t.id === filename || t.title.toLowerCase().includes(filename)
            );
            if (terminalIndex !== -1) {
              setActiveTerminal(terminalIndex);
            }
          } else {
            output = `cat: ${filename}: No such file or directory`;
          }
        }
        break;

      case 'cd':
        if (args.length === 0) {
          setCurrentDirectory('~');
          output = 'Changed to home directory';
        } else {
          const targetDir = args[0] === '~' ? '~' : `~/${args[0]}`;
          if (
            fileSystem[targetDir] &&
            fileSystem[targetDir].type === 'directory'
          ) {
            setCurrentDirectory(targetDir);
            output = `Changed directory to ${targetDir}`;
          } else {
            output = `cd: ${args[0]}: No such file or directory`;
          }
        }
        break;

      case 'pwd':
        output = currentDirectory;
        break;

      case 'whoami':
        output =
          'Masum Billah - Full Stack Web Developer\nLocation: Bangladesh\nExperience: 7+ years\nStatus: Available for projects';
        break;

      case 'skills':
        output =
          'Technical Skills:\n• Frontend: React, JavaScript, TypeScript, HTML, CSS\n• Backend: Node.js, Express, MongoDB\n• Tools: Figma, TailwindCSS, Material UI\n• Other: Machine Learning, AI Integration';
        break;

      case 'contact':
        output =
          'Contact Information:\n• Email: contact@masumbillah.dev\n• LinkedIn: /in/masumbillah\n• GitHub: /masumbillah\n• Portfolio: masumbillah.dev';
        break;

      case 'projects':
        output =
          'Recent Projects:\n• GARMENTIK - E-commerce Platform\n• Brandotory - Digital Agency Website\n• Portfolio Terminal - Interactive Resume\n• 179+ completed projects total';
        break;

      case 'clear':
        setCommandHistory([]);
        setCommandOutput('');
        return;

      case 'history':
        output = commandHistory
          .map(
            (item, index) =>
              `${(index + 1).toString().padStart(4)} ${item.command}`
          )
          .join('\n');
        break;

      case 'ps':
        output = `PID    COMMAND\n1234   terminal-interface\n1235   file-explorer\n1236   command-processor\n1237   theme-manager\n1238   animation-engine`;
        break;

      case 'top':
        output = `Tasks: 5 total, 1 running, 4 sleeping\nCPU usage: ${Math.floor(
          Math.random() * 30 + 10
        )}%\nMemory usage: ${Math.floor(
          Math.random() * 40 + 30
        )}%\nUptime: ${Math.floor(Math.random() * 24)}h ${Math.floor(
          Math.random() * 60
        )}m`;
        break;

      case 'uptime':
        output = `${Math.floor(Math.random() * 24)}:${Math.floor(
          Math.random() * 60
        )
          .toString()
          .padStart(2, '0')} up ${Math.floor(
          Math.random() * 30
        )} days, ${Math.floor(
          Math.random() * 24
        )} hours, load average: 0.${Math.floor(Math.random() * 99)}`;
        break;

      case 'date':
        output = new Date().toString();
        break;

      case 'tree':
        output = `${currentDirectory}/\n├── story (PERSONAL_LOG.txt)\n├── journey (LEARNING_ODYSSEY.md)\n├── skills (TECH_STACK.json)\n├── education (CREDENTIALS.cert)\n├── projects/\n│   ├── garmentik\n│   ├── brandotory\n│   └── portfolio\n└── contact (CONTACT_INFO.txt)`;
        break;

      case 'find':
        if (args.length === 0) {
          output = 'find: missing search query\nUsage: find [query]';
        } else {
          const query = args.join(' ').toLowerCase();
          const results = [];
          Object.keys(fileSystem).forEach((path) => {
            if (
              path.toLowerCase().includes(query) ||
              (fileSystem[path].content &&
                fileSystem[path].content.toLowerCase().includes(query))
            ) {
              results.push(path);
            }
          });
          output =
            results.length > 0
              ? results.join('\n')
              : `No results found for '${query}'`;
        }
        break;

      case 'grep':
        if (args.length === 0) {
          output = 'grep: missing pattern\nUsage: grep [pattern]';
        } else {
          const pattern = args.join(' ').toLowerCase();
          const results = [];
          Object.keys(fileSystem).forEach((path) => {
            const file = fileSystem[path];
            if (file.content && file.content.toLowerCase().includes(pattern)) {
              results.push(`${path}: ${file.content.substring(0, 100)}...`);
            }
          });
          output =
            results.length > 0
              ? results.join('\n')
              : `No matches found for '${pattern}'`;
        }
        break;

      case 'echo':
        output = args.join(' ');
        break;

      case 'status':
        output = `System Status: ONLINE\nUptime: ${Math.floor(
          Math.random() * 100
        )}h ${Math.floor(Math.random() * 60)}m\nMemory Usage: ${Math.floor(
          Math.random() * 40 + 30
        )}%\nCPU Usage: ${Math.floor(
          Math.random() * 20 + 10
        )}%\nDirectory: ${currentDirectory}`;
        break;

      default:
        output = `Command '${command}' not found. Try using the visual command palette or type 'help' for available commands.`;
    }

    const newHistoryItem = {
      command: trimmedCmd,
      output: output,
      timestamp: new Date().toLocaleTimeString(),
      directory: currentDirectory,
    };

    setCommandHistory((prev) => [...prev, newHistoryItem]);
    setCommandOutput(output);
  };

  const handleTerminalClick = (index) => {
    if (index !== activeTerminal) {
      setActiveTerminal(index);
      setIsTyping(true);
      if (isMobile) {
        setTimeout(() => {
          document.querySelector('.terminal-display')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 100);
      }
    }
  };

  const formatSkillsAsJson = (skillsString) => {
    const skills = skillsString.split(',').map((skill) => skill.trim());
    return skills.map((skill, index) => (
      <div key={index} className="json-line">
        <span className="json-key">
          "{skill.toLowerCase().replace(/\s+/g, '_')}"
        </span>
        <span className="json-colon">:</span>
        <span className="json-value">"{skill}"</span>
        {index < skills.length - 1 && <span className="json-comma">,</span>}
      </div>
    ));
  };

  const renderTerminalContent = () => {
    const terminal = terminals[activeTerminal];
    const displayText = isTyping ? typingText : terminal.content;

    if (terminal.type === 'json' && terminal.id === 'skills') {
      return (
        <div className="terminal-content json-content">
          <div className="json-bracket">{'{'}</div>
          <div className="json-object">
            <div className="json-line">
              <span className="json-key">"technologies"</span>
              <span className="json-colon">:</span>
              <span className="json-bracket"> [</span>
            </div>
            <div className="json-array">
              {isTyping ? (
                <div className="json-line">
                  <span className="json-value">"{typingText}"</span>
                  <span className="cursor">|</span>
                </div>
              ) : (
                formatSkillsAsJson(terminal.content)
              )}
            </div>
            <div className="json-line">
              <span className="json-bracket">]</span>
            </div>
          </div>
          <div className="json-bracket">{'}'}</div>
        </div>
      );
    }

    return (
      <div className="terminal-content">
        <div className="terminal-text">
          {displayText}
          {isTyping && <span className="cursor">|</span>}
        </div>
      </div>
    );
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (commandInput.trim()) {
      processCommand(commandInput);
      setCommandInput('');
    }
  };

  return (
    <div
      className={`more-about-me ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
    >
      <div className="container">
        <div className="section-header">
          <div className="header-top">
            <h2 className="section-title">
              <span className="title-bracket">[</span>
              <span className="title-text">INTERACTIVE_TERMINAL</span>
              <span className="title-bracket">]</span>
            </h2>
            <div className="header-controls">
              <button
                className={`mode-toggle ${isCommandMode ? 'active' : ''}`}
                onClick={() => setIsCommandMode(!isCommandMode)}
              >
                <span className="mode-icon">{isCommandMode ? '⌨️' : '🎮'}</span>
                <span className="mode-text">
                  {isCommandMode ? 'TEXT' : 'VISUAL'}
                </span>
              </button>
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <span className="theme-icon">{isDarkMode ? '☀️' : '🌙'}</span>
                <span className="theme-text">
                  {isDarkMode ? 'LIGHT' : 'DARK'}
                </span>
              </button>
            </div>
          </div>
          <div className="system-info">
            <div className="system-line">
              <span className="system-label">MODE:</span>
              <span className="system-value">
                {isCommandMode ? 'COMMAND_LINE' : 'VISUAL_INTERFACE'}
              </span>
            </div>
            <div className="system-line">
              <span className="system-label">STATUS:</span>
              <span className="system-value status-online">INTERACTIVE</span>
            </div>
            <div className="system-line">
              <span className="system-label">DEVICE:</span>
              <span className="system-value">
                {isMobile ? 'MOBILE' : 'DESKTOP'}
              </span>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <div className="quick-actions-header">
            <span className="quick-icon">⚡</span>
            <span className="quick-title">QUICK_ACTIONS</span>
          </div>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="quick-action-card"
                onClick={() => executeQuickAction(action)}
              >
                <div className="quick-action-icon">{action.icon}</div>
                <div className="quick-action-name">{action.name}</div>
                <div className="quick-action-commands">
                  {action.commands.slice(0, 2).map((cmd, i) => (
                    <span key={i} className="quick-command">
                      {cmd}
                    </span>
                  ))}
                  {action.commands.length > 2 && (
                    <span className="quick-more">
                      +{action.commands.length - 2}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`terminal-interface ${glitchActive ? 'glitch' : ''} ${
            isMobile ? 'mobile-mode' : ''
          }`}
        >
          <div className="terminal-header">
            <div className="terminal-controls">
              <div className="control-button close"></div>
              <div className="control-button minimize"></div>
              <div className="control-button maximize"></div>
            </div>
            <div className="terminal-title">VISUAL_COMMAND_TERMINAL</div>
            <div className="terminal-status">
              <div className="status-indicator"></div>
              <span>READY</span>
            </div>
          </div>

          <div className="terminal-body">
            {!isCommandMode && (
              <div className="command-palette">
                <div className="command-categories">
                  {Object.entries(commandCategories).map(([key, category]) => (
                    <button
                      key={key}
                      className={`category-tab ${
                        activeCommandCategory === key ? 'active' : ''
                      }`}
                      onClick={() => setActiveCommandCategory(key)}
                      style={{ '--category-color': category.color }}
                    >
                      <span className="category-icon">{category.icon}</span>
                      <span className="category-name">
                        {isMobile ? category.name.split(' ')[0] : category.name}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="command-grid">
                  {commandCategories[activeCommandCategory].commands.map(
                    (command, index) => (
                      <div
                        key={index}
                        className="command-card"
                        onClick={() => executeCommand(command)}
                        style={{
                          '--command-color':
                            commandCategories[activeCommandCategory].color,
                        }}
                      >
                        <div className="command-card-header">
                          <span className="command-icon">{command.icon}</span>
                          <span className="command-name">{command.cmd}</span>
                        </div>
                        <div className="command-description">
                          {command.desc}
                        </div>
                        {command.params.length > 0 && (
                          <div className="command-params">
                            {command.params.map((param, i) => (
                              <span key={i} className="param-tag">
                                {param}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="command-execute">
                          <span>EXECUTE</span>
                          <span className="execute-arrow">→</span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {isCommandMode && (
              <div className="traditional-terminal">
                <div className="command-input-section">
                  <form onSubmit={handleCommandSubmit} className="command-form">
                    <div className="input-line">
                      <span className="prompt-text">
                        user@masum:{currentDirectory}$
                      </span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={commandInput}
                        onChange={(e) => setCommandInput(e.target.value)}
                        className="command-input"
                        placeholder="Type a command... (try 'help')"
                        autoComplete="off"
                        spellCheck="false"
                      />
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="terminal-display">
              {commandHistory.length > 0 && (
                <div className="command-history">
                  {commandHistory.slice(-5).map((item, index) => (
                    <div key={index} className="history-item">
                      <div className="history-command">
                        <span className="prompt-text">
                          user@masum:{item.directory}$
                        </span>
                        <span className="command-text">{item.command}</span>
                        <span className="command-time">[{item.timestamp}]</span>
                      </div>
                      <div className="history-output">{item.output}</div>
                    </div>
                  ))}
                </div>
              )}

              {!commandHistory.length && (
                <div className="welcome-message">
                  <div className="welcome-header">
                    <span className="welcome-icon">👋</span>
                    <span className="welcome-text">
                      Welcome to Interactive Terminal
                    </span>
                  </div>
                  <div className="welcome-content">
                    <p>Choose your interaction style:</p>
                    <ul>
                      <li>
                        <strong>Visual Mode:</strong> Click command cards above
                      </li>
                      <li>
                        <strong>Command Mode:</strong> Type traditional commands
                      </li>
                      <li>
                        <strong>Quick Actions:</strong> Execute command
                        sequences
                      </li>
                    </ul>
                    <p>
                      Try clicking a Quick Action or switch to Command Mode!
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="terminal-footer">
              <div className="footer-info">
                <span>PWD: {currentDirectory}</span>
                <span>Commands: {commandHistory.length}</span>
                <span>Mode: {isCommandMode ? 'CLI' : 'GUI'}</span>
              </div>
            </div>
          </div>

          <div
            className="scanline"
            style={{ top: `${scanlinePosition}%` }}
          ></div>
        </div>

        <div className="system-command">
          <div className="command-line">
            <span className="command-prompt">user@masum:~$</span>
            <span className="command-text">
              {isMobile
                ? 'download resume.pdf'
                : 'download --file="resume.pdf" --target="local"'}
            </span>
          </div>
          <a
            href="/MasumBillah-Resume.pdf"
            className="download-button"
            download
          >
            <span className="button-icon">⬇</span>
            <span className="button-text">
              {isMobile ? 'DOWNLOAD' : 'EXECUTE_DOWNLOAD'}
            </span>
            <span className="button-status">[READY]</span>
          </a>
        </div>

        <div className="system-message">
          <div className="message-header">
            <span className="message-icon">💭</span>
            <span className="message-title">PERSONAL_PHILOSOPHY.txt</span>
          </div>
          <div className="message-content">
            "I'm a web enthusiast, dedicated to bringing digital dreams to life.
            I'll keep learning, growing, and giving my all with every breath to
            make the impossible possible."
          </div>
          <div className="message-signature">
            <span>-- Masum Billah</span>
            <span className="timestamp">[{new Date().toLocaleString()}]</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreAbout;
