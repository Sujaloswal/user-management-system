import { Calendar, Clock, User, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { TechTalk } from "@/lib/talks-data"

interface TalkCardProps {
  talk: TechTalk
  featured?: boolean
}

export function TalkCard({ talk, featured = false }: TalkCardProps) {
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop()
    return `https://www.youtube.com/embed/${videoId}`
  }

  return (
    <Card className="border-2 border-foreground bg-background flex flex-col h-full overflow-hidden">
      <div className="relative w-full aspect-video">
        <iframe
          src={getYouTubeEmbedUrl(talk.videoUrl)}
          title={talk.title}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {featured && (
          <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-3 py-1 font-mono text-xs font-bold uppercase">
            FEATURED
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-foreground text-background px-2 py-1 font-mono text-xs font-bold">
          {talk.duration}
        </div>
      </div>

      <CardContent className="p-4 border-t-2 border-foreground flex flex-col flex-1">
        <h3 className="font-bold text-lg mb-3 text-foreground uppercase tracking-wide leading-tight">{talk.title}</h3>

        <div className="flex items-center gap-2 text-foreground text-sm mb-3 font-mono">
          <User className="w-4 h-4" />
          <span className="font-bold uppercase">{talk.speaker}</span>
        </div>

        <div className="text-muted-foreground text-xs mb-3 font-mono uppercase">{talk.speakerTitle}</div>

        <div className="flex items-center gap-4 text-foreground text-xs mb-4 font-mono">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(talk.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{talk.duration}</span>
          </div>
        </div>

        {talk.maxsNote && (
          <div className="border-2 border-red-500 bg-background p-3 mb-4">
            <div className="font-mono text-xs font-bold uppercase text-red-500 mb-2">MAX'S NOTE:</div>
            <p className="font-mono text-sm text-foreground">{talk.maxsNote}</p>
          </div>
        )}

        <p className="text-foreground text-sm mb-4 font-mono leading-relaxed">{talk.description}</p>

        <div className="mt-auto pt-3 border-t border-foreground">
          <a
            href={talk.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-foreground hover:text-accent font-mono text-xs font-bold uppercase"
          >
            <ExternalLink className="w-4 h-4" />
            WATCH ON YOUTUBE
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
