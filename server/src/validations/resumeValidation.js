import { z } from "zod";

export const resumeExtractionSchema = z.object({
    summary: z.string().trim().min(1),

    skills: z.array(z.string().trim().min(1)),

    education: z.array(
        z.object({
            degree: z.string().trim().min(1),
            institution: z.string().trim().min(1),
            startDate: z.string().trim().min(1),
            endDate: z.string().trim().min(1),
            location: z.string().trim().min(1)
        })
    ),

    experience: z.array(
        z.object({
            company: z.string().trim().min(1),
            role: z.string().trim().min(1),
            startDate: z.string().trim().min(1),
            endDate: z.string().trim().min(1),
            description: z.string().trim().min(1)
        })
    ),

    projects: z.array(
        z.object({
            name: z.string().trim().min(1),
            description: z.string().trim().min(1),
            technologies: z.array(
                z.string().trim().min(1)
            )
        })
    )


})