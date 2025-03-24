"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./MoreAboutMe.css"

const MinimalJourney = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  const journeyItems = [
    {
      id: "story",
      title: "My Story",
      content:
        "I built 'GARMENTIK' to fly, but needed wings. 'Brandotory' gave me those wings, and now I'm building flight paths for others.",
    },
    {
      id: "journey",
      title: "My Learning Odyssey",
      content:
        "I discovered the power of creating digital experiences that impact people's lives. Through years of learning, experimenting, and building, I've developed a deep understanding of the web ecosystem.",
    },
    {
      id: "skills",
      title: "My Skills",
      content:
        "JavaScript, Typescript, MongoDB, Express, React, Node, TailwindCSS, Material UI,  CSS, HTML, Figma, Inkscape and more...",
    },
    {
      id: "education",
      title: "My Credentials",
      content:
        "I'm a Bangladesh University of Engineering and Technology (BUET) certified full-stack web developer on a journey of modern web mastery at the University of Helsinki.",
    },
  ]

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReducedMotion(mediaQuery.matches)

    const handleChange = () => setIsReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Measure content height to adjust container dynamically
  useEffect(() => {
    if (contentRef.current) {
      const updateHeight = () => {
        const height = contentRef.current.scrollHeight
        setContentHeight(height)
      }

      // Use ResizeObserver for more reliable size detection
      if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(updateHeight)
        resizeObserver.observe(contentRef.current)
        return () => resizeObserver.disconnect()
      } else {
        // Fallback for browsers without ResizeObserver
        updateHeight()
        window.addEventListener("resize", updateHeight)
        return () => window.removeEventListener("resize", updateHeight)
      }
    }
  }, [activeIndex])

  const handleNext = useCallback(() => {
    if (activeIndex < journeyItems.length - 1) {
      setDirection(1)
      setActiveIndex((prev) => prev + 1)
    }
  }, [activeIndex, journeyItems.length])

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      setDirection(-1)
      setActiveIndex((prev) => prev - 1)
    }
  }, [activeIndex])

  const handleTouchStart = (e) => {
    // Don't initiate drag if we're touching a scrollable content area or interactive element
    if (e.target.closest(".minimal-journey-item-content") || e.target.closest("button") || e.target.tagName === "A")
      return

    setIsDragging(true)
    setStartY(e.touches[0].clientY)
    setScrollY(0)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const currentY = e.touches[0].clientY
    const diff = currentY - startY
    setScrollY(diff)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return

    setIsDragging(false)
    if (scrollY > 70) {
      handlePrev()
    } else if (scrollY < -70) {
      handleNext()
    }
    setScrollY(0)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        handleNext()
      } else if (e.key === "ArrowUp") {
        handlePrev()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleNext, handlePrev])

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
  }

  return (
    <div
      className="minimal-journey"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        // Dynamically adjust height based on content
        minHeight: Math.max(400, contentHeight + 200) + "px",
      }}
    >
      <motion.h2
        className="minimal-journey-title section-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        More About Me
      </motion.h2>

      <div className="minimal-journey-dots" role="tablist">
        {journeyItems.map((item, index) => (
          <button
            key={index}
            className={`minimal-journey-dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => {
              setDirection(index > activeIndex ? 1 : -1)
              setActiveIndex(index)
            }}
            aria-label={`${item.title}`}
            aria-selected={index === activeIndex}
            role="tab"
            tabIndex={index === activeIndex ? 0 : -1}
          />
        ))}
      </div>

      <div className="minimal-journey-content-container" aria-live="polite">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            className="minimal-journey-content"
            ref={contentRef}
            custom={direction}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              y: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            }}
            role="tabpanel"
          >
            <motion.span
              className="minimal-journey-index"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              aria-hidden="true"
            >
              {activeIndex + 1}
            </motion.span>

            <motion.h3
              className="minimal-journey-item-title"
              initial={{ y: isReducedMotion ? 0 : 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              {journeyItems[activeIndex].title}
            </motion.h3>

            <motion.div
              className="minimal-journey-item-content-wrapper"
              initial={{ y: isReducedMotion ? 0 : 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p className="minimal-journey-item-content">{journeyItems[activeIndex].content}</p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="minimal-journey-controls">
        <motion.button
          className="minimal-journey-control"
          onClick={handlePrev}
          whileHover={{ scale: isReducedMotion ? 1 : 1.1 }}
          whileTap={{ scale: isReducedMotion ? 1 : 0.9 }}
          disabled={activeIndex === 0}
          aria-label="Previous slide"
        >
          <span className="minimal-journey-arrow">↑</span>
        </motion.button>

        <div className="minimal-journey-indicator" aria-hidden="true">
          {activeIndex + 1}/{journeyItems.length}
        </div>

        <motion.button
          className="minimal-journey-control"
          onClick={handleNext}
          whileHover={{ scale: isReducedMotion ? 1 : 1.1 }}
          whileTap={{ scale: isReducedMotion ? 1 : 0.9 }}
          disabled={activeIndex === journeyItems.length - 1}
          aria-label="Next slide"
        >
          <span className="minimal-journey-arrow">↓</span>
        </motion.button>
      </div>

      <div className="minimal-journey-swipe-hint" aria-hidden="true">
        <span>Swipe to navigate</span>
      </div>
    </div>
  )
}

export default MinimalJourney

