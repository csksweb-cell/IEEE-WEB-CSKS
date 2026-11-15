import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { urlFor } from '../sanity/client'

export default function Navbar({ settings, theme, toggleTheme }) {
  const logoSrc = urlFor(settings?.logoRound)

  return (
    <motion.header
      className="nav-header"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="wrap">
        <div className="nav-pill glass">
          <motion.a
            href="#top"
            className="nav-logo"
            aria-label="IEEE CS Kerala Chapter"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {logoSrc && <img src={logoSrc} alt="IEEE CS Logo" />}
            <div className="nl-txt">
              {settings?.title && <b>{settings.title}</b>}
              <span>Kerala Chapter</span>
            </div>
          </motion.a>

          <nav className="nav-links">
            <a href="#story">Legacy</a>
            <a href="#work">What we do</a>
            <a href="#events">Events</a>
            <a href="#gallery">Gallery</a>
            <a href="#team">Team</a>
            <a href="#community">Community</a>
          </nav>

          <div className="nav-right">
            <motion.button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label="Toggle light and dark theme"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9, rotate: -20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            {settings?.membershipUrl && (
              <motion.a
                href={settings.membershipUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ padding: '0.65rem 1.35rem', fontSize: '0.84rem' }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                Join us
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}
