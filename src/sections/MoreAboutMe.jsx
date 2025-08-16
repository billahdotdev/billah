'use client';

import './MoreAboutMe.css';

let activeCard = null;
let dealtCards = [];
let deckPosition = 'stacked';
let isShuffling = false;

const journeyCards = [
  {
    id: 'intro',
    title: 'The Developer',
    type: 'intro',
    content:
      "I'm a web enthusiast, dedicated to bringing digital dreams to life. I'll keep learning, growing, and giving my all with every breath to make the impossible possible.",
    stats: [
      { number: '7+', label: 'Years Experience' },
      { number: '179', label: 'Projects Completed' },
      { number: '119', label: 'Happy Clients' },
    ],
    color: 'emerald',
    pattern: 'dots',
  },
  {
    id: 'story',
    title: 'My Story',
    type: 'story',
    content:
      "I built 'GARMENTIK' to fly, but needed wings. 'Brandotory' gave me those wings, and now I'm building flight paths for others.",
    color: 'purple',
    pattern: 'waves',
  },
  {
    id: 'journey',
    title: 'Learning Odyssey',
    type: 'journey',
    content:
      "I discovered the power of creating digital experiences that impact people's lives. Through years of learning, experimenting, and building, I've developed a deep understanding of the web ecosystem.",
    color: 'blue',
    pattern: 'grid',
  },
  {
    id: 'skills',
    title: 'Skills Arsenal',
    type: 'skills',
    skills: [
      'JavaScript',
      'TypeScript',
      'MongoDB',
      'Express',
      'React',
      'Node',
      'HTML',
      'CSS',
      'TailwindCSS',
      'Material UI',
      'Figma',
      'Inkscape',
      'More +',
    ],
    color: 'orange',
    pattern: 'circuit',
  },
  {
    id: 'education',
    title: 'Credentials',
    type: 'education',
    content:
      "I'm a Bangladesh University of Engineering and Technology (BUET), and IAC Certified full-stack web developer on a journey of modern web mastery at the University of Helsinki. I'm also certified in Machine Learning AI from the National Information Society Agency, South Korea.",
    color: 'indigo',
    pattern: 'hexagon',
  },
];

const dealCard = (cardId) => {
  if (dealtCards.includes(cardId)) return;
  dealtCards.push(cardId);
  activeCard = cardId;
  updateCardPositions();
  updateActiveCardDisplay();
};

const collectCards = () => {
  isShuffling = true;
  const deckArea = document.querySelector('.deck-area');
  if (deckArea) deckArea.classList.add('shuffling');

  setTimeout(() => {
    dealtCards = [];
    activeCard = null;
    deckPosition = 'stacked';
    isShuffling = false;
    updateCardPositions();
    updateActiveCardDisplay();
    if (deckArea) deckArea.classList.remove('shuffling');
  }, 800);
};

const fanOutDeck = () => {
  deckPosition = 'fanned';
  updateCardPositions();
};

const updateCardPositions = () => {
  const cards = document.querySelectorAll('.card-wrapper');
  cards.forEach((card, index) => {
    const cardId = card.dataset.cardId;
    const isDealt = dealtCards.includes(cardId);
    const transform = getCardTransform(index, isDealt, cardId);
    card.style.transform = transform.transform;
    card.style.zIndex = transform.zIndex;
  });
};

const updateActiveCardDisplay = () => {
  const display = document.querySelector('.active-card-display');
  if (activeCard && display) {
    const card = journeyCards.find((c) => c.id === activeCard);
    display.querySelector('.active-card-title').textContent = card.title;
    display.querySelector(
      '.active-card-text'
    ).textContent = `Currently viewing: ${card.title}`;
    display.classList.add('visible');
  } else if (display) {
    display.classList.remove('visible');
  }
};

const getCardTransform = (index, isDealt, cardId) => {
  if (isDealt) {
    const dealtIndex = dealtCards.indexOf(cardId);
    return {
      transform: `translate(${dealtIndex * 60 - dealtCards.length * 30}px, ${
        dealtIndex * -20
      }px) rotate(${dealtIndex * 5 - dealtCards.length * 2.5}deg) scale(${
        activeCard === cardId ? 1.05 : 0.95
      })`,
      zIndex: activeCard === cardId ? 50 : 40 - dealtIndex,
    };
  }

  if (deckPosition === 'fanned') {
    return {
      transform: `translate(${index * 15 - journeyCards.length * 7.5}px, ${
        index * -2
      }px) rotate(${index * 8 - journeyCards.length * 4}deg) scale(1)`,
      zIndex: 30 - index,
    };
  }

  return {
    transform: `translate(${index * 2}px, ${index * -3}px) rotate(${
      index * 1
    }deg) scale(1)`,
    zIndex: 30 - index,
  };
};

const PatternOverlay = ({ pattern }) => {
  const patterns = {
    dots: (
      <div className="pattern-overlay">
        <div className="pattern-dots"></div>
      </div>
    ),
    waves: (
      <div className="pattern-overlay">
        <svg className="pattern-svg" viewBox="0 0 400 400">
          <path
            d="M0,200 Q100,150 200,200 T400,200 L400,400 L0,400 Z"
            fill="white"
          />
          <path
            d="M0,250 Q100,200 200,250 T400,250 L400,400 L0,400 Z"
            fill="white"
          />
        </svg>
      </div>
    ),
    grid: (
      <div className="pattern-overlay">
        <div className="pattern-grid"></div>
      </div>
    ),
    circuit: (
      <div className="pattern-overlay">
        <svg className="pattern-svg" viewBox="0 0 400 400">
          <circle cx="100" cy="100" r="3" fill="white" />
          <circle cx="300" cy="150" r="3" fill="white" />
          <circle cx="200" cy="300" r="3" fill="white" />
          <path
            d="M100,100 L300,150 L200,300"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>
    ),
    hexagon: (
      <div className="pattern-overlay">
        <svg className="pattern-svg" viewBox="0 0 400 400">
          <polygon
            points="200,50 350,125 350,275 200,350 50,275 50,125"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          <polygon
            points="200,100 300,150 300,250 200,300 100,250 100,150"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>
    ),
  };
  return patterns[pattern] || null;
};

const CardDeckAbout = () => {
  setTimeout(() => {
    const container = document.querySelector('.deck-container');
    const header = document.querySelector('.deck-header');
    const controls = document.querySelector('.deck-controls');
    const downloadSection = document.querySelector('.download-section');

    if (container) container.classList.add('visible');
    if (header) header.classList.add('visible');
    if (controls) controls.classList.add('visible');
    if (downloadSection) downloadSection.classList.add('visible');
  }, 100);

  return (
    <div className="deck-container">
      <div className="deck-wrapper">
        <div className="deck-header">
          <h2 className="deck-title">
            The <span className="deck-title-accent">Deck</span>
          </h2>
          <p className="deck-subtitle">Draw a card to explore my journey</p>
        </div>

        <div className="deck-controls">
          <button
            onClick={() => fanOutDeck()}
            className="deck-btn deck-btn-primary"
          >
            Fan Out Deck
          </button>
          <button
            onClick={() => collectCards()}
            className="deck-btn deck-btn-secondary"
          >
            Collect Cards
          </button>
        </div>

        <div className="deck-area">
          {journeyCards.map((card, index) => (
            <div
              key={card.id}
              className="card-wrapper"
              data-card-id={card.id}
              onClick={() => dealCard(card.id)}
            >
              <div className={`card card-${card.color}`}>
                <PatternOverlay pattern={card.pattern} />

                <div className="card-content">
                  <div className="card-header">
                    <h3 className="card-title">{card.title}</h3>
                    <div className="card-number">
                      <span>{index + 1}</span>
                    </div>
                  </div>

                  {card.type === 'intro' && (
                    <div className="card-intro">
                      <p className="card-text">{card.content}</p>
                      <div className="stats-grid">
                        {card.stats.map((stat, statIndex) => (
                          <div key={statIndex} className="stat-item">
                            <div className="stat-number">{stat.number}</div>
                            <div className="stat-label">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {card.type === 'skills' && (
                    <div className="card-skills">
                      <div className="skills-grid">
                        {card.skills.slice(0, 8).map((skill, skillIndex) => (
                          <div key={skillIndex} className="skill-item">
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                      <div className="skills-more">
                        <span>+ {card.skills.length - 8} more</span>
                      </div>
                    </div>
                  )}

                  {(card.type === 'story' ||
                    card.type === 'journey' ||
                    card.type === 'education') && (
                    <div className="card-story">
                      <p className="card-text">{card.content}</p>
                    </div>
                  )}

                  <div className="card-decoration">
                    <div className="decoration-inner"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="active-card-display">
          <div className="active-card-content">
            <h4 className="active-card-title"></h4>
            <p className="active-card-text"></p>
          </div>
        </div>

        <div className="download-section">
          <a href="/MasumBillah-Resume.pdf" download className="download-btn">
            <svg
              className="download-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardDeckAbout;
