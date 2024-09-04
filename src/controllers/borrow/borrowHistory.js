import Borrow from '../../models/Borrow.js'
import { asyncErrorHandler } from '../../utils/asyncHandler.js'
import { StatusCodes } from 'http-status-codes';

export const borrowHistory = asyncErrorHandler(async (req, res) => {

    const { userId: user } = req;

    const borrowHistories = await Borrow.find({
        user
    })
        .populate('book', 'title author genre')
        .sort({
            borrowDate: -1
        });

    if (!borrowHistories) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: "Borrows not found.",
            success: false,
        });
    }
    
    return res.status(StatusCodes.CREATED).json({
        message: "Borrow history recevied successfully.",
        success: true,
        borrows: borrowHistories
    });
})