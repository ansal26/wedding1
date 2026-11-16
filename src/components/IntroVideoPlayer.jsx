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

  // Preload and pause video 1 at frame 0 so the gold door card is immediately visible
  useEffect(() => {
    if (video1Ref.current) {
      video1Ref.current.muted = true;
      video1Ref.current.preload = "auto";
      video1Ref.current.currentTime = 0;
      video1Ref.current.pause();
    }
    if (video2Ref.current) {
      video2Ref.current.muted = true;
      video2Ref.current.preload = "auto";
      video2Ref.current.load();
    }
  }, []);

  // When user taps the central seal on the door
  const handleOpenInvitation = () => {
    if (isOpen) return;
    setIsOpen(true);

    // 1. Play Video 1 immediately (Strictly muted, playsInline for iOS and Android)
    if (video1Ref.current) {
      video1Ref.current.muted = true;
      video1Ref.current.currentTime = 0;
      const playPromise = video1Ref.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }

    // 2. Preload Video 2 in background
    if (video2Ref.current) {
      video2Ref.current.muted = true;
      video2Ref.current.load();
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
            
            {/* 1. VIDEO 1: Displays initial closed gold door frame when paused, then plays when tapped */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 1 }}
              animate={{ opacity: videoStage === 1 ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <video
                ref={video1Ref}
                src="/v1.mp4"
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

                  {/* DEAD-CENTER SEAL BUTTON: Aligned perfectly to the gold door's mandala medallion (top-[50.2%] left-[50.4%]) */}
                  <div className="absolute top-[50.2%] left-[50.4%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    
                    {/* Concentric Golden Glowing Rings */}
                    <div className="absolute -inset-4 rounded-full bg-[#DFBA73]/30 blur-lg animate-pulse" />
                    <div className="absolute -inset-2 rounded-full border border-[#FFE29A]/60 animate-ping opacity-40" />

                    {/* Central Gold Medallion Button */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleOpenInvitation}
                      className="relative w-[92px] h-[92px] xs:w-[96px] xs:h-[96px] rounded-full bg-gradient-to-tr from-[#7A541C] via-[#C5A059] to-[#F5D88E] p-[3px] shadow-[0_12px_35px_rgba(0,0,0,0.65)] flex items-center justify-center cursor-pointer focus:outline-none"
                      aria-label="Tap to open wedding invitation"
                    >
                      {/* Inner Glass/Metallic Core */}
                      <div className="w-full h-full rounded-full bg-gradient-to-b from-[#2D1F17]/85 via-[#4A3423]/90 to-[#22160F]/95 border border-[#FFE29A]/80 backdrop-blur-xs flex flex-col items-center justify-center p-2 text-center shadow-inner">
                        <Sparkles className="w-4 h-4 text-[#FFD77A] mb-1 animate-spin" style={{ animationDuration: "9s" }} />
                        <span className="font-royal text-[11px] xs:text-xs font-bold tracking-[0.2em] uppercase text-[#FFFDF9] leading-tight drop-shadow-xs">
                          TAP TO
                        </span>
                        <span className="font-royal text-[11px] xs:text-xs font-bold tracking-[0.2em] uppercase text-[#DFBA73] leading-tight drop-shadow-xs">
                          OPEN
                        </span>
                        <Heart className="w-2.5 h-2.5 text-[#FFD77A] fill-[#FFD77A] mt-1" />
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
