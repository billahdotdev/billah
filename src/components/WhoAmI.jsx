"use client"

import { useEffect, useRef } from "react"
import "../styles/WhoAmI.css"
import ProfilePhoto from "./ProfilePhoto"
import MyStory from "./MyStory"
import MoreAboutMe from "./MoreAboutMe"
import Skills from "./Skills"

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
    <ProfilePhoto />
    <div className="designation">
    <a
              href="https://garmentik.com"
              target="_blank"
              rel="noopener noreferrer"
              className="garmentik-link"
            >
              Web Developer
            </a> | Founder of{" "}
            <a
              href="https://garmentik.com"
              target="_blank"
              rel="noopener noreferrer"
              className="garmentik-link"
            >
              Brandotory
            </a>
            </div>
            <MyStory />
            <MoreAboutMe />
            <Skills />
    </section>
    
  )
}

export default WhoAmI

