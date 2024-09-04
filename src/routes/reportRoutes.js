import express from 'express';
import { loginUser, loginAdmin } from '../controllers/auth/loginUser.js'
// import { registerUser } from '../controllers/report/activeMembers.js'
// import {  } from '../controllers/report/booksAvailability.js'
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

// routes.post(
//     "/borrow-history",
//     verifyUser,
//     (req, res, next) => {
//         borrowHistory(req, res);
//     }
// )

// routes.post(
//     "/borrow-history",
//     verifyUser,
//     (req, res, next) => {
//         borrowHistory(req, res);
//     }
// )

export default routes