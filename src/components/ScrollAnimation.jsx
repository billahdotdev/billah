"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const ScrollAnimation = ({
  children,
  animation = "fadeIn",
  duration = 0.5,
  delay = 0,
  threshold = 0.1,
  once = true,
  className = "",
  ...props
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    fadeInUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    fadeInDown: {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 },
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    zoomIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    zoomOut: {
      hidden: { opacity: 0, scale: 1.2 },
      visible: { opacity: 1, scale: 1 },
    },
    flip: {
      hidden: { opacity: 0, rotateY: 90 },
      visible: { opacity: 1, rotateY: 0 },
    },
    slideUp: {
      hidden: { y: 100 },
      visible: { y: 0 },
    },
    slideDown: {
      hidden: { y: -100 },
      visible: { y: 0 },
    },
  }

  const selectedAnimation = animations[animation]

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={selectedAnimation}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default ScrollAnimation

