"use client"

import { motion } from "framer-motion"
import "./Card.css"

const Card = ({ title, description, icon, delay = 0, className = "", onClick, hoverEffect = true }) => {
  return (
    <motion.div
      className={`card ${className} ${hoverEffect ? "hover-effect" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onClick={onClick}
      whileHover={hoverEffect ? { y: -10 } : {}}
    >
      {icon && (
        <motion.div
          className="card-icon"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.2, type: "spring" }}
          viewport={{ once: true }}
        >
          {icon}
        </motion.div>
      )}
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
        viewport={{ once: true }}
      >
        {description}
      </motion.p>
    </motion.div>
  )
}

export default Card

