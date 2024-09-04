import express from 'express';
import { validateHandler } from '../middleware/validateHandler.js'
import { loginSchema, registerSchema } from '../dtos/auth.js';
import { loginUser, loginAdmin } from '../controllers/auth/loginUser.js'
import { registerUser } from '../controllers/auth/registerUser.js'


const authRouter = express.Router()

authRouter.post(
    "/register",
    registerSchema,
    validateHandler,
    (req, res, next) => {
        registerUser(req, res, next)
    }
);

authRouter.post(
    "/login",
    loginSchema,
    validateHandler,
    (req, res, next) => {
        loginUser(req, res, next)
    }
)
authRouter.post(
    "/admin/login",
    loginSchema,
    validateHandler,
    (req, res, next) => {
        loginAdmin(req, res, next)
    }
)


export default authRouter