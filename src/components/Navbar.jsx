"use client"
import "../styles/Navbar.css"

function Navbar({ activeSection }) {
  const navItems = [
    { id: "about", label: "Who Am I?" },
    { id: "services", label: "What Do I Do?" },
    { id: "works", label: "Works" },
    { id: "contact", label: "Contact" },
  ]

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="navbar neo-flat">
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.id} className="nav-item">
            <button
              onClick={() => scrollToSection(item.id)}
              className={`neo-button ${activeSection === item.id ? "active" : ""}`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar

