import prisma from "../config/prisma.js";
import { updateProfileSchema } from "../validations/userValidation.js";

export const getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                profile_image: true,
                createdAt: true
            }
        });

        return res.status(200).json({
            message: "Profile fetched successfully",
            data: user
        });

    } catch (error) {
        next(error);
    }
};

export const updateProfile = async(req, res, next) => {
    try {
        const userId = req.user.id;

        //validating
        const result = updateProfileSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.issues
            });
        }

        //validated data
        const { name } = result.data;
    
        
        const updatedUser = await prisma.user.update({
           where : { id : userId},
           data : {
            name
           },
           select: {
            id: true,
            name: true,
            email: true,
            profile_image: true,
            createdAt: true
           }
        });

        return res.status(200).json({
            message: "Profile updated successfully",
            data: updatedUser
        });

      
    } catch(error) {
        next(error);
    }
} 