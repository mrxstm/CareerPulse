import multer from "multer";

const errorHandler = (error, req, res, next) => {
    console.error(error);


    // multer errors
    if(error instanceof multer.MulterError) {
        if(error.code === "LIMIT_FILE_SIZE") {
            return res.status(413).json({message : "File size cannot exceed 5 MB" })
        }
    } 
    
    // other errors
    return res.status(500).json({
        message: error.message || "Internal server error"
    });
}

export default errorHandler;