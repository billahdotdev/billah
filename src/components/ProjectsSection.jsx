"use client"

import { useState } from "react"
import "../styles/ProjectsSection.css"

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Works" },
    { id: "design", name: "Design Works" },
    { id: "xyz", name: "XYZ" },
  ]

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with product catalog, shopping cart, user authentication, and payment integration.",
      image:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      github: "https://github.com/yourusername/ecommerce-platform",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "web",
    },
    {
      title: "Portfolio Website",
      description:
        "A responsive portfolio website for a creative professional, featuring project showcases, contact form, and blog integration.",
      image:
        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      github: "https://github.com/yourusername/portfolio-website",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      category: "web",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, task assignments, and progress tracking features.",
      image:
        "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      github: "https://github.com/yourusername/task-management-app",
      technologies: ["React", "Firebase", "Material UI"],
      category: "web",
    },
    {
      title: "Brand Identity System",
      description:
        "Complete brand identity design including logo, color palette, typography, and brand guidelines for a tech startup.",
      image:
        "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      github: "https://github.com/yourusername/brand-identity-system",
      technologies: ["Adobe Illustrator", "Adobe Photoshop", "Figma"],
      category: "design",
    },
    {
      title: "Mobile App UI Design",
      description:
        "User interface design for a fitness tracking mobile application with a focus on user experience and accessibility.",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      github: "https://github.com/yourusername/mobile-app-ui-design",
      technologies: ["Figma", "Sketch", "Prototyping"],
      category: "design",
    },
    {
      title: "Product Packaging Design",
      description:
        "Creative packaging design for a premium skincare product line, including box design, labels, and promotional materials.",
      image:
        "https://images.unsplash.com/photo-1636622433525-127afdf3662d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      github: "https://github.com/yourusername/product-packaging-design",
      technologies: ["Adobe Illustrator", "Mockup Design", "Print Design"],
      category: "design",
    },
    {
      title: "Blockchain Explorer",
      description:
        "A web-based blockchain explorer that allows users to search and view transaction details, blocks, and wallet information.",
      image:
        "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      github: "https://github.com/yourusername/blockchain-explorer",
      technologies: ["Web3.js", "React", "Node.js"],
      category: "xyz",
    },
    {
      title: "AR Product Visualization",
      description:
        "Augmented reality application that allows customers to visualize products in their own space before purchasing.",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      github: "https://github.com/yourusername/ar-product-visualization",
      technologies: ["ARKit", "Unity", "3D Modeling"],
      category: "xyz",
    },
    {
      title: "IoT Home Automation",
      description:
        "Smart home automation system that integrates various IoT devices and provides a unified control interface.",
      image:
        "https://images.unsplash.com/photo-1558002038-bb0237f4e204?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      github: "https://github.com/yourusername/iot-home-automation",
      technologies: ["Raspberry Pi", "MQTT", "Node.js"],
      category: "xyz",
    },
  ]

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  const handleWhatsAppConnect = () => {
    const message = "Hi, I'm interested in discussing a potential project with you."
    const whatsappUrl = `https://wa.me/8801713401889?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  const handleMakeItYours = (projectTitle) => {
    const message = `Hi, I'm interested in the "${projectTitle}" project. I'd like to make it mine!`
    const whatsappUrl = `https://wa.me/8801713401889?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="container">
      <h2 className="section-title">Projects</h2>

      <div className="projects-intro neomorphic">
        <p>
          Here are some of the recent projects I've worked on. Each project represents my commitment to creating
          high-quality, user-friendly web applications that solve real-world problems and deliver exceptional user
          experiences.
        </p>
      </div>

      {/* Category Filter */}
      <div className="project-categories">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button neomorphic ${activeCategory === category.id ? "active" : ""}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <div key={index} className="project-card neomorphic">
            <div className="project-image">
              <img
                src={project.image || "/placeholder.svg"}
                alt={`${project.title} thumbnail`}
                crossOrigin="anonymous"
                loading="lazy"
              />
              <div className="project-technologies">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-actions">
                <a
                  href={project.github}
                  className="project-link"
                  aria-label={`View ${project.title} on GitHub`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
                <button
                  onClick={() => handleMakeItYours(project.title)}
                  className="make-yours-button neomorphic-button whatsapp-button"
                  aria-label={`Contact about ${project.title} project`}
                >
                  <span className="whatsapp-icon" aria-hidden="true"></span>
                  Let's Make It Yours!
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="projects-cta neomorphic">
        <h3>Have a Project in Mind?</h3>
        <p>
          I'm always open to new opportunities and collaborations. If you have a project you'd like to discuss, let's
          connect and bring your ideas to life.
        </p>
        <button onClick={handleWhatsAppConnect} className="neomorphic-button whatsapp-button">
          <span className="whatsapp-icon" aria-hidden="true"></span>
          Discuss Your Project
        </button>
      </div>
    </div>
  )
}

export default ProjectsSection

