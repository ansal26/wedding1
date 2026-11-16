import React from "react";
import { motion } from "framer-motion";

/**
 * Authentic, Traditional Indian Wedding Lord Ganesha
 * Instantly recognizable, regal, and divine.
 */
export const GaneshaAnimated = ({ className = "w-20 h-20 mx-auto my-1" }) => (
  <motion.div
    initial={{ scale: 0.92, opacity: 0 }}
    animate={{ scale: [1, 1.04, 1], opacity: 1 }}
    transition={{
      scale: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
      opacity: { duration: 0.8 },
    }}
    className={`relative flex items-center justify-center ${className}`}
  >
    {/* Divine Golden Glow Aura */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#C5A059]/20 via-[#DFBA73]/30 to-[#801A1A]/10 blur-lg animate-pulse" />

    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full relative z-10 drop-shadow-[0_4px_12px_rgba(180,130,50,0.4)]"
    >
      <defs>
        <linearGradient id="ganeshaGold" x1="20" y1="10" x2="100" y2="110" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5D78E" />
          <stop offset="0.45" stopColor="#D4A017" />
          <stop offset="0.85" stopColor="#B37D14" />
          <stop offset="1" stopColor="#8A5A0A" />
        </linearGradient>

        <linearGradient id="ganeshaRed" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A81D1D" />
          <stop offset="1" stopColor="#7A1010" />
        </linearGradient>

        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Divine Prabhavali / Radiant Halo */}
      <circle
        cx="60"
        cy="60"
        r="54"
        stroke="url(#ganeshaGold)"
        strokeWidth="1.2"
        strokeDasharray="3 3"
        opacity="0.6"
      />
      <circle
        cx="60"
        cy="60"
        r="50"
        stroke="url(#ganeshaGold)"
        strokeWidth="0.8"
        opacity="0.4"
      />

      {/* Ornate Mukut (Divine Royal Crown) */}
      <path
        d="M48 34L60 12L72 34H48Z"
        fill="url(#ganeshaGold)"
        stroke="#801A1A"
        strokeWidth="1.2"
      />
      <path
        d="M43 36C52 33 68 33 77 36L72 33H48L43 36Z"
        fill="#801A1A"
      />
      {/* Crown Jewels & Kalash Finial */}
      <circle cx="60" cy="11" r="2.5" fill="#801A1A" />
      <circle cx="60" cy="22" r="2" fill="#801A1A" />
      <circle cx="53" cy="27" r="1.5" fill="#FFFDF9" />
      <circle cx="67" cy="27" r="1.5" fill="#FFFDF9" />
      <path d="M50 32C56 30 64 30 70 32" stroke="#FFFDF9" strokeWidth="1" strokeLinecap="round" />

      {/* Large Graceful Right Ear */}
      <path
        d="M44 38C26 38 22 56 36 64C40 66 43 64 45 60"
        fill="#FAF5EE"
        stroke="url(#ganeshaGold)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M33 46C28 48 28 58 36 58"
        stroke="#801A1A"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Earring (Kundal) Right */}
      <circle cx="28" cy="58" r="2.5" fill="url(#ganeshaGold)" stroke="#801A1A" strokeWidth="0.8" />

      {/* Large Graceful Left Ear */}
      <path
        d="M76 38C94 38 98 56 84 64C80 66 77 64 75 60"
        fill="#FAF5EE"
        stroke="url(#ganeshaGold)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M87 46C92 48 92 58 84 58"
        stroke="#801A1A"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Earring (Kundal) Left */}
      <circle cx="92" cy="58" r="2.5" fill="url(#ganeshaGold)" stroke="#801A1A" strokeWidth="0.8" />

      {/* Divine Head / Forehead */}
      <path
        d="M44 40C44 36 76 36 76 40C77 48 76 56 70 60C60 62 50 60 44 56V40Z"
        fill="#FAF5EE"
        stroke="url(#ganeshaGold)"
        strokeWidth="1.5"
      />

      {/* Sacred Trishul & Chandan Tilak on Forehead */}
      <path
        d="M58 35H62V46H58V35Z"
        fill="#A81D1D"
      />
      <path
        d="M53 38C55 42 65 42 67 38"
        stroke="#A81D1D"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="60" cy="48" r="2" fill="#D4A017" />
      <path
        d="M52 42C56 44 64 44 68 42"
        stroke="#D4A017"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Divine Eyes */}
      {/* Right Eye */}
      <path
        d="M47 48C49 46 53 47 54 49"
        stroke="#3D2E24"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="51" cy="49" r="1.2" fill="#3D2E24" />

      {/* Left Eye */}
      <path
        d="M66 49C67 47 71 46 73 48"
        stroke="#3D2E24"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="69" cy="49" r="1.2" fill="#3D2E24" />

      {/* Broken Tusk (Danta) Right */}
      <path
        d="M48 60L42 63"
        stroke="#FFFDF9"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Sacred Trunk (Vakratunda) Curving to the Left */}
      <path
        d="M56 52C56 64 45 72 48 83C51 90 62 92 68 87C74 82 72 74 65 72C61 71 58 74 60 77"
        stroke="url(#ganeshaGold)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M56 54C56 65 47 73 50 82C52 87 60 88 64 85"
        stroke="#A81D1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Modak (Sacred Sweet Laddu) resting on Trunk Tip */}
      <g transform="translate(62, 68)">
        <ellipse cx="6" cy="7" rx="5.5" ry="5" fill="#D4A017" stroke="#801A1A" strokeWidth="1" />
        <circle cx="6" cy="5" r="2" fill="#FFFDF9" />
        <path d="M6 3L6 6" stroke="#801A1A" strokeWidth="1" strokeLinecap="round" />
        <circle cx="3.5" cy="8" r="0.8" fill="#FFF" />
        <circle cx="8.5" cy="8" r="0.8" fill="#FFF" />
      </g>

      {/* Auspicious Lotus Base Petals */}
      <path
        d="M40 96C48 90 72 90 80 96C75 102 45 102 40 96Z"
        fill="#A81D1D"
        stroke="url(#ganeshaGold)"
        strokeWidth="1.2"
      />
      <circle cx="60" cy="95" r="2.5" fill="url(#ganeshaGold)" />
    </svg>
  </motion.div>
);

