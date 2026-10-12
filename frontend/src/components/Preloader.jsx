import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const duration = 1200 // 1.2s preloader
    const stepTime = 15
    const steps = duration / stepTime
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = Math.min(100, Math.round((currentStep / steps) * 100))
      setCount(progress)

      if (progress >= 100) {
        clearInterval(timer)
        setTimeout(() => {
          setVisible(false)
          if (onComplete) onComplete()
        }, 200)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pl-inner">
            <div className="pl-mark">
              <img src="/assets/img/logo-round.png" alt="IEEE CS Kerala Chapter" />
            </div>
            <div className="pl-word">
              <span>IEEE Computer Society</span>
              <span style={{ color: 'var(--amber-deep)' }}>Kerala Chapter</span>
            </div>
            <div className="pl-sub">
              <span>{count}%</span>
              <div className="pl-bar">
                <i style={{ width: `${count}%` }}></i>
              </div>
              <span>Loading the legacy</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
