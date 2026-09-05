import { GoogleGenAI } from "@google/genai";
import { jobExtractionSchema } from "../validations/jobValidation.js"
import { resumeExtractionSchema } from "../validations/resumeValidation.js";


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export const extractJobDetails = async(jobText) => {
    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `
              Extract the following information from this job posting:
                - Job title
                - Company
                - Skills
                - Requirements
                - Experience
                
                Job posting:
                ${jobText}
        `,

        config: {
            responseMimeType: "application/json",

            responseSchema: {
                type: "object",

                properties: {
                    title: {
                        type: "string"
                    },
                    company: {
                        type: "string"
                    },

                    description: {
                        type: "string"
                    },

                    skills: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                     
                    requirements: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },

                    experience: {
                        type: "string"
                    },
                       
                },

                required: [
                    "title",
                    "company",
                    "description",
                    "skills",
                    "requirements",
                    "experience"
                ]
            }
        }
    });

    // Convert JSON string into a JavaScript object
    const jobDetails = JSON.parse(response.text);

    // Validate the AI response
    const result = jobExtractionSchema.safeParse(jobDetails);

    if (!result.success) {
        throw new Error("AI response validation failed");
    }

    return result.data;
}

export const extractResumeDetails = async(resumeText) => {
    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",

        contents: `
            Extract the following information from this resume:

            - Summary
            - Skills
            - Education
            - Work experience
            - Projects

            Resume:
            ${resumeText}
        `,
         config: {
            responseMimeType: "application/json",

            responseSchema: {
                type: "object",

                properties: {
                    summary: {
                        type: "string"
                    },

                    skills: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },

                    education: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                degree: {
                                    type: "string"
                                },
                                institution: {
                                    type: "string"
                                },
                                startDate: {
                                    type: "string"
                                },
                                endDate: {
                                    type: "string"
                                },
                                location: {
                                    type: "string"
                                }
                            },
                            required: [
                                "degree",
                                "institution",
                                "startDate",
                                "endDate",
                                "location"
                            ]
                        }
                    },

                    experience: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                company: {
                                    type: "string"
                                },
                                role: {
                                    type: "string"
                                },
                                startDate: {
                                    type: "string"
                                },
                                endDate: {
                                    type: "string"
                                },
                                description: {
                                    type: "string"
                                }
                            },
                            required: [
                                "company",
                                "role",
                                "startDate",
                                "endDate",
                                "description"
                            ]
                        }
                    },

                    projects: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                name: {
                                    type: "string"
                                },
                                description: {
                                    type: "string"
                                },
                                technologies: {
                                    type: "array",
                                    items: {
                                        type: "string"
                                    }
                                }
                            },
                            required: [
                                "name",
                                "description",
                                "technologies"
                            ]
                        }
                    }
                },

                required: [
                    "summary",
                    "skills",
                    "education",
                    "experience",
                    "projects"
                ]
            }
        }
    });

    // Gemini returns JSON as a string
    const resumeDetails = JSON.parse(response.text);

    // Validate Gemini's output
    const result = resumeExtractionSchema.safeParse(resumeDetails);

    if (!result.success) {
        throw new Error("Invalid resume extraction result");
    }

    return result.data;
};




