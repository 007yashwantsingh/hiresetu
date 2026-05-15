import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    role: {
      type: String,
      enum: ["candidate", "employer", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, default: "Not disclosed" },
    exp: { type: String, default: "0-2 Years" },
    description: { type: String, default: "" },
    employerId: String,
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    applicants: { type: Number, default: 0 },
    tag: { type: String, default: "New" },
  },
  { timestamps: true }
);

const applicationSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    candidateId: String,
    candidateName: String,
    candidateEmail: String,
    jobTitle: String,
    company: String,
    category: String,
    status: {
      type: String,
      enum: [
        "Applied",
        "Viewed",
        "Shortlisted",
        "Interview",
        "Selected",
        "Rejected",
        "Joined",
      ],
      default: "Applied",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Job = mongoose.model("Job", jobSchema);
const Application = mongoose.model("Application", applicationSchema);

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "HireSetu backend with MongoDB is running",
  });
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!email || !role) {
      return res.status(400).json({
        ok: false,
        message: "Email and role are required",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: name || "User",
        email,
        role,
      });
    }

    res.json({
      ok: true,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      message: "Login failed",
    });
  }
});

app.get("/api/jobs", async (req, res) => {
  try {
    const { category } = req.query;

    const filter = { status: "Approved" };

    if (category) {
      filter.category = category;
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });

    res.json({
      ok: true,
      jobs,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Failed to fetch jobs",
    });
  }
});

app.post("/api/jobs", async (req, res) => {
  try {
    const {
      title,
      company,
      category,
      location,
      salary,
      exp,
      description,
      employerId,
    } = req.body;

    if (!title || !company || !category || !location) {
      return res.status(400).json({
        ok: false,
        message: "Title, company, category and location are required",
      });
    }

    const job = await Job.create({
      title,
      company,
      category,
      location,
      salary,
      exp,
      description,
      employerId,
      status: "Pending",
      applicants: 0,
      tag: "New",
    });

    res.status(201).json({
      ok: true,
      message: "Job submitted for admin approval",
      job,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      message: "Failed to create job",
    });
  }
});

app.get("/api/admin/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.json({
      ok: true,
      jobs,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Failed to fetch admin jobs",
    });
  }
});

app.patch("/api/admin/jobs/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Rejected", "Pending"].includes(status)) {
      return res.status(400).json({
        ok: false,
        message: "Invalid status",
      });
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        ok: false,
        message: "Job not found",
      });
    }

    res.json({
      ok: true,
      message: `Job ${status}`,
      job,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Failed to update job status",
    });
  }
});

app.post("/api/applications", async (req, res) => {
  try {
    const { jobId, candidateId, candidateName, candidateEmail } = req.body;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        ok: false,
        message: "Job not found",
      });
    }

    const alreadyApplied = await Application.findOne({
      jobId,
      candidateEmail,
    });

    if (alreadyApplied) {
      return res.status(409).json({
        ok: false,
        message: "You already applied to this job",
      });
    }

    const application = await Application.create({
      jobId,
      candidateId,
      candidateName,
      candidateEmail,
      jobTitle: job.title,
      company: job.company,
      category: job.category,
      status: "Applied",
    });

    job.applicants += 1;
    await job.save();

    res.status(201).json({
      ok: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      message: "Application failed",
    });
  }
});

app.get("/api/applications/candidate/:email", async (req, res) => {
  try {
    const applications = await Application.find({
      candidateEmail: req.params.email,
    }).sort({ createdAt: -1 });

    res.json({
      ok: true,
      applications,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Failed to fetch applications",
    });
  }
});

app.get("/api/applications/job/:jobId", async (req, res) => {
  try {
    const applications = await Application.find({
      jobId: req.params.jobId,
    }).sort({ createdAt: -1 });

    res.json({
      ok: true,
      applications,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Failed to fetch job applications",
    });
  }
});

app.patch("/api/applications/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Applied",
      "Viewed",
      "Shortlisted",
      "Interview",
      "Selected",
      "Rejected",
      "Joined",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        ok: false,
        message: "Invalid application status",
      });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      ok: true,
      message: "Application status updated",
      application,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Failed to update application",
    });
  }
});

app.get("/api/admin/analytics", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const approvedJobs = await Job.countDocuments({ status: "Approved" });
    const pendingJobs = await Job.countDocuments({ status: "Pending" });
    const totalApplications = await Application.countDocuments();
    const joinedCandidates = await Application.countDocuments({
      status: "Joined",
    });

    res.json({
      ok: true,
      data: {
        totalUsers,
        totalJobs,
        approvedJobs,
        pendingJobs,
        totalApplications,
        joinedCandidates,
      },
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Failed to fetch analytics",
    });
  }
});

app.listen(PORT, () => {
  console.log(`HireSetu backend running on http://localhost:${PORT}`);
});

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);