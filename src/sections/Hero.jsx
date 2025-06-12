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
          <motion.div
  className="profile-image-wrapper"
  initial={{ opacity: 0, scale: 0.5, y: -50 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
>
  <motion.img
    src="https://avatars.githubusercontent.com/u/112099343?v=4"
    alt="Masum Billah"
    className="profile-image"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  />
</motion.div>

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

          
        </div>

        
      </div>
    </section>
  )
}

export default Hero

