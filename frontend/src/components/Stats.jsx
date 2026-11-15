import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

function CounterItem({ value, suffix, label, index = 0 }) {
  const [displayValue, setDisplayValue] = useState(0)
  const itemRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let start = 0
          const end = parseInt(value, 10)
          const duration = 1500
          const stepTime = 30
          const totalSteps = duration / stepTime
          const increment = end / totalSteps

          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setDisplayValue(end)
              clearInterval(timer)
            } else {
              setDisplayValue(Math.floor(start))
            }
          }, stepTime)
        }
      },
      { threshold: 0.2 }
    )

    if (itemRef.current) observer.observe(itemRef.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <motion.div
      ref={itemRef}
      className="stat-item"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="stat-num">
        {displayValue}
        {suffix && <span style={{ fontSize: '0.7em', marginLeft: '2px' }}>{suffix}</span>}
      </div>
      <div className="stat-lbl">{label}</div>
    </motion.div>
  )
}

export default function Stats({ stats }) {
  if (!stats || stats.length === 0) return null

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="stats-strip">
          {stats.map((stat, idx) => (
            <CounterItem
              key={stat._id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
