import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { weddingData } from "../config/weddingData";

const WeddingStateContext = createContext(null);
const API_BASE = import.meta.env.VITE_API_URL || "https://wedding1-fevi.onrender.com";

// Resolve relative /uploads/... paths to live Render backend domain
export const resolvePhotoUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("/uploads/")) {
    return `${API_BASE}${url}`;
  }
  return url;
};

// Load any previously saved photos from localStorage as instant cache
const getInitialPhotos = () => {
  const initial = { ...weddingData.photos };
  try {
    ["hero", "story", "details"].forEach((key) => {
      const saved = localStorage.getItem(`wedding_photo_${key}`);
      if (saved) {
        initial[key] = resolvePhotoUrl(saved);
      }
    });
  } catch (err) {
    // localStorage might be unavailable or full
  }
  return initial;
};

export const WeddingStateProvider = ({ children }) => {
  const [weddingState, setWeddingState] = useState({
    photos: getInitialPhotos(),
  });

  const isServerAvailableRef = useRef(true);

  const fetchState = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/wedding-state`, {
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.photos) {
          isServerAvailableRef.current = true;
          const resolvedPhotos = {};
          Object.keys(data.photos).forEach((k) => {
            resolvedPhotos[k] = resolvePhotoUrl(data.photos[k]);
          });
          setWeddingState((prev) => ({
            ...prev,
            photos: { ...prev.photos, ...resolvedPhotos },
          }));
        }
      } else {
        // 503 or 404 - backend is offline
        isServerAvailableRef.current = false;
      }
    } catch (e) {
      // Backend server is offline; silently keep using local cached photos
      isServerAvailableRef.current = false;
    }
  };

  useEffect(() => {
    fetchState();
    // Poll every 12 seconds for live photo sync across devices
    const interval = setInterval(() => {
      if (isServerAvailableRef.current) {
        fetchState();
      }
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <WeddingStateContext.Provider
      value={{
        weddingState,
        refreshState: fetchState,
        setWeddingState,
        resolvePhotoUrl,
      }}
    >
      {children}
    </WeddingStateContext.Provider>
  );
};

export const useWeddingState = () => {
  const ctx = useContext(WeddingStateContext);
  if (!ctx) {
    throw new Error("useWeddingState must be used within WeddingStateProvider");
  }
  return ctx;
};
