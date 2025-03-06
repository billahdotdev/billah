"use client"

import { useState } from "react"
import "../styles/ServicesSection.css"

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      title: "Web Development",
      icon: "💻",
      description:
        "I build responsive, modern websites and web applications that work flawlessly across all devices. Using the latest technologies and best practices, I create solutions that are not only visually appealing but also performant and accessible.",
      skills: ["HTML5/CSS3", "JavaScript/TypeScript", "React", "React", "Next.js", "Node.js", "RESTful APIs"],
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
    },
    {
      title: "SEO",
      icon: "🔍",
      description:
        "I help businesses improve their online visibility and search engine rankings through comprehensive SEO strategies. From keyword research and on-page optimization to technical SEO and link building, I implement proven techniques to drive organic traffic to your website.",
      skills: ["Keyword Research", "On-Page SEO", "Technical SEO", "Link Building", "Content Strategy", "Analytics"],
      image:
        "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    },
    {
      title: "Digital Marketing",
      icon: "📱",
      description:
        "I develop and execute comprehensive digital marketing strategies to help businesses reach their target audience, increase brand awareness, and drive conversions. From social media marketing to email campaigns, I leverage various digital channels to achieve your marketing goals.",
      skills: [
        "Social Media Marketing",
        "Email Marketing",
        "Content Marketing",
        "PPC Advertising",
        "Analytics",
        "Marketing Automation",
      ],
      image:
        "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      title: "Branding Identity Design",
      icon: "🎨",
      description:
        "I create cohesive and memorable brand identities that resonate with your target audience and differentiate your business from competitors. From logo design to brand guidelines, I develop visual elements that effectively communicate your brand's values and personality.",
      skills: ["Logo Design", "Brand Guidelines", "Visual Identity", "Typography", "Color Theory", "Brand Strategy"],
      image:
        "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ]

  const handleWhatsAppQuote = () => {
    const message = `Hi, I'm interested in your ${services[activeService].title} service. Can you provide more information?`
    const whatsappUrl = `https://wa.me/880171526536?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="container">
      <h2 className="section-title">What Do I Do?</h2>

      <div className="services-container">
        <div className="services-tabs" role="tablist" aria-label="Services">
          {services.map((service, index) => (
            <button
              key={index}
              className={`service-tab neomorphic ${activeService === index ? "active" : ""}`}
              onClick={() => setActiveService(index)}
              role="tab"
              aria-selected={activeService === index}
              aria-controls={`service-panel-${index}`}
              id={`service-tab-${index}`}
            >
              <span className="service-icon" aria-hidden="true">
                {service.icon}
              </span>
              <span className="service-title">{service.title}</span>
            </button>
          ))}
        </div>

        {services.map((service, index) => (
          <div
            key={index}
            className={`service-content neomorphic ${activeService === index ? "active" : "hidden"}`}
            role="tabpanel"
            id={`service-panel-${index}`}
            aria-labelledby={`service-tab-${index}`}
            hidden={activeService !== index}
          >
            <div className="service-image">
              <img src={service.image || "/placeholder.svg"} alt={`${service.title} service illustration`} />
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>

            <div className="service-skills">
              <h4>Skills & Technologies:</h4>
              <div className="skills-list">
                {service.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="service-cta">
              <button className="neomorphic-button whatsapp-button" onClick={handleWhatsAppQuote}>
                <span className="whatsapp-icon" aria-hidden="true"></span>
                Let's Talk!
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServicesSection

