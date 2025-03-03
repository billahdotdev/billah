"use client"

import { useState, useEffect } from "react"
import "../styles/Navbar.css"

const Navbar = ({ activeSection, navigateTo }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle navigation and close mobile menu
  const handleNavClick = (section) => {
    navigateTo(section)
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <a href="https://github.com/billahdotdev" target="_blank" rel="noopener noreferrer" className="logo-text accent-color">
          Masum Billah
        </a>

        <div className={`menu-toggle ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li className={activeSection === "whoami" ? "active" : ""}>
            <button
              onClick={() => handleNavClick("whoami")}
              className={`nav-link ${activeSection === "whoami" ? "active-link" : ""}`}
            >
              WhoAmI?
            </button>
          </li>
          <li className={activeSection === "whatido" ? "active" : ""}>
            <button
              onClick={() => handleNavClick("whatido")}
              className={`nav-link ${activeSection === "whatido" ? "active-link" : ""}`}
            >
              WhatIDo?
            </button>
          </li>
          <li className={activeSection === "learn" ? "active" : ""}>
            <button
              onClick={() => handleNavClick("learn")}
              className={`nav-link ${activeSection === "learn" ? "active-link" : ""}`}
            >
              Learn
            </button>
          </li>
          <li className={activeSection === "contact" ? "active" : ""}>
            <button
              onClick={() => handleNavClick("contact")}
              className={`nav-link ${activeSection === "contact" ? "active-link" : ""}`}
            >
              Contact
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

