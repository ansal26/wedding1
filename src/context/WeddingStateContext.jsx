import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { weddingData } from "../config/weddingData";

const WeddingStateContext = createContext(null);
const API_BASE = import.meta.env.VITE_API_URL || "";

// Load any previously saved photos from localStorage as instant cache
const getInitialPhotos = () => {
  const initial = { ...weddingData.photos };
  try {
    ["hero", "story", "details"].forEach((key) => {
      const saved = localStorage.getItem(`wedding_photo_${key}`);
      if (saved) {
        initial[key] = saved;
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
          setWeddingState((prev) => ({
            ...prev,
            photos: { ...prev.photos, ...data.photos },
          }));
        }
      } else {
        // 503 or 404 - backend is offline or not deployed with backend
        isServerAvailableRef.current = false;
      }
    } catch (e) {
      // Backend server is offline; silently keep using local cached photos
      isServerAvailableRef.current = false;
    }
  };

  useEffect(() => {
    fetchState();
    // Only poll periodically if server was available
    const interval = setInterval(() => {
      if (isServerAvailableRef.current) {
        fetchState();
      }
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <WeddingStateContext.Provider
      value={{
        weddingState,
        refreshState: fetchState,
        setWeddingState,
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
