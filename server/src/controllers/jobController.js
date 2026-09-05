import prisma from "../config/prisma.js";
import { extractJobDetails } from "../services/aiService.js";
import { extractJobText, isBlockedPage } from "../services/jobParserService.js";
import { fetchJobFromUrl } from "../services/jobService.js";
import { jobSchema, jobUrlSchema } from "../validations/jobValidation.js";


export const createJobDescription = async (req, res, next) => {
    try {
        const result = jobSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Validation error",
                errors: result.error.issues
            });
        }

        const { description } = result.data;

        const jobDetails = await extractJobDetails(description);

        const job = await prisma.jobDescription.create({
            data: {
                userId: req.user.id,
                title: jobDetails.title,
                company: jobDetails.company,
                description: description,
                sourceUrl: null
            }
        });
        return res.status(201).json({
            message: "Job created successfully",
            data: job
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};


export const fetchJob = async (req, res, next) => {
    try {
        const result = jobUrlSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json({message: "Validation error", errors: result.error.issues});
        }

        const { url } = result.data;
        const html = await fetchJobFromUrl(url);
        const text = extractJobText(html);
        
        if (!text) {
            return res.status(400).json({
                message: "Could not extract job information from this URL"
            });
        }
        
        if (isBlockedPage(text)) {
            return res.status(400).json({
                message: "This job page requires authentication or blocked automated access"
            });
        }
        
        const jobDetails = await extractJobDetails(text);

        const job = await prisma.jobDescription.create({
            data: {
                userId: req.user.id,
                title: jobDetails.title,
                company: jobDetails.company,
                description: text,
                sourceUrl: url
            }
        });

        return res.status(201).json({
            message: "Job fetched and saved successfully", 
            data: {
                job: job
            }
        });

    } catch (error) {
        console.log(error);
        
        if (error.response?.status === 403) {
            return res.status(403).json({
                message: "This website does not allow automated access"
            });
        }
        
        
        if (error.response?.status === 404) {
            return res.status(404).json({
                message: "Job page not found"
            });
        }
        
        next(error);
    }
};


export const getAllJob = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const jobs = await prisma.jobDescription.findMany({
            where: { userId },
            orderBy: {
                createdAt: "desc"
            }
        });

        return res.status(200).json({
            message: "Jobs successfully fetched",
            data: jobs
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};


export const getJobById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const jobId = Number(req.params.id);

        const job = await prisma.jobDescription.findFirst({
            where: {
                id: jobId,
                userId
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        return res.status(200).json({
            message: "Job successfully fetched",
            data: job
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};


export const deleteJob = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const jobId = Number(req.params.id);

        const job = await prisma.jobDescription.findFirst({
            where: {
                id: jobId,
                userId
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        await prisma.jobDescription.delete({
            where: {
                id: jobId
            }
        });

        return res.status(200).json({
            message: "Job deleted successfully"
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};

