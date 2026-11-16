import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "../config/weddingData";
import {
  HeartIcon,
  FloralGarland,
  CoupleSilhouette,
  EventIcon,
} from "./Decorations";
import { useWeddingState } from "../context/WeddingStateContext";
import {
  Calendar,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Hourglass,
  Music,
  Flame,
  Sun,
  Crown,
  Heart,
  Home,
  Utensils,
  Bell,
} from "lucide-react";

// Category specific icon helper
const CeremonyCategoryIcon = ({ category = "", className = "w-4 h-4" }) => {
  switch (category.toLowerCase()) {
    case "music":
      return <Music className={className} />;
    case "henna":
      return <Sparkles className={className} />;
    case "haldi":
      return <Sun className={className} />;
    case "havan":
      return <Flame className={className} />;
    case "sehra":
      return <Crown className={className} />;
    case "barat":
      return <Heart className={className} />;
    case "welcome":
      return <Home className={className} />;
    case "feast":
      return <Utensils className={className} />;
    case "prayer":
      return <Bell className={className} />;
    default:
      return <HeartIcon className={className} />;
  }
};

export const PanelTwoCelebrations = () => {
  const { story, schedule, weddingYear } = weddingData;
  const { weddingState } = useWeddingState();

  // Story expanded state
  const [isStoryExpanded, setIsStoryExpanded] = useState(false);
  // Selected schedule tab ("all" | "11 DECEMBER" | "12 DECEMBER" | "13 DECEMBER")
  const [activeDayTab, setActiveDayTab] = useState("all");

  // Live Countdown from current time to Wedding Date (Dec 11, 2026, 3:00 PM)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(weddingYear || 2026, 11, 11, 15, 0, 0);

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [weddingYear]);

  return (
    <section className="relative w-full bg-[#FAF7F2] pt-8 pb-10 px-4 xs:px-5 overflow-hidden flex flex-col items-center text-center border-b border-[#E8DFC2]">
      {/* OUR STORY Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-[340px] mb-2"
      >
        <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-[#6E5544] font-bold">
          OUR SACRED JOURNEY
        </h3>
        <div className="flex justify-center my-1.5">
          <HeartIcon className="w-2.5 h-2.5 text-[#C5A059]" />
        </div>
        <p className="font-serif italic text-sm text-[#5B4636] leading-relaxed px-2 mb-3.5">
          "{story.subtitle}"
        </p>

        {/* Expandable Story Detail */}
        <AnimatePresence>
          {isStoryExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-[#FFFDF9] rounded-2xl border border-[#E8DFC2] text-xs font-sans text-[#705A4A] leading-relaxed text-left mb-4 shadow-sm">
                <p>{story.fullStory}</p>
                <div className="mt-3 pt-2 border-t border-[#F0E6D8] flex items-center justify-between text-[11px] text-[#9A7B61]">
                  <span className="font-serif italic">Kangra Valley, Himachal Pradesh</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* READ MORE Button */}
        <button
          onClick={() => setIsStoryExpanded(!isStoryExpanded)}
          className="px-5 py-2 bg-[#9A7B61] hover:bg-[#85674F] active:bg-[#725741] text-white text-[10px] xs:text-[11px] font-sans font-semibold tracking-[0.2em] uppercase rounded-md shadow-xs transition-all duration-300 cursor-pointer inline-flex items-center gap-1.5"
        >
          <span>{isStoryExpanded ? "SHOW LESS" : "READ MORE"}</span>
          {isStoryExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </motion.div>

      {/* Couple Photography 2: Reads live photo from state (Story Photo) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative z-10 w-full max-w-[330px] my-4"
      >
        <div className="p-2 bg-[#FFFDF9] rounded-2xl shadow-[0_10px_30px_-6px_rgba(110,80,60,0.18)] border-2 border-[#C5A059]/30 overflow-hidden group">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#EFE9E0]">
            <img
              src={weddingState.photos.story || weddingData.photos.story}
              alt="Ashish & Shivangi Story"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D1F17]/25 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* LIVE COUNTDOWN SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-[340px] my-5"
      >
        <div className="bg-[#FFFDF9] rounded-2xl p-5 border-2 border-[#C5A059]/40 shadow-md relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#C5A059]/10 rounded-full blur-xl" />

          <div className="flex items-center justify-center gap-1.5 mb-1 text-[#9A7B61]">
            <Hourglass className="w-3.5 h-3.5 text-[#C5A059] animate-spin" style={{ animationDuration: "12s" }} />
            <h3 className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#6E5544] font-bold">
              COUNTDOWN TO AUSPICIOUS DAY
            </h3>
          </div>

          <p className="font-serif italic text-xs text-[#8A725F] mb-3">
            Counting every sacred moment until 11 December 2026
          </p>

          <div className="grid grid-cols-4 gap-1 xs:gap-2 text-center py-2 bg-[#FAF7F2] rounded-xl border border-[#EBE3D7]">
            <div>
              <span className="font-serif text-2xl xs:text-3xl font-bold text-[#3D2E24] block">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="font-sans text-[8px] xs:text-[9px] tracking-widest text-[#8A725F] uppercase font-bold">
                DAYS
              </span>
            </div>
            <div className="relative">
              <span className="absolute -left-1 top-0 text-xl font-serif text-[#C4B29E]">
                :
              </span>
              <span className="font-serif text-2xl xs:text-3xl font-bold text-[#3D2E24] block">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="font-sans text-[8px] xs:text-[9px] tracking-widest text-[#8A725F] uppercase font-bold">
                HOURS
              </span>
            </div>
            <div className="relative">
              <span className="absolute -left-1 top-0 text-xl font-serif text-[#C4B29E]">
                :
              </span>
              <span className="font-serif text-2xl xs:text-3xl font-bold text-[#3D2E24] block">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="font-sans text-[8px] xs:text-[9px] tracking-widest text-[#8A725F] uppercase font-bold">
                MINS
              </span>
            </div>
            <div className="relative">
              <span className="absolute -left-1 top-0 text-xl font-serif text-[#C4B29E]">
                :
              </span>
              <span className="font-serif text-2xl xs:text-3xl font-bold text-[#C5A059] block animate-pulse">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="font-sans text-[8px] xs:text-[9px] tracking-widest text-[#C5A059] uppercase font-bold">
                SECS
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Botanical Floral Garland Divider */}
      <FloralGarland className="w-52 my-3 opacity-90" />

      {/* SCHEDULE OF CEREMONIES (ORIGINAL DESIGN RESTORED) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-[340px] mt-4"
      >
        <div className="text-center mb-3">
          <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-[#6E5544] font-bold">
            SCHEDULE OF CEREMONIES
          </h3>
          <div className="flex justify-center my-1.5">
            <HeartIcon className="w-2.5 h-2.5 text-[#C5A059]" />
          </div>
          <p className="font-serif italic text-xs text-[#8A725F]">
            11, 12 & 13 December • Kangra, Himachal Pradesh
          </p>
        </div>

        {/* Day Tabs */}
        <div className="flex items-center justify-center gap-1 mb-4 p-1 bg-[#F1E9DE] rounded-xl border border-[#E3D7C9]">
          <button
            type="button"
            onClick={() => setActiveDayTab("all")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-sans font-semibold tracking-wider transition-all cursor-pointer ${
              activeDayTab === "all"
                ? "bg-[#FFFDF9] text-[#3D2E24] shadow-xs"
                : "text-[#7C6656] hover:text-[#3D2E24]"
            }`}
          >
            ALL
          </button>
          <button
            type="button"
            onClick={() => setActiveDayTab("11 DECEMBER")}
            className={`px-2.5 py-1.5 rounded-lg text-[10px] font-sans font-semibold tracking-wider transition-all cursor-pointer ${
              activeDayTab === "11 DECEMBER"
                ? "bg-[#FFFDF9] text-[#3D2E24] shadow-xs"
                : "text-[#7C6656] hover:text-[#3D2E24]"
            }`}
          >
            11 DEC
          </button>
          <button
            type="button"
            onClick={() => setActiveDayTab("12 DECEMBER")}
            className={`px-2.5 py-1.5 rounded-lg text-[10px] font-sans font-semibold tracking-wider transition-all cursor-pointer ${
              activeDayTab === "12 DECEMBER"
                ? "bg-[#FFFDF9] text-[#3D2E24] shadow-xs"
                : "text-[#7C6656] hover:text-[#3D2E24]"
            }`}
          >
            12 DEC
          </button>
          <button
            type="button"
            onClick={() => setActiveDayTab("13 DECEMBER")}
            className={`px-2.5 py-1.5 rounded-lg text-[10px] font-sans font-semibold tracking-wider transition-all cursor-pointer ${
              activeDayTab === "13 DECEMBER"
                ? "bg-[#FFFDF9] text-[#3D2E24] shadow-xs"
                : "text-[#7C6656] hover:text-[#3D2E24]"
            }`}
          >
            13 DEC
          </button>
        </div>

        {/* Schedule List */}
        <div className="space-y-3.5 text-left">
          {schedule
            .filter((dayGroup) => activeDayTab === "all" || dayGroup.date === activeDayTab)
            .map((dayGroup) => (
              <div
                key={dayGroup.date}
                className="bg-[#FFFDF9] rounded-2xl p-4 border border-[#EBE3D7] shadow-xs relative overflow-hidden"
              >
                {/* Date Header Badge */}
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#F2ECE3]">
                  <span className="font-sans text-[11px] font-bold tracking-[0.18em] text-[#9A7B61] uppercase flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                    {dayGroup.date}
                  </span>
                  <span className="font-serif italic text-xs text-[#8A725F]">
                    {dayGroup.dayTitle}
                  </span>
                </div>

                {/* Event Items (Clean layout: Title & Time without descriptions) */}
                <div className="space-y-2.5">
                  {dayGroup.events.map((event, eIndex) => (
                    <div
                      key={eIndex}
                      className="flex items-center justify-between gap-2.5 p-1 rounded-xl hover:bg-[#FAF7F2] transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Event Icon in decorative box */}
                        <div className="w-8 h-8 rounded-xl bg-[#FAF5EE] border border-[#E6DACD] flex items-center justify-center shrink-0 text-[#9A7B61] shadow-2xs group-hover:border-[#C5A059] group-hover:bg-[#FFF] transition-colors">
                          <CeremonyCategoryIcon category={event.category} className="w-4 h-4 text-[#C5A059]" />
                        </div>

                        {/* Event Title */}
                        <h4 className="font-serif text-sm font-bold text-[#3D2E24] tracking-wide truncate">
                          {event.title}
                        </h4>
                      </div>

                      {/* Time Badge */}
                      <span className="font-sans text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#8A725F] shrink-0 bg-[#F5EFE7] px-2.5 py-1 rounded-full border border-[#EBE3D7]">
                        {event.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </motion.div>

      {/* WE CAN'T WAIT TO SEE YOU! */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-[280px] mt-8 mb-2"
      >
        <h3 className="font-sans text-[11px] xs:text-xs uppercase tracking-[0.25em] text-[#6E5544] font-bold">
          WE CAN'T WAIT TO CELEBRATE WITH YOU!
        </h3>

        <CoupleSilhouette className="w-10 h-10 text-[#4A3728] mx-auto my-2" />

        <p className="font-serif italic text-xs text-[#8A725F]">
          Your presence and blessings will make our wedding truly memorable
        </p>
      </motion.div>

      {/* Bottom Garland Divider */}
      <FloralGarland className="w-52 my-3 opacity-90" />
    </section>
  );
};

export default PanelTwoCelebrations;
