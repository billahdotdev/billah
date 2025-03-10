import "../styles/AboutSection.css"
import {
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDownload,
  FaLaptopCode,
  FaWhatsapp,
  FaPlusCircle,
} from "react-icons/fa"

function AboutSection({ darkMode }) {
  const skills = [
    {
      name: "HTML",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "TailwindCSS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindCSS/tailwindCSS-plain.svg",
    },
    {
      name: "Material UI",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
    },
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Express",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    },
    {
      name: "MongoDB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "Figma",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
    {
      name: "More +",
      logo: null,
      isButton: true,
    },
  ]

  return (
    <section id="about" className="section about-section">
      <h2 className="section-title">Who Am I?</h2>

      <div className="about-content">
        <div className="profile-card neo-flat">
          <div className="profile-image-container">
            <div className="profile-image-wrapper neo-flat">
              <img
                src="src/assets/masum.jpg"
                alt="Profile"
                className="profile-image"
              />
            </div>
          </div>

          <h3 className="profile-name accent-gradient">Masum Billah</h3>
          <p className="profile-title">Web Developer | Branding Consultant </p>

          <div className="profile-details">
            <div className="profile-detail-item neo-inset">
              <FaUser className="profile-icon" />
              <span>Serious, and Curious</span>
            </div>

            <div className="profile-detail-item neo-inset">
              <FaMapMarkerAlt className="profile-icon" />
              <span>Dhaka | Manila</span>
            </div>

            <div className="profile-detail-item neo-inset">
              <FaCalendarAlt className="profile-icon" />
              <span>9+ years experience</span>
            </div>

            <div className="profile-detail-item neo-inset">
              <FaWhatsapp className="profile-icon" />
              <a href="https://wa.me/880145656565" className="whatsapp-link" target="_blank" rel="noopener noreferrer">
                +880 171 340 1889 +63 915 601 5542
              </a>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-number animate-pulse">176</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-number animate-pulse">118</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-number animate-pulse">4</div>
              <div className="stat-label">committers top Rank</div>
            </div>
          </div>
        </div>

        <div className="about-bio neo-flat">
          <h3 className="bio-title accent-gradient">About Me</h3>

          <div className="bio-text">
            <p>
            I'm a full-stack web developer dedicated to making online dreams a reality.
            </p>
          </div>

          <div className="skills-container">
            <h4 className="skills-title">My Skills</h4>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className={`skill-card neo-flat ${skill.isButton ? "skill-more" : ""}`}>
                  <div className="skill-icon-wrapper neo-circle">
                    {skill.logo ? (
                      <img
                        src={skill.logo || "/placeholder.svg"}
                        alt={`${skill.name} logo`}
                        className="skill-logo-img"
                      />
                    ) : (
                      <FaPlusCircle className="skill-plus-icon" />
                    )}
                  </div>
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bio-actions">


            <button className="neo-button glow" href="../assets/CV.pdf">
              <FaDownload className="button-icon" /> Download CV
            </button>

     
              

            <button className="neo-button-secondary">
              <FaLaptopCode className="button-icon" /> View Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