/**
 * Traditional Indian Ornamental Border Corners
 */
export const IndianCornerPattern = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
    {/* Top Left Corner Motif */}
    <svg
      viewBox="0 0 80 80"
      fill="none"
      className="absolute top-2 left-2 w-12 h-12 text-[#C5A059] opacity-80"
    >
      <path d="M4 4H45C30 8 8 30 4 45V4Z" fill="#C5A059" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="2.5" fill="#C5A059" />
      <path d="M4 14C10 14 14 10 14 4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 26C18 26 26 18 26 4" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="4" cy="4" r="3" fill="#801A1A" />
    </svg>

    {/* Top Right Corner Motif */}
    <svg
      viewBox="0 0 80 80"
      fill="none"
      className="absolute top-2 right-2 w-12 h-12 text-[#C5A059] opacity-80 scale-x-[-1]"
    >
      <path d="M4 4H45C30 8 8 30 4 45V4Z" fill="#C5A059" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="2.5" fill="#C5A059" />
      <path d="M4 14C10 14 14 10 14 4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 26C18 26 26 18 26 4" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="4" cy="4" r="3" fill="#801A1A" />
    </svg>

    {/* Bottom Left Corner Motif */}
    <svg
      viewBox="0 0 80 80"
      fill="none"
      className="absolute bottom-2 left-2 w-12 h-12 text-[#C5A059] opacity-80 scale-y-[-1]"
    >
      <path d="M4 4H45C30 8 8 30 4 45V4Z" fill="#C5A059" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="2.5" fill="#C5A059" />
      <path d="M4 14C10 14 14 10 14 4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 26C18 26 26 18 26 4" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="4" cy="4" r="3" fill="#801A1A" />
    </svg>

    {/* Bottom Right Corner Motif */}
    <svg
      viewBox="0 0 80 80"
      fill="none"
      className="absolute bottom-2 right-2 w-12 h-12 text-[#C5A059] opacity-80 scale-x-[-1] scale-y-[-1]"
    >
      <path d="M4 4H45C30 8 8 30 4 45V4Z" fill="#C5A059" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="2.5" fill="#C5A059" />
      <path d="M4 14C10 14 14 10 14 4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 26C18 26 26 18 26 4" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="4" cy="4" r="3" fill="#801A1A" />
    </svg>
  </div>
);

/**
 * Small filled warm heart used throughout Image 1 dividers
 */
