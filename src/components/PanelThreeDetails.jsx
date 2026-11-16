import React from "react";
import { motion } from "framer-motion";
import { weddingData } from "../config/weddingData";
import { HeartIcon, FloralGarland } from "./Decorations";
import { MapPin, Phone, Sparkles, Heart } from "lucide-react";

export const PanelThreeDetails = () => {
  const { groom, bride, rsvp, invocations } = weddingData;

  return (
    <section className="relative w-full bg-[#FAF7F2] pt-8 pb-14 px-4 xs:px-5 overflow-hidden flex flex-col items-center text-center">
      {/* 1. SECTION HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full mb-4"
      >
        <h2 className="font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-[#6E5544] font-bold">
          WEDDING DETAILS & VENUE
        </h2>
        <div className="flex justify-center my-1.5">
          <HeartIcon className="w-3 h-3 text-[#C5A059]" />
        </div>
      </motion.div>

      {/* 2. VENUE DETAILS LIST (Sequential Queue Entrance) */}
      <div className="relative z-10 w-full max-w-[340px] space-y-4 text-left">
        {/* Groom's Venue / Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-[#FFFDF9] rounded-2xl p-4 border-2 border-[#C5A059]/30 shadow-xs"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF5EE] border border-[#C5A059]/40 flex items-center justify-center shrink-0 text-[#C5A059] shadow-2xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-sans text-[11px] tracking-widest text-[#C5A059] uppercase font-bold block">
                GROOM'S RESIDENCE (VENUE)
              </span>
              <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#3D2E24] mt-0.5">
                {groom.address.name}
              </h4>
              <div className="font-sans text-xs sm:text-sm text-[#7C6656] leading-relaxed mt-1 space-y-0.5">
                <p>{groom.address.village}</p>
                <p>{groom.address.po}</p>
                <p>{groom.address.tehsil}</p>
                <p className="font-medium text-[#3D2E24]">
                  {groom.address.district} — {groom.address.pin}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bride's Venue / Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-[#FFFDF9] rounded-2xl p-4 border-2 border-[#C5A059]/30 shadow-xs"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF5EE] border border-[#C5A059]/40 flex items-center justify-center shrink-0 text-[#C5A059] shadow-2xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-sans text-[11px] tracking-widest text-[#C5A059] uppercase font-bold block">
                BRIDE'S RESIDENCE (VENUE)
              </span>
              <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#3D2E24] mt-0.5">
                {bride.address.name}
              </h4>
              <div className="font-sans text-xs sm:text-sm text-[#7C6656] leading-relaxed mt-1 space-y-0.5">
                <p>{bride.address.village}</p>
                <p>{bride.address.po}</p>
                <p>{bride.address.tehsil}</p>
                <p className="font-medium text-[#3D2E24]">
                  {bride.address.district} — {bride.address.pin}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Family Warm Welcome & Helpline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-[#FFFDF9] rounded-2xl p-4 border border-[#EBE3D7] shadow-xs"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF5EE] border border-[#E6DACD] flex items-center justify-center shrink-0 text-[#9A7B61]">
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-sans text-[11px] tracking-widest text-[#9A7B61] uppercase font-bold block">
                FAMILY WELCOME & HELPLINE
              </span>
              <div className="mt-1">
                <span className="font-sans text-xs font-semibold text-[#8A725F] block mb-1">
                  Awaiting your gracious presence:
                </span>
                <p className="font-display text-sm sm:text-base font-bold text-[#3D2E24] tracking-wide">
                  {rsvp.familyMembers.join(" • ")}
                </p>
              </div>

              {/* Direct Tap to Call Buttons */}
              <div className="mt-3 pt-2 border-t border-[#F0E6D8] flex flex-wrap gap-2">
                {rsvp.contacts.map((contact, cIndex) => (
                  <a
                    key={cIndex}
                    href={`tel:${contact.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF5EE] border border-[#C5A059]/40 text-xs sm:text-sm font-sans font-bold text-[#3D2E24] hover:bg-[#F0E4D5] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{contact.phone}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Botanical Floral Garland */}
      <FloralGarland className="w-56 my-6 opacity-90" />

      {/* 3. ANIMATED ROYAL "THANK YOU" ENDING SECTION (Replaces previous ending text) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="relative z-10 w-full max-w-sm text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C5A059]" />
          <HeartIcon className="w-3.5 h-3.5 text-[#C5A059]" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C5A059]" />
        </div>

        {/* Shubh Vivah Invocation */}
        <motion.h3
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-hindi text-2xl xs:text-3xl font-bold text-[#801A1A] tracking-wider mb-2 drop-shadow-xs"
        >
          {invocations.subhVivah}
        </motion.h3>

        {/* ANIMATED "THANK YOU" IN BREATHING HANDWRITTEN ROYAL CALLIGRAPHY */}
        <motion.div
          animate={{
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="my-3 py-1"
        >
          <span className="font-handwritten text-6xl xs:text-7xl text-[#7D6451] block drop-shadow-sm leading-tight py-1">
            Thank You
          </span>
          <p className="font-pinyon text-base xs:text-lg text-[#8A725F] mt-1 px-4 leading-relaxed">
            For your warm presence, love & divine blessings on our special day
          </p>
        </motion.div>

        <FloralGarland className="w-44 mx-auto my-3 opacity-90" />

        {/* Auspicious Couple Signature Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="inline-block p-3 px-6 bg-[#FFFDF9] rounded-2xl border border-[#C5A059]/40 shadow-xs text-center mx-auto"
        >
          <span className="font-cinzel text-sm sm:text-base font-bold tracking-[0.22em] text-[#3D2E24] uppercase block">
            ASHISH & SHIVANGI
          </span>
          <span className="font-pinyon text-xs sm:text-sm text-[#9A7B61] mt-0.5 block">
            With heartfelt love & gratitude from both families
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PanelThreeDetails;
