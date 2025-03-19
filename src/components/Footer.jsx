"use client"

import { motion } from "framer-motion"
import "./Footer.css"

const Footer = ({ scrollToSection }) => {
  const currentYear = new Date().getFullYear()

  // Fallback implementation if scrollToSection isn't provided
  const handleScroll = (sectionId) => {
    if (scrollToSection) {
      // Use the provided scrollToSection function if available
      scrollToSection(sectionId)
    } else {
      // Fallback: manually scroll to the section
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-logo"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="logo-text">MASUM BILLAH</span>
            <p>I Create clean, responsive, and functional websites</p>
          </motion.div>

          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a
                  href="#hero"
                  className="hover-target"
                  onClick={(e) => {
                    e.preventDefault()
                    handleScroll("hero")
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover-target"
                  onClick={(e) => {
                    e.preventDefault()
                    handleScroll("about")
                  }}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover-target"
                  onClick={(e) => {
                    e.preventDefault()
                    handleScroll("services")
                  }}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  className="hover-target"
                  onClick={(e) => {
                    e.preventDefault()
                    handleScroll("work")
                  }}
                >
                  Work
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover-target"
                  onClick={(e) => {
                    e.preventDefault()
                    handleScroll("contact")
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>
            NO RIGHT RESERVED. {currentYear} Built by dreamers: Masum Billah. For dreamers. Deeply indebted to the
            individuals who I learned from.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