export const HeartIcon = ({ className = "w-2.5 h-2.5 text-[#9A7B61]" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

/**
 * Botanical Floral Garland matching the exact illustration in Image 1
 */
export const FloralGarland = ({ className = "w-full max-w-[280px] h-auto my-3" }) => (
  <div className={`flex justify-center items-center ${className}`}>
    <svg
      viewBox="0 0 320 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto drop-shadow-xs"
    >
      <path
        d="M20 30C55 24 95 32 135 30"
        stroke="#C5A059"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M300 30C265 24 225 32 185 30"
        stroke="#C5A059"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      <path d="M45 28C40 22 46 16 52 18C58 20 54 26 45 28Z" fill="#C5B6A5" opacity="0.85" />
      <path d="M75 32C72 38 78 44 85 41C91 38 86 32 75 32Z" fill="#B8A795" opacity="0.8" />
      <path d="M100 28C98 20 106 16 112 19C118 22 113 28 100 28Z" fill="#C9BBAE" opacity="0.85" />
      <path d="M125 33C122 40 130 45 136 41C142 37 137 31 125 33Z" fill="#B4A28F" opacity="0.8" />

      <path d="M275 28C280 22 274 16 268 18C262 20 266 26 275 28Z" fill="#C5B6A5" opacity="0.85" />
      <path d="M245 32C248 38 242 44 235 41C229 38 234 32 245 32Z" fill="#B8A795" opacity="0.8" />
      <path d="M220 28C222 20 214 16 208 19C202 22 207 28 220 28Z" fill="#C9BBAE" opacity="0.85" />
      <path d="M195 33C198 40 190 45 184 41C178 37 183 31 195 33Z" fill="#B4A28F" opacity="0.8" />

      <circle cx="65" cy="22" r="2.2" fill="#C5A059" opacity="0.9" />
      <circle cx="85" cy="20" r="1.8" fill="#DFBA73" opacity="0.9" />
      <circle cx="115" cy="38" r="2" fill="#C5A059" opacity="0.9" />
      <circle cx="255" cy="22" r="2.2" fill="#C5A059" opacity="0.9" />
      <circle cx="235" cy="20" r="1.8" fill="#DFBA73" opacity="0.9" />
      <circle cx="205" cy="38" r="2" fill="#C5A059" opacity="0.9" />

      <g transform="translate(136, 17)">
        <ellipse cx="12" cy="12" rx="10" ry="9" fill="#E6C4B2" opacity="0.9" />
        <path d="M7 11C8 7 15 7 17 11C18 15 13 18 10 16" stroke="#C89D86" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      <g transform="translate(150, 12)">
        <circle cx="10" cy="12" r="12" fill="#ECCBB8" />
        <ellipse cx="10" cy="12" rx="9" ry="8" fill="#F2D7C7" />
        <path d="M5 11C6 6 14 6 15 11C16 16 11 19 8 17" stroke="#B9876E" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="10" cy="12" r="2.5" fill="#996348" />
      </g>

      <g transform="translate(162, 18)">
        <ellipse cx="12" cy="12" rx="9" ry="8" fill="#E2BDAB" opacity="0.95" />
        <path d="M8 11C9 8 15 8 16 11C17 14 13 17 10 15" stroke="#BE917A" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    </svg>
  </div>
);

/**
 * Botanical Branch Filigree for Top Corners
 */
export const CornerBranches = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-0 w-28 h-28 opacity-45 text-[#C5A059]"
    >
      <path d="M-10 10C30 15 60 45 75 90" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M15 18C12 12 18 8 24 10C30 12 26 18 15 18Z" fill="currentColor" />
      <path d="M35 32C30 26 38 22 43 25C48 28 44 34 35 32Z" fill="currentColor" />
      <path d="M52 52C48 45 56 42 61 45C66 48 61 55 52 52Z" fill="currentColor" />
      <circle cx="28" cy="14" r="1.5" fill="#C5A059" />
    </svg>

    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 right-0 w-28 h-28 opacity-45 text-[#C5A059] scale-x-[-1]"
    >
      <path d="M-10 10C30 15 60 45 75 90" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M15 18C12 12 18 8 24 10C30 12 26 18 15 18Z" fill="currentColor" />
      <path d="M35 32C30 26 38 22 43 25C48 28 44 34 35 32Z" fill="currentColor" />
      <path d="M52 52C48 45 56 42 61 45C66 48 61 55 52 52Z" fill="currentColor" />
      <circle cx="28" cy="14" r="1.5" fill="#C5A059" />
    </svg>
  </div>
);

/**
 * Couple Silhouette
 */
export const CoupleSilhouette = ({ className = "w-10 h-10 text-[#443529] mx-auto my-2" }) => (
  <svg
    viewBox="0 0 64 64"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <circle cx="26" cy="18" r="5" />
    <path d="M20 25C19 25 18 26 18 27V42C18 43 19 44 20 44H24V56C24 57 25 58 26 58C27 58 28 57 28 56V44H30C31 44 32 43 32 42V27C32 26 31 25 30 25H20Z" />
    <circle cx="40" cy="20" r="4.5" />
    <path d="M36 26C35 26 34 27 34 28V36L30 54C29.5 56 31 58 33 58H47C49 58 50.5 56 50 54L46 36V28C46 27 45 26 44 26H36Z" />
  </svg>
);

export const EventIcon = ({ type, className = "w-5 h-5 text-[#9A7B61]" }) => {
  return <HeartIcon className={className} />;
};
