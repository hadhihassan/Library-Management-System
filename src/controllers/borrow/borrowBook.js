import Books from '../../models/Book.js'
import Borrow from '../../models/Borrow.js'
import { asyncErrorHandler } from '../../utils/asyncHandler.js'
import { StatusCodes } from 'http-status-codes';


export const borrowABook = asyncErrorHandler(async (req, res) => {

    const { userId: user } = req;
    const { bookId, returnDate } = req.body;

    const isBooksExisting = await Books.findById(bookId);
    if (!isBooksExisting) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            messaege: "Books not found"
        })
    }

    if (isBooksExisting.copies <= 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            messaege: "Book not unavailable"
        })
    }

    isBooksExisting.copies -= 1
    await isBooksExisting.save()

    const newBorrow = new Borrow({
        user,
        book: bookId,
        returnDate
    })
    await newBorrow.save();
    delete newBorrow._id;

    return res.status(StatusCodes.CREATED).json({
        message: "Borrow created successfully.",
        success: true,
        borrow: newBorrow
    });

}) 