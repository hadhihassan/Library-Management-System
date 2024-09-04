import Books from '../../models/Book.js'
import { asyncErrorHandler } from '../../utils/asyncHandler.js'
import { StatusCodes } from 'http-status-codes'

export const createBook = asyncErrorHandler(async (req, res) => {
    const { ISBN } = req.body;

    const isBookExisting = await Books.findOne({ ISBN })
    if (isBookExisting) {
        return res.status(StatusCodes.CONFLICT).json({
            success: false,
            messaege: "Books already exists."
        })
    }

    const newBook = new Books(req.body);
    await newBook.save();
    delete newBook._id

    return res.status(StatusCodes.CREATED).json({
        message: "Book created successfully.",
        success : true,
        book: newBook
    });
})