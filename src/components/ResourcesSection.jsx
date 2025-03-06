"use client"

import "../styles/ResourcesSection.css"

const ResourcesSection = () => {
  const resources = [
    {
      title: "Modern JavaScript Guide",
      description:
        "A comprehensive guide to modern JavaScript features and best practices for building robust web applications.",
      image:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      link: "#",
      category: "Guide",
    },
    {
      title: "React Component Patterns",
      description:
        "Learn the most effective patterns for building reusable, maintainable React components that scale with your application.",
      image:
        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      link: "#",
      category: "Article",
    },
    {
      title: "CSS Grid Mastery",
      description:
        "Master CSS Grid layout with practical examples and techniques for creating complex, responsive layouts with ease.",
      image:
        "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      link: "#",
      category: "Tutorial",
    },
  ]

  const handleWhatsAppConnect = () => {
    const message = "Hi, I'm interested in receiving more resources and updates from you."
    const whatsappUrl = `https://wa.me/880171526536?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="container">
      <h2 className="section-title">Resources</h2>

      <div className="resources-intro neomorphic">
        <p>
          I'm passionate about sharing knowledge and helping others grow in their web development journey. Here are some
          free resources I've created that you might find useful for expanding your skills and staying up-to-date with
          the latest trends and technologies.
        </p>
      </div>

      <div className="resources-grid">
        {resources.map((resource, index) => (
          <div key={index} className="resource-card neomorphic">
            <div className="resource-image">
              <img src={resource.image || "/placeholder.svg"} alt={`${resource.title} thumbnail`} />
              <span className="resource-category">{resource.category}</span>
            </div>
            <div className="resource-content">
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <a href={resource.link} className="resource-link" aria-label={`Read more about ${resource.title}`}>
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="resources-cta neomorphic">
        <h3>Want More Resources?</h3>
        <p>
          Connect with me on WhatsApp to receive regular updates on new articles, tutorials, and resources to help you
          improve your web development skills.
        </p>
        <button onClick={handleWhatsAppConnect} className="neomorphic-button whatsapp-button">
          <span className="whatsapp-icon" aria-hidden="true"></span>
          Let's Chat
        </button>
      </div>
    </div>
  )
}

export default ResourcesSection

