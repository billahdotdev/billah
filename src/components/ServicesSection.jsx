import "../styles/ServicesSection.css"
import { FaCode, FaPalette, FaGlobe, FaMobile, FaServer, FaRocket } from "react-icons/fa"

function ServicesSection({ darkMode }) {
  const services = [
    {
      icon: <FaCode className="service-icon" />,
      title: "Web Development",
      description:
        "Building responsive, fast, and accessible websites using modern technologies like React, Next.js, and CSS.",
      features: ["Custom Websites", "Web Applications", "E-commerce Solutions", "API Integration"],
    },
    {
      icon: <FaPalette className="service-icon" />,
      title: "UI/UX Design",
      description:
        "Creating intuitive and visually appealing user interfaces with a focus on user experience and modern design trends.",
      features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    },
    {
      icon: <FaGlobe className="service-icon" />,
      title: "SEO Optimization",
      description:
        "Improving website visibility and search engine rankings through technical SEO and content optimization.",
      features: ["Keyword Research", "On-page SEO", "Technical Audits", "Performance Optimization"],
    },
    {
      icon: <FaMobile className="service-icon" />,
      title: "Mobile Development",
      description: "Developing cross-platform mobile applications using React Native and other modern frameworks.",
      features: ["iOS & Android Apps", "Progressive Web Apps", "App Store Submission", "App Maintenance"],
    },
    {
      icon: <FaServer className="service-icon" />,
      title: "Backend Development",
      description: "Building robust server-side applications and APIs to power your web and mobile applications.",
      features: ["Node.js/Express", "Database Design", "API Development", "Authentication Systems"],
    },
    {
      icon: <FaRocket className="service-icon" />,
      title: "Performance Optimization",
      description: "Optimizing web applications for speed, efficiency, and better user experience.",
      features: ["Load Time Reduction", "Code Optimization", "Asset Optimization", "Caching Strategies"],
    },
  ]

  return (
    <section id="services" className="section services-section">
      <h2 className="section-title">What Do I Do?</h2>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card neo-flat">
            <div className="service-icon-container neo-circle animate-float">{service.icon}</div>

            <h3 className="service-title accent-gradient">{service.title}</h3>
            <p className="service-description">{service.description}</p>

            <ul className="service-features">
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="service-feature-item">
                  {feature}
                </li>
              ))}
            </ul>
              {/* 
            <button className="service-button neo-button-small glow">Learn More</button> */}
            <button className="service-button neo-button-small glow" onClick={() => window.open('https://github.com', '_blank')}>
  Learn More
</button>

          </div>
        ))}
      </div>
    </section>
  )
}

export default ServicesSection

