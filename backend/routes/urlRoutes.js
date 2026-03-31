import { randomBytes } from "crypto";
import express from "express";
import Url from "../models/Url.js";

const router = express.Router();

function createShortCode() {
  return randomBytes(3).toString("hex");
}

function normalizeShortCode(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
}

router.get("/health", async (_req, res) => {
  res.json({ success: true, message: "API is running" });
});

router.post("/shorten", async (req, res) => {
  try {
    const originalUrl = req.body.originalUrl?.trim();
    const preferredCode = req.body.shortCode?.trim();

    if (!originalUrl) {
      return res.status(400).json({ success: false, message: "Original URL is required." });
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(originalUrl);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid URL including http:// or https://",
      });
    }

    let shortCode = preferredCode ? normalizeShortCode(preferredCode) : createShortCode();

    if (!shortCode) {
      return res.status(400).json({
        success: false,
        message: "Short code can only contain letters, numbers, hyphens, and underscores.",
      });
    }

    const existingCustomCode = await Url.findOne({ shortCode });
    if (existingCustomCode) {
      return res.status(409).json({ success: false, message: "This short URL is already taken." });
    }

    const url = await Url.create({
      originalUrl: parsedUrl.toString(),
      shortCode,
    });

    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;

    return res.status(201).json({
      success: true,
      message: "Short URL generated successfully.",
      data: {
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        shortUrl: `${baseUrl}/${url.shortCode}`,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Server error." });
  }
});

router.get("/urls", async (_req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 }).limit(20).lean();
    res.json({ success: true, data: urls });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Server error." });
  }
});

router.delete("/urls", async (_req, res) => {
  try {
    await Url.deleteMany({});
    res.json({ success: true, message: "Recent history cleared." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Server error." });
  }
});

router.delete("/urls/:id", async (req, res) => {
  try {
    const deletedUrl = await Url.findByIdAndDelete(req.params.id);

    if (!deletedUrl) {
      return res.status(404).json({ success: false, message: "Short URL not found." });
    }

    return res.json({ success: true, message: "Short URL deleted." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Server error." });
  }
});

export default router;