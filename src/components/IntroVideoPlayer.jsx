import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FastForward, Sparkles, Heart, Volume2, VolumeX } from "lucide-react";

export const IntroVideoPlayer = ({ onComplete }) => {
  // isOpen: false = waiting for user to tap the door medallion; true = video playing
  const [isOpen, setIsOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const videoRef = useRef(null);
  const endTimerRef = useRef(null);

  // Preload intro video on mount so it buffers immediately in phone memory
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.preload = "auto";
      try {
        videoRef.current.load();
      } catch (e) {}
    }
    return () => {
      if (endTimerRef.current) {
        clearTimeout(endTimerRef.current);
      }
    };
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  // When user taps the central 3D gold door medallion
  const handleOpenInvitation = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Play the single seamless full-length video (Doors open -> Entire royal wedding card celebration ~26.8s)
    if (videoRef.current) {
      // Avoid resetting currentTime if already near 0 to prevent re-buffering latency on mobile
      if (videoRef.current.currentTime > 0.3) {
        videoRef.current.currentTime = 0;
      }
      videoRef.current.muted = isMuted;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Unmuted autoplay restricted by browser, playing muted:", err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }

    // Safety fallback timer: auto-complete if video finishes (28.5s fallback for 26.87s video)
    if (endTimerRef.current) clearTimeout(endTimerRef.current);
    endTimerRef.current = setTimeout(() => {
      finishIntro();
    }, 28500);
  };

  const finishIntro = () => {
    if (isExiting) return;
    setIsExiting(true);
    if (endTimerRef.current) clearTimeout(endTimerRef.current);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 600);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#140E0A]/95 sm:bg-black/90 flex items-center justify-center p-0 sm:p-4 backdrop-blur-md select-none"
        >
          {/* Mobile container: Strictly mobile screen size (max-w-[430px]) on all devices */}
          <div className="relative w-full max-w-[430px] h-[100dvh] sm:h-[860px] sm:max-h-[92vh] sm:rounded-3xl sm:border sm:border-[#C5A059]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden bg-[#2D1F17] flex items-center justify-center">
            
            {/* INSTANT DOOR POSTER: Displays exact closed door frame with 0ms delay */}
            <img
              src="/door-poster.jpg"
              alt="Royal Wedding Closed Doors"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              loading="eager"
            />

            {/* SINGLE SEAMLESS INTRO VIDEO: Doors open smoothly & transitions into full wedding celebration */}
            <video
              ref={videoRef}
              src="/intro.mp4"
              poster="/door-poster.jpg"
              playsInline
              webkit-playsinline="true"
              preload="auto"
              onEnded={finishIntro}
              className="w-full h-full object-cover relative z-10"
            />

            {/* Cinematic subtle vignette overlay */}
            <div className="absolute inset-0 pointer-events-none z-15 bg-gradient-to-t from-black/50 via-transparent to-black/25" />

            {/* Sound Toggle Button at top right while video is playing */}
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-5 right-5 z-30"
              >
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 active:scale-95 backdrop-blur-md border border-[#C5A059]/50 text-[#F4DF9E] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-lg"
                  aria-label={isMuted ? "Unmute music" : "Mute music"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-[#F4DF9E]" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#F4DF9E]" />
                  )}
                </button>
              </motion.div>
            )}

            {/* TAP TO OPEN DOOR SEAL BUTTON: Sits over the central mandala medallion */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.25 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer pointer-events-auto"
                  onClick={handleOpenInvitation}
                >
                  {/* Subtle radial shadow to highlight the central medallion */}
                  <div className="absolute inset-0 bg-radial from-black/20 via-black/10 to-transparent pointer-events-none" />

                  {/* AUTHENTIC ROYAL GOLD DOOR MEDALLION BUTTON: Shifted slightly up & right to align with the door's 3D carved mandala */}
                  <div className="absolute top-[49.3%] left-[51.0%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    
                    {/* Harmonious golden aura matching the door's gold carvings */}
                    <div className="absolute -inset-3 rounded-full bg-[#DFBA73]/35 blur-md animate-pulse" />
                    <div className="absolute -inset-1.5 rounded-full border border-[#FFE29A]/70 animate-ping opacity-30" />

                    {/* Central 3D Embossed Gold Seal Medallion */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.07 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleOpenInvitation}
                      className="relative w-[88px] h-[88px] xs:w-[92px] xs:h-[92px] rounded-full bg-gradient-to-tr from-[#9E7329] via-[#F4DF9E] to-[#8C601E] p-[3px] shadow-[0_10px_28px_rgba(40,20,5,0.45),inset_0_2px_4px_rgba(255,255,255,0.7)] flex items-center justify-center cursor-pointer focus:outline-none transition-all"
                      aria-label="Tap to open wedding invitation"
                    >
                      {/* Inner 3D Royal Gold & Warm Ivory Enamel Face (Looks like part of the door itself) */}
                      <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FFFDF8] via-[#F9F0DB] to-[#E8D4A8] border-[1.5px] border-[#9E7329]/50 flex flex-col items-center justify-center p-1.5 text-center shadow-[inset_0_2px_5px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(140,90,30,0.25)] relative overflow-hidden">
                        
                        {/* Fine concentric ornamental inner coin border */}
                        <div className="absolute inset-[3px] rounded-full border border-dashed border-[#B88E3E]/60 pointer-events-none" />

                        {/* Top Royal Sparkle Icon */}
                        <Sparkles className="w-3.5 h-3.5 text-[#8C5D1F] mb-0.5 animate-spin relative z-10" style={{ animationDuration: "12s" }} />
                        
                        {/* Engraved Royal Text */}
                        <span className="font-cinzel text-[10px] xs:text-[10.5px] font-extrabold tracking-[0.24em] uppercase text-[#3D2513] leading-tight relative z-10 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                          TAP TO
                        </span>
                        <span className="font-cinzel text-[10px] xs:text-[10.5px] font-extrabold tracking-[0.24em] uppercase text-[#7A4B1A] leading-tight relative z-10 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                          OPEN
                        </span>
                        
                        {/* Bottom Auspicious Heart */}
                        <Heart className="w-2.5 h-2.5 text-[#9E7329] fill-[#9E7329] mt-0.5 relative z-10" />
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Discreet Skip Button at bottom right */}
            <div className="absolute bottom-6 right-5 z-30">
              <button
                type="button"
                onClick={finishIntro}
                className="px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/85 active:scale-95 backdrop-blur-md border border-[#C5A059]/40 text-white/90 hover:text-white text-[10px] font-sans font-semibold tracking-widest uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
                aria-label="Skip video"
              >
                <span>Skip</span>
                <FastForward className="w-3 h-3 text-[#F4DF9E]" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroVideoPlayer;
