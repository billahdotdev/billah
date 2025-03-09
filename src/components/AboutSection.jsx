import "../styles/AboutSection.css"
import { FaUser, FaMapMarkerAlt, FaCalendarAlt, FaDownload, FaLaptopCode, FaWhatsapp } from "react-icons/fa"

function AboutSection({ darkMode }) {
  const skills = [
    { name: "HTML/CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 80 },
    { name: "UI/UX Design", level: 75 },
    { name: "Node.js", level: 70 },
  ]

  return (
    <section id="about" className="section about-section">
      <h2 className="section-title">Who Am I?</h2>

      <div className="about-content">
        <div className="profile-card neo-flat">
          <div className="profile-image-container">
            <div className="profile-image-wrapper neo-flat">
              <img
                src="../assets/masum.jpg"
                alt="Profile"
                className="profile-image"
              />
            </div>
          </div>

          <h3 className="profile-name accent-gradient">Masum Billah</h3>
          <p className="profile-title">Web Developer | Branding Consultant</p>

          <div className="profile-details">
            <div className="profile-detail-item neo-inset">
              <FaUser className="profile-icon" />
              <span>28 years old</span>
            </div>

            <div className="profile-detail-item neo-inset">
              <FaMapMarkerAlt className="profile-icon" />
              <span>Dhaka, Bangladesh | Manila, Philippines</span>
            </div>

            <div className="profile-detail-item neo-inset">
              <FaCalendarAlt className="profile-icon" />
              <span>9+ years experience</span>
            </div>

            <div className="profile-detail-item neo-inset">
              <FaWhatsapp className="profile-icon" />
              <a href="https://wa.me/880145656565" className="whatsapp-link" target="_blank" rel="noopener noreferrer">
                +880 14 565 6565
              </a>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-number animate-pulse">128</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-number animate-pulse">75</div>
              <div className="stat-label">Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-number animate-pulse">3</div>
              <div className="stat-label">Awards</div>
            </div>
          </div>
        </div>

        <div className="about-bio neo-flat">
          <h3 className="bio-title accent-gradient">About Me</h3>

          <div className="bio-text">
            <p>
              Hello! I'm a passionate web developer and designer with a keen eye for creating beautiful, functional, and
              user-friendly websites and applications.
            </p>

            <p>
              My journey in web development started 5 years ago, and I've been in love with creating digital experiences
              ever since. I specialize in modern frontend technologies and have a strong foundation in UI/UX design
              principles.
            </p>

            <p>
              When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or
              enjoying outdoor activities.
            </p>
          </div>

          <div className="skills-container">
            <h4 className="skills-title">My Skills</h4>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar neo-inset">
                    <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bio-actions">
            <button className="neo-button glow">
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

