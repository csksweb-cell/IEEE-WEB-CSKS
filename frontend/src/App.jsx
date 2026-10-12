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
import SanityModal from './components/SanityModal'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const { data, loading, isLive, projectId, dataset, message, updateConfig } = useSanityData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <>
      {/* Smooth Preloader */}
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      {/* Main Website Content */}
      <div className="site-wrapper">
        <Navbar
          settings={data.settings}
          theme={theme}
          toggleTheme={toggleTheme}
          onOpenSanityModal={() => setIsModalOpen(true)}
          isLive={isLive}
        />

        <main>
          <Hero hero={data.hero} galleryItems={data.galleryItems} />
          <MarqueeStrip keywords={data.hero?.marqueeKeywords} />
          <StoryLegacy chapters={data.storyChapters} />
          <GallerySection items={data.galleryItems} />
          <Pillars pillars={data.pillars} />
          <Stats stats={data.stats} />
          <Events events={data.events} />
          <Team members={data.teamMembers} />
          <CommunityCta settings={data.settings} />
        </main>

        <Footer settings={data.settings} />

        {/* Sanity Content Lake Connection Modal */}
        <SanityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          sanityMeta={{ isLive, projectId, dataset, message }}
          onUpdateConfig={updateConfig}
        />
      </div>
    </>
  )
}
