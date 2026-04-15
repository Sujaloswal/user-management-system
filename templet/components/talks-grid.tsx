import { TalkCard } from "./talk-card"
import type { TechTalk } from "@/lib/talks-data"

interface TalksGridProps {
  talks: TechTalk[]
  title?: string
}

export function TalksGrid({ talks, title = "All Talks" }: TalksGridProps) {
  if (talks.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-foreground mb-6 uppercase font-mono tracking-wider">{title}</h3>
            <div className="w-24 h-1 bg-foreground mx-auto mb-6"></div>
            <p className="text-foreground font-mono uppercase tracking-wide text-lg">
              NO TALKS FOUND MATCHING YOUR SEARCH.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-foreground mb-2 text-center uppercase font-mono tracking-wider">
          {title}
        </h3>
        <div className="text-center mb-12">
          <div className="inline-block bg-foreground text-background px-4 py-2 font-mono font-bold text-sm">
            {talks.length} TALKS
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {talks.map((talk) => (
            <TalkCard key={talk.id} talk={talk} />
          ))}
        </div>
      </div>
    </section>
  )
}
