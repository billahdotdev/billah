import "../styles/Footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo neomorphic">
            <h2>Masum Billah (billahdotdev)</h2>
          </div>

          <div className="footer-links">
            <a href="#section-about">Who I Am?</a>
            <a href="#section-services">What I Do?</a>
            <a href="#section-resources">Resources</a>
            <a href="#section-contact">Contact</a>
          </div>

          <div className="footer-social">
          <a href="https://github.com/billahdotdev" className="social-icon" aria-label="GitHub" target="_blank">
          <span className="icon-github"></span>
           </a>
           <a href="https://www.linkedin.com/in/billahdotdev" className="social-icon" aria-label="LinkedIn" target="_blank">
          <span className="icon-linkedin"></span>
           </a>
           <a href="https://x.com/billahdotdev" className="social-icon" aria-label="X (formerly Twitter)" target="_blank">
          <span className="icon-x"></span>
          </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            {" "}
            {currentYear} Built by dreamers: Masum Billah. For dreamers. Deeply indebted to the individuals who I
            learned from. "NO RIGHT RESERVED".{" "}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

