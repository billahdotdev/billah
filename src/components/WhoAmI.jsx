"use client"

import { useEffect, useRef } from "react"
import "../styles/WhoAmI.css"

const WhoAmI = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    // Animation on component mount
    const section = sectionRef.current
    if (section) {
      section.classList.add("fade-in")
    }
  }, [])

  return (
    <section className="whoami-section" ref={sectionRef}>
      <div className="section-header">
        <h1>WhoAmI?</h1>
        <div className="underline"></div>
      </div>

      <div className="profile-container">
        <div className="profile-image">
        <img
        src="https://avatars.githubusercontent.com/u/112099343?v=4"
        alt="Profile"
      />
        </div>

        <div className="profile-content neomorphic">
          <h2>
            Hello, I'm <span className="highlight">Masum Billah</span>
          </h2>
          <h4>Full-Stack Web Developer | Branding Consultant</h4>
          </div>
        </div>
    
    </section>
  )
}

export default WhoAmI

