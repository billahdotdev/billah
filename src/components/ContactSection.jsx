"use client"

import { useState } from "react"
import "../styles/ContactSection.css"
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheck,
  FaSpinner,
  FaWhatsapp,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa"

function ContactSection({ darkMode }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setFormStatus({ submitting: true, submitted: false, error: null })

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setFormStatus({ submitting: false, submitted: true, error: null })
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus({ submitting: false, submitted: false, error: null })
      }, 5000)
    }, 1500)
  }

  const socialLinks = [
    { icon: <FaGithub />, label: "GitHub", url: "https://github.com" },
    { icon: <FaTwitter />, label: "Twitter", url: "https://twitter.com" },
    { icon: <FaLinkedin />, label: "LinkedIn", url: "https://linkedin.com" },
    { icon: <FaInstagram />, label: "Instagram", url: "https://instagram.com" },
  ]

  return (
    <section id="contact" className="section contact-section">
      <h2 className="section-title">Contact</h2>

      <div className="contact-container">
        <div className="contact-info neo-flat">
          <h3 className="contact-title accent-gradient">Get In Touch</h3>

          <p className="contact-intro">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon-container neo-circle animate-float">
                <FaEnvelope className="contact-icon" />
              </div>
              <div className="contact-text">
                <h4 className="contact-label">Email</h4>
                <a href="mailto:your.email@example.com" className="contact-value contact-link">
                  your.email@example.com
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon-container neo-circle animate-float">
                <FaPhone className="contact-icon" />
              </div>
              <div className="contact-text">
                <h4 className="contact-label">Phone</h4>
                <a href="tel:+11234567890" className="contact-value contact-link">
                  +1 (123) 456-7890
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon-container neo-circle animate-float">
                <FaWhatsapp className="contact-icon" />
              </div>
              <div className="contact-text">
                <h4 className="contact-label">WhatsApp</h4>
                <a
                  href="https://wa.me/880145656565"
                  className="contact-value contact-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +880 14 565 6565
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon-container neo-circle animate-float">
                <FaMapMarkerAlt className="contact-icon" />
              </div>
              <div className="contact-text">
                <h4 className="contact-label">Location</h4>
                <p className="contact-value">San Francisco, CA</p>
              </div>
            </div>
          </div>

          <div className="contact-map neo-inset">
            <div className="map-placeholder">
              <span>Google Map</span>
            </div>
          </div>

          <div className="social-links">
            <h4 className="social-title">Follow Me</h4>
            <div className="social-icons">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="social-icon neo-circle glow"
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

        <div className="contact-form-container neo-flat">
          <h3 className="contact-title accent-gradient">Send Message</h3>

          {formStatus.submitted ? (
            <div className="success-message neo-inset">
              <FaCheck className="success-icon animate-pulse" />
              <p>Your message has been sent successfully!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input neo-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input neo-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input neo-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="form-textarea neo-input"
                />
              </div>

              <button type="submit" className="submit-button neo-button glow" disabled={formStatus.submitting}>
                {formStatus.submitting ? (
                  <>
                    <FaSpinner className="submit-icon spinner" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="submit-icon" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactSection

