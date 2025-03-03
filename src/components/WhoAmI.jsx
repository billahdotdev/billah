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
          <h3>Full Stack Web Developer</h3>

          <p>
          🙂 I am passionate about JavaScript and web
                            technologies. Before the pandemic, I was just a
                            struggling entrepreneur in the clothing industry.
                            'GARMENTIK' is a company where I hustled as a
                            rainmaker. My business had its ups and downs, which
                            were stressful, but I was learning something new
                            every day. During the pandemic, I decided to bring
                            my passion into the business. Nowadays, two roles in
                            my real-life game are:
          </p>

          <div className="skills-container">
            <h3>My Skills</h3>
            <div className="skills-grid">
              <div className="skill-item neomorphic-inset">
                <span>HTML5</span>
                <div className="skill-level">
                  <div className="skill-progress" style={{ width: "95%" }}></div>
                </div>
              </div>

              <div className="skill-item neomorphic-inset">
                <span>CSS3</span>
                <div className="skill-level">
                  <div className="skill-progress" style={{ width: "90%" }}></div>
                </div>
              </div>

              <div className="skill-item neomorphic-inset">
                <span>JavaScript</span>
                <div className="skill-level">
                  <div className="skill-progress" style={{ width: "85%" }}></div>
                </div>
              </div>

              <div className="skill-item neomorphic-inset">
                <span>React</span>
                <div className="skill-level">
                  <div className="skill-progress" style={{ width: "80%" }}></div>
                </div>
              </div>

              <div className="skill-item neomorphic-inset">
                <span>Node.js</span>
                <div className="skill-level">
                  <div className="skill-progress" style={{ width: "75%" }}></div>
                </div>
              </div>

              <div className="skill-item neomorphic-inset">
                <span>UI/UX Design</span>
                <div className="skill-level">
                  <div className="skill-progress" style={{ width: "70%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoAmI

