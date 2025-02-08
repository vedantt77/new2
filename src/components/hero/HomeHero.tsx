export function HomeHero() {
  return (
    <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
           Curated list of {' '}
          <span className="text-green-500">
            money making
          </span>{' '}
          startups💸
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          💌 Join our newsletter to receive free case studies, startup ideas, and insightful interviews with startup founders twice a week
        </p>
        <a 
          href="https://startupsad.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          🥳 Join our newsletter
        </a>
      </div>
    </section>
  );
}
