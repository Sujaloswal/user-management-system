import { unstable_cache } from "next/cache"

export interface TechTalk {
  id: string
  title: string
  speaker: string
  speakerTitle: string
  date: string
  duration: string
  description: string
  tags: string[]
  videoUrl: string
  featured?: boolean
  views?: string
  channel?: string
  maxsNote?: string
}

const YOUTUBE_URLS = [
  "https://www.youtube.com/watch?v=GMyg5ohTsVY",
  "https://www.youtube.com/watch?v=wo84LFzx5nI",
  "https://www.youtube.com/watch?v=0mCsluv5FXA",
  "https://www.youtube.com/watch?v=fks3PBodyiE",
  "https://www.youtube.com/watch?v=XrlrbfGZo2k",
  "https://www.youtube.com/watch?v=eQgxFuw8f1U",
  "https://www.youtube.com/watch?v=B1J2RMorJXM",
  "https://www.youtube.com/watch?v=gd5uJ7Nlvvo",
  "https://www.youtube.com/watch?v=-C-JoyNuQJs",
  "https://www.youtube.com/watch?v=M3BM9TB-8yA",
  "https://www.youtube.com/watch?v=NqKyHEJe9_w",
  "https://www.youtube.com/watch?v=pq1XqP4-qOo",
  "https://www.youtube.com/watch?v=JvBT4XBdoUE",
  "https://www.youtube.com/watch?v=8LGDM9exlZw",
  "https://www.youtube.com/watch?v=6avJHaC3C2U",
  "https://www.youtube.com/watch?v=-VuXIgp9S7o",
]

const MAX_NOTES: Record<string, string> = {
  "https://www.youtube.com/watch?v=0mCsluv5FXA": "The closest thing we have to a true modern day Herculean feat.",
  "https://www.youtube.com/watch?v=fks3PBodyiE": "Not a conference talk but too impressive to not include",
  "https://www.youtube.com/watch?v=-C-JoyNuQJs": "My favorite talk on the list.",
  "https://www.youtube.com/watch?v=-VuXIgp9S7o": "How to pitch a product",
}

const DEMO_TALKS: TechTalk[] = [
  {
    id: "demo-1",
    title: "The Future of Web Development",
    speaker: "Tech Conference",
    speakerTitle: "Keynote Speaker",
    date: "2024-01-15",
    duration: "42:30",
    description:
      "An exploration of emerging technologies and frameworks that will shape the future of web development...",
    tags: ["web", "future", "tech"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    channel: "Tech Conference",
    views: "1,234,567",
    maxsNote: "This is demo data - add your YouTube API key to see real talks!",
  },
  {
    id: "demo-2",
    title: "Building Scalable Applications",
    speaker: "Dev Summit",
    speakerTitle: "Senior Engineer",
    date: "2024-02-20",
    duration: "38:15",
    description: "Learn the principles and patterns for building applications that can scale to millions of users...",
    tags: ["scalability", "architecture"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    channel: "Dev Summit",
    views: "892,341",
  },
  {
    id: "demo-3",
    title: "Modern JavaScript Patterns",
    speaker: "JS World",
    speakerTitle: "JavaScript Expert",
    date: "2024-03-10",
    duration: "35:45",
    description: "Discover the latest JavaScript patterns and best practices for modern web development...",
    tags: ["javascript", "patterns"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    channel: "JS World",
    views: "567,890",
  },
  {
    id: "demo-4",
    title: "AI in Software Development",
    speaker: "AI Tech Talk",
    speakerTitle: "AI Researcher",
    date: "2024-04-05",
    duration: "45:20",
    description: "How artificial intelligence is transforming the way we write, test, and deploy software...",
    tags: ["ai", "development"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    channel: "AI Tech Talk",
    views: "1,456,789",
  },
]

export function isUsingDemoData(): boolean {
  return !process.env.YOUTUBE_API_KEY
}

function extractVideoId(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  return match ? match[1] : url.split("=")[1] || "unknown"
}

const fetchYouTubeMetadata = unstable_cache(
  async (videoId: string) => {
    if (!process.env.YOUTUBE_API_KEY) {
      throw new Error("YouTube API key not found")
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet,statistics,contentDetails`,
      { cache: "no-store" },
    )

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`)
    }

    const data = await response.json()
    return data.items[0]
  },
  ["youtube-metadata"],
  { revalidate: 86400 }, // 24 hours
)

async function createTalksFromYouTube(): Promise<TechTalk[]> {
  const talks: TechTalk[] = []

  for (const url of YOUTUBE_URLS) {
    const videoId = extractVideoId(url)

    try {
      const videoData = await fetchYouTubeMetadata(videoId)

      if (videoData) {
        const snippet = videoData.snippet
        const statistics = videoData.statistics
        const contentDetails = videoData.contentDetails

        // Parse duration from ISO 8601 format
        const duration = contentDetails.duration.replace("PT", "").replace("H", ":").replace("M", ":").replace("S", "")

        talks.push({
          id: videoId,
          title: snippet.title,
          speaker: snippet.channelTitle,
          speakerTitle: "Content Creator",
          date: new Date(snippet.publishedAt).toLocaleDateString(),
          duration: duration,
          description: snippet.description?.substring(0, 200) + "..." || "No description available",
          tags: ["tech", "programming"],
          videoUrl: url,
          channel: snippet.channelTitle,
          views: Number.parseInt(statistics.viewCount).toLocaleString(),
          maxsNote: MAX_NOTES[url],
        })
      }
    } catch (error) {
      console.error(`Failed to fetch data for ${videoId}:`, error)
      // Skip this video if API fails
      continue
    }
  }

  return talks
}

export async function getAllTalks(): Promise<TechTalk[]> {
  if (!process.env.YOUTUBE_API_KEY) {
    return DEMO_TALKS
  }
  return createTalksFromYouTube()
}

export async function getFeaturedTalks(): Promise<TechTalk[]> {
  if (!process.env.YOUTUBE_API_KEY) {
    return DEMO_TALKS.slice(0, 3)
  }
  const talks = await createTalksFromYouTube()
  return talks.slice(0, 3)
}

export async function searchTalks(query: string): Promise<TechTalk[]> {
  const talks = !process.env.YOUTUBE_API_KEY ? DEMO_TALKS : await createTalksFromYouTube()
  if (!query) return talks

  const lowercaseQuery = query.toLowerCase()
  return talks.filter(
    (talk) =>
      talk.title.toLowerCase().includes(lowercaseQuery) ||
      talk.speaker.toLowerCase().includes(lowercaseQuery) ||
      talk.description.toLowerCase().includes(lowercaseQuery),
  )
}

export async function getRandomTalk(): Promise<TechTalk | null> {
  const talks = !process.env.YOUTUBE_API_KEY ? DEMO_TALKS : await createTalksFromYouTube()
  if (talks.length === 0) return null

  const randomIndex = Math.floor(Math.random() * talks.length)
  return talks[randomIndex]
}
