import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TalksGrid } from "@/components/talks-grid"
import DemoBanner from "@/components/demo-banner"
import { getAllTalks, getRandomTalk, isUsingDemoData } from "@/lib/talks-data"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [allTalks, randomTalk] = await Promise.all([getAllTalks().catch(() => []), getRandomTalk().catch(() => null)])

  return (
    <div className="min-h-screen bg-background">
      <Header allTalks={allTalks} />
      {isUsingDemoData() && (
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <DemoBanner />
        </div>
      )}
      <HeroSection randomTalk={randomTalk} />
      <TalksGrid talks={Array.isArray(allTalks) ? allTalks : []} title="All Talks" />
    </div>
  )
}
