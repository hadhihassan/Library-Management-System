import express from 'express';
import { activeMembers } from '../controllers/report/activeMembers.js'
import { booksAvailabilityStatus } from '../controllers/report/booksAvailability.js'
import { getMostBorrowedBooks } from '../controllers/report/mostBorrowBooks.js'
import { verifyUser } from '../middleware/verifyUsers.js';


const routes = express.Router()

routes.get(
    "/most-borrow-books",
    verifyUser,
    (req, res, next) => {
        getMostBorrowedBooks(req, res);
    }
)

routes.get(
    "/active-user",
    verifyUser,
    (req, res, next) => {
        activeMembers(req, res);
    }
)

routes.get(
    "/books-availability",
    verifyUser,
    (req, res, next) => {
        booksAvailabilityStatus(req, res);
    }
)

export default routes