'use client';

import { useState, useRef, useEffect } from 'react';
import './MoreAboutMe.css';

const MoreAboutMe = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const sectionRefs = useRef({});

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const accordionSections = [
    {
      id: 'story',
      title: 'My Story',
      content: {
        text: 'I used to have a clothing business, which taught me a lot about solving problems. While doing that, I discovered a love for coding. The pandemic gave me the perfect chance to put those two things together.',
        highlights: [
          'Founded GARMENTIK - A fashion-tech startup',
          'Co-founded Brandotory - Digital agency',
          'Mentoring aspiring developers',
          'Building innovative web solutions',
        ],
      },
    },
    {
      id: 'journey',
      title: 'My Learning Odyssey',
      content: {
        text: "I discovered the power of creating digital experiences that impact people's lives. Through years of learning, experimenting, and building, I've developed a deep understanding of the web ecosystem. Every project teaches me something new, and I believe in continuous learning and adaptation.",
        highlights: [
          'Self-taught web development fundamentals',
          'Mastered modern JavaScript frameworks',
          'Specialized in full-stack development',
          'Contributed to open-source projects',
        ],
      },
    },
    {
      id: 'skills',
      title: 'My Technical Arsenal',
      content: {
        text: "My technical skills span across the entire web development stack, from crafting pixel-perfect user interfaces to building robust backend systems. I'm passionate about using the right tools for each project and staying updated with the latest technologies.",
        skills: [
          {
            category: 'Frontend',
            items: [
              'JavaScript',
              'TypeScript',
              'React',
              'HTML5',
              'CSS3',
              'TailwindCSS',
            ],
          },
          {
            category: 'Backend',
            items: ['Node.js', 'Express.js', 'MongoDB', 'RESTful APIs'],
          },
          {
            category: 'Tools & Design',
            items: ['Figma', 'Inkscape', 'Git', 'Material UI'],
          },
        ],
      },
    },
    {
      id: 'education',
      title: 'My Credentials',
      content: {
        text: "I'm a IAC and Bangladesh University of Engineering and Technology (BUET) Certified full-stack web developer on a journey of modern web mastery at the University of Helsinki. I'm also certified in Machine Learning AI from the National Information Society Agency, South Korea.",
        credentials: [
          {
            title: 'Bangladesh University of Engineering and Technology (BUET)',
            type: 'Professional Certification',
            status: 'Certified',
          },
          {
            title: 'IAC Certified Full-Stack Web Developer',
            type: 'Professional Certification',
            status: 'Certified',
          },
          {
            title: 'University of Helsinki - Modern Web Development',
            type: 'Specialized Course',
            status: 'In Progress',
          },
          {
            title: 'Machine Learning AI Certification',
            type: 'International Certification',
            status: 'Certified',
            issuer: 'National Information Society Agency, South Korea',
          },
        ],
      },
    },
    {
      id: 'stats',
      title: 'My Impact',
      content: {
        text: 'Numbers tell a story of dedication, growth, and impact. Each project completed and client satisfied represents not just a milestone, but a step forward in my journey of creating meaningful digital experiences.',
        stats: [
          {
            number: '7+',
            label: 'Years Experience',
            description: 'Building web solutions',
          },
          {
            number: '179',
            label: 'Projects Completed',
            description: 'Across various industries',
          },
          {
            number: '119',
            label: 'Happy Clients',
            description: 'Satisfied with results',
          },
          {
            number: '50+',
            label: 'Technologies',
            description: 'Mastered and applied',
          },
        ],
      },
    },
  ];

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const handleKeyDown = (event, sectionId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleSection(sectionId);
    }
  };

  return (
    <div className="more-about-me-accordion">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">More About Me</h2>
          <p className="section-subtitle">
            I'm a web enthusiast, dedicated to bringing digital dreams to life.
            I'll keep learning, growing, and giving my all with every breath to
            make the impossible possible.
          </p>
        </div>

        <div className="accordion-container">
          {accordionSections.map((section, index) => {
            const isActive = activeSection === section.id;

            return (
              <div
                key={section.id}
                className={`accordion-item ${isActive ? 'active' : ''}`}
                style={{ '--item-index': index }}
              >
                <button
                  className="accordion-header"
                  onClick={() => toggleSection(section.id)}
                  onKeyDown={(e) => handleKeyDown(e, section.id)}
                  aria-expanded={isActive}
                  aria-controls={`content-${section.id}`}
                >
                  <div className="accordion-header-content">
                    <h3 className="accordion-title">{section.title}</h3>
                  </div>
                  <div className="accordion-toggle">
                    <span className="toggle-line toggle-line-1"></span>
                    <span className="toggle-line toggle-line-2"></span>
                  </div>
                </button>

                <div
                  className="accordion-content"
                  id={`content-${section.id}`}
                  ref={(el) => (sectionRefs.current[section.id] = el)}
                >
                  <div className="accordion-content-inner">
                    <p className="content-text">{section.content.text}</p>

                    {/* Story highlights */}
                    {section.content.highlights && (
                      <div className="content-highlights">
                        <h4>Key Highlights:</h4>
                        <ul className="highlights-list">
                          {section.content.highlights.map((highlight, idx) => (
                            <li key={idx} className="highlight-item">
                              <span className="highlight-bullet">→</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Skills grid */}
                    {section.content.skills && (
                      <div className="skills-categories">
                        {section.content.skills.map((category, idx) => (
                          <div key={idx} className="skill-category">
                            <h4 className="category-title">
                              {category.category}
                            </h4>
                            <div className="skills-grid">
                              {category.items.map((skill, skillIdx) => (
                                <span key={skillIdx} className="skill-tag">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Credentials */}
                    {section.content.credentials && (
                      <div className="credentials-list">
                        {section.content.credentials.map((credential, idx) => (
                          <div key={idx} className="credential-item">
                            <div className="credential-header">
                              <h4 className="credential-title">
                                {credential.title}
                              </h4>
                              <span
                                className={`credential-status status-${credential.status
                                  .toLowerCase()
                                  .replace(' ', '-')}`}
                              >
                                {credential.status}
                              </span>
                            </div>
                            <p className="credential-type">{credential.type}</p>
                            {credential.issuer && (
                              <p className="credential-issuer">
                                Issued by: {credential.issuer}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    {section.content.stats && (
                      <div className="stats-grid">
                        {section.content.stats.map((stat, idx) => (
                          <div key={idx} className="stat-card">
                            <div className="stat-number">{stat.number}</div>
                            <div className="stat-label">{stat.label}</div>
                            <div className="stat-description">
                              {stat.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="download-section">
          <a
            href="/MasumBillah-Resume.pdf"
            className="btn btn-primary"
            download
            aria-label="Download my resume as PDF"
          >
            <span className="btn-text">Download Resume</span>
            <span className="btn-icon" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MoreAboutMe;
