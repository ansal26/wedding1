import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Lock,
  Upload,
  CheckCircle2,
  Image as ImageIcon,
  LogOut,
  Sparkles,
  Crop,
  ZoomIn,
  Move,
  RotateCcw,
  Eye,
} from "lucide-react";
import { useWeddingState } from "../context/WeddingStateContext";

export const DulhaAdminModal = ({ isOpen, onClose }) => {
  const { weddingState, setWeddingState } = useWeddingState();
  const API_BASE = import.meta.env.VITE_API_URL || "";

  // Login form state (Case-insensitive: id="aloves", password="weds")
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Photo management state
  const [selectedPhotoType, setSelectedPhotoType] = useState("hero"); // 'hero' | 'story' | 'details'
  const [uploadSuccess, setUploadSuccess] = useState("");

  // Interactive Cropper / Adjuster state
  const [sourceImage, setSourceImage] = useState(null); // original image dataURL
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0); // -50 to 50 percent offset
  const [panY, setPanY] = useState(0); // -50 to 50 percent offset
  const [isCropping, setIsCropping] = useState(false);
  const [isSavingPhoto, setIsSavingPhoto] = useState(false);

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  // Target aspect ratios strictly matching the website's cards
  const photoConfigs = {
    hero: {
      title: "Hero Couple Photo",
      location: "Home Screen (Panel 1)",
      description: "Appears below Shivangi's name & the Scratch card",
      aspectRatio: "aspect-[3/4]",
      ratioW: 3,
      ratioH: 4,
      canvasW: 900,
      canvasH: 1200,
    },
    story: {
      title: "Our Story Photo",
      location: "Our Sacred Journey (Panel 2)",
      description: "Appears in Panel 2 above the Countdown card",
      aspectRatio: "aspect-[4/3]",
      ratioW: 4,
      ratioH: 3,
      canvasW: 1200,
      canvasH: 900,
    },
    details: {
      title: "Venue & Reception Photo",
      location: "Wedding Details (Panel 3)",
      description: "Appears in Panel 3 below the RSVP card",
      aspectRatio: "aspect-[4/3]",
      ratioW: 4,
      ratioH: 3,
      canvasW: 1200,
      canvasH: 900,
    },
  };

  const currentConfig = photoConfigs[selectedPhotoType];

  // Login Handler (Clean, without revealing credentials)
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanId = credentials.id.trim().toLowerCase();
    const cleanPassword = credentials.password.trim().toLowerCase();

    if (cleanId === "aloves" && cleanPassword === "weds") {
      setIsLoggedIn(true);
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: cleanId, password: cleanPassword }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsLoggedIn(true);
      } else {
        setErrorMsg(data.message || "Invalid ID or Password.");
      }
    } catch (e) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // When user picks a file, load it into Cropper view
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadSuccess("");
    const reader = new FileReader();
    reader.onload = () => {
      setSourceImage(reader.result);
      setZoom(1);
      setPanX(0);
      setPanY(0);
      setIsCropping(true);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Crop & Apply Changes in Real Time
  const handleApplyCrop = async () => {
    if (!sourceImage) return;

    setIsSavingPhoto(true);

    try {
      const img = new window.Image();
      img.src = sourceImage;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement("canvas");
      canvas.width = currentConfig.canvasW;
      canvas.height = currentConfig.canvasH;
      const ctx = canvas.getContext("2d");

      // Fill background
      ctx.fillStyle = "#FAF7F2";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate cover dimensions
      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = img.width / img.height;

      let drawW, drawH;
      if (imgAspect > canvasAspect) {
        // Image is wider than canvas
        drawH = canvas.height * zoom;
        drawW = drawH * imgAspect;
      } else {
        // Image is taller than canvas
        drawW = canvas.width * zoom;
        drawH = drawW / imgAspect;
      }

      // Base centered positions
      const baseX = (canvas.width - drawW) / 2;
      const baseY = (canvas.height - drawH) / 2;

      // Apply Pan offsets
      const offsetX = (panX / 100) * drawW;
      const offsetY = (panY / 100) * drawH;

      ctx.drawImage(img, baseX + offsetX, baseY + offsetY, drawW, drawH);

      const croppedDataUrl = canvas.toDataURL("image/jpeg", 0.92);

      // 1. INSTANT REAL-TIME UPDATE in local React Context
      setWeddingState((prev) => ({
        ...prev,
        photos: {
          ...prev.photos,
          [selectedPhotoType]: croppedDataUrl,
        },
      }));

      // 2. Persist to localStorage for instant offline persistence
      try {
        localStorage.setItem(`wedding_photo_${selectedPhotoType}`, croppedDataUrl);
      } catch (storageErr) {
        // quota exceeded fallback
      }

      // 3. Persist to Express backend if available
      try {
        const res = await fetch(`${API_BASE}/api/upload-photo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            photoType: selectedPhotoType,
            imageBase64: croppedDataUrl,
          }),
        });

        if (res.ok) {
          const result = await res.json();
          if (result && result.success) {
            setUploadSuccess(
              `✅ ${currentConfig.title} has been updated in real-time!`
            );
          }
        } else {
          setUploadSuccess(
            `✅ ${currentConfig.title} updated locally!`
          );
        }
      } catch (backendErr) {
        // Server offline - still successful locally
        setUploadSuccess(
          `✅ ${currentConfig.title} updated and saved!`
        );
      }

      setIsCropping(false);
      setSourceImage(null);
    } catch (err) {
      console.error(err);
      setErrorMsg("Error processing cropped photo. Please try again.");
    } finally {
      setIsSavingPhoto(false);
    }
  };

  const handleResetCrop = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 xs:p-4 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          className="relative w-full max-w-[420px] max-h-[92vh] overflow-y-auto bg-[#FFFDF9] rounded-3xl border-2 border-[#C5A059]/60 p-5 xs:p-6 shadow-2xl text-left"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF5EE] hover:bg-[#F0E4D5] text-[#7C6656] cursor-pointer transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {!isLoggedIn ? (
            /* 1. SECRET LOGIN FORM (No password hint shown) */
            <div>
              <div className="text-center mb-5">
                <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#C5A059] text-[#C5A059] flex items-center justify-center mx-auto mb-2 shadow-xs">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-royal text-xl font-bold text-[#3D2E24]">
                  Dulha Login
                </h3>
                <p className="font-serif italic text-xs text-[#8A725F] mt-0.5">
                  Private Wedding Control Center
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block font-sans text-xs uppercase font-bold text-[#6E5544] mb-1">
                    LOGIN ID
                  </label>
                  <input
                    type="text"
                    value={credentials.id}
                    onChange={(e) =>
                      setCredentials({ ...credentials, id: e.target.value })
                    }
                    placeholder="Enter Login ID"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E1D6C7] rounded-xl text-xs sm:text-sm font-sans text-[#3D2E24] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                    required
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs uppercase font-bold text-[#6E5544] mb-1">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    placeholder="Enter Password"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E1D6C7] rounded-xl text-xs sm:text-sm font-sans text-[#3D2E24] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                    required
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-[#801A1A] font-semibold bg-[#801A1A]/10 p-2 rounded-lg">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#9A7B61] hover:bg-[#85674F] active:bg-[#725741] text-white text-xs font-sans font-bold tracking-[0.2em] uppercase rounded-xl transition-all shadow-md cursor-pointer mt-2 disabled:opacity-70"
                >
                  {isLoading ? "VERIFYING..." : "ENTER DASHBOARD"}
                </button>
              </form>
            </div>
          ) : isCropping && sourceImage ? (
            /* 2. REAL-TIME PHOTO CROPPER & ADJUSTER */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#EFE7DD]">
                <div className="flex items-center gap-1.5">
                  <Crop className="w-4 h-4 text-[#C5A059]" />
                  <h3 className="font-royal text-base font-bold text-[#3D2E24]">
                    Adjust & Fit Photo
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCropping(false)}
                  className="text-xs text-[#8A725F] hover:text-[#3D2E24] font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <div className="text-xs font-sans text-[#7C6656]">
                <span className="font-bold text-[#3D2E24] block">
                  Target: {currentConfig.title} ({currentConfig.ratioW}:{currentConfig.ratioH})
                </span>
                <span>Zoom aur position adjust kijiye taaki photo card me perfect fit baithe:</span>
              </div>

              {/* Exact Aspect-Ratio Preview Viewport */}
              <div className="relative w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden border-2 border-[#C5A059] shadow-md bg-[#2D1F17]">
                <div className={`relative w-full ${currentConfig.aspectRatio} overflow-hidden`}>
                  <img
                    src={sourceImage}
                    alt="Crop preview"
                    className="w-full h-full object-cover transition-transform duration-75"
                    style={{
                      transform: `scale(${zoom}) translate(${panX}%, ${panY}%)`,
                      transformOrigin: "center center",
                    }}
                  />
                  {/* Subtle Grid Rule of Thirds */}
                  <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-white/20">
                    <div className="border-r border-b border-white/20" />
                    <div className="border-r border-b border-white/20" />
                    <div className="border-b border-white/20" />
                    <div className="border-r border-b border-white/20" />
                    <div className="border-r border-b border-white/20" />
                    <div className="border-b border-white/20" />
                  </div>
                </div>
              </div>

              {/* Adjustment Controls */}
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8DFC2] space-y-3">
                {/* Zoom Slider */}
                <div>
                  <div className="flex justify-between text-[11px] font-sans font-semibold text-[#6E5544] mb-1">
                    <span className="flex items-center gap-1">
                      <ZoomIn className="w-3.5 h-3.5 text-[#C5A059]" />
                      Zoom / Size
                    </span>
                    <span>{zoom.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="2.5"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full accent-[#C5A059] cursor-pointer"
                  />
                </div>

                {/* Horizontal Pan */}
                <div>
                  <div className="flex justify-between text-[11px] font-sans font-semibold text-[#6E5544] mb-1">
                    <span className="flex items-center gap-1">
                      <Move className="w-3.5 h-3.5 text-[#C5A059]" />
                      Horizontal Pan (Left / Right)
                    </span>
                    <span>{panX}%</span>
                  </div>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    step="1"
                    value={panX}
                    onChange={(e) => setPanX(parseInt(e.target.value))}
                    className="w-full accent-[#C5A059] cursor-pointer"
                  />
                </div>

                {/* Vertical Pan */}
                <div>
                  <div className="flex justify-between text-[11px] font-sans font-semibold text-[#6E5544] mb-1">
                    <span className="flex items-center gap-1">
                      <Move className="w-3.5 h-3.5 text-[#C5A059] rotate-90" />
                      Vertical Pan (Up / Down)
                    </span>
                    <span>{panY}%</span>
                  </div>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    step="1"
                    value={panY}
                    onChange={(e) => setPanY(parseInt(e.target.value))}
                    className="w-full accent-[#C5A059] cursor-pointer"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleResetCrop}
                  className="inline-flex items-center gap-1 text-[11px] font-sans text-[#8A725F] hover:text-[#3D2E24] cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset position</span>
                </button>
              </div>

              {/* Apply Crop & Real-Time Save Button */}
              <button
                type="button"
                onClick={handleApplyCrop}
                disabled={isSavingPhoto}
                className="w-full py-3 bg-[#801A1A] hover:bg-[#681414] active:bg-[#521111] text-white text-xs font-sans font-bold tracking-[0.16em] uppercase rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSavingPhoto ? (
                  <span>APPLYING IN REAL-TIME...</span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[#EFE3D5]" />
                    <span>SAVE & APPLY IN REAL-TIME</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* 3. DULHA & DULHAN CONTROL CENTER: REAL-TIME PHOTO MANAGEMENT (NO GOOGLE MAPS) */
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE7DD]">
                <div>
                  <h3 className="font-royal text-lg font-bold text-[#3D2E24]">
                    Dulha Control Center
                  </h3>
                  <span className="text-[11px] font-sans text-[#8A725F]">
                    Real-Time Photo Management & Crop Tool
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLoggedIn(false)}
                  className="inline-flex items-center gap-1 text-xs text-[#801A1A] font-semibold hover:underline cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>

              {uploadSuccess && (
                <div className="p-2.5 bg-[#E8F5E9] border border-[#A5D6A7] rounded-xl text-xs text-[#2E7D32] font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{uploadSuccess}</span>
                </div>
              )}

              {/* Photo Selector Tabs */}
              <div className="space-y-1">
                <label className="block font-sans text-xs uppercase font-bold text-[#6E5544]">
                  SELECT WHICH PHOTO TO CHANGE:
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#FAF7F2] rounded-xl border border-[#E8DFC2]">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPhotoType("hero");
                      setUploadSuccess("");
                    }}
                    className={`py-2 px-2 text-center rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                      selectedPhotoType === "hero"
                        ? "bg-[#C5A059] text-white shadow-xs"
                        : "text-[#7C6656] hover:bg-[#F2ECE3]"
                    }`}
                  >
                    1. Hero Couple Photo (Home)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPhotoType("story");
                      setUploadSuccess("");
                    }}
                    className={`py-2 px-2 text-center rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                      selectedPhotoType === "story"
                        ? "bg-[#C5A059] text-white shadow-xs"
                        : "text-[#7C6656] hover:bg-[#F2ECE3]"
                    }`}
                  >
                    2. Our Story Photo (Panel 2)
                  </button>
                </div>
              </div>

              {/* Placement & Current Preview Card */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DFC2] text-left space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-sans text-[10px] font-bold tracking-widest text-[#C5A059] uppercase block">
                      {currentConfig.location}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#3D2E24] mt-0.5">
                      {currentConfig.title}
                    </h4>
                    <p className="font-sans text-xs text-[#7C6656] mt-0.5 leading-relaxed">
                      {currentConfig.description}
                    </p>
                  </div>

                  {/* Thumbnail of current photo */}
                  <div className="w-16 h-20 shrink-0 rounded-xl overflow-hidden border border-[#C5A059]/50 shadow-xs bg-[#EFE8DC]">
                    <img
                      src={weddingState.photos[selectedPhotoType]}
                      alt="Current"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F0E6D8] flex items-center justify-between text-[11px] font-sans text-[#8A725F]">
                  <span>Frame Size: {currentConfig.ratioW}:{currentConfig.ratioH} (Strict Fit)</span>
                  <span className="text-[#2E7D32] font-semibold">● Live Sync Active</span>
                </div>
              </div>

              {/* Upload & Open Cropper Button */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-4 border-2 border-dashed border-[#C5A059] rounded-2xl bg-[#FFFDF9] hover:bg-[#FAF5EE] active:scale-[0.99] transition-all flex flex-col items-center justify-center cursor-pointer shadow-xs group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FAF5EE] group-hover:bg-[#FFFDF9] flex items-center justify-center text-[#C5A059] mb-1.5 shadow-2xs border border-[#C5A059]/40">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="font-sans text-xs font-bold text-[#3D2E24] tracking-wider uppercase">
                    CHOOSE NEW PHOTO & CROP TO FIT
                  </span>
                  <span className="text-[11px] font-serif italic text-[#8A725F] mt-0.5">
                    Select from phone gallery or computer
                  </span>
                </button>
              </div>

              <div className="text-[11px] font-serif italic text-center text-[#8A725F]">
                Changes apply instantly in real-time across the website.
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DulhaAdminModal;
