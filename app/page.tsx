import { ToolsPicker } from '@/components/tools';
import CompanyDisplay from '@/components/company-display';

export default function Home() {
  return (
    <div className="bg-stone-900 min-h-screen w-full text-white">
      <div className="max-w-5xl mx-auto px-6">
        <header className="pt-16 pb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
            <span className="text-white">tldr</span>
            <span className="text-amber-300">:</span>
            <span className="text-white">fundamentals</span>
          </h1>
          <p className="text-base md:text-lg text-stone-400 text-center mt-3 max-w-lg mx-auto">
            fastest fundamental analysis
          </p>
        </header>

        <CompanyDisplay />

        <main className="pb-24 pt-12">
          <div className="border-t border-stone-800 pt-10">
            <ToolsPicker />
          </div>
        </main>
      </div>
    </div>
  );
}
