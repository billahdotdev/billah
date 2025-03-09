"use client"

import { useState, useRef, useEffect } from "react"
import Header from "./Header"
import AboutSection from "./AboutSection"
import ServicesSection from "./ServicesSection"
import ProjectsSection from "./ProjectsSection"
import ContactSection from "./ContactSection"
import Footer from "./Footer"
import "../styles/Layout.css"

const Layout = () => {
  const [activeSection, setActiveSection] = useState("about")
  const [isIntersecting, setIsIntersecting] = useState({})
  const sectionRefs = useRef({})
  const observersRef = useRef({})

  const sections = [
    { id: "about", title: "Who Am I?" },
    { id: "services", title: "What Do I Do?" },
    { id: "projects", title: "Projects" },
    { id: "contact", title: "Contact" },
  ]

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(`section-${sectionId}`)
    if (element) {
      const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight - 20

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setActiveSection(sectionId)
    }
  }

  useEffect(() => {
    const observerOptions = {
      threshold: [0.2], // Simplified threshold
      rootMargin: "-100px 0px -20% 0px",
    }

    // Cleanup previous observers
    return () => {
      Object.values(observersRef.current).forEach(observer => observer.disconnect())
    }
  }, []) // Empty dependency array as we only need to set this up once

  useEffect(() => {
    const setupObservers = () => {
      sections.forEach((section) => {
        const element = document.getElementById(`section-${section.id}`)
        if (element && !observersRef.current[section.id]) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              setIsIntersecting(prev => ({
                ...prev,
                [section.id]: entry.isIntersecting
              }))

              if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
                setActiveSection(section.id)
              }
            },
            {
              threshold: [0.2],
              rootMargin: "-100px 0px -20% 0px"
            }
          )

          observer.observe(element)
          observersRef.current[section.id] = observer
        }
      })
    }

    setupObservers()

    // Cleanup function
    return () => {
      Object.values(observersRef.current).forEach(observer => observer.disconnect())
      observersRef.current = {}
    }
  }, [sections]) // Only re-run if sections array changes

  return (
    <div className="portfolio-container">
      <Header sections={sections} activeSection={activeSection} onNavClick={handleNavClick} />

      <main className="content">
        {sections.map((section) => (
          <div
            key={section.id}
            id={`section-${section.id}`}
            ref={(el) => (sectionRefs.current[section.id] = el)}
            className={`section fade-in ${isIntersecting[section.id] ? "visible" : ""}`}
          >
            {section.id === "about" && <AboutSection />}
            {section.id === "services" && <ServicesSection />}
            {section.id === "projects" && <ProjectsSection />}
            {section.id === "contact" && <ContactSection />}
          </div>
        ))}
      </main>

      <Footer />
    </div>
  )
}

export default Layout