"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Header from "./Header"
import AboutSection from "./AboutSection"
import ServicesSection from "./ServicesSection"
import ShopSection from "./ShopSection"
import ContactSection from "./ContactSection"
import Footer from "./Footer"
import "../styles/Layout.css"

const Layout = () => {
  const [activeSection, setActiveSection] = useState("about")
  const [isIntersecting, setIsIntersecting] = useState({})
  const sectionRefs = useRef({})
  const [isScrolling, setIsScrolling] = useState(false)
  const observersRef = useRef({})

  const sections = [
    { id: "about", title: "Who Am I?" },
    { id: "services", title: "What Do I Do?" },
    { id: "shop", title: "Shop" },
    { id: "contact", title: "Contact" },
  ]

  // Memoize the updateActiveSection function to prevent unnecessary re-renders
  const updateActiveSection = useCallback(() => {
    if (isScrolling) return // Don't update during programmatic scrolling

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
  }, [isIntersecting, isScrolling])

  // Improved smooth scroll function with better offset calculation
  const handleNavClick = useCallback(
    (sectionId) => {
      // Prevent multiple scroll events
      if (isScrolling) return

      setIsScrolling(true)
      setActiveSection(sectionId)

      const element = document.getElementById(`section-${sectionId}`)
      if (element) {
        // Get the computed header height from CSS variable
        const headerHeight =
          Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 80
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })

        // Reset scrolling state after animation completes
        setTimeout(() => {
          setIsScrolling(false)
        }, 1000)
      } else {
        setIsScrolling(false)
      }
    },
    [isScrolling],
  )

  // Cleanup function for observers
  const cleanupObservers = useCallback(() => {
    Object.values(observersRef.current).forEach((observer) => {
      if (observer) {
        observer.disconnect()
      }
    })
  }, [])

  // Setup intersection observers
  useEffect(() => {
    // Cleanup previous observers
    cleanupObservers()

    const observerOptions = {
      threshold: [0.1, 0.5], // Reduced number of thresholds for better performance
      rootMargin: `-${window.innerWidth <= 768 ? 60 : 80}px 0px -20% 0px`, // Adjusted for mobile
    }

    sections.forEach((section) => {
      const ref = sectionRefs.current[section.id]
      if (ref) {
        const observer = new IntersectionObserver(([entry]) => {
          setIsIntersecting((prev) => ({
            ...prev,
            [section.id]: entry.isIntersecting,
          }))
        }, observerOptions)

        observer.observe(ref)
        observersRef.current[section.id] = observer
      }
    })

    return cleanupObservers
  }, [sections, cleanupObservers])

  // Update active section when intersection state changes
  useEffect(() => {
    updateActiveSection()
  }, [isIntersecting, updateActiveSection])

  // Throttled scroll handler for smoother performance
  useEffect(() => {
    let ticking = false
    let lastScrollY = window.scrollY
    let scrollTimeout

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Only process scroll events if we've scrolled a significant amount
      if (Math.abs(currentScrollY - lastScrollY) < 10) return

      lastScrollY = currentScrollY

      if (!ticking && !isScrolling) {
        // Clear any existing timeout
        if (scrollTimeout) {
          window.cancelAnimationFrame(scrollTimeout)
        }

        // Schedule the update
        scrollTimeout = window.requestAnimationFrame(() => {
          updateActiveSection()
          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout)
      }
    }
  }, [isScrolling, updateActiveSection])

  return (
    <div className="portfolio-container">
      <Header sections={sections} activeSection={activeSection} onNavClick={handleNavClick} />

      <main className="content" id="main-content">
        {sections.map((section) => (
          <div
            key={section.id}
            id={`section-${section.id}`}
            ref={(el) => (sectionRefs.current[section.id] = el)}
            className={`section fade-in ${isIntersecting[section.id] ? "visible" : ""}`}
            tabIndex="-1"
            aria-labelledby={`${section.id}-heading`}
          >
            {section.id === "about" && <AboutSection />}
            {section.id === "services" && <ServicesSection />}
            {section.id === "shop" && <ShopSection />}
            {section.id === "contact" && <ContactSection />}
          </div>
        ))}
      </main>

      <Footer />
    </div>
  )
}

export default Layout

