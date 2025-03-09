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
  const [isMobile, setIsMobile] = useState(false)

  const sections = [
    { id: "about", title: "Who Am I?" },
    { id: "services", title: "What Do I Do?" },
    { id: "projects", title: "Projects" },
    { id: "contact", title: "Contact" },
  ]

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(`section-${sectionId}`)
    if (element) {
      const headerHeight =
        Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight - (isMobile ? 10 : 20) // Less offset on mobile

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setActiveSection(sectionId)
    }
  }

  useEffect(() => {
    // Different observer options for mobile vs desktop
    const observerOptions = {
      threshold: isMobile ? [0.1] : [0.2], // Lower threshold on mobile
      rootMargin: isMobile ? "-80px 0px -10% 0px" : "-100px 0px -20% 0px",
    }

    // Cleanup previous observers
    Object.values(observersRef.current).forEach((observer) => observer.disconnect())
    observersRef.current = {}

    // Setup new observers
    sections.forEach((section) => {
      const element = document.getElementById(`section-${section.id}`)
      if (element) {
        const observer = new IntersectionObserver(([entry]) => {
          setIsIntersecting((prev) => ({
            ...prev,
            [section.id]: entry.isIntersecting,
          }))

          // Only update active section if element is visible enough
          if (entry.isIntersecting && entry.intersectionRatio >= (isMobile ? 0.1 : 0.2)) {
            setActiveSection(section.id)
          }
        }, observerOptions)

        observer.observe(element)
        observersRef.current[section.id] = observer
      }
    })

    // Cleanup on unmount
    return () => {
      Object.values(observersRef.current).forEach((observer) => observer.disconnect())
      observersRef.current = {}
    }
  }, [sections, isMobile]) // Re-run when sections array or mobile state changes

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

