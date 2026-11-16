import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Calendar, PartyPopper } from "lucide-react";

export const ScratchCardDate = ({ onReveal }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [showPoppers, setShowPoppers] = useState(false);
  const [poppingFlowers, setPoppingFlowers] = useState([]);

  // Burst flowers out of party poppers from left and right
  const triggerFlowerPopperCelebration = () => {
    setShowPoppers(true);

    // Realistic Flower & Wedding Colors: Marigold, Rose Pink, Deep Crimson, Saffron, Jasmine White, Gold
    const flowerColors = [
      "#FF5E7E", // Rose Petal Pink
      "#FFA500", // Bright Marigold
      "#FF4500", // Saffron / Orange
      "#E8B4A2", // Blush Rose
      "#C5A059", // Royal Gold
      "#801A1A", // Auspicious Crimson
      "#FFFDF9", // Jasmine White
      "#FFD700", // Golden Yellow
    ];

    // Flower shapes using canvas-confetti shapeFromText
    let flowerShapes = undefined;
    try {
      if (typeof confetti.shapeFromText === "function") {
        const rose = confetti.shapeFromText({ text: "🌹", scalar: 1.6 });
        const blossom = confetti.shapeFromText({ text: "🌸", scalar: 1.6 });
        const marigold = confetti.shapeFromText({ text: "🌼", scalar: 1.6 });
        const hib = confetti.shapeFromText({ text: "🌺", scalar: 1.6 });
        flowerShapes = [rose, blossom, marigold, hib];
      }
    } catch (e) {}

    // Wave 1: Immediate Left & Right Cannon Blast
    confetti({
      particleCount: 45,
      angle: 55,
      spread: 70,
      startVelocity: 42,
      origin: { x: 0.08, y: 0.65 },
      colors: flowerColors,
      shapes: flowerShapes,
      gravity: 0.8,
      scalar: 1.3,
      drift: 0.15,
      ticks: 240,
    });

    confetti({
      particleCount: 45,
      angle: 125,
      spread: 70,
      startVelocity: 42,
      origin: { x: 0.92, y: 0.65 },
      colors: flowerColors,
      shapes: flowerShapes,
      gravity: 0.8,
      scalar: 1.3,
      drift: -0.15,
      ticks: 240,
    });

    // Wave 2: Continuous Shower of Falling Rose Petals (300ms later)
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 65,
        spread: 85,
        startVelocity: 38,
        origin: { x: 0.12, y: 0.62 },
        colors: flowerColors,
        shapes: flowerShapes,
        gravity: 0.7,
        scalar: 1.4,
      });

      confetti({
        particleCount: 50,
        angle: 115,
        spread: 85,
        startVelocity: 38,
        origin: { x: 0.88, y: 0.62 },
        colors: flowerColors,
        shapes: flowerShapes,
        gravity: 0.7,
        scalar: 1.4,
      });
    }, 320);

    // Wave 3: Sky Flower Shower (700ms later)
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 100,
        startVelocity: 30,
        origin: { x: 0.5, y: 0.4 },
        colors: flowerColors,
        shapes: flowerShapes,
        gravity: 0.6,
        scalar: 1.5,
      });
    }, 700);

    // Generate floating screen petals fountain
    const petals = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5 + 8) % 88}%`,
      delay: i * 0.08,
      flower: ["🌸", "🌹", "🌼", "🌺", "✨"][i % 5],
    }));
    setPoppingFlowers(petals);

    if (onReveal) onReveal();
  };

  // Draw gold foil scratch layer on canvas
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width || 310;
    canvas.height = rect.height || 96;

    // Draw Royal Gold Gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#E8CA85");
    grad.addColorStop(0.3, "#C5A059");
    grad.addColorStop(0.5, "#DFBA73");
    grad.addColorStop(0.8, "#B38734");
    grad.addColorStop(1, "#996D22");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative Gold & Crimson Border
    ctx.strokeStyle = "#801A1A";
    ctx.lineWidth = 2;
    ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

    ctx.strokeStyle = "#FFFDF9";
    ctx.lineWidth = 1;
    ctx.strokeRect(7, 7, canvas.width - 14, canvas.height - 14);

    // Subtle Glitter stars
    ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
    for (let i = 0; i < 40; i++) {
      const rx = (i * 19) % canvas.width;
      const ry = (i * 23) % canvas.height;
      ctx.beginPath();
      ctx.arc(rx, ry, (i % 3) + 0.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Scratch Prompt Text
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "bold 13px Montserrat, sans-serif";
    ctx.fillStyle = "#3D2E24";
    ctx.fillText("✨ SCRATCH TO REVEAL DATES ✨", canvas.width / 2, canvas.height / 2 - 10);

    ctx.font = "italic 11px Georgia, serif";
    ctx.fillStyle = "#6E4C1E";
    ctx.fillText("Tap & scratch with finger or mouse", canvas.width / 2, canvas.height / 2 + 12);
  };

  useEffect(() => {
    initCanvas();
  }, []);

  // Calculate scratched area percentage
  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;

    try {
      const imgData = ctx.getImageData(0, 0, width, height);
      const pixels = imgData.data;
      let transparentCount = 0;
      const totalPixels = pixels.length / 4;

      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) {
          transparentCount++;
        }
      }

      const ratio = transparentCount / (totalPixels / 4);

      if (ratio > 0.35 && !isRevealed) {
        revealCard();
      }
    } catch (e) {}
  };

  const erase = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  const handleMouseDown = (e) => {
    setIsScratching(true);
    erase(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isScratching) return;
    erase(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  const handleTouchStart = (e) => {
    setIsScratching(true);
    const touch = e.touches[0];
    erase(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (!isScratching) return;
    if (e.cancelable) e.preventDefault();
    const touch = e.touches[0];
    erase(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
  };

  const revealCard = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    triggerFlowerPopperCelebration();

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="relative w-full max-w-[340px] mx-auto my-3 flex flex-col items-center">
      {/* Visual Party Poppers on Left & Right popping flowers outwards */}
      <div className="relative w-full flex items-center justify-between px-1 mb-1 pointer-events-none">
        {/* Left Party Popper Gun */}
        <motion.div
          animate={
            showPoppers
              ? { rotate: [-25, -45, -30], scale: [1, 1.4, 1.1] }
              : { rotate: -25 }
          }
          transition={{ duration: 0.6 }}
          className="text-2xl filter drop-shadow-md"
        >
          🎉
        </motion.div>

        {/* Center Label */}
        <span className="font-sans text-[10px] tracking-widest text-[#9A7B61] uppercase font-bold">
          {isRevealed ? "Auspicious Dates Revealed" : "Interactive Scratch Card"}
        </span>

        {/* Right Party Popper Gun */}
        <motion.div
          animate={
            showPoppers
              ? { rotate: [25, 45, 30], scale: [1, 1.4, 1.1] }
              : { rotate: 25 }
          }
          transition={{ duration: 0.6 }}
          className="text-2xl filter drop-shadow-md scale-x-[-1]"
        >
          🎉
        </motion.div>
      </div>

      {/* Main Scratch Card Frame */}
      <div
        ref={containerRef}
        className="relative w-full h-[104px] rounded-2xl overflow-hidden border-2 border-[#C5A059]/60 shadow-[0_8px_24px_-4px_rgba(140,90,50,0.22)] bg-[#FFFDF9] select-none"
      >
        {/* UNDERNEATH LAYER: The Revealed Auspicious Wedding Dates with Commas */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EE] to-[#F4ECE1]">
          {/* Top Auspicious Note */}
          <div className="flex items-center gap-1.5 mb-1 text-[#801A1A]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-spin" style={{ animationDuration: "8s" }} />
            <span className="font-hindi text-[11px] font-bold tracking-wider">
              ॥ शुभ विवाह तिथियाँ ॥
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-spin" style={{ animationDuration: "8s" }} />
          </div>

          {/* DATES WITH COMMAS (Requested: 11, 12, 13 DECEMBER) */}
          <div className="flex items-center justify-center gap-1.5 my-0.5">
            <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.14em] text-[#3D2E24] drop-shadow-xs">
              11, 12, 13 DECEMBER
            </span>
          </div>

          {/* Year & Milestone Details */}
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 rounded-full bg-[#801A1A]/10 text-[10px] font-sans font-bold text-[#801A1A] tracking-wider uppercase">
              2026
            </span>
            <span className="text-xs font-pinyon text-[#7C6656]">
              11 Sangeet • 12 Barat • 13 Dham
            </span>
          </div>
        </div>

        {/* TOP LAYER: Interactive Scratch-off Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`absolute inset-0 w-full h-full cursor-pointer z-10 transition-opacity duration-700 touch-none ${
            isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />
      </div>

      {/* Floating Flowers Flying Out of the Poppers */}
      <AnimatePresence>
        {showPoppers && (
          <div className="absolute inset-0 pointer-events-none overflow-visible z-30">
            {poppingFlowers.map((item) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 50,
                  x: item.id % 2 === 0 ? -40 : 40,
                  scale: 0.5,
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [-20, -90, -140],
                  x: item.id % 2 === 0 ? [0, 50, 100] : [0, -50, -100],
                  scale: [0.6, 1.4, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2.2,
                  delay: item.delay,
                  ease: "easeOut",
                }}
                className="absolute text-xl"
                style={{ left: item.left, top: "20%" }}
              >
                {item.flower}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Helper text or Quick Reveal button */}
      {!isRevealed ? (
        <button
          onClick={revealCard}
          className="mt-2 text-[11px] font-sans font-semibold text-[#8C6D55] hover:text-[#5A3E2B] underline decoration-[#C5A059] flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <Sparkles className="w-3 h-3 text-[#C5A059]" />
          <span>Tap to Reveal with Flower Party Popper 🌸🎉</span>
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-1.5 flex items-center gap-1.5 text-[11px] font-sans font-semibold text-[#801A1A]"
        >
          <PartyPopper className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Dates Revealed! Flowers & Blessings Showered 🌸✨</span>
        </motion.div>
      )}
    </div>
  );
};

export default ScratchCardDate;
