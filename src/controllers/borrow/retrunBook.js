import Books from '../../models/Book.js'
import Borrow from '../../models/Borrow.js'
import { asyncErrorHandler } from '../../utils/asyncHandler.js'
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose'


export const returnBook = asyncErrorHandler(async (req, res) => {

    const { id: borrowId } = req.params;

    if(!mongoose.isValidObjectId(borrowId)){
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            messaege: "Borrow id not correct formate"
        })
    }

    const isBorrowExisting = await Borrow.findById(borrowId);
    if (!isBorrowExisting) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            messaege: "Borrow not found"
        })
    }

    const book = await Books.findById(isBorrowExisting.book);

    if (book) {
        book.copies += 1
        await book.save()
    }

    isBorrowExisting.isReturned = true
    await isBorrowExisting.save()

    return res.status(StatusCodes.CREATED).json({
        message: "Borrow return successfully.",
        success: true,
        borrow: isBorrowExisting
    });

}) 