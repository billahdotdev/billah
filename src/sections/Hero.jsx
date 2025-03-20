"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import "./Hero.css"

const Hero = ({ scrollToSection }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const calculateMovement = (x, y, factor = 0.02) => {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    const deltaX = (x - centerX) * factor
    const deltaY = (y - centerY) * factor

    return { x: deltaX, y: deltaY }
  }

  // Update the letterVariants for smoother animation
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03, // Faster animation
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  const headingText = "MASUM BILLAH"
  const subheadingText = "WEB DEVELOPER"

  return (
    <section id="hero" className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="animated-heading">
              {headingText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="heading-letter"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>

            <motion.div
              className="hero-subheading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {subheadingText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="subheading-letter"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              I create clean, responsive, and functional websites.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <motion.button
                className="btn hover-target"
                onClick={() => scrollToSection("work")}
                whileHover={{ scale: 1.05, backgroundColor: "var(--bg-color)", color: "var(--text-primary)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.3 }}
              >
                View My Work
              </motion.button>

              <motion.button
                className="btn btn-outline hover-target"
                onClick={() => scrollToSection("contact")}
                whileHover={{ scale: 1.05, backgroundColor: "var(--text-primary)", color: "var(--bg-color)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.3 }}
              >
                Contact Me
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            className="hero-image"
            style={{
              x: calculateMovement(mousePosition.x, mousePosition.y).x,
              y: calculateMovement(mousePosition.x, mousePosition.y).y,
            }}
            transition={{
              type: "spring",
              stiffness: 75,
              damping: 30,
              mass: 0.5,
              opacity: { delay: 0.5, duration: 0.8 },
              scale: { delay: 0.5, duration: 0.8 },
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="image-container">
              <svg width="150" height="150" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.circle
                  cx="150"
                  cy="150"
                  r="145"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.path
                  d="M100 150L135 185L200 120"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                />
              </svg>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="scroll-indicator hover-target"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          onClick={() => scrollToSection("about")}
        >
          <span>Scroll Down</span>
          <motion.div
            className="scroll-arrow"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

