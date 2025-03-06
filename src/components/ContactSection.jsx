"use client"

import { useState } from "react"
import "../styles/ContactSection.css"

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState({ type: "", message: "" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault()

    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        type: "error",
        message: "Please fill in all required fields",
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        type: "error",
        message: "Please enter a valid email address",
      })
      return
    }

    // Prepare WhatsApp message with form data
    const message = `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}
Message: ${formData.message}
    `.trim()

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/8801713401889?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")

    // Reset form after opening WhatsApp
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })

    setFormStatus({
      type: "success",
      message: "Your message has been sent via WhatsApp!",
    })
  }

  return (
    <div className="container">
      <h2 className="section-title">Contact</h2>

      <div className="contact-container">
        <div className="contact-info neomorphic">
          <h3>Get In Touch</h3>
          <p>
            Have a project in mind or want to discuss a potential collaboration? I'm always open to new opportunities
            and challenges. Feel free to reach out using the form or through any of the contact methods below.
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon" aria-hidden="true">
                📱
              </div>
              <div className="contact-text">
                <h4>WhatsApp</h4>
                <p>+880 171 340 1889</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon" aria-hidden="true">
                📧
              </div>
              <div className="contact-text">
                <h4>Email</h4>
                <p>billahdotdev@gmail.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon" aria-hidden="true">
                📍
              </div>
              <div className="contact-text">
                <h4>Location</h4>
                <p>Dhaka, Bangladesh | Manila, Philippines</p>
              </div>
            </div>
          </div>

          <div className="availability">
            <h4>Current Availability</h4>
            <div className="availability-status">
              <span className="status-indicator available" aria-hidden="true"></span>
              <p>Available for freelance projects</p>
            </div>
          </div>
        </div>

        <div className="contact-form neomorphic">
          <h3>Send Me a Message</h3>

          <form onSubmit={handleWhatsAppSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="neomorphic-inset"
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="neomorphic-inset"
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="neomorphic-inset"
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="neomorphic-inset"
                rows="5"
                required
                aria-required="true"
              ></textarea>
            </div>

            {formStatus.message && (
              <div className={`form-status ${formStatus.type}`} role="alert">
                {formStatus.message}
              </div>
            )}

            <button type="submit" className="neomorphic-button whatsapp-button">
              <span className="whatsapp-icon" aria-hidden="true"></span>
              Send Message via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactSection

