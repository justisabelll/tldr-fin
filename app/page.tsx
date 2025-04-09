import { ToolsPicker } from '@/components/tools';
import CompanyDisplay from '@/components/company-display';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default function Home() {
  return (
    <div className="bg-background h-full w-screen text-foreground">
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="absolute top-6 right-6 z-10">
          <ModeToggle />
        </div>
        <header className="pt-16 pb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
            <span className="text-foreground">tldr</span>
            <span className="text-primary">:</span>
            <span className="text-foreground">fundamentals</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground text-center mt-3 max-w-lg mx-auto">
            fastest fundamental analysis
          </p>
        </header>

        <CompanyDisplay />

        <main className="pb-24 pt-12">
          <div className="border-t border-border pt-10">
            <ToolsPicker />
          </div>
        </main>
      </div>
    </div>
  );
}
