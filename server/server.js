import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for high concurrency
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Static uploads folder
const uploadDir = path.resolve(__dirname, "../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static(uploadDir));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "photo-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB max file size
});

// Persistent State Path
const dataFilePath = path.resolve(__dirname, "data/state.json");

// Default State
const defaultState = {
  photos: {
    hero: "/1.jpg",
    story: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=1000&q=85",
    details: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
  },
  groomLocation: {
    lat: null,
    lng: null,
    updatedAt: null,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Chatier%2C+Yol%2C+Dharamshala%2C+Kangra%2C+Himachal+Pradesh+176052",
  },
  brideLocation: {
    lat: null,
    lng: null,
    updatedAt: null,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Rehlu%2C+Shahpur%2C+Kangra%2C+Himachal+Pradesh+176206",
  },
};

// In-Memory Fast Cache for high concurrency (handles 100+ requests/sec)
let memoryCache = { ...defaultState };

// Load persisted state on startup
try {
  if (fs.existsSync(dataFilePath)) {
    const raw = fs.readFileSync(dataFilePath, "utf8");
    memoryCache = { ...defaultState, ...JSON.parse(raw) };
  } else {
    fs.writeFileSync(dataFilePath, JSON.stringify(defaultState, null, 2));
  }
} catch (e) {
  console.error("Error reading state file:", e.message);
}

// Helper to save state asynchronously
const saveState = () => {
  fs.writeFile(dataFilePath, JSON.stringify(memoryCache, null, 2), (err) => {
    if (err) console.error("Error saving state:", err);
  });
};

/* ---------------- API ENDPOINTS ---------------- */

// 1. Health & Concurrency test
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

// 2. Secret Dulha Login (Case-insensitive check: id="aloves", password="weds")
app.post("/api/login", (req, res) => {
  const { id = "", password = "" } = req.body;

  const cleanId = String(id).trim().toLowerCase();
  const cleanPass = String(password).trim().toLowerCase();

  if (cleanId === "aloves" && cleanPass === "weds") {
    return res.json({
      success: true,
      role: "dulha_admin",
      token: "secret_wedding_auth_" + Date.now(),
      message: "Login successful. Welcome Dulha Ji!",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid ID or Password. Please try again.",
  });
});

// 3. Get Current Wedding State (Photos & Live Location URLs)
app.get("/api/wedding-state", (req, res) => {
  // Set fast cache headers for high concurrency
  res.setHeader("Cache-Control", "no-cache");
  res.json(memoryCache);
});

// 4. Update Live GPS Location (Groom or Bride)
app.post("/api/update-location", (req, res) => {
  const { role, lat, lng } = req.body;

  if (!role || typeof lat !== "number" || typeof lng !== "number") {
    return res.status(400).json({ error: "Invalid location coordinates" });
  }

  // Google Maps Direction / Navigation URL directly to live coordinates
  const destinationMapUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  const timestamp = new Date().toISOString();

  if (role === "groom") {
    memoryCache.groomLocation = {
      lat,
      lng,
      updatedAt: timestamp,
      mapUrl: destinationMapUrl,
    };
  } else if (role === "bride") {
    memoryCache.brideLocation = {
      lat,
      lng,
      updatedAt: timestamp,
      mapUrl: destinationMapUrl,
    };
  }

  saveState();

  res.json({
    success: true,
    message: `${role === "groom" ? "Groom's" : "Bride's"} live location updated successfully!`,
    groomLocation: memoryCache.groomLocation,
    brideLocation: memoryCache.brideLocation,
  });
});

// 5. Upload New Photo (Hero, Story, or Details) - supports both file and base64 canvas crops
app.post("/api/upload-photo", (req, res, next) => {
  // If request is json with imageBase64, handle directly without multer
  if (req.is("json")) {
    const { photoType = "hero", imageBase64 } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: "No imageBase64 provided" });
    }
    const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid base64 image data" });
    }
    const buffer = Buffer.from(matches[2], "base64");
    const filename = `photo-${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`;
    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);
    const fileUrl = `/uploads/${filename}`;

    if (photoType && memoryCache.photos[photoType] !== undefined) {
      memoryCache.photos[photoType] = fileUrl;
    } else {
      memoryCache.photos.hero = fileUrl;
    }
    saveState();

    return res.json({
      success: true,
      photoUrl: fileUrl,
      photos: memoryCache.photos,
      message: "Photo updated successfully in real-time!",
    });
  }

  // Otherwise handle with multer
  upload.single("photo")(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    const { photoType = "hero" } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No photo file uploaded" });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    if (photoType && memoryCache.photos[photoType] !== undefined) {
      memoryCache.photos[photoType] = fileUrl;
    } else {
      memoryCache.photos.hero = fileUrl;
    }

    saveState();

    res.json({
      success: true,
      photoUrl: fileUrl,
      photos: memoryCache.photos,
      message: "Photo updated successfully on the invitation website!",
    });
  });
});

// Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend server running on http://0.0.0.0:${PORT}`);
});
