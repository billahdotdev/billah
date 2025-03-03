"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import "./App.css"

// Lazy load components for code splitting
const WhoAmI = lazy(() => import("./components/WhoAmI"))
const WhatIDo = lazy(() => import("./components/WhatIDo"))
const Learn = lazy(() => import("./components/Learn"))
const Contact = lazy(() => import("./components/Contact"))

function App() {
  const [activeSection, setActiveSection] = useState("whoami")

  // Handle navigation
  const navigateTo = (section) => {
    setActiveSection(section)
    window.history.pushState({}, "", `#${section}`)
  }

  // Check URL hash on load
  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash) {
      setActiveSection(hash)
    }
  }, [])

  return (
    <div className="app">
      <Navbar activeSection={activeSection} navigateTo={navigateTo} />

      <main className="content">
        <Suspense
          fallback={
            <div className="loading-container">
              <div className="loading"></div>
            </div>
          }
        >
          {activeSection === "whoami" && <WhoAmI />}
          {activeSection === "whatido" && <WhatIDo />}
          {activeSection === "learn" && <Learn />}
          {activeSection === "contact" && <Contact />}
        </Suspense>
      </main>

      <Footer navigateTo={navigateTo} />
    </div>
  )
}

export default App

