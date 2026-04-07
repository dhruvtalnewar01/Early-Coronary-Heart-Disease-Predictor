import AIPredictionHeader from "@/components/AIPredictionHeader";
import CHDMainHero from "@/components/CHDMainHero";
import CHDTextOverlay from "@/components/CHDTextOverlay";
import CHDScrollSections from "@/components/CHDScrollSections";

export default function Home() {
  return (
    <>
      {/* Hero Zone — scroll-driven animation section */}
      <main className="relative bg-black w-full" style={{ height: "400vh" }}>
        {/* 1. Sticky/Fixed 3D and UI Header */}
        <AIPredictionHeader />

        {/* 2. Scroll-bound Video/Canvas Player */}
        <CHDMainHero />

        {/* 3. Scroll-bound Text Overlay */}
        <CHDTextOverlay />

        {/* Scroll indicator */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none opacity-50">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-2">Scroll Sequence</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400 to-transparent" />
        </div>
      </main>

      {/* 4. Full Application Sections — below the hero animation */}
      <CHDScrollSections />
    </>
  );
}
