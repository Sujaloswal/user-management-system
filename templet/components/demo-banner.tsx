export default function DemoBanner() {
  return (
    <div className="border-4 border-red-500 bg-background p-4 mb-8">
      <div className="font-mono text-sm font-bold uppercase text-red-500 mb-2">DEMO MODE</div>
      <p className="font-mono text-sm text-foreground mb-2">
        This is demo data. To see real YouTube videos, add your YOUTUBE_API_KEY environment variable.
      </p>
      <p className="font-mono text-xs text-muted-foreground">
        Get your API key from the Google Cloud Console and add it to your project settings.
      </p>
    </div>
  )
}
