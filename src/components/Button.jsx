"use client"

import { motion } from "framer-motion"
import "./Button.css"

const Button = ({
  children,
  onClick,
  type = "primary",
  size = "medium",
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <motion.button
      className={`animated-button ${type} ${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <span className="button-text">{children}</span>
      <span className="button-effect"></span>
    </motion.button>
  )
}

export default Button

