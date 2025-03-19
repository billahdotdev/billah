"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import "./CustomCursor.css"

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Use useCallback for event handlers
  const onMouseMove = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY })
    setIsVisible(true)
  }, [])

  const onMouseEnter = useCallback(() => {
    setHidden(false)
  }, [])

  const onMouseLeave = useCallback(() => {
    setHidden(true)
  }, [])

  const onMouseDown = useCallback(() => {
    setClicked(true)
  }, [])

  const onMouseUp = useCallback(() => {
    setClicked(false)
  }, [])

  const handleLinkHoverEvents = useCallback(() => {
    const handleMouseEnter = () => setLinkHovered(true)
    const handleMouseLeave = () => setLinkHovered(false)

    document.querySelectorAll("a, button, .btn, .hover-target").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      document.querySelectorAll("a, button, .btn, .hover-target").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  useEffect(() => {
    // Check if we're on a device with touch support
    if ("ontouchstart" in window) {
      return
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseenter", onMouseEnter)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)

    const cleanup = handleLinkHoverEvents()

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      cleanup()
    }
  }, [onMouseMove, onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, handleLinkHoverEvents])

  // Don't render the custom cursor on touch devices
  if ("ontouchstart" in window) {
    return null
  }

  return (
    <>
      <motion.div
        className={`cursor-dot ${clicked ? "clicked" : ""} ${hidden ? "hidden" : ""} ${isVisible ? "visible" : ""}`}
        style={{
          left: position.x,
          top: position.y,
        }}
        animate={{
          scale: clicked ? 0.8 : linkHovered ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
      <motion.div
        className={`cursor-outline ${clicked ? "clicked" : ""} ${linkHovered ? "link-hovered" : ""} ${hidden ? "hidden" : ""} ${isVisible ? "visible" : ""}`}
        style={{
          left: position.x,
          top: position.y,
        }}
        animate={{
          scale: clicked ? 1.2 : linkHovered ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
    </>
  )
}

export default CustomCursor

