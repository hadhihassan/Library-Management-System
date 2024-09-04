import Books from '../../models/Book.js'
import mongoose from 'mongoose';
import { asyncErrorHandler } from '../../utils/asyncHandler.js'
import { StatusCodes } from 'http-status-codes'

export const editBook = asyncErrorHandler(async (req, res) => {

    const { id } = req.params
    
    const _id = new mongoose.Types.ObjectId(id);
    const updatedBook = await Books.findByIdAndUpdate(
        _id,
        req.body,
        { new: true }
    );

    if (!updatedBook) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            messaege: "Books not found."
        })
    }
    delete updatedBook._id
    return res.status(StatusCodes.OK).json({
        message: "Book updated successfully.",
        success: true,
        book: updatedBook
    });
})