import "../styles/ServicesSection.css"
import { FaCode, FaChartLine, FaBullhorn, FaPalette, FaLinux, } from "react-icons/fa"

function ServicesSection({ darkMode }) {
  const services = [
    {
      icon: <FaCode className="service-icon" />,
      title: "Web Development",
      description:
        "Building responsive, fast, and accessible websites using modern technologies like MongoDB, Express, React, Node, Next.js, CSS, and TailwindCSS.",
      features: [
        "Custom Websites",
        "SPA (Single Page Applications)",
        "E-commerce Solutions",
        "API Integration",
        "Domain and Hosting Solutions",
      ],
    },
    
    {
      icon: <FaChartLine className="service-icon" />,
      title: "SEO Optimization",
      description:
        "Improving website visibility and search engine rankings through technical SEO and content optimization.",
      features: ["Keyword Research", "On-page SEO", "Technical Audits", "Performance Optimization"],
    },
    {
      icon: <FaBullhorn className="service-icon" />,
      title: "Digital Marketing",
      description: "Creating targeted digital marketing strategies to grow your business online through SEO, PPC, social media, and more.",
      features: [
        "SEO Optimization",
        "PPC Campaigns",
        "Social Media Marketing",
        "Email Marketing",
        "Content Marketing",
        "Analytics & Reporting"
      ],
    },
    

    {
      icon: <FaPalette className="service-icon" />,
      title: "Branding Identity Design",
      description:
        "Crafting unique brand identities through logo design, typography, color schemes, and brand guidelines to communicate your brand’s story and values.",
      features: [
        "Logo Design",
        "Brand Strategy",
        "Typography & Color Schemes",
        "Brand Guidelines",
        "Visual Identity Systems",
        "Packaging Design"
      ],
    },
    
    
   
    {
      icon: <FaLinux className="service-icon" />,
      title: "Linux Migration",
      description:
        "Linux Migration Service helps transition from your current operating system to a Linux-based OS, ensuring a smooth migration to a more secure, open-source, and customizable environment.",
      features: [
        "Choosing the Right Linux Distribution",
        "Data Backup & Recovery",
        "OS Installation & Configuration",
        "Software Migration & Compatibility",
        "System Configuration & Optimization",
        "Ongoing Support & Maintenance"
      ],
    }
    
   
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
            <button className="service-button neo-button-small glow" onClick={() => window.open('https://github.com/billahdotdev', '_blank')}>
  Learn More
</button>

          </div>
        ))}
      </div>
    </section>
  )
}

export default ServicesSection

