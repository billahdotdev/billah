"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./Work.css"

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("all")
  const [hoveredProject, setHoveredProject] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: "Minimalist E-commerce",
      category: "web",
      image:
        "https://images.unsplash.com/photo-1523289333742-be1143f6b766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      description: "A clean, minimal e-commerce website with a focus on user experience and product presentation.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "https://example.com",
      details:
        "This minimalist e-commerce platform was designed with a focus on showcasing products in a clean, uncluttered environment. The black and white aesthetic puts the focus on product imagery while providing an elegant shopping experience. Features include a responsive design, smooth animations, product filtering, cart functionality, and secure checkout with Stripe integration.",
    },
    {
      id: 2,
      title: "Photography Portfolio",
      category: "web",
      image:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1455&q=80",
      description: "A minimalist portfolio website for a photographer with image galleries and contact form.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP"],
      link: "https://example.com",
      details:
        "This photography portfolio was designed to showcase the photographer's work with minimal distractions. The black and white design creates a gallery-like experience, allowing the photographs to be the focal point. The site features smooth transitions between images, lazy loading for optimal performance, and a clean, intuitive navigation system.",
    },
    {
      id: 3,
      title: "Banking App",
      category: "mobile",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      description: "A mobile banking application with secure authentication and transaction history.",
      technologies: ["React Native", "Firebase", "Redux"],
      link: "https://example.com",
      details:
        "This mobile banking application was developed with a focus on security, usability, and clean design. The minimalist interface makes banking tasks intuitive and straightforward. Features include biometric authentication, real-time transaction tracking, budget management tools, and bill payment functionality. The app was built with React Native for cross-platform compatibility.",
    },
    {
      id: 4,
      title: "Restaurant Website",
      category: "web",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      description: "An elegant website for a high-end restaurant with online reservations and menu showcase.",
      technologies: ["Vue.js", "Express", "PostgreSQL"],
      link: "https://example.com",
      details:
        "This restaurant website combines elegant design with practical functionality. The black and white color scheme creates a sophisticated atmosphere that reflects the restaurant's high-end positioning. Features include an interactive menu with beautiful food photography, an online reservation system, chef profiles, and integration with review platforms. The site is fully responsive and optimized for all devices.",
    },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  const filters = [
    { id: "all", label: "All" },
    { id: "web", label: "Web" },
    { id: "design", label: "Design" },
  ]

  const openModal = (project) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <div className="work">
      <div className="container">
        <motion.h2
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          My Works
        </motion.h2>

        <div className="filters">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              className={`filter-btn hover-target ${activeFilter === filter.id ? "active" : ""}`}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>

        <div className="projects-grid">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card hover-target"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
                custom={index}
                layout
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="project-image-container">
                  <img src={project.image || "/placeholder.svg"} alt={project.title} className="project-image" />

                  <motion.div
                    className="project-overlay"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button
                      className="btn hover-target"
                      onClick={() => openModal(project)}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{
                        y: hoveredProject === project.id ? 0 : 20,
                        opacity: hoveredProject === project.id ? 1 : 0,
                      }}
                      transition={{ delay: 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details
                    </motion.button>
                  </motion.div>
                </div>

                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="project-tech">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && selectedProject && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal"
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close hover-target" onClick={closeModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="modal-content">
                <div className="modal-image">
                  <img src={selectedProject.image || "/placeholder.svg"} alt={selectedProject.title} />
                </div>

                <div className="modal-details">
                  <h3>{selectedProject.title}</h3>
                  <p className="modal-description">{selectedProject.details}</p>

                  <div className="modal-tech">
                    <h4>Technologies</h4>
                    <div className="tech-tags">
                      {selectedProject.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a href={selectedProject.link} className="btn hover-target" target="_blank" rel="noopener noreferrer">
                    Visit Project
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Work

