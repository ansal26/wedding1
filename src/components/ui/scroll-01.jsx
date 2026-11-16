import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ChevronDown, Sparkles } from "lucide-react";

export const Scroll01 = ({ items = [] }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full space-y-3 text-left">
      {items.map((item, index) => {
        const isSelected = selectedIdx === index;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
              isSelected
                ? "bg-[#FFFDF9] border-[#C5A059] shadow-md ring-1 ring-[#C5A059]/30"
                : "bg-[#FFFDF9]/80 border-[#E8DFC2] hover:border-[#C5A059]/50 shadow-xs"
            }`}
          >
            {/* Header row */}
            <button
              type="button"
              onClick={() => setSelectedIdx(isSelected ? null : index)}
              className="w-full p-3.5 flex items-center justify-between gap-3 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Date Pill */}
                <div
                  className={`shrink-0 px-2.5 py-1.5 rounded-xl border text-center transition-colors ${
                    isSelected
                      ? "bg-[#FAF5EE] border-[#C5A059] text-[#7C5A38]"
                      : "bg-[#FAF7F2] border-[#E8DFC2] text-[#8C7A6B]"
                  }`}
                >
                  <span className="font-sans text-[10px] font-bold block uppercase tracking-wider">
                    {item.date}
                  </span>
                  <span className="font-serif text-[11px] font-bold text-[#3D2E24] block">
                    {item.time}
                  </span>
                </div>

                {/* Event Name */}
                <div className="min-w-0">
                  <h4
                    className={`font-serif text-sm sm:text-base font-bold truncate transition-colors ${
                      isSelected ? "text-[#7C5A38]" : "text-[#3D2E24]"
                    }`}
                  >
                    {item.title}
                  </h4>
                  <p className="font-sans text-[11px] text-[#8C7A6B] truncate">
                    {item.description}
                  </p>
                </div>
              </div>

              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                  isSelected
                    ? "bg-[#FAF5EE] border-[#C5A059]/40 text-[#C5A059] rotate-180"
                    : "bg-[#FAF7F2] border-[#E8DFC2] text-[#A8988A]"
                }`}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* Expandable Content */}
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-[#F0E8DC]"
                >
                  <div className="p-3.5 pt-2 bg-[#FAF7F2]/50 space-y-2.5">
                    <p className="font-sans text-xs text-[#5C483A] leading-relaxed">
                      {item.description}
                    </p>

                    {item.media && (
                      <div className="relative aspect-16/9 rounded-xl overflow-hidden border border-[#E8DFC2] bg-[#EAE2D5]">
                        <img
                          src={item.media}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute bottom-2 left-2 text-[10px] font-sans font-semibold tracking-wider text-white uppercase bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-[#E6C687]" />
                          {item.title}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Scroll01;
