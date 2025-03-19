"use client"

import { motion } from "framer-motion"
import "./About.css"
import MoreAboutMe from "../components/MoreAboutMe"
import HackerMe from "../components/HackerMe"


const About = () => {
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
  }

  return (
    <div className="about">
      <div className="container">
        <motion.h2
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          About Me
        </motion.h2>

        <div className="about-content">
          <motion.div
            className="about-image-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="about-image-container">
              <img
                src="https://avatars.githubusercontent.com/u/112099343?v=4"
                alt="Portrait"
                className="about-image"
              />
              <motion.div
                className="image-overlay"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              ></motion.div>
            </div>
          </motion.div>

          <motion.div
            className="about-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            custom={1}
          >
            <h3>
              I'm a <span className="accent-text">Full Stack Web developer</span>
            </h3>

            <p>
            I’m a full-stack web developer and designer dedicated to building fast, 
            reliable websites, improving search engine rankings, 
            and driving more traffic through effective digital marketing. 
            I also create memorable branding that makes your business stand out. 
            Let's work together to bring your vision to life.
            
            </p>

            <div className="about-stats">
              <motion.div
                className="stat-item hover-target"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="stat-number">7+</span>
                <span className="stat-label">Years Experience</span>
              </motion.div>

              <motion.div
                className="stat-item hover-target"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="stat-number">176</span>
                <span className="stat-label">Projects Completed</span>
              </motion.div>

              <motion.div
                className="stat-item hover-target"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="stat-number">118</span>
                <span className="stat-label">Happy Clients</span>
              </motion.div>
            </div>

            <div className="about-buttons">
              <motion.a
                href="/resume.pdf"
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
      </div>
     
      <MoreAboutMe />
      <HackerMe />
    </div>
  )
}

export default About

