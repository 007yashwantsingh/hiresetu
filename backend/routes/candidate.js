import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import CandidateProfile from "../models/CandidateProfile.js";

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// GET PROFILE
router.get("/profile/:email", async (req, res) => {
  try {
    const profile = await CandidateProfile.findOne({
      email: req.params.email,
    });

    res.json({
      ok: true,
      profile,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      ok: false,
      message: "Failed to fetch profile",
    });
  }
});

// SAVE PROFILE
router.post("/profile", async (req, res) => {
  try {
    const {
      userId,
      name,
      email,
      phone,
      skills,
      currentCompany,
      expectedSalary,
      preferredCategory,
      experience,
      summary,
    } = req.body;

    const existingProfile = await CandidateProfile.findOne({ email });

const completedFields = [
  name,
  email,
  phone,
  skills?.length,
  currentCompany,
  expectedSalary,
  preferredCategory,
  experience,
  summary,
  existingProfile?.resumeUrl,
].filter(Boolean).length;

const profileStrength = Math.min(completedFields * 10, 100);

    const profile = await CandidateProfile.findOneAndUpdate(
      { email },
      {
        userId,
        name,
        email,
        phone,
        skills,
        currentCompany,
        expectedSalary,
        preferredCategory,
        experience,
        summary,
        profileStrength,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      ok: true,
      profile,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      ok: false,
      message: "Failed to save profile",
    });
  }
});

// RESUME UPLOAD
router.post(
  "/resume",
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          ok: false,
          message: "Resume file required",
        });
      }

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "raw",
              folder: "hiresetu_resumes",
            },
            (error, uploadedResult) => {
              if (error) reject(error);
              else resolve(uploadedResult);
            }
          )
          .end(req.file.buffer);
      });

      const { email } = req.body;

      const profile = await CandidateProfile.findOneAndUpdate(
        { email },
        {
          resumeUrl: result.secure_url,
          resumePublicId: result.public_id,
          resumeFileName: req.file.originalname,
        },
        {
          new: true,
          upsert: true,
        }
      );

      res.json({
        ok: true,
        profile,
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        ok: false,
        message: "Resume upload failed",
      });
    }
  }
);

export default router;