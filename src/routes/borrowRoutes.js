import express from 'express';
import { validateHandler } from '..//middleware/validateHandler.js'
import { borrowSchema, borrowIdValidation } from '../dtos/borrow.js'
import { verifyAdmin, verifyUser } from '../middleware/verifyUsers.js'
import { borrowABook } from '../controllers/borrow/borrowBook.js'
import { returnBook } from '../controllers/borrow/retrunBook.js'

const routes = express.Router()

routes.post(
    "/borrow",
    verifyUser,
    borrowSchema,
    validateHandler,
    (req, res, next) => {
        borrowABook(req, res);
    }
)

routes.post(
    "/return/:id",
    verifyUser,
    borrowIdValidation,
    validateHandler,
    (req, res, next) => {
        returnBook(req, res);
    }
)

export default routes