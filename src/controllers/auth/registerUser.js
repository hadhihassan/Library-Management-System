import { StatusCodes } from "http-status-codes";
import { asyncErrorHandler } from "../../utils/asyncHandler.js";
import { convertSecurePassword } from "../../utils/bcrypt.js";
import User from '../../models/User.js';

// Handles user registration.
export const registerUser = asyncErrorHandler(async (req, res) => {

    const { email, password } = req.body;

    const isExisting = await User.findOne({ email });
    if (isExisting) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Email already exists.",
        });
    }

    const hashedPassword = await convertSecurePassword(password);

    const userInput = { ...req.body, password: hashedPassword };
    await User.create(userInput);

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Successfully registed your accound",
    });
});