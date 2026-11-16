import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FastForward, Sparkles, Heart } from "lucide-react";

export const IntroVideoPlayer = ({ onComplete }) => {
  // isOpen: false = waiting for user to tap the central seal on the video card; true = video playing
  const [isOpen, setIsOpen] = useState(false);
  // videoStage: 1 = v1.mp4 (0 to 4s), 2 = v2.mp4 (4s to 14s)
  const [videoStage, setVideoStage] = useState(1);
  const [isExiting, setIsExiting] = useState(false);

  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  // Preload videos on mount so the door card is instantly buffered in phone memory
  useEffect(() => {
    if (video1Ref.current) {
      video1Ref.current.muted = true;
      video1Ref.current.preload = "auto";
      try {
        video1Ref.current.load();
      } catch (e) {}
    }
    if (video2Ref.current) {
      video2Ref.current.muted = true;
      video2Ref.current.preload = "auto";
      try {
        video2Ref.current.load();
      } catch (e) {}
    }
  }, []);

  // When user taps the central seal on the door
  const handleOpenInvitation = () => {
    if (isOpen) return;
    setIsOpen(true);

    // 1. Play Video 1 immediately (Strictly muted, playsInline for iOS and Android)
    if (video1Ref.current) {
      video1Ref.current.muted = true;
      const playPromise = video1Ref.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Video 1 play catch:", err);
        });
      }
    }

    // 2. Preload Video 2 in background
    if (video2Ref.current) {
      video2Ref.current.muted = true;
      try {
        video2Ref.current.load();
      } catch (e) {}
    }

    // 3. At 3.8s: Start Video 2 with smooth cross-fade
    const transitionTimer = setTimeout(() => {
      setVideoStage(2);
      if (video2Ref.current) {
        video2Ref.current.currentTime = 0;
        video2Ref.current.play().catch(() => {});
      }
    }, 3800);

    // 4. At 14.0s (4s of v1 + 10s of v2): Smoothly finish intro animation
    const endTimer = setTimeout(() => {
      finishIntro();
    }, 14000);

    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(endTimer);
    };
  };

  const finishIntro = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 700);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#140E0A]/95 sm:bg-black/90 flex items-center justify-center p-0 sm:p-4 backdrop-blur-md select-none"
        >
          {/* Mobile phone frame container: Strictly mobile screen size (max-w-[430px]) on all devices */}
          <div className="relative w-full max-w-[430px] h-[100dvh] sm:h-[860px] sm:max-h-[92vh] sm:rounded-3xl sm:border sm:border-[#C5A059]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden bg-[#2D1F17] flex items-center justify-center">
            
            {/* INSTANT PRELOADED DOOR POSTER: Guarantees the royal door is 100% visible behind the button immediately on mobile with 0 black flash */}
            <img
              src="/door-poster.jpg"
              alt="Royal Wedding Closed Doors"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              loading="eager"
            />

            {/* 1. VIDEO 1: Plays when tapped, seamlessly taking over from the instant poster */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 1 }}
              animate={{ opacity: videoStage === 1 ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <video
                ref={video1Ref}
                src="/v1.mp4"
                poster="/door-poster.jpg"
                muted
                playsInline
                webkit-playsinline="true"
                preload="auto"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* 2. VIDEO 2: Seamlessly cross-fades at 3.8s and plays for 10s */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: videoStage === 2 ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <video
                ref={video2Ref}
                src="/v2.mp4"
                muted
                playsInline
                webkit-playsinline="true"
                preload="auto"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Cinematic subtle vignette overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/55 via-transparent to-black/30" />

            {/* 3. TAP TO OPEN BUTTON OVERLAY: Placed EXACTLY over the central circle medallion of the gold doors */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.25 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
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

            {/* 4. Small Discreet Skip Button at bottom right */}
            <div className="absolute bottom-6 right-5 z-30">
              <button
                type="button"
                onClick={finishIntro}
                className="px-3.5 py-1.5 rounded-full bg-black/55 hover:bg-black/80 active:scale-95 backdrop-blur-md border border-white/30 text-white/90 hover:text-white text-[10px] font-sans font-semibold tracking-widest uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
                aria-label="Skip video"
              >
                <span>Skip</span>
                <FastForward className="w-3 h-3 text-[#EFE3D5]" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroVideoPlayer;
