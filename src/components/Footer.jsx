"use client"

import { useState, useEffect } from "react"
import Modal from "./Modal"
import "../styles/Footer.css"

const Footer = ({ navigateTo }) => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const PrivacyPolicy = () => (
    <div className="policy-content">
      <h3>Privacy Policy</h3>
      <p>Last updated: March 2024</p>

      <section>
        <h4>1. Information We Collect</h4>
        <p>We collect information that you provide directly to us, including:</p>
        <ul>
          <li>Name and contact information</li>
          <li>Communication preferences</li>
          <li>Project requirements and details</li>
        </ul>
      </section>

      <section>
        <h4>2. How We Use Your Information</h4>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide and maintain our services</li>
          <li>Respond to your requests and inquiries</li>
          <li>Send you updates and marketing communications</li>
        </ul>
      </section>

      <section>
        <h4>3. Information Sharing</h4>
        <p>We do not sell or share your personal information with third parties except as described in this policy.</p>
      </section>

      <section>
        <h4>4. Contact Us</h4>
        <p>If you have any questions about this Privacy Policy, please contact us.</p>
      </section>
    </div>
  )

  const TermsOfService = () => (
    <div className="policy-content">
      <h3>Terms of Service</h3>
      <p>Last updated: March 2024</p>

      <section>
        <h4>1. Acceptance of Terms</h4>
        <p>
          By accessing and using this website, you accept and agree to be bound by the terms and provision of this
          agreement.
        </p>
      </section>

      <section>
        <h4>2. Services</h4>
        <p>We provide web development, SEO, digital marketing, and brand identity services subject to these terms.</p>
      </section>

      <section>
        <h4>3. Intellectual Property</h4>
        <p>All content included on this website is the property of Mister Hope and protected by copyright laws.</p>
      </section>

      <section>
        <h4>4. Limitation of Liability</h4>
        <p>
          We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting
          from your use of our services.
        </p>
      </section>

      <section>
        <h4>5. Changes to Terms</h4>
        <p>
          We reserve the right to modify these terms at any time. Please review these terms periodically for changes.
        </p>
      </section>
    </div>
  )

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Social Media Icons */}
          <div className="social-icons-line">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon neomorphic"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon neomorphic"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon neomorphic"
              aria-label="X (formerly Twitter)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4l11.5 11.5M4 20L20 4" />
              </svg>
            </a>
          </div>

          {/* Policy Links */}
          <div className="policy-links-line">
            <button onClick={() => setShowPrivacy(true)} className="footer-link">
              Privacy Policy
            </button>
            <span className="separator">•</span>
            <button onClick={() => setShowTerms(true)} className="footer-link">
              Terms of Service
            </button>
          </div>

          {/* Copyright */}
          <div className="copyright-line">
            <p className="copyright">&copy; {currentYear} v0 NO RIGHT RESERVED. Built by dreamers: Masum Billah. For dreamers. Deeply indebted to the individuals who I learned from.</p>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button className="scroll-top-button neomorphic" onClick={scrollToTop} aria-label="Scroll to top">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}

      <Modal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title="Privacy Policy">
        <PrivacyPolicy />
      </Modal>

      <Modal isOpen={showTerms} onClose={() => setShowTerms(false)} title="Terms of Service">
        <TermsOfService />
      </Modal>
    </footer>
  )
}

export default Footer

