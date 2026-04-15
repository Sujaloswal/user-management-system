import { TalkCard } from "./talk-card"
import type { TechTalk } from "@/lib/talks-data"

interface HeroSectionProps {
  randomTalk: TechTalk | null
}

export function HeroSection({ randomTalk }: HeroSectionProps) {
  return (
    <section className="bg-background py-16 border-b-4 border-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-6xl font-bold text-foreground mb-6 uppercase tracking-wider font-mono">
            CURATED TECH TALKS
          </h2>
          <div className="w-32 h-1 bg-foreground mx-auto mb-6"></div>
          <p className="text-lg text-foreground max-w-3xl mx-auto font-mono uppercase tracking-wide leading-relaxed">
            THE MOST INSIGHTFUL TECH TALKS FROM INDUSTRY LEADERS.
            <br />
            JUST KIDDING. THEY ARE JUST TALKS THAT I LIKE.
          </p>
        </div>

        {randomTalk && (
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-8 text-center uppercase font-mono tracking-wider">
              RANDOM TALK
            </h3>
            <div className="max-w-2xl mx-auto">
              <TalkCard talk={randomTalk} featured />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
