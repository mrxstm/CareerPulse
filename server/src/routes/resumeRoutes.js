import express from "express";
import upload from "../middleware/upload.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { deleteResume, getAllResume, getResumeById, uploadResume } from "../controllers/resumeController.js";

const router = express.Router();

router.post("/", isAuthenticated, upload.single('resume'), uploadResume);
router.get("/", isAuthenticated, getAllResume);
router.get("/:id", isAuthenticated, getResumeById);
router.delete("/:id", isAuthenticated, deleteResume);

export default router;