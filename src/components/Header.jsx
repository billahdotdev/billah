"use client"

import { useState, useEffect } from "react"
import "../styles/Header.css"

const Header = ({ sections, activeSection, onNavClick }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    const handleResize = () => {
      // Close mobile menu when window is resized to desktop size
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    // Handle clicks outside the mobile menu to close it
    const handleClickOutside = (event) => {
      const mobileNav = document.querySelector(".mobile-nav")
      const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")

      if (
        isMobileMenuOpen &&
        mobileNav &&
        mobileMenuToggle &&
        !mobileNav.contains(event.target) &&
        !mobileMenuToggle.contains(event.target)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)

    // Prevent body scrolling when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container header-container">
        <div className="logo neomorphic">
          <h1>Masum Billah</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  className={`neomorphic-button ${activeSection === section.id ? "active" : ""}`}
                  onClick={() => onNavClick(section.id)}
                  data-section={section.id}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="mobile-menu-toggle neomorphic-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}></span>
        </button>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-nav ${isMobileMenuOpen ? "open" : ""}`}>
          <ul className="mobile-nav-links">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  className={`neomorphic-button ${activeSection === section.id ? "active" : ""}`}
                  onClick={() => {
                    onNavClick(section.id)
                    setIsMobileMenuOpen(false)
                  }}
                  data-section={section.id}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Overlay for mobile menu */}
        <div
          className={`mobile-nav-overlay ${isMobileMenuOpen ? "open" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      </div>
    </header>
  )
}

export default Header

