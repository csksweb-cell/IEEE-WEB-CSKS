import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { urlFor } from '../sanity/client'

export default function Navbar({ settings, theme, toggleTheme, onOpenSanityModal, isLive }) {
  const logoSrc = urlFor(settings?.logoRound) || '/assets/img/logo-round.png'

  return (
    <header className="nav-header">
      <div className="wrap">
        <div className="nav-pill glass">
          <a href="#top" className="nav-logo" aria-label="IEEE CS Kerala Chapter">
            <img src={logoSrc} alt="IEEE CS Logo" />
            <div className="nl-txt">
              <b>{settings?.title || 'IEEE Computer Society'}</b>
              <span>Kerala Chapter</span>
            </div>
          </a>

          <nav className="nav-links">
            <a href="#story">Legacy</a>
            <a href="#work">What we do</a>
            <a href="#events">Events</a>
            <a href="#gallery">Gallery</a>
            <a href="#team">Team</a>
            <a href="#community">Community</a>
          </nav>

          <div className="nav-right">
            <button
              className="status-pill"
              onClick={onOpenSanityModal}
              title="Click to view Sanity connection & config"
            >
              <span className={`status-dot ${isLive ? '' : 'local'}`}></span>
              <span>{isLive ? 'Sanity Live' : 'Sanity Mode'}</span>
            </button>

            <button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label="Toggle light and dark theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href={settings?.membershipUrl || 'https://cs.ieeekerala.org'}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{ padding: '0.65rem 1.35rem', fontSize: '0.84rem' }}
            >
              <span className="dot"></span> Join us
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
