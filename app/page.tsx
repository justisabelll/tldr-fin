import { ToolsPicker } from './components/tools';

export default function Home() {
  return (
    <div className="bg-stone-900 min-h-screen w-full text-white px-4">
      <header className="flex items-center justify-center p-6 sm:p-8 md:p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">tldr:fundamentals</h1>
          <p className="text-base sm:text-lg text-gray-300 mt-2">
            fastest fundamental analysis
          </p>
        </div>
      </header>
      <ToolsPicker />
    </div>
  );
}
