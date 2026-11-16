import React, { useRef, useState } from "react";
import { PetalOverlay } from "./components/PetalOverlay";
import { IntroVideoPlayer } from "./components/IntroVideoPlayer";
import { PanelOneIntroduction } from "./components/PanelOneIntroduction";
import { PanelTwoCelebrations } from "./components/PanelTwoCelebrations";
import { PanelThreeDetails } from "./components/PanelThreeDetails";
import { WeddingStateProvider } from "./context/WeddingStateContext";
import { Calendar, Heart, ArrowUp, Film } from "lucide-react";

export function App() {
  const celebrationsRef = useRef(null);
  const detailsRef = useRef(null);

  // Intro video starts automatically on load without asking
  const [showIntro, setShowIntro] = useState(true);

  const scrollToSection = (section) => {
    if (section === "schedule" && celebrationsRef.current) {
      celebrationsRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "details" && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <WeddingStateProvider>
      <div className="min-h-screen bg-[#F5EFE7] text-[#443529] relative overflow-x-hidden antialiased flex flex-col items-center">
        {/* 1. CINEMATIC INTRO VIDEO ANIMATION (Runs automatically: 4s v1 + 10s v2 seamlessly cross-faded, strictly mobile frame size) */}
        {showIntro && (
          <IntroVideoPlayer onComplete={() => setShowIntro(false)} />
        )}

        {/* 2. FLOATING ROSE PETALS */}
        <PetalOverlay />

        {/* 3. MAIN WEDDING INVITATION WEBSITE (Keyed to showIntro so all sequential animations start fresh when intro ends) */}
        <main
          key={showIntro ? "loading-intro" : "active-invitation"}
          className="w-full max-w-[430px] mx-auto min-h-screen bg-[#FAF7F2] shadow-[0_15px_50px_rgba(70,50,30,0.15)] relative flex flex-col border-x border-[#E8DFC2]"
        >
          
          {/* Subtle Ambient Background Texture */}
          <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(#C5A059_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.035]" />

          {/* Panel 1: Wedding Introduction with Date at top, Sanskrit invocations & Indian cultural styling */}
          <PanelOneIntroduction />

          {/* Panel 2: Celebrations, Our Story, Live Countdown & Scroll01 Schedule */}
          <div ref={celebrationsRef} id="ceremonies">
            <PanelTwoCelebrations />
          </div>

          {/* Panel 3: Wedding Details, Venue Addresses & Family Helpline */}
          <div ref={detailsRef} id="details">
            <PanelThreeDetails />
          </div>

          {/* Quick Action Floating Bar */}
          <div className="sticky bottom-4 z-40 px-3 w-full max-w-[370px] mx-auto pointer-events-auto mt-4">
            <div className="bg-[#FFFDF9]/95 backdrop-blur-md border border-[#E3D7CA] rounded-full py-2 px-3 shadow-lg flex items-center justify-between">
              <button
                onClick={() => scrollToSection("top")}
                className="p-1.5 rounded-full hover:bg-[#F2ECE3] text-[#7C6656] hover:text-[#3D2E24] transition-colors cursor-pointer"
                aria-label="Back to top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>

              <div className="h-4 w-[1px] bg-[#E5DACD]" />

              <button
                onClick={() => setShowIntro(true)}
                className="flex items-center gap-1 px-2 py-1 text-[10px] font-sans font-semibold tracking-wider text-[#6E5544] hover:bg-[#F2ECE3] rounded-full transition-colors cursor-pointer"
                title="Watch Intro Video"
              >
                <Film className="w-3 h-3 text-[#C5A059]" />
                <span>INTRO</span>
              </button>

              <div className="h-4 w-[1px] bg-[#E5DACD]" />

              <button
                onClick={() => scrollToSection("schedule")}
                className="flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-sans font-semibold tracking-wider text-[#6E5544] hover:bg-[#F2ECE3] transition-colors cursor-pointer"
              >
                <Calendar className="w-3 h-3 text-[#9A7B61]" />
                <span>EVENTS</span>
              </button>

              <div className="h-4 w-[1px] bg-[#E5DACD]" />

              <button
                onClick={() => scrollToSection("details")}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#9A7B61] text-white rounded-full text-[10px] font-sans font-semibold tracking-wider shadow-xs hover:bg-[#85674F] active:bg-[#725741] transition-all cursor-pointer"
              >
                <Heart className="w-3 h-3 fill-current" />
                <span>VENUE</span>
              </button>
            </div>
          </div>

          {/* Bottom Safe Area Padding */}
          <div className="h-6 w-full" />
        </main>
      </div>
    </WeddingStateProvider>
  );
}

export default App;
