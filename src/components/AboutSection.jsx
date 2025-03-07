import "../styles/AboutSection.css"

const AboutSection = () => {
  return (
    <div className="container">
      <h2 className="section-title" id="about-heading">
        Who Am I?
      </h2>
      <div className="about-content">
        <div className="about-image-container">
          <div className="about-image neomorphic">
            <img src="https://avatars.githubusercontent.com/u/112099343?v=4" alt="Profile of Masum Billah" />
          </div>

          {/* Social Media Icons */}
          <div className="social-icons">
            <a
              href="https://github.com/billahdotdev"
              className="social-icon"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/billahdotdev"
              className="social-icon"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://x.com/billahdotdev"
              className="social-icon"
              aria-label="X (formerly Twitter)"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4l7.2 7.2M20 4l-7.2 7.2M4 20l7.2-7.2M20 20l-7.2-7.2" />
              </svg>
            </a>
          </div>
        </div>
        <div className="about-text">
          <div className="about-card neomorphic">
            <h3>Masum Billah</h3>
            <h6>Web Developer | Branding Consultant</h6>
            <p>I'm a full-stack web developer dedicated to making online dreams a reality.</p>
            <div className="about-stats">
              <div className="stat-item neomorphic-inset">
                <span className="stat-number">9+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item neomorphic-inset">
                <span className="stat-number">146</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item neomorphic-inset">
                <span className="stat-number">82</span>
                <span className="stat-label">Happy Clients</span>
              </div>
            </div>
          </div>
          <div className="story-card neomorphic">
            <h3>My Story</h3>
            <p>
              I am passionate about JavaScript and web technologies. Before the pandemic, I was just a struggling
              entrepreneur in the clothing industry. 'GARMENTIK' is a company where I hustled as a rainmaker. My
              business had its ups and downs, which were stressful, but I was learning something new every day. During
              the pandemic, I decided to bring my passion into the business.
            </p>
          </div>
          <div className="skills-card neomorphic">
            <h3>My Skills</h3>
            <div className="skills-container">
              {[
                "HTML5",
                "CSS3",
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "Express",
                "MongoDB",
                "Git",
                "Responsive Design",
                "UI/UX",
                "Tailwind CSS",
                "Material UI",
                "Inkscape",
                "Figma",
                "and More +",
              ].map((skill, index) => (
                <div key={index} className="skill-tag neomorphic">
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div className="story-card neomorphic">
            <h3>My Learning Odyssey</h3>
            <p>
              My journey into web development began with a curiosity about how websites work. What started as a hobby
              quickly evolved into a passion as I discovered the power of creating digital experiences that can impact
              people's lives. Through years of learning, experimenting, and building, I've developed a deep
              understanding of the web ecosystem and the skills needed to create exceptional digital products.
            </p>
          </div>
          <div className="motivation-card neomorphic">
            <h3>My Credentials</h3>
            <p>
              I'm a Bangladesh University of Engineering and Technology (BUET) certified full-stack web developer on a
              journey of modern web mastery at the University of Helsinki.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutSection

