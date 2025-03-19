"use client"

import { motion } from "framer-motion"
import "./AnimatedText.css"

const AnimatedText = ({ text, type = "heading", className = "" }) => {
  // Split text into words and characters for animation
  const words = text.split(" ")

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  // For character-by-character animation
  const characterAnimation = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  if (type === "character") {
    return (
      <motion.div
        className={`animated-text character-animation ${className}`}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {words.map((word, index) => (
          <span className="word-wrapper" key={index}>
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                key={charIndex}
                className="character"
                variants={characterAnimation}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1 + charIndex * 0.05,
                  ease: [0.2, 0.65, 0.3, 0.9],
                }}
              >
                {char}
              </motion.span>
            ))}
            <span className="space">&nbsp;</span>
          </span>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`animated-text ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {words.map((word, index) => (
        <motion.span className="word" key={index} variants={child}>
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.div>
  )
}

export default AnimatedText

