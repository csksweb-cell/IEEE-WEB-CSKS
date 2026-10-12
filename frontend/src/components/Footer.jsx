import React from 'react'
import { Linkedin, Instagram, Youtube, Twitter } from 'lucide-react'
import { urlFor } from '../sanity/client'

export default function Footer({ settings }) {
  const currentYear = new Date().getFullYear()
  const logoFull = urlFor(settings?.logo) || '/assets/img/logo-full.png'

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <img src={logoFull} alt="IEEE CS Kerala Chapter" />
            <p>
              IEEE Computer Society Kerala Chapter (IEEE CSKC). Four decades of advancing the theory, practice and joy of computing across Kerala. Powered by Sanity Content Lake.
            </p>
          </div>

          <div className="foot-col">
            <h4>Explore</h4>
            <a href="#story">Our legacy</a>
            <a href="#work">What we do</a>
            <a href="#events">Upcoming events</a>
            <a href="#gallery">Gallery</a>
          </div>

          <div className="foot-col">
            <h4>Community</h4>
            <a href="#community">Membership</a>
            <a href="#team">Leadership</a>
            <a href="https://cs.ieeekerala.org" target="_blank" rel="noreferrer">
              Official Portal
            </a>
          </div>

          <div className="foot-col">
            <h4>Connect</h4>
            <a href="https://cs.ieeekerala.org" target="_blank" rel="noreferrer">
              cs.ieeekerala.org
            </a>
            <a href="mailto:chair@cs.ieeekerala.org">Contact Chapter</a>
          </div>
        </div>

        <div className="foot-bottom">
          <span>
            © {currentYear} IEEE Computer Society Kerala Chapter. Redesign concept.
          </span>

          <div className="socials">
            <a
              href={settings?.socialLinks?.linkedin || 'https://www.linkedin.com/company/ieeecskerala/'}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={settings?.socialLinks?.instagram || 'https://www.instagram.com/ieeecskerala/'}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href={settings?.socialLinks?.x || 'https://x.com/ieeecskerala'}
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
            >
              <Twitter size={20} />
            </a>
            <a
              href={settings?.socialLinks?.youtube || 'https://www.youtube.com/@ieeecskerala'}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
