"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import "./Loader.css"

const Loader = () => {
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState("")
  const fullText = "MASUM BILLAH"
  const textIndex = Math.floor((progress / 100) * fullText.length)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 20)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setText(fullText.substring(0, textIndex))
  }, [textIndex])

  return (
    <div className="loader">
      <motion.div
        className="loader-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="loader-logo"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
              d="M30 50L45 65L70 35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>

        <motion.div
          className="loader-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {text}
        </motion.div>

        <motion.div
          className="loader-progress"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="progress-container">
            <motion.div
              className="progress-bar"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            ></motion.div>
          </div>
          <div className="progress-text">{progress}%</div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Loader

