import express from "express";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorMiddleware.js";




const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());

//routes 
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

//error handler 
app.use(errorHandler);

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`);
    
});