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

  // Update the handleNavClick function for better mobile experience
  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId)
    // Smooth scroll to the section with offset
    const element = document.getElementById(`section-${sectionId}`)
    if (element) {
      // Get the computed header height from CSS variable
      const headerHeight =
        Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight - 20 // Added extra 20px padding

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  // Update the useEffect hook to improve section detection
  useEffect(() => {
    const observers = {}
    const observerOptions = {
      threshold: [0.1, 0.3, 0.5],
      rootMargin: "-80px 0px -20% 0px", // Adjusted for header height
    }

    // Function to check which section is most visible
    const updateActiveSection = () => {
      const visibleSections = Object.entries(isIntersecting)
        .filter(([_, isVisible]) => isVisible)
        .map(([id]) => id)

      if (visibleSections.length > 0) {
        // Get the section that is most in view (highest intersection ratio)
        const mostVisibleSection = visibleSections.reduce((prev, current) => {
          const prevEl = document.getElementById(`section-${prev}`)
          const currentEl = document.getElementById(`section-${current}`)

          if (!prevEl || !currentEl) return current

          const prevRect = prevEl.getBoundingClientRect()
          const currentRect = currentEl.getBoundingClientRect()

          // Calculate how much of each section is in the viewport
          const prevVisible = Math.min(window.innerHeight, prevRect.bottom) - Math.max(0, prevRect.top)
          const currentVisible = Math.min(window.innerHeight, currentRect.bottom) - Math.max(0, currentRect.top)

          return currentVisible > prevVisible ? current : prev
        }, visibleSections[0])

        setActiveSection(mostVisibleSection)
      }
    }

    sections.forEach((section) => {
      const ref = sectionRefs.current[section.id]
      if (ref) {
        const observer = new IntersectionObserver(([entry]) => {
          setIsIntersecting((prev) => ({
            ...prev,
            [section.id]: entry.isIntersecting,
          }))

          // Call updateActiveSection after state is updated
          setTimeout(updateActiveSection, 0)
        }, observerOptions)

        observer.observe(ref)
        observers[section.id] = observer
      }
    })

    // Also update active section on scroll for smoother transitions
    const handleScroll = () => {
      requestAnimationFrame(updateActiveSection)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    // Smooth scroll behavior for the entire page
    document.documentElement.style.scrollBehavior = "smooth"

    // Cleanup
    return () => {
      Object.values(observers).forEach((observer) => {
        observer.disconnect()
      })
      window.removeEventListener("scroll", handleScroll)
      document.documentElement.style.scrollBehavior = ""
    }
  }, [isIntersecting])

  return (
    <div className="portfolio-container">
      <Header sections={sections} activeSection={activeSection} onNavClick={handleNavClick} />

      <main className="content" id="main-content">
        <div
          id="section-about"
          ref={(el) => (sectionRefs.current.about = el)}
          className={`section fade-in ${isIntersecting.about ? "visible" : ""}`}
          tabIndex="-1"
          aria-labelledby="about-heading"
        >
          <AboutSection />
        </div>

        <div
          id="section-services"
          ref={(el) => (sectionRefs.current.services = el)}
          className={`section fade-in ${isIntersecting.services ? "visible" : ""}`}
          tabIndex="-1"
          aria-labelledby="services-heading"
        >
          <ServicesSection />
        </div>

        <div
          id="section-resources"
          ref={(el) => (sectionRefs.current.resources = el)}
          className={`section fade-in ${isIntersecting.resources ? "visible" : ""}`}
          tabIndex="-1"
          aria-labelledby="resources-heading"
        >
          <ResourcesSection />
        </div>

        <div
          id="section-contact"
          ref={(el) => (sectionRefs.current.contact = el)}
          className={`section fade-in ${isIntersecting.contact ? "visible" : ""}`}
          tabIndex="-1"
          aria-labelledby="contact-heading"
        >
          <ContactSection />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Layout

