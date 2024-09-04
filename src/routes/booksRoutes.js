import express from 'express';
import { booksDeleteSchema, booksEditSchema, booksSchema } from '../dtos/books.js'
import { validateHandler } from '..//middleware/validateHandler.js'
import { verifyAdmin } from '../middleware/verifyUsers.js'

const routes = express.Router()

routes.post(
    "books",
    verifyAdmin,
    booksSchema,
    validateHandler,
    (req,res,next)=>{
        console.log("books creation is here", req.body,req.adminId)
    }
)

export default routes;