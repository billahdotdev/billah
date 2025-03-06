import "../styles/AboutSection.css"

const AboutSection = () => {
  return (
    <div className="container">
      <h2 className="section-title">Who Am I?</h2>
      <div className="about-content">
        <div className="about-image-container">
          <div className="about-image neomorphic">
            <img src="https://avatars.githubusercontent.com/u/112099343?v=4" alt="Profile of Masum Billah" />
          </div>

          {/* Social Media Icons */}
          <div className="social-icons">
          <a href="https://github.com/your-profile" className="social-icon" aria-label="GitHub" target="_blank">
          <span className="icon-github"></span>
           </a>
           <a href="https://www.linkedin.com/in/your-profile" className="social-icon" aria-label="LinkedIn" target="_blank">
          <span className="icon-linkedin"></span>
           </a>
         <a href="https://x.com/your-profile" className="social-icon" aria-label="X (formerly Twitter)" target="_blank">
          <span className="icon-x"></span>
  </a>
</div>


        </div>
        <div className="about-text">
          <div className="about-card neomorphic">
            <h3>Masum Billah</h3>
            <h4>Web Developer | Branding Consultant</h4>
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

