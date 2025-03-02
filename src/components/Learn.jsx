import "../styles/Learn.css"

const Learn = () => {
  const blogPosts = [
    {
      title: "Getting Started with React Hooks",
      date: "March 15, 2023",
      excerpt: "Learn how to use React Hooks to simplify your components and manage state more effectively.",
      tags: ["React", "Hooks", "JavaScript"],
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      title: "Building RESTful APIs with Node.js",
      date: "February 28, 2023",
      excerpt: "A comprehensive guide to building scalable and secure RESTful APIs using Node.js and Express.",
      tags: ["Node.js", "API", "Express"],
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      title: "CSS Grid vs Flexbox: When to Use What",
      date: "January 10, 2023",
      excerpt: "Understand the differences between CSS Grid and Flexbox, and learn when to use each layout system.",
      tags: ["CSS", "Layout", "Web Design"],
      image: "/placeholder.svg?height=200&width=350",
    },
  ]

  const resources = [
    {
      title: "Web Development Roadmap",
      description: "A comprehensive guide to becoming a full-stack web developer, with resources and learning paths.",
      icon: "📚",
    },
    {
      title: "JavaScript Cheat Sheet",
      description: "A handy reference guide for JavaScript syntax, methods, and common patterns.",
      icon: "📝",
    },
    {
      title: "React Component Library",
      description: "A collection of reusable React components with documentation and examples.",
      icon: "🧩",
    },
    {
      title: "CSS Animation Tutorials",
      description: "Learn how to create engaging animations and transitions using CSS and JavaScript.",
      icon: "🎨",
    },
  ]

  return (
    <section id="learn" className="section learn-section">
      <div className="container">
        <h2 className="section-title">Learn</h2>

        <div className="blog-container">
          <h3 className="blog-title">Latest Blog Posts</h3>
          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <div key={index} className="blog-card">
                <div className="blog-image">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} />
                </div>
                <div className="blog-content">
                  <div className="blog-date">{post.date}</div>
                  <h4 className="blog-post-title">{post.title}</h4>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-tags">
                    {post.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="blog-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href="#" className="read-more">
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="resources-container">
          <h3 className="resources-title">Learning Resources</h3>
          <div className="resources-grid">
            {resources.map((resource, index) => (
              <div key={index} className="resource-card">
                <div className="resource-icon">{resource.icon}</div>
                <h4 className="resource-title">{resource.title}</h4>
                <p className="resource-description">{resource.description}</p>
                <a href="#" className="resource-link">
                  Explore
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Learn

