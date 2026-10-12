import React, { useEffect, useState, useRef } from 'react'

function CounterItem({ value, suffix, label }) {
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
    <div ref={itemRef} className="stat-item">
      <div className="stat-num">
        {displayValue}
        {suffix && <span style={{ fontSize: '0.7em', marginLeft: '2px' }}>{suffix}</span>}
      </div>
      <div className="stat-lbl">{label}</div>
    </div>
  )
}

export default function Stats({ stats }) {
  if (!stats || stats.length === 0) return null

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="stats-strip">
          {stats.map((stat) => (
            <CounterItem
              key={stat._id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
