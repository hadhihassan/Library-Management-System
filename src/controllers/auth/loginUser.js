import { StatusCodes } from "http-status-codes";
import { asyncErrorHandler } from "../../utils/asyncHandler.js";
import { generateJwtToken } from '../../utils/generateToken.js'
import User from '../../models/User.js'
import { comparePasswords } from "../../utils/bcrypt.js";

// Handles member login.
export const loginUser = asyncErrorHandler(async (req, res) => {

    const { email, password } = req.body;

    const logedUser = await User.findOne({ email })
    if (!logedUser) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Invalid crendential.",
        });
    }
    const comparePassword = await comparePasswords(password, logedUser.password);
    if (!comparePassword) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Wrong password.",
        });
    }

    if (!logedUser.isVerified) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Youre not verified, please verify.",
        });
    }

    let token = await generateJwtToken(logedUser._id, "Member");
    return res.status(StatusCodes.ACCEPTED).json({
        success: true,
        message: "Loging Successfull",
        token,
        userName: logedUser.name
    })
});


// Handles admin login.
export const loginAdmin = asyncErrorHandler(async (req, res) => {

    const { email, password } = req.body;

    const logedAdmin = await User.findOne({ email, role: "Admin" })
    if (!logedAdmin) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Invalid crendential.",
        });
    }
    const comparePassword = await comparePasswords(password, logedAdmin.password);
    if (!comparePassword) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Wrong password.",
        });
    }

    if (!logedAdmin.isVerified) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Youre not verified, please verify.",
        });
    }

    let token = await generateJwtToken(logedAdmin._id, "Admin");
    return res.status(StatusCodes.ACCEPTED).json({
        success: true,
        message: "Loging Successfull",
        token,
        userName: logedAdmin.name
    })
});