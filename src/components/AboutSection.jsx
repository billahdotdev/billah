import "../styles/AboutSection.css"
import {
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDownload,
  FaLaptopCode,
  FaWhatsapp,
  FaPlusCircle,
  FaCircle,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaExternalLinkAlt,
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

  const socialLinks = [
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/your" },
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://linkedin.com/in/your" },
    { name: "Twitter", icon: <FaTwitter />, url: "https://twitter.com/your" },
    { name: "Instagram", icon: <FaInstagram />, url: "https://instagram.com/your" },
  ]

  return (
    <section id="about" className="section about-section">
      <h2 className="section-title">Who Am I?</h2>

      <div className="about-content">
        <div className="profile-card neo-flat">
          <div className="profile-image-container">
            <div className="profile-image-wrapper neo-flat">
              <img
                src="https://avatars.githubusercontent.com/u/11209jjj9343?v=4src/assets/mjjm.jpg"
                alt="Profile"
                className="profile-image"
              />
            </div>
          </div>

          <h3 className="profile-name accent-gradient">MASUM BILLAH</h3>
          <p className="profile-title">Web Developer | Branding Consultant at Brandotory </p>

          <div className="profile-details">
            <div className="profile-detail-item neo-inset">
              <FaUser className="profile-icon" />
              <span>Serious, and Curious.</span>
            </div>

            <div className="profile-detail-item neo-inset">
              <FaCircle className="profile-icon-green" />
              <span>Available for freelance works</span>
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
                +880 1713 40 1889
              </a>
            </div>
          </div>

          <div className="social-buttons">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="social-button neo-button-small"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
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
              <div className="stat-label">committers Rank</div>
            </div>
          </div>
        </div>

        <div className="about-bio neo-flat">
          <h3 className="bio-title accent-gradient">About Me</h3>

          <div className="bio-text">
            <h4>I'm a full-stack web developer dedicated to making online dreams a reality.</h4>
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

          <div className="my-container">
            <h4 className="my-title">My Story</h4>
            <p className="my-paragraph">
            I am passionate about JavaScript and web
                            technologies. Before the pandemic, I was just a
                            struggling entrepreneur in the clothing industry.
                            'GARMENTIK' is a company where I hustled as a
                            rainmaker. My business had its ups and downs, which
                            were stressful, but I was learning something new
                            every day. During the pandemic, I decided to bring
                            my passion into the business. Nowadays, two roles in
                            my real-life game are:
            </p>
            <div className="story-button-container">
              <a
                href="https://github.com/your"
                target="_blank"
                rel="noopener noreferrer"
                className="cute-button button-g"
              >
                GitHub <FaExternalLinkAlt className="external-icon" />
              </a>
              <a
                href="https://behance.net/your"
                target="_blank"
                rel="noopener noreferrer"
                className="cute-button button-b"
              >
                Behance <FaExternalLinkAlt className="external-icon" />
              </a>
            </div>
          </div>

          <div className="my-container">
            <h4 className="my-title">My Learning Odyssey</h4>
            <p className="my-paragraph">
            My journey into web development began with a curiosity about how websites work. What started as a hobby
              quickly evolved into a passion as I discovered the power of creating digital experiences that can impact
              people's lives. Through years of learning, experimenting, and building, I've developed a deep
              understanding of the web ecosystem and the skills needed to create exceptional digital products.
            </p>
            <div className="button-container">
              <a href="https://medium.com/your-blog" target="_blank" rel="noopener noreferrer" className="cute-button">
                Read My Blog <FaExternalLinkAlt className="external-icon" />
              </a>
            </div>
          </div>

          <div className="my-container">
            <h4 className="my-title">My Credentials</h4>
            <p className="my-paragraph">
            I'm a Bangladesh University of Engineering and Technology (BUET) certified full-stack web developer on a
            journey of modern web mastery at the University of Helsinki.
            </p>
            <div className="button-container">
              <a
                href="https://linkedin.com/in/your/certifications"
                target="_blank"
                rel="noopener noreferrer"
                className="cute-button"
              >
                View Certifications <FaExternalLinkAlt className="external-icon" />
              </a>
            </div>
          </div>

          <div className="bio-actions">
            <a href="/assets/CV.pdf" download className="neo-button glow">
              <FaDownload className="button-icon" /> Download CV
            </a>

            <a
              href="https://github.com/your"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-button-secondary"
            >
              <FaLaptopCode className="button-icon" /> View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

