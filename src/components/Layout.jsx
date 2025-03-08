"use client"

import { useState, useRef, useEffect } from "react"
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

  const sections = [
    { id: "about", title: "Who Am I?" },
    { id: "services", title: "What Do I Do?" },
    { id: "shop", title: "Shop" },
    { id: "contact", title: "Contact" },
  ]

  // Improved smooth scroll function with better offset calculation
  const handleNavClick = (sectionId) => {
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
  }

  // Improved intersection observer setup
  useEffect(() => {
    const observers = {}
    const observerOptions = {
      threshold: [0.1, 0.5, 0.8], // More threshold points for better detection
      rootMargin: `-${window.innerWidth <= 768 ? 60 : 80}px 0px -20% 0px`, // Adjusted for mobile
    }

    // Function to check which section is most visible
    const updateActiveSection = () => {
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
          setTimeout(updateActiveSection, 10)
        }, observerOptions)

        observer.observe(ref)
        observers[section.id] = observer
      }
    })

    // Throttled scroll handler for smoother performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking && !isScrolling) {
        window.requestAnimationFrame(() => {
          updateActiveSection()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    // Cleanup
    return () => {
      Object.values(observers).forEach((observer) => {
        observer.disconnect()
      })
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isIntersecting, isScrolling, sections])

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
          id="section-shop"
          ref={(el) => (sectionRefs.current.shop = el)}
          className={`section fade-in ${isIntersecting.shop ? "visible" : ""}`}
          tabIndex="-1"
          aria-labelledby="shop-heading"
        >
          <ShopSection />
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

