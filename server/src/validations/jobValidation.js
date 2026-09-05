import z from "zod";

export const jobSchema = z.object({
    
    description: z
        .string()
        .trim()
        .min(1, "Please provide job description"),

});

export const jobUrlSchema = z.object({
    url: z
    .string()
    .trim()
    .url("Please provide a valid job URL")
});


export const jobExtractionSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Job title is required"),

    company: z
        .string()
        .trim()
        .min(1, "Company name is required"),

    description: z
        .string()
        .trim()
        .min(1, "Job description is required"),

    skills: z
        .array(z.string().trim().min(1, "Skill cannot be empty")),

    requirements: z
        .array(z.string().trim().min(1, "Requirement cannot be empty")),

    experience: z
        .string()
        .trim()
        .min(1, "Experience is required")
});