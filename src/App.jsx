"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence } from "framer-motion"

// Components
import Navbar from "./components/Navbar"
import ThemeToggle from "./components/ThemeToggle"
import Loader from "./components/Loader"
import CustomCursor from "./components/CustomCursor"
import Footer from "./components/Footer"

// Sections
import Hero from "./sections/Hero"
import About from "./sections/About"
import Services from "./sections/Services"
import Work from "./sections/Work"
import Contact from "./sections/Contact"

// Styles
import "./App.css"

function App() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState("light")
  const [activeSection, setActiveSection] = useState("hero")

  // Section refs for scrolling
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const servicesRef = useRef(null)
  const workRef = useRef(null)
  const contactRef = useRef(null)

  // Theme handling
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")

    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute("data-theme", savedTheme)
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const initialTheme = prefersDark ? "dark" : "light"
      setTheme(initialTheme)
      document.documentElement.setAttribute("data-theme", initialTheme)
      localStorage.setItem("theme", initialTheme)
    }

    // Simulate loading
    setTimeout(() => setLoading(false), 2500)
  }, [])

  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      const sections = [
        { id: "hero", ref: heroRef },
        { id: "about", ref: aboutRef },
        { id: "services", ref: servicesRef },
        { id: "work", ref: workRef },
        { id: "contact", ref: contactRef },
      ]

      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current && scrollPosition >= section.ref.current.offsetTop - 100) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const sectionRefs = {
      hero: heroRef,
      about: aboutRef,
      services: servicesRef,
      work: workRef,
      contact: contactRef,
    }

    const targetRef = sectionRefs[sectionId]

    if (targetRef && targetRef.current) {
      const offset = sectionId === "hero" ? 0 : 80
      window.scrollTo({
        top: targetRef.current.offsetTop - offset,
        behavior: "smooth",
      })
    }
  }

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Loader key="loader" />
      ) : (
        <div className="app">
          <CustomCursor />
          <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          <main>
            <section ref={heroRef} id="hero">
              <Hero scrollToSection={scrollToSection} />
            </section>

            <section ref={aboutRef} id="about" className="section">
              <About />
            </section>

            <section ref={servicesRef} id="services" className="section">
              <Services />
            </section>

            <section ref={workRef} id="work" className="section">
              <Work />
            </section>

            <section ref={contactRef} id="contact" className="section">
              <Contact />
            </section>
          </main>

          <Footer scrollToSection={scrollToSection} />
        </div>
      )}
    </AnimatePresence>
  )
}

export default App

