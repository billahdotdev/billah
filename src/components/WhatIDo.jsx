"use client"

import { useEffect, useRef } from "react"
import "../styles/WhatIDo.css"

const WhatIDo = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    // Animation on component mount
    const section = sectionRef.current
    if (section) {
      section.classList.add("fade-in")

      // Animate services on scroll
      const services = section.querySelectorAll(".service-card")

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate")
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.2 },
      )

      services.forEach((service) => {
        observer.observe(service)
      })

      return () => {
        services.forEach((service) => {
          observer.unobserve(service)
        })
      }
    }
  }, [])

  return (
    <section className="whatido-section" ref={sectionRef}>
      <div className="section-header">
        <h1>WhatIDo?</h1>
        <div className="underline"></div>
      </div>

      <div className="services-container">
        <div className="service-card neomorphic">
          <div className="service-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <h3>Web Development</h3>
          <p>Creating responsive, fast, and user-friendly websites using modern technologies and best practices.</p>
        </div>

        <div className="service-card neomorphic">
          <div className="service-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
          <h3>SEO</h3>
          <p>Designing intuitive and beautiful user interfaces that provide exceptional user experiences.</p>
        </div>

        <div className="service-card neomorphic">
          <div className="service-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
              <path d="M2 2l7.586 7.586"></path>
              <circle cx="11" cy="11" r="2"></circle>
            </svg>
          </div>
          <h3>Brand Identity</h3>
          <p>
            Creating cohesive brand identities including logos, color schemes, and typography that represent your
            values.
          </p>
        </div>

        <div className="service-card neomorphic">
          <div className="service-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3>Digital Marketing</h3>
          <p>Providing expert advice on web technologies, design trends, and digital strategies for your business.</p>
        </div>
      </div>

      <div className="process-container neomorphic">
        <h2>My Process</h2>

        <div className="process-steps">
          <div className="process-step">
            <div className="step-number neomorphic">1</div>
            <div className="step-content">
              <h3>Discovery</h3>
              <p>Understanding your goals, target audience, and project requirements through in-depth discussions.</p>
            </div>
          </div>

          <div className="process-step">
            <div className="step-number neomorphic">2</div>
            <div className="step-content">
              <h3>Planning</h3>
              <p>Creating a detailed roadmap including sitemap, wireframes, and technical specifications.</p>
            </div>
          </div>

          <div className="process-step">
            <div className="step-number neomorphic">3</div>
            <div className="step-content">
              <h3>Design</h3>
              <p>Developing visual designs and prototypes that align with your brand and project goals.</p>
            </div>
          </div>

          <div className="process-step">
            <div className="step-number neomorphic">4</div>
            <div className="step-content">
              <h3>Development</h3>
              <p>Building the solution using clean, efficient code and modern development practices.</p>
            </div>
          </div>

          <div className="process-step">
            <div className="step-number neomorphic">5</div>
            <div className="step-content">
              <h3>Testing</h3>
              <p>Rigorous testing across devices and browsers to ensure quality and performance.</p>
            </div>
          </div>

          <div className="process-step">
            <div className="step-number neomorphic">6</div>
            <div className="step-content">
              <h3>Launch & Support</h3>
              <p>Deploying the solution and providing ongoing support and maintenance.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatIDo

