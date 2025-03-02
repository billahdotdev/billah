"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import "../styles/Navbar.css"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const isHomePage = location.pathname === "/"

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          billah.dev
        </Link>

        <button
          className={`mobile-menu-btn ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          {isHomePage ? (
            <>
              <li className="nav-item">
                <a href="#whoami" className="nav-link" onClick={closeMenu}>
                  WhoAmI?
                </a>
              </li>
              <li className="nav-item">
                <a href="#whatido" className="nav-link" onClick={closeMenu}>
                  WhatIDo?
                </a>
              </li>
              <li className="nav-item">
                <a href="#learn" className="nav-link" onClick={closeMenu}>
                  Learn
                </a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link" onClick={closeMenu}>
                  Contact
                </a>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={closeMenu}>
                Home
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

