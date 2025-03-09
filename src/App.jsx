"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import AboutSection from "./components/AboutSection"
import ServicesSection from "./components/ServicesSection"
import WorksSection from "./components/WorksSection"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"
import ThemeToggle from "./components/ThemeToggle"
import { FaCode } from "react-icons/fa"
import "./App.css"

function App() {
  const [activeSection, setActiveSection] = useState("about")
  const [darkMode, setDarkMode] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setDarkMode(true)
    }

    // Add loaded class for animations
    setTimeout(() => {
      setIsLoaded(true)
    }, 300)
  }, [])

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.body.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "services", "works", "contact"]

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`app ${darkMode ? "dark" : ""} ${isLoaded ? "loaded" : ""}`}>
      {/* Background blobs for memorable design */}
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="container">
        <header className="header">
          <h1 className="logo neo-text">
            <FaCode className="logo-icon" /> Portfolio
          </h1>
          <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
        </header>

        <Navbar activeSection={activeSection} />

        <main className="main-content">
          <AboutSection darkMode={darkMode} />
          <ServicesSection darkMode={darkMode} />
          <WorksSection darkMode={darkMode} />
          <ContactSection darkMode={darkMode} />
        </main>
      </div>

      <Footer darkMode={darkMode} toggleTheme={toggleTheme} />
    </div>
  )
}

export default App

