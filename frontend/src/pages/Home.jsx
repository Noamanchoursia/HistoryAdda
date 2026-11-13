import { useTranslation } from 'react-i18next'
import { Hero } from '../components/home/Hero'
import { Introduction } from '../components/home/Introduction'
import { FeaturedWalks } from '../components/home/FeaturedWalks'
import { WhyHistoryAdda } from '../components/home/WhyHistoryAdda'
import { HowItWorks } from '../components/home/HowItWorks'
import { GalleryPreview } from '../components/home/GalleryPreview'
import { FounderStory } from '../components/home/FounderStory'
import { InstagramCTA } from '../components/home/InstagramCTA'
import { FinalCTA } from '../components/home/FinalCTA'

export const HomePage = () => {
  useTranslation()

  return (
    <main className="min-h-screen bg-warmwhite text-brown">
      <Hero />
      <Introduction />
      <FeaturedWalks />
      <WhyHistoryAdda />
      <HowItWorks />
      <GalleryPreview />
      <FounderStory />
      <InstagramCTA />
      <FinalCTA />
    </main>
  )
}
