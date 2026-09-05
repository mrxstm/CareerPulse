import "dotenv/config";

import { extractResumeText } from "./resumeService.js";
import { extractResumeDetails } from "./aiService.js";

const filePath = "C:/Users/Dell/Desktop/careerpulse/server/src/uploads/resumes/1787296201929-Satyam_Shrestha_Resume.pdf";

const resumeText = await extractResumeText(filePath);

const resumeDetails = await extractResumeDetails(resumeText);

console.dir(resumeDetails, { depth: null });