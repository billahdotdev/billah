"use client"

import { useState, useRef, useEffect } from "react"
import Header from "./Header"
import AboutSection from "./AboutSection"
import ServicesSection from "./ServicesSection"
import ResourcesSection from "./ResourcesSection"
import ContactSection from "./ContactSection"
import Footer from "./Footer"
import "../styles/Layout.css"

const Layout = () => {
  const [activeSection, setActiveSection] = useState("about")
  const [isIntersecting, setIsIntersecting] = useState({})
  const sectionRefs = useRef({})

  const sections = [
    { id: "about", title: "Who Am I?" },
    { id: "services", title: "What Do I Do?" },
    { id: "resources", title: "Resources" },
    { id: "contact", title: "Contact" },
  ]

  // Update the handleNavClick function for smoother scrolling
  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId)
    // Smooth scroll to the section with offset
    const element = document.getElementById(`section-${sectionId}`)
    if (element) {
      // Get the computed header height from CSS variable
      const headerHeight =
        Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  // Update the useEffect hook to improve transitions
  useEffect(() => {
    const observers = {}
    const observerOptions = {
      threshold: [0.1, 0.3, 0.5], // Multiple thresholds for better detection
      rootMargin: "-100px 0px -20% 0px", // Adjusted rootMargin for better section detection
    }

    sections.forEach((section) => {
      const ref = sectionRefs.current[section.id]
      if (ref) {
        const observer = new IntersectionObserver(([entry]) => {
          setIsIntersecting((prev) => ({
            ...prev,
            [section.id]: entry.isIntersecting,
          }))

          // Auto-update active section based on scroll
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(section.id)
          }
        }, observerOptions)

        observer.observe(ref)
        observers[section.id] = observer
      }
    })

    // Smooth scroll behavior for the entire page
    document.documentElement.style.scrollBehavior = "smooth"

    // Cleanup
    return () => {
      Object.values(observers).forEach((observer) => {
        observer.disconnect()
      })
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  return (
    <div className="portfolio-container">
      <Header sections={sections} activeSection={activeSection} onNavClick={handleNavClick} />

      <main className="content">
        <div
          id="section-about"
          ref={(el) => (sectionRefs.current.about = el)}
          className={`section fade-in ${isIntersecting.about ? "visible" : ""}`}
        >
          <AboutSection />
        </div>

        <div
          id="section-services"
          ref={(el) => (sectionRefs.current.services = el)}
          className={`section fade-in ${isIntersecting.services ? "visible" : ""}`}
        >
          <ServicesSection />
        </div>

        <div
          id="section-resources"
          ref={(el) => (sectionRefs.current.resources = el)}
          className={`section fade-in ${isIntersecting.resources ? "visible" : ""}`}
        >
          <ResourcesSection />
        </div>

        <div
          id="section-contact"
          ref={(el) => (sectionRefs.current.contact = el)}
          className={`section fade-in ${isIntersecting.contact ? "visible" : ""}`}
        >
          <ContactSection />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Layout

