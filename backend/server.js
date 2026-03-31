import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import Url from "./models/Url.js";
import urlRoutes from "./routes/urlRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

await connectDB();

app.use(cors({ origin: clientUrl }));
app.use(express.json());
app.use("/api", urlRoutes);

app.get("/", (_req, res) => {
  res.json({ success: true, message: "Backend is running" });
});

app.get("/:shortCode", async (req, res) => {
  try {
    const shortCode = req.params.shortCode?.toLowerCase();
    const url = await Url.findOneAndUpdate(
      { shortCode },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!url) {
      return res.status(404).json({ success: false, message: "Short URL not found." });
    }

    return res.redirect(url.originalUrl);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Server error." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
