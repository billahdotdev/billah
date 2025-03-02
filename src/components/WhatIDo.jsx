import "../styles/WhatIDo.css"

const WhatIDo = () => {
  const skills = [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "SEO", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Inkscape", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/inkscape/inkscape-original.svg" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "TailwindCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
   
    
  ]

  const services = [
    {
      name: "Web Development",
      icon: "🌐",
      description: "I create responsive and performant web applications using modern technologies and best practices.",
    },
    {
      name: "SEO",
      icon: "🔍",
      description: "I optimize websites to improve their visibility and ranking in search engine results pages.",
    },
    {
      name: "Digital Marketing",
      icon: "📈",
      description: "I develop and implement comprehensive digital marketing strategies to boost your online presence.",
    },
    {
      name: "Branding Design",
      icon: "🎨",
      description: "I create unique and memorable brand identities that resonate with your target audience.",
    },
  ]

  return (
    <section id="whatido" className="section whatido-section">
      <div className="container">
        <h2 className="section-title">What I Do</h2>

        <div className="skills-container">
          <h3 className="skills-title">My Skills</h3>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <img src={skill.icon || "/placeholder.svg"} alt={skill.name} className="skill-icon" />
                <span className="skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="services-container">
          <h3 className="services-title">Services I Offer</h3>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <span className="service-icon">{service.icon}</span>
                <h4 className="service-name">{service.name}</h4>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatIDo

