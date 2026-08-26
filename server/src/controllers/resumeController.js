import prisma from "../config/prisma.js";

export const uploadResume = async (req, res, next) => {
    try {
        /*
            user uploads the resume ->
            which user? req.user.id from isAuthenticated
            then call the resume upload function upload(req.file)
            create resume from prisma passing the user.id
        */

        const userId = req.user.id;

        if (!req.file) {
            return res.status(400).json({
                message: "File is required"
            });
        }

        const { title } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "Resume Title is required"
            });
        }

        // Creating resume
        const resume = await prisma.resume.create({
            data: {
                userId,
                title,
                pdfUrl: req.file.path,
                version: 1
            }
        });

        // Success message
        return res.status(201).json({
            message: "Resume uploaded successfully",
            data: resume
        });

    } catch (error) {
        next(error);
    }
};

export const getAllResume = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const resume = await prisma.resume.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" }
        });

        if (!resume) {
            return res.status(404).json({
                message: "No resume found"
            });
        }

        return res.status(200).json({
            message: "Resumes successfully fetched",
            data: resume
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const getResumeById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const resumeId = Number(req.params.id);

        const resume = await prisma.resume.findFirst({
            where: {
                id: resumeId,
                userId
            }
        });

        if (!resume) {
            return res.status(404).json({
                message: "No resume found"
            });
        }

        return res.status(200).json({
            message: "Resume successfully fetched",
            data: resume
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const deleteResume = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const resumeId = Number(req.params.id);

        const resume = await prisma.resume.findFirst({
            where: {
                id: resumeId,
                userId
            }
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        await prisma.resume.delete({
            where: {
                id: resumeId
            }
        });

        return res.status(200).json({
            message: "Resume deleted successfully"
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
};