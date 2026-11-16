import React, { createContext, useContext, useState, useEffect } from "react";
import { weddingData } from "../config/weddingData";

const WeddingStateContext = createContext(null);
const API_BASE = import.meta.env.VITE_API_URL || "";

export const WeddingStateProvider = ({ children }) => {
  const [weddingState, setWeddingState] = useState({
    photos: { ...weddingData.photos },
  });

  const fetchState = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/wedding-state`);
      if (res.ok) {
        const data = await res.json();
        if (data.photos) {
          setWeddingState((prev) => ({
            ...prev,
            photos: { ...prev.photos, ...data.photos },
          }));
        }
      }
    } catch (e) {
      // Offline fallback to defaults
    }
  };

  useEffect(() => {
    fetchState();
    // Poll every 8 seconds for live photo sync across devices
    const interval = setInterval(fetchState, 8000);
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
