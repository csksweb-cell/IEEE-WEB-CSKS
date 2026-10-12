import React from 'react'
import confetti from 'canvas-confetti'

export default function CommunityCta({ settings }) {
  if (!settings) return null

  const handleConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#F5A623', '#FFC15A', '#D07E0C', '#FFFFFF'],
    })
  }

  return (
    <section className="section" id="community" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="community-banner">
          <span className="eyebrow" style={{ color: 'var(--amber-deep)' }}>
            Your seat is waiting
          </span>
          <h2>
            Come build the<br />next <em>decade</em>.
          </h2>
          <p>
            Students, professionals, tinkerers and veterans — IEEE CSKC is where the state's computing story keeps getting written. Add your chapter.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {settings.membershipUrl && (
              <a
                href={settings.membershipUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                onClick={handleConfetti}
              >
                <span className="dot"></span> Become a member
              </a>
            )}
            <a href="#events" className="btn btn-ghost">
              Attend an event
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
