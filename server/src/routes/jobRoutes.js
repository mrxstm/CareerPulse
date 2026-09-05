import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js"
import { createJobDescription, deleteJob, fetchJob, getAllJob, getJobById } from "../controllers/jobController.js";

const router = express.Router();

router.post("/", isAuthenticated, createJobDescription);
router.post("/fetch", isAuthenticated, fetchJob);
router.get("/", isAuthenticated, getAllJob);
router.get("/:id", isAuthenticated, getJobById);
router.delete("/:id", isAuthenticated, deleteJob);

export default router;


