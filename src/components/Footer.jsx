"use client"

import { useState, useEffect } from "react"
import emailjs from "@emailjs/browser"
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaHeart,
  FaCode,
  FaArrowUp,
  FaWhatsapp,
  FaCheck,
  FaSpinner,
} from "react-icons/fa"
import "../styles/Footer.css"

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

function Footer({ darkMode, toggleTheme }) {
  const [currentYear] = useState(new Date().getFullYear())
  const [randomQuote, setRandomQuote] = useState("")
  const [email, setEmail] = useState("")
  const [subscribeStatus, setSubscribeStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
  })

  const quotes = [
    
    "First, solve the problem. Then, write the code. — John Johnson.",
    "SEO is not something you do anymore. It's what happens when you do everything else right. — Chad Pollitt",
    "Design is the silent ambassador of your brand. — Paul Ran",
    "Your brand is what other people say about you when you're not in the room. — Jeff Bezos.",
    "Websites promote you 24/7: No employee will do that. — Paul Cookson",
    
  ]

  const socialLinks = [
    { icon: <FaGithub />, label: "GitHub", url: "https://github.com/billahdotdev" }, 
    { icon: <FaLinkedin />, label: "LinkedIn", url: "https://linkedin.com/in/billahdotdev" },
    { icon: <XIcon />, label: "X", url: "https://x.com/billahdotdev" },
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    setSubscribeStatus({ submitting: true, submitted: false, error: null })

    // EmailJS configuration
    // Replace these with your actual EmailJS service, template, and user IDs
   

    const serviceId = "service_oq048wf"
    const templateId = "template_bo33582"
    const publicKey = "taJeL_z2EJc_wyVlv"

    // Prepare template parameters
    const templateParams = {
      subscriber_email: FormData.email,
      subscription_date: new Date().toISOString(),
    }

    // Send email using EmailJS
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Subscription email sent successfully:", response)
        setSubscribeStatus({ submitting: false, submitted: true, error: null })
        setEmail("")

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubscribeStatus({ submitting: false, submitted: false, error: null })
        }, 5000)
      })
      .catch((error) => {
        console.error("Subscription email sending failed:", error)
        setSubscribeStatus({
          submitting: false,
          submitted: false,
          error: "Failed to subscribe. Please try again later.",
        })
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

            {subscribeStatus.submitted ? (
              <div className="newsletter-success">
                <FaCheck className="success-icon animate-pulse" />
                <p>Thank you for subscribing!</p>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="neo-input newsletter-input"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <button
                  type="submit"
                  className="newsletter-button neo-button glow"
                  disabled={subscribeStatus.submitting}
                >
                  {subscribeStatus.submitting ? (
                    <>
                      <FaSpinner className="spinner" />
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
            )}

            {subscribeStatus.error && (
              <div className="newsletter-error">
                <p>{subscribeStatus.error}</p>
              </div>
            )}
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
            <p>Dhaka, Manila</p>
            <p>
              <a href="mailto:your.email@example.com" className="footer-contact-link">
                billahdotdev@gmail.com
              </a>
            </p>
            <p>
              <a href="tel:+11234567890" className="footer-contact-link">
                +880 1711 99 2558
              </a>
            </p>
            <p>
              <a
                href="https://wa.me/880145656565"
                className="footer-contact-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: +880 1713 40 1889
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
            <p>v3. Built by dreamers: Masum Billah. For dreamers. Deeply indebted to the individuals who I
            learned from. "NO RIGHT RESERVED".</p>
            
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

