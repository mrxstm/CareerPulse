import multer from "multer";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads/resumes");
    },

    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimeType === "application/pdf") {
        cb(null, true);
    } else {
        const error = cb(new Error("Only PDF files are allowed"));
        error.statusCode = 400;
        cb(error, false)
    }
}

const upload = multer({
    storage, 
    fileFilter,
    limits : {
        fileSize: 5 * 1024 * 1024
    }
});

export default upload;


