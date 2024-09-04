import Borrow from '../../models/Borrow.js'
import Book from '../../models/Book.js'
import { asyncErrorHandler } from '../../utils/asyncHandler.js'
import { StatusCodes } from 'http-status-codes';


export const booksAvailabilityStatus = asyncErrorHandler(async (req, res) => {
    
    const totalBooks = await Book.countDocuments();
    const borrowedBooks = await Borrow.countDocuments({ isReturned: false });
    const availableBooks = totalBooks - borrowedBooks;
    
    return res.status(StatusCodes.OK).json({
        message: "Books availability.",
        success: true,
        totalBooks,
        borrowedBooks,
        availableBooks,
    });
})