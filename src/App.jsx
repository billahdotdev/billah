"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import Navbar from "./components/Navbar"
import ThemeToggle from "./components/ThemeToggle"
import Loader from "./components/Loader"
import CustomCursor from "./components/CustomCursor"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Services from "./sections/Services"
import Work from "./sections/Work"
import Contact from "./sections/Contact"
import Footer from "./components/Footer"
import "./App.css"

function App() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState("light")
  const [activeSection, setActiveSection] = useState("hero")

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

      if (
        aboutRef.current &&
        scrollPosition >= aboutRef.current.offsetTop &&
        scrollPosition < servicesRef.current.offsetTop
      ) {
        setActiveSection("about")
      } else if (
        servicesRef.current &&
        scrollPosition >= servicesRef.current.offsetTop &&
        scrollPosition < workRef.current.offsetTop
      ) {
        setActiveSection("services")
      } else if (
        workRef.current &&
        scrollPosition >= workRef.current.offsetTop &&
        scrollPosition < contactRef.current.offsetTop
      ) {
        setActiveSection("work")
      } else if (contactRef.current && scrollPosition >= contactRef.current.offsetTop) {
        setActiveSection("contact")
      } else {
        setActiveSection("hero")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    let targetRef

    switch (sectionId) {
      case "about":
        targetRef = aboutRef
        break
      case "services":
        targetRef = servicesRef
        break
      case "work":
        targetRef = workRef
        break
      case "contact":
        targetRef = contactRef
        break
      default:
        window.scrollTo({ top: 0, behavior: "smooth" })
        return
    }

    if (targetRef && targetRef.current) {
      window.scrollTo({
        top: targetRef.current.offsetTop - 80,
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
            <Hero scrollToSection={scrollToSection} />
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

          <Footer />
        </div>
      )}
    </AnimatePresence>
  )
}

export default App

