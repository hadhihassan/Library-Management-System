import Books from '../../models/Book.js'
import mongoose from 'mongoose';
import { asyncErrorHandler } from '../../utils/asyncHandler.js'
import { StatusCodes } from 'http-status-codes'


export const deleteBook = asyncErrorHandler(async (req, res) => {

    const { id } = req.params

    const _id = new mongoose.Types.ObjectId(id);
    const result = await Books.deleteOne(
        { _id },
    );

    if (result.deletedCount === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            messaege: "Books not found.",
            result: result
        })
    }

    return res.status(StatusCodes.OK).json({
        message: "Book deleted successfully.",
        success: true,
    });
})