import React, { useState } from 'react'
import { useTheme } from './hooks/useTheme'
import { useSanityData } from './hooks/useSanityData'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MarqueeStrip from './components/MarqueeStrip'
import StoryLegacy from './components/StoryLegacy'
import GallerySection from './components/GallerySection'
import Pillars from './components/Pillars'
import Stats from './components/Stats'
import Events from './components/Events'
import Team from './components/Team'
import CommunityCta from './components/CommunityCta'
import Footer from './components/Footer'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const { data } = useSanityData()
  const [preloaderDone, setPreloaderDone] = useState(false)

  const settings      = data?.settings      ?? null
  const hero          = data?.hero          ?? null
  const storyChapters = data?.storyChapters ?? null
  const galleryItems  = data?.galleryItems  ?? null
  const pillars       = data?.pillars       ?? null
  const stats         = data?.stats         ?? null
  const events        = data?.events        ?? null
  const teamMembers   = data?.teamMembers   ?? null

  return (
    <>
      
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      <div className="site-wrapper">
        <Navbar
          settings={settings}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <main>
          <Hero hero={hero} galleryItems={galleryItems} />
          <MarqueeStrip keywords={hero?.marqueeKeywords} />
          <StoryLegacy chapters={storyChapters} />
          <GallerySection items={galleryItems} />
          <Pillars pillars={pillars} />
          <Stats stats={stats} />
          <Events events={events} />
          <Team members={teamMembers} />
          <CommunityCta settings={settings} />
        </main>

        <Footer settings={settings} />
      </div>
    </>
  )
}
