"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./MoreAboutMe.css"

const MoreAboutMe = () => {
  const [activeSection, setActiveSection] = useState(null)
  const containerRef = useRef(null)

  const sections = [
    {
      id: 1,
      title: "My Story",
      details:
        "JavaScript and web tech? That's me. 'GARMENTIK' was my clothing business, a hard but rewarding journey. Pandemic changed everything. Now, I combine both passions: 'Brandotory' (web) and 'Garmentik' (clothing).",
    },
    {
      id: 2,
      title: "My Learning Odyssey",
      details:
        "My journey into web development began with a curiosity about how websites work. What started as a hobby quickly evolved into a passion as I discovered the power of creating digital experiences that can impact people's lives. Through years of learning, experimenting, and building, I've developed a deep understanding of the web ecosystem and the skills needed to create exceptional digital products.",
    },
    {
      id: 3,
      title: "My Skills",
      details:
        "MongoDB, Express, React, Node, TailwindCSS, CSS, and HTML",
    },
    {
      id: 4,
      title: "My Credentials",
      details:
        "I'm a Bangladesh University of Engineering and Technology (BUET) certified full-stack web developer on a journey of modern web mastery at the University of Helsinki.",
    },
  ]

  const handleToggle = (id) => {
    if (activeSection === id) {
      setActiveSection(null)
    } else {
      setActiveSection(id)
    }
  }

  return (
    <div className="minimal-about-me" ref={containerRef}>
      <motion.h2
        className="minimal-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        More About Me
      </motion.h2>

      <div className="minimal-sections">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            className={`minimal-section ${activeSection === section.id ? "active" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              className="minimal-header"
              onClick={() => handleToggle(section.id)}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                className="minimal-indicator"
                animate={{
                  rotate: activeSection === section.id ? 90 : 0,
                  backgroundColor: activeSection === section.id ? "var(--accent, #0070f3)" : "#ddd",
                }}
                transition={{ duration: 0.3 }}
              />
              <h3>{section.title}</h3>
            </motion.div>

            <AnimatePresence>
              {activeSection === section.id && (
                <motion.div
                  className="minimal-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <motion.div
                    className="minimal-details"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <p>{section.details}</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="minimal-progress"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </div>
  )
}

export default MoreAboutMe

