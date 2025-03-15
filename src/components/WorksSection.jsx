"use client"

import { useState } from "react"
import "../styles/WorksSection.css"
import { FaExternalLinkAlt, FaGithub, FaFilter, FaWhatsapp } from "react-icons/fa"

function WorksSection({ darkMode }) {
  const [activeFilter, setActiveFilter] = useState("all")

  const categories = [
    { id: "all", label: "All" },
    { id: "web", label: "Web" },
    { id: "mobile", label: "Design" },
    { id: "design", label: "Xyz" },
  ]

  const projects = [
    {
      title: "Restaurant Website",
      description: "A modern website for a restaurant with online reservation and menu display.",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      tags: ["Vite", "React", "CSS"],
      category: "web",
      liveLink: "https://billahdotdev.github.io/resto",
      githubLink: "https://billahdotdev.github.io/resto/",
      featured: false,
    },
    {
      title: "My Personal Site",
      description: "A customizable portfolio template for creative professionals with dark/light mode.",
      image:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      tags: ["React", "Vite", "GSAP", "CSS"],
      category: "web",
      liveLink: "https://billahdotdev.github.io/billah",
      githubLink: "https://billahdotdev.github.io/billah",
      featured: false,
    },
    {
      title: "E-Commerce Website",
      description: "A fully responsive e-commerce platform built with React and Stripe integration.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      tags: ["React", "CSS", "Stripe"],
      category: "web",
      liveLink: "https://safewear.com",
      githubLink: "https://billahdotdev.github.io/test",
      featured: true,
    },
    
    {
      title: "Task Management App",
      description: "A drag-and-drop task management application with user authentication.",
      image:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      tags: ["React", "Firebase", "React DnD"],
      category: "web",
      liveLink: "https://example.com",
      githubLink: "https://github.com",
      featured: false,
    },
    {
      title: "Mobile Fitness App",
      description: "A cross-platform fitness tracking app with workout plans and progress tracking.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      tags: ["React Native", "Firebase", "Redux"],
      category: "Design",
      liveLink: "https://example.com",
      githubLink: "https://github.com",
      featured: true,
    },
    
    {
      title: "UI Design System",
      description: "A comprehensive design system with components and guidelines for web applications.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      tags: ["Figma", "Design System", "UI/UX"],
      category: "design",
      liveLink: "https://example.com",
      githubLink: "https://github.com",
      featured: false,
    },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <section id="works" className="section works-section">
      <h2 className="section-title">Works</h2>

      <div className="works-filter">
        <div className="filter-icon animate-pulse">
          <FaFilter />
        </div>
        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-button neo-button-small ${activeFilter === category.id ? "active" : ""}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="works-grid">
        {filteredProjects.map((project, index) => (
          <div key={index} className={`project-card neo-flat ${project.featured ? "featured" : ""}`}>
            {project.featured && <div className="featured-badge">Featured</div>}
            <div className="project-image-container">
              <img src={project.image || "/placeholder.svg"} alt={project.title} className="project-image" />
              <div className="project-overlay">
                <a
                  href={project.liveLink}
                  className="overlay-link neo-button-small"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View live site"
                >
                  <FaExternalLinkAlt />
                </a>
                <a
                  href={project.githubLink}
                  className="overlay-link neo-button-small"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View GitHub repository"
                >
                  <FaGithub />
                </a>
              </div>
            </div>

            <div className="project-content">
              <h3 className="project-title accent-gradient">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="project-tag neo-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="project-category">
                <span className="category-label">Category:</span>
                <span className="category-value">{project.category}</span>
              </div>

              <a
                href={`https://wa.me/+8801711992558?text=Hi, I'm interested in your ${project.title} project.`}
                className="whatsapp-button neo-button glow"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="whatsapp-icon" />
                Let's make it yours
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WorksSection

