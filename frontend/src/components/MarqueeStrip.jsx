import React from 'react'

export default function MarqueeStrip({ keywords }) {
  const items = keywords?.length
    ? keywords
    : ['Workshops', 'Hackathons', 'Distinguished Lectures', 'Student Branches', 'Research', 'Mentorship']

  // Duplicate for smooth continuous marquee loop
  const loopItems = [...items, ...items, ...items, ...items]

  return (
    <div className="strip" aria-hidden="true">
      <div className="strip-inner">
        {loopItems.map((word, idx) => (
          <span key={idx}>✦ {word}</span>
        ))}
      </div>
    </div>
  )
}
