import "../styles/WhoAmI.css"

const WhoAmI = () => {
  const whatsappLink = "https://wa.me/880167567656"

  return (
    <section id="whoami" className="section whoami-section">
      <div className="container">
        <h2 className="section-title">Who Am I?</h2>

        <div className="profile-container">
          <div className="profile-image">
            <img src="https://avatars.githubusercontent.com/u/112099343?v=4" alt="Developer Profile" />
          </div>

          <div className="profile-content">
            <p className="greeting">Hello, I'm</p>
            <h1 className="name">Masum Billah</h1>
            <p className="title">Full Stack Web Developer</p>
            <p className="bio">
              I'm a passionate web developer with over 5 years of experience creating modern, responsive websites and
              web applications. I specialize in front-end development with React and back-end development with Node.js.
              I love solving complex problems and turning ideas into reality through clean, efficient code.
            </p>

            <div className="cta-buttons">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn cta-btn">
                <span className="btn-icon">💬</span>
                Contact Me
              </a>
              <a href="/john-doe-cv.pdf" download className="btn cta-btn secondary">
                <span className="btn-icon">📄</span>
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoAmI

