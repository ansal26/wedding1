import React, { useState } from "react";
import { motion } from "framer-motion";
import { weddingData } from "../config/weddingData";
import {
  HeartIcon,
  FloralGarland,
  CornerBranches,
  GaneshaAnimated,
  IndianCornerPattern,
} from "./Decorations";
import { ScratchCardDate } from "./ScratchCardDate";
import { DulhaAdminModal } from "./DulhaAdminModal";
import { useWeddingState } from "../context/WeddingStateContext";
import { Sparkles } from "lucide-react";

/**
 * WordQueue: Animates every word in a sequential queue
 */
const WordQueue = ({ text = "", delay = 0, speed = 0.07, className = "" }) => {
  const words = text ? text.split(" ") : [];
  return (
    <span className={`inline-flex flex-wrap justify-center ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * speed,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ marginRight: i === words.length - 1 ? 0 : "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export const PanelOneIntroduction = () => {
  const { groom, bride, invocations } = weddingData;
  const { weddingState } = useWeddingState();

  // Secret Dulha Login modal state
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <section className="relative w-full bg-[#FAF7F2] pt-5 pb-10 px-4 xs:px-5 overflow-hidden flex flex-col items-center text-center border-b border-[#E8DFC2]">
      {/* Traditional Indian Corner Floral Branches */}
      <CornerBranches />

      {/* Traditional Indian Ornamental Border Corners */}
      <IndianCornerPattern />

      {/* Secret Dulha Admin Modal */}
      <DulhaAdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* 1. AUTHENTIC LORD GANESHA (Secret trigger to Dulha Login: No visible button styling) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative z-20 mb-3 flex flex-col items-center"
      >
        <button
          type="button"
          onClick={() => setIsAdminOpen(true)}
          className="cursor-pointer focus:outline-none transition-transform active:scale-95"
          title="॥ श्री गणेशाय नमः ॥"
          aria-label="Lord Ganesha"
        >
          <GaneshaAnimated className="w-20 h-20 sm:w-24 sm:h-24" />
        </button>
        
        {/* Om & Ganesh Shloka */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-hindi text-2xl sm:text-3xl text-[#C5A059] font-bold block drop-shadow-xs mt-1"
        >
          {invocations.om}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="font-hindi text-base sm:text-lg text-[#801A1A] font-bold tracking-wider block mt-0.5"
        >
          {invocations.ganesh}
        </motion.span>
      </motion.div>

      {/* 2. AUTHENTIC HANDCRAFTED CALLIGRAPHY INTRO (Word by word queue) */}
      <div className="relative z-10 mb-1 max-w-[340px]">
        <span className="font-handwritten text-4xl sm:text-5xl text-[#6E4E37] block leading-tight drop-shadow-2xs py-1">
          <WordQueue text={invocations.introScript} delay={0.65} speed={0.08} />
        </span>
        <p className="font-pinyon text-base sm:text-lg text-[#7C624E] leading-relaxed mt-1 px-2">
          <WordQueue text={invocations.blessingText} delay={0.95} speed={0.05} />
        </p>
      </div>

      {/* Decorative Gold Divider */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="relative z-10 my-3 flex items-center justify-center gap-2"
      >
        <div className="h-[1.5px] w-12 bg-gradient-to-r from-transparent to-[#C5A059]" />
        <HeartIcon className="w-3 h-3 text-[#C5A059]" />
        <div className="h-[1.5px] w-12 bg-gradient-to-l from-transparent to-[#C5A059]" />
      </motion.div>

      {/* 3. COUPLE & PARENTS (DISTINCT ROYAL CINZEL & HANDWRITTEN CALLIGRAPHY) */}
      <div className="relative z-10 w-full max-w-[340px] my-2">
        
        {/* GROOM NAME: "ASHISH" */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-cinzel text-3xl xs:text-4xl sm:text-[2.6rem] text-[#2D1F17] uppercase tracking-[0.16em] font-bold leading-tight drop-shadow-xs"
          >
            {groom.name}
          </motion.h1>
          
          <p className="font-serif italic text-xs sm:text-sm text-[#801A1A] font-semibold tracking-wide mt-1.5 mb-2">
            <WordQueue text={groom.parents} delay={1.75} speed={0.05} />
          </p>
        </div>

        {/* WEDS IN HANDWRITTEN ROYAL GOLD SCRIPT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 2.1 }}
          className="my-2.5 flex items-center justify-center gap-3"
        >
          <div className="h-[1px] w-14 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
          <span className="font-handwritten text-4xl sm:text-5xl text-[#C5A059] font-normal lowercase drop-shadow-xs py-1">
            weds
          </span>
          <div className="h-[1px] w-14 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
        </motion.div>

        {/* BRIDE NAME: "SHIVANGI" */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-cinzel text-3xl xs:text-4xl sm:text-[2.6rem] text-[#2D1F17] uppercase tracking-[0.16em] font-bold leading-tight drop-shadow-xs mt-2"
          >
            {bride.name}
          </motion.h1>

          <p className="font-serif italic text-xs sm:text-sm text-[#801A1A] font-semibold tracking-wide mt-1.5">
            <WordQueue text={bride.parents} delay={2.55} speed={0.05} />
          </p>
        </div>

      </div>

      {/* 4. INTERACTIVE SCRATCH CARD WEDDING DATES (SHIFTED BELOW SHIVANGI) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.85 }}
        className="relative z-10 w-full my-4"
      >
        <ScratchCardDate />
      </motion.div>

      {/* 5. COUPLE PHOTOGRAPH (Reads live photo from state) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 3.1 }}
        className="relative z-10 w-full max-w-[330px] my-4"
      >
        <div className="relative p-2.5 bg-[#FFFDF9] rounded-2xl shadow-[0_12px_36px_-6px_rgba(140,90,50,0.22)] border-2 border-[#C5A059]/60 overflow-hidden group">
          <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#C5A059]" />
          <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#C5A059]" />
          <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#C5A059]" />
          <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#C5A059]" />

          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#EFE9E0]">
            <img
              src={weddingState.photos.hero || "/1.jpg"}
              alt="Ashish and Shivangi"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D1F17]/30 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* 6. INVITATION MESSAGE */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.4 }}
        className="relative z-10 max-w-[320px] mb-2 px-2"
      >
        <h2 className="font-display text-lg sm:text-xl tracking-[0.14em] text-[#3D2E24] font-bold uppercase mb-1.5">
          <WordQueue text="We're getting married!" delay={3.4} speed={0.07} />
        </h2>
        <p className="font-serif text-xs sm:text-sm text-[#7C6656] leading-relaxed mb-2 font-normal">
          <WordQueue text={invocations.invitationNote} delay={3.6} speed={0.04} />
        </p>
        <FloralGarland className="w-48 mx-auto my-2 opacity-95" />
      </motion.div>

      {/* 7. AUSPICIOUS VEDIC BLESSINGS CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 3.9 }}
        className="relative z-10 w-full max-w-[330px] mt-2 rounded-2xl p-5 text-white shadow-xl overflow-hidden bg-gradient-to-b from-[#8C6D55] via-[#7B5B43] to-[#5C3F2B] border-2 border-[#C5A059]/40"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#EFE3D5]" />
            <span className="font-hindi text-xs tracking-[0.18em] text-[#EFE3D5] font-bold">
              ॥ शुभ विवाह बंधन ॥
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#EFE3D5]" />
          </div>

          <p className="font-hindi text-sm text-[#FFFDF9] font-medium leading-relaxed mb-2.5">
            ॥ मंगलम् भगवान विष्णुः मंगलम् गरुडध्वजः ॥
            <br />
            ॥ मंगलम् पुण्डरीकाक्षः मंगलाय तनो हरिः ॥
          </p>

          <div className="h-[1px] w-14 bg-[#D8C2AD]/50 mx-auto my-2" />

          <p className="font-pinyon text-sm sm:text-base text-[#F5ECE2] leading-relaxed">
            "Two souls united by destiny, blessed by elders, bound for eternity under the sacred Agni."
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default PanelOneIntroduction;
