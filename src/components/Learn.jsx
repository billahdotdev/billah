"use client"

import { useEffect, useRef, useState } from "react"
import "../styles/Learn.css"

const Learn = () => {
  const sectionRef = useRef(null)
  const [activeTab, setActiveTab] = useState("tutorials")

  useEffect(() => {
    // Animation on component mount
    const section = sectionRef.current
    if (section) {
      section.classList.add("fade-in")
    }
  }, [])

  return (
    <section className="learn-section" ref={sectionRef}>
      <div className="section-header">
        <h1>Learn</h1>
        <div className="underline"></div>
      </div>

      <div className="learn-intro neomorphic">
        <h2>Expand Your Knowledge</h2>
        <p>
          Welcome to the learning hub! Here you'll find tutorials, resources, and blog posts to help you improve your
          web development skills. Whether you're a beginner or an experienced developer, there's always something new to
          learn.
        </p>
      </div>

      <div className="tabs-container">
        <div className="tabs neomorphic">
          <button
            className={`tab-button ${activeTab === "tutorials" ? "active" : ""}`}
            onClick={() => setActiveTab("tutorials")}
          >
            Tutorials
          </button>
          <button
            className={`tab-button ${activeTab === "resources" ? "active" : ""}`}
            onClick={() => setActiveTab("resources")}
          >
            Resources
          </button>
          <button className={`tab-button ${activeTab === "blog" ? "active" : ""}`} onClick={() => setActiveTab("blog")}>
            Blog
          </button>
        </div>

        <div className="tab-content neomorphic">
          {activeTab === "tutorials" && (
            <div className="tutorials-content">
              <div className="tutorial-card">
                <div className="tutorial-header">
                  <h3>Getting Started with React</h3>
                  <span className="tutorial-level">Beginner</span>
                </div>
                <p>Learn the fundamentals of React, including components, props, state, and hooks.</p>
                <a href="#" className="tutorial-link neomorphic-button">
                  View Tutorial
                </a>
              </div>

              <div className="tutorial-card">
                <div className="tutorial-header">
                  <h3>CSS Grid Layout Mastery</h3>
                  <span className="tutorial-level">Intermediate</span>
                </div>
                <p>Master CSS Grid Layout to create complex and responsive web layouts with ease.</p>
                <a href="#" className="tutorial-link neomorphic-button">
                  View Tutorial
                </a>
              </div>

              <div className="tutorial-card">
                <div className="tutorial-header">
                  <h3>JavaScript ES6+ Features</h3>
                  <span className="tutorial-level">Intermediate</span>
                </div>
                <p>Explore modern JavaScript features that will improve your code quality and productivity.</p>
                <a href="#" className="tutorial-link neomorphic-button">
                  View Tutorial
                </a>
              </div>

              <div className="tutorial-card">
                <div className="tutorial-header">
                  <h3>Building a REST API with Node.js</h3>
                  <span className="tutorial-level">Advanced</span>
                </div>
                <p>Learn how to create a robust REST API using Node.js, Express, and MongoDB.</p>
                <a href="#" className="tutorial-link neomorphic-button">
                  View Tutorial
                </a>
              </div>
            </div>
          )}

          {activeTab === "resources" && (
            <div className="resources-content">
              <div className="resource-category">
                <h3>Development Tools</h3>
                <ul className="resource-list">
                  <li className="resource-item">
                    <a href="#" className="resource-link">
                      VS Code Extensions for Web Developers
                    </a>
                  </li>
                  <li className="resource-item">
                    <a href="#" className="resource-link">
                      Essential Chrome DevTools Tips
                    </a>
                  </li>
                  <li className="resource-item">
                    <a href="#" className="resource-link">
                      Git and GitHub Cheat Sheet
                    </a>
                  </li>
                </ul>
              </div>

              <div className="resource-category">
                <h3>Design Resources</h3>
                <ul className="resource-list">
                  <li className="resource-item">
                    <a href="#" className="resource-link">
                      Free Web Design Resources
                    </a>
                  </li>
                  <li className="resource-item">
                    <a href="#" className="resource-link">
                      Color Palette Generators
                    </a>
                  </li>
                  <li className="resource-item">
                    <a href="#" className="resource-link">
                      Typography Best Practices
                    </a>
                  </li>
                </ul>
              </div>

              <div className="resource-category">
                <h3>Learning Platforms</h3>
                <ul className="resource-list">
                  <li className="resource-item">
                    <a href="#" className="resource-link">
                      Top Online Courses for Web Developers
                    </a>
                  </li>
                  <li className="resource-item">
                    <a href="#" className="resource-link">
                      Free Coding Challenges and Exercises
                    </a>
                  </li>
                  <li className="resource-item">
                    <a href="#" className="resource-link">
                      Web Development Communities and Forums
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "blog" && (
            <div className="blog-content">
              <div className="blog-post">
                <h3>The Future of Web Development in 2023</h3>
                <div className="post-meta">
                  <span className="post-date">June 15, 2023</span>
                  <span className="post-category">Trends</span>
                </div>
                <p>Explore the emerging technologies and trends that will shape the future of web development...</p>
                <a href="#" className="read-more">
                  Read More
                </a>
              </div>

              <div className="blog-post">
                <h3>Optimizing Website Performance: A Comprehensive Guide</h3>
                <div className="post-meta">
                  <span className="post-date">May 28, 2023</span>
                  <span className="post-category">Performance</span>
                </div>
                <p>Learn practical techniques to improve your website's loading speed and overall performance...</p>
                <a href="#" className="read-more">
                  Read More
                </a>
              </div>

              <div className="blog-post">
                <h3>Accessibility in Web Design: Why It Matters</h3>
                <div className="post-meta">
                  <span className="post-date">April 10, 2023</span>
                  <span className="post-category">Accessibility</span>
                </div>
                <p>
                  Discover the importance of creating accessible websites and how to implement accessibility best
                  practices...
                </p>
                <a href="#" className="read-more">
                  Read More
                </a>
              </div>

              <div className="blog-post">
                <h3>From Junior to Senior Developer: Career Growth Tips</h3>
                <div className="post-meta">
                  <span className="post-date">March 5, 2023</span>
                  <span className="post-category">Career</span>
                </div>
                <p>
                  Practical advice for advancing your career in web development and reaching senior-level positions...
                </p>
                <a href="#" className="read-more">
                  Read More
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Learn

