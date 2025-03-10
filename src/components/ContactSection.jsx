"use client"

import { useState, useRef } from "react"
import "../styles/ContactSection.css"
import emailjs from "@emailjs/browser"
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheck,
  FaSpinner,
  FaWhatsapp,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa"

// Custom X (Twitter) icon since it's not in react-icons
function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

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

  const formRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus({ submitting: true, submitted: false, error: null })

    // EmailJS configuration
    // Replace these with your actual EmailJS service, template, and user IDs
    const serviceId = "service_snitw1p"
    const templateId = "template_liybhot"
    const publicKey = "taJeL_z2EJc_wyVlv"

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    }

    // Send email using EmailJS
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully:", response)
        setFormStatus({ submitting: false, submitted: true, error: null })
        setFormData({ name: "", email: "", subject: "", message: "" })

        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormStatus({ submitting: false, submitted: false, error: null })
        }, 5000)
      })
      .catch((error) => {
        console.error("Email sending failed:", error)
        setFormStatus({
          submitting: false,
          submitted: false,
          error: "Failed to send message. Please try again later.",
        })
      })
  }

  const socialLinks = [
    { icon: <FaGithub />, label: "GitHub", url: "https://github.com" },
    { icon: <XIcon />, label: "X", url: "https://x.com" },
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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017948551!3d37.75781499657633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1647043435933!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map of San Francisco"
              className="google-map"
            ></iframe>
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
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
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

              {formStatus.error && (
                <div className="error-message">
                  <p>{formStatus.error}</p>
                </div>
              )}

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

