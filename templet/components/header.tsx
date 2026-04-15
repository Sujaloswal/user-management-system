"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { TechTalk } from "@/lib/talks-data"

interface HeaderProps {
  allTalks: TechTalk[]
}

export function Header({ allTalks }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const resultsSection = document.getElementById("search-results")
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <>
      <header className="bg-background border-b-4 border-foreground sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-foreground border-2 border-foreground flex items-center justify-center">
                <span className="text-background font-bold text-xl">T</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground uppercase tracking-wider">talksabout.tech</h1>
            </div>

            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="SEARCH TALKS..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-12 bg-background border-2 border-foreground focus:ring-0 focus:border-accent h-12 text-sm font-mono uppercase placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {searchQuery.trim() && <SearchResults query={searchQuery} allTalks={allTalks} />}
    </>
  )
}

function SearchResults({ query, allTalks }: { query: string; allTalks: TechTalk[] }) {
  const filteredTalks = allTalks.filter(
    (talk) =>
      talk.title.toLowerCase().includes(query.toLowerCase()) ||
      talk.speaker.toLowerCase().includes(query.toLowerCase()) ||
      talk.description.toLowerCase().includes(query.toLowerCase()) ||
      talk.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
  )

  return (
    <section id="search-results" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-foreground mb-2 text-center uppercase font-mono tracking-wider">
          SEARCH RESULTS
        </h3>
        <div className="text-center mb-12">
          <div className="inline-block bg-foreground text-background px-4 py-2 font-mono font-bold text-sm">
            {filteredTalks.length} TALKS FOUND
          </div>
        </div>
        {filteredTalks.length === 0 ? (
          <div className="text-center">
            <p className="text-foreground font-mono uppercase tracking-wide text-lg">
              NO TALKS FOUND MATCHING YOUR SEARCH.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTalks.map((talk) => (
              <TalkCard key={talk.id} talk={talk} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

import { TalkCard } from "./talk-card"
