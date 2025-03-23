"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import "./MoreAboutMe.css"

const MoreAboutMe = () => {
  const [activeSection, setActiveSection] = useState(null)
  const [hoveredSection, setHoveredSection] = useState(null)
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
      details: "MongoDB, Express, React, Node, TailwindCSS, CSS, and HTML",
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
    <div className="perspective-about-me" ref={containerRef}>
      <div className="perspective-title-wrapper">
        <motion.h2
          className="perspective-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          More About Me
        </motion.h2>
      </div>

      <div className="perspective-grid">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            className={`perspective-card-wrapper ${activeSection === section.id ? "active" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onHoverStart={() => setHoveredSection(section.id)}
            onHoverEnd={() => setHoveredSection(null)}
          >
            <div
              className="perspective-card"
              onClick={() => handleToggle(section.id)}
              style={{
                transform: activeSection === section.id ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              <div className="perspective-front">
                <div className="perspective-front-content">
                  <span className="perspective-number">{index + 1}</span>
                  <h3>{section.title}</h3>
                  <div className="perspective-hint">{hoveredSection === section.id ? "Click to reveal" : ""}</div>
                </div>
              </div>
              <div className="perspective-back">
                <div className="perspective-back-content">
                  <p>{section.details}</p>
                  <button
                    className="perspective-close"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveSection(null)
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="perspective-controls">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            className={`perspective-control ${activeSection === section.id ? "active" : ""}`}
            onClick={() => handleToggle(section.id)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {index + 1}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default MoreAboutMe

