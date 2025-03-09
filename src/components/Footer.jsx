"use client"

import { useState, useEffect } from "react"
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaHeart, FaCode, FaArrowUp, FaWhatsapp } from "react-icons/fa"
import "../styles/Footer.css"

function Footer({ darkMode, toggleTheme }) {
  const [currentYear] = useState(new Date().getFullYear())
  const [randomQuote, setRandomQuote] = useState("")

  const quotes = [
    "Design is not just what it looks like and feels like. Design is how it works.",
    "Simplicity is the ultimate sophistication.",
    "Good design is obvious. Great design is transparent.",
    "The details are not the details. They make the design.",
    "Every great design begins with an even better story.",
  ]

  const socialLinks = [
    { icon: <FaGithub />, label: "GitHub", url: "https://github.com" },
    { icon: <FaTwitter />, label: "Twitter", url: "https://twitter.com" },
    { icon: <FaLinkedin />, label: "LinkedIn", url: "https://linkedin.com" },
    { icon: <FaInstagram />, label: "Instagram", url: "https://instagram.com" },
    { icon: <FaWhatsapp />, label: "WhatsApp", url: "https://wa.me/880145656565" },
  ]

  useEffect(() => {
    // Set random quote
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setRandomQuote(quotes[randomIndex])
  }, [quotes])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className={`footer-container ${darkMode ? "dark" : ""}`}>
      <div className="footer-content-wrapper">
        <div className="footer-top">
          <div className="footer-quote neo-flat">
            <p className="quote-text">"{randomQuote}"</p>
          </div>

          <div className="footer-newsletter neo-flat">
            <h3 className="footer-heading accent-gradient">Stay Updated</h3>
            <p>Subscribe to my newsletter for the latest updates and insights.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" className="neo-input newsletter-input" required />
              <button type="submit" className="newsletter-button neo-button glow">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="footer-middle">
          <div className="footer-nav">
            <h3 className="footer-heading accent-gradient">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="#about" className="footer-link">
                  About Me
                </a>
              </li>
              <li>
                <a href="#services" className="footer-link">
                  Services
                </a>
              </li>
              <li>
                <a href="#works" className="footer-link">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#contact" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3 className="footer-heading accent-gradient">Contact</h3>
            <p>San Francisco, CA</p>
            <p>
              <a href="mailto:your.email@example.com" className="footer-contact-link">
                your.email@example.com
              </a>
            </p>
            <p>
              <a href="tel:+11234567890" className="footer-contact-link">
                +1 (123) 456-7890
              </a>
            </p>
            <p>
              <a
                href="https://wa.me/880145656565"
                className="footer-contact-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: +880 14 565 6565
              </a>
            </p>
          </div>

          <div className="footer-social">
            <h3 className="footer-heading accent-gradient">Connect</h3>
            <div className="social-icons-container">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="social-icon-link neo-circle glow"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            <p>© {currentYear} Your Name. All rights reserved.</p>
            <p className="footer-tagline">
              Crafted with <FaHeart className="heart-icon animate-pulse" /> and <FaCode className="code-icon" />
            </p>
          </div>

          <div className="footer-actions">
            <button onClick={scrollToTop} className="scroll-top-button neo-button-small" aria-label="Scroll to top">
              <FaArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

