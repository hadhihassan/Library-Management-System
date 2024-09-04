import express from 'express';
import { booksDeleteSchema, booksEditSchema, booksSchema } from '../dtos/books.js'
import { validateHandler } from '..//middleware/validateHandler.js'
import { verifyAdmin, verifyUser } from '../middleware/verifyUsers.js'
import { createBook } from '../controllers/books/createBooks.js'
import { ListAllBooks } from '../controllers/books/getBooks.js'
import { deleteBook } from '../controllers/books/deleteBook.js'
import { editBook } from '../controllers/books/editBook.js'

const routes = express.Router()

routes.get(
    "/books",
    verifyUser,
    (req, res, next) => {
        ListAllBooks(req, res, next)
    }
)

routes.post(
    "/books",
    verifyAdmin,
    booksSchema,
    validateHandler,
    (req, res, next) => {
        createBook(req, res, next)
    }
)

routes.delete(
    "/books/:id",
    verifyAdmin,
    booksDeleteSchema,
    validateHandler,
    (req, res, next) => {
        deleteBook(req, res, next)
    }
)

routes.patch(
    "/books/:id",
    verifyAdmin,
    booksEditSchema,
    validateHandler,
    (req, res, next) => {
        editBook(req, res, next)
    }
)

export default routes;