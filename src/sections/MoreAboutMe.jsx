'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MoreAboutMe.css';

const MoreAboutMe = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);
  const [touchFeedback, setTouchFeedback] = useState(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const journeyItems = [
    {
      id: 'story',
      title: 'My Story',
      content:
        "I built 'GARMENTIK' to fly, but needed wings. 'Brandotory' gave me those wings, and now I'm building flight paths for others.",
    },
    {
      id: 'journey',
      title: 'My Learning Odyssey',
      content:
        "I discovered the power of creating digital experiences that impact people's lives. Through years of learning, experimenting, and building, I've developed a deep understanding of the web ecosystem.",
    },
    {
      id: 'skills',
      title: 'My Skills',
      content:
        'JavaScript, Typescript, MongoDB, Express, React, Node, HTML, CSS, TailwindCSS, Material UI, Figma, Inkscape, More +',
    },
    {
      id: 'education',
      title: 'My Credentials',
      content:
        "I'm a Bangladesh University of Engineering and Technology (BUET), and IAC Certified full-stack web developer on a journey of modern web mastery at the University of Helsinki. I'm also certified in Machine Learning AI from the National Information Society Agency, South Korea.",
    },
  ];

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Measure content height to adjust container dynamically
  useEffect(() => {
    if (contentRef.current) {
      const updateHeight = () => {
        const height = contentRef.current.scrollHeight;
        setContentHeight(height);
      };

      // Use ResizeObserver for more reliable size detection
      if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(updateHeight);
        resizeObserver.observe(contentRef.current);
        return () => resizeObserver.disconnect();
      } else {
        // Fallback for browsers without ResizeObserver
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
      }
    }
  }, [activeIndex]);

  // Animate progress when active index changes
  useEffect(() => {
    setAnimateProgress(true);
    const timer = setTimeout(() => setAnimateProgress(false), 600);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  // Auto-advance slides with pause on hover
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      if (activeIndex < journeyItems.length - 1) {
        setDirection(1);
        setActiveIndex((prev) => prev + 1);
      } else {
        setDirection(-1);
        setActiveIndex(0);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [activeIndex, isHovering, journeyItems.length]);

  const handleNext = useCallback(() => {
    if (activeIndex < journeyItems.length - 1) {
      setDirection(1);
      setActiveIndex((prev) => prev + 1);
    } else {
      // Loop back to the first slide
      setDirection(-1);
      setActiveIndex(0);
    }
  }, [activeIndex, journeyItems.length]);

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex((prev) => prev - 1);
    } else {
      // Loop to the last slide
      setDirection(1);
      setActiveIndex(journeyItems.length - 1);
    }
  }, [activeIndex, journeyItems.length]);

  const handleTouchStart = (e) => {
    // Don't initiate drag if we're touching a scrollable content area or interactive element
    if (
      e.target.closest('.minimal-journey-item-content') ||
      e.target.closest('button') ||
      e.target.tagName === 'A'
    )
      return;

    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setScrollY(0);
    setTouchFeedback(null);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;
    setScrollY(diff);

    // Visual feedback for swipe direction
    if (diff > 30) {
      setTouchFeedback('up');
    } else if (diff < -30) {
      setTouchFeedback('down');
    } else {
      setTouchFeedback(null);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);
    if (scrollY > 70) {
      handlePrev();
    } else if (scrollY < -70) {
      handleNext();
    }
    setScrollY(0);
    setTouchFeedback(null);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        handleNext();
      } else if (e.key === 'ArrowUp') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Animation variants
  const contentVariants = {
    initial: (direction) => ({
      y: isReducedMotion ? 0 : direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      y: isReducedMotion ? 0 : direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  // Split skills into array for the skills section
  const skillsArray = journeyItems[2].content
    .split(',')
    .map((skill) => skill.trim());

  return (
    <div className="more-about-me">
      <div className="container">
        <motion.h2
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          More About Me
        </motion.h2>

        {/* About Content Section */}
        <div className="about-content">
          <motion.div
            className="about-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <p>
              I'm a web enthusiast, dedicated to bringing digital dreams to
              life. I'll keep learning, growing, and giving my all with every
              breath to make the impossible possible.
            </p>

            <div className="about-stats">
              <motion.div
                className="stat-item hover-target"
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="stat-number">7+</span>
                <span className="stat-label">Years Experience</span>
              </motion.div>

              <motion.div
                className="stat-item hover-target"
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="stat-number">179</span>
                <span className="stat-label">Projects Completed</span>
              </motion.div>

              <motion.div
                className="stat-item hover-target"
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="stat-number">119</span>
                <span className="stat-label">Happy Clients</span>
              </motion.div>
            </div>

            <div className="about-buttons">
              <motion.a
                href="/MasumBillah-Resume.pdf"
                className="btn hover-target"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Interactive Journey Section */}
        <div
          className={`journey-container ${
            touchFeedback ? `swipe-${touchFeedback}` : ''
          } ${isDragging ? 'is-dragging' : ''}`}
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.h3
            className="journey-main-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            My Journey
          </motion.h3>

          <div className="journey-navigation">
            <div className="journey-progress">
              {journeyItems.map((_, index) => (
                <button
                  key={index}
                  className={`journey-progress-item ${
                    index === activeIndex ? 'active' : ''
                  } ${index < activeIndex ? 'completed' : ''}`}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : 'false'}
                >
                  <span className="journey-progress-line"></span>
                  <span className="journey-progress-dot"></span>
                  <span className="journey-progress-label">
                    {journeyItems[index].title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="journey-sections-container" aria-live="polite">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                className={`journey-section journey-section-${activeIndex}`}
                ref={contentRef}
                custom={direction}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  y: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                }}
                role="tabpanel"
              >
                <div className="section-background">
                  <div className="section-pattern"></div>
                </div>

                <div className="section-content">
                  <div className="section-header">
                    <motion.div
                      className="section-number"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                    >
                      {(activeIndex + 1).toString().padStart(2, '0')}
                    </motion.div>

                    <motion.h4
                      className="section-title"
                      initial={{ y: isReducedMotion ? 0 : 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                    >
                      {journeyItems[activeIndex].title}
                    </motion.h4>
                  </div>

                  <motion.div
                    className="section-body"
                    initial={{ y: isReducedMotion ? 0 : 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {activeIndex === 2 ? (
                      <div className="skills-grid">
                        {skillsArray.map((skill, i) => (
                          <motion.div
                            key={i}
                            className="skill-tag"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.2 + i * 0.05,
                              duration: 0.4,
                            }}
                            whileHover={{
                              y: -5,
                              transition: { duration: 0.2 },
                            }}
                            whileTap={{
                              scale: 0.95,
                              transition: { duration: 0.1 },
                            }}
                          >
                            {skill}
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <p className="section-text">
                        {journeyItems[activeIndex].content}
                      </p>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="journey-controls">
            <motion.button
              className="journey-control"
              onClick={handlePrev}
              whileHover={{
                y: -3,
                x: -3,
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
              aria-label="Previous slide"
            >
              <span className="control-arrow">←</span>
              <span className="control-text">Prev</span>
            </motion.button>

            <div className="journey-indicator" aria-hidden="true">
              <span
                className={`indicator-current ${
                  animateProgress ? 'animate' : ''
                }`}
              >
                {activeIndex + 1}
              </span>
              <span className="indicator-separator">/</span>
              <span className="indicator-total">{journeyItems.length}</span>
            </div>

            <motion.button
              className="journey-control"
              onClick={handleNext}
              whileHover={{
                y: -3,
                x: 3,
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
              aria-label="Next slide"
            >
              <span className="control-text">Next</span>
              <span className="control-arrow">→</span>
            </motion.button>
          </div>

          <div className="touch-feedback-indicator">
            <div className="touch-arrow up-arrow">↑</div>
            <div className="touch-arrow down-arrow">↓</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreAboutMe;
