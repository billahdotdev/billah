"use client"

import { useState, useEffect } from "react"
import "../styles/Header.css"

const Header = ({ sections, activeSection, onNavClick }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
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

    // Initial check
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleOverlayClick = () => {
    setIsMobileMenuOpen(false)
  }

  const handleNavItemClick = (sectionId) => {
    onNavClick(sectionId)
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container header-container">
        <div className="logo neomorphic">
          <h1>Masum Billah</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-links">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  className={`neomorphic-button ${activeSection === section.id ? "active" : ""}`}
                  onClick={() => onNavClick(section.id)}
                  aria-current={activeSection === section.id ? "page" : undefined}
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
          aria-controls="mobile-nav"
        >
          <span className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}
          onClick={handleOverlayClick}
          aria-hidden="true"
        ></div>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-nav ${isMobileMenuOpen ? "open" : ""}`} id="mobile-nav" aria-hidden={!isMobileMenuOpen}>
          <nav aria-label="Mobile Navigation">
            <ul className="mobile-nav-links">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    className={`neomorphic-button ${activeSection === section.id ? "active" : ""}`}
                    onClick={() => handleNavItemClick(section.id)}
                    aria-current={activeSection === section.id ? "page" : undefined}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

