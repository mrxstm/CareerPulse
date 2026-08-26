import { loginSchema, registerSchema } from "../validations/authValidation.js";
import prisma from "../config/prisma.js";
import { hashPassword } from "../utils/hashPassword.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwtService.js";

export const register = async(req, res, next) => {
    try {

        // validate req.body (which has name, email, password) with zod
        const result = registerSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json({message: "Validation error", errors: result.error.issues})
            
        } 

        const { name, email, password } = result.data;

        const existingUser = await prisma.user.findUnique({
             where: { email }
        });

        //check for existing email
        if (existingUser) {
            return res.status(409).json({
                message: "Email is already registered"
            });
        }
        //hash password
        const hashedPassword = await hashPassword(password);

        //create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return res.status(201).json({message: "User registered successfully"});
                
    } catch (error) {
        next(error);
    }
}

export const login = async(req, res, next) => {
    try {

        const result = loginSchema.safeParse(req.body)


        if (!result.success) {
            return res.status(400).json({message: "Validation failed",errors: result.error.issues});
        }


        const {email, password} = result.data;
        
        //find user by email
        const user = await prisma.user.findUnique({
            where: { email } 
        })

        if(!user) {
            return res.status(401).json({message : "Invalid email or password"});
        } 

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(401).json({message : "Invalid email or password"});
        }

        //jwt token generation
        const jwt_token = generateToken({
            id: user.id
        });

        //setting cookie as httpOnly
        res.cookie("access_token", jwt_token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production" ? true : false,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ message: "Login successful" });

        
    } catch (error) {
       next(error);
    }
}

export const logout = (req, res, next)=> {
    try {
        
        res.clearCookie("access_token", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });
        
        return res.status(200).json({message: "Logged out successfully"});
        
    } catch (error) {
        next(error);
    }
}