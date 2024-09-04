import Borrow from '../../models/Borrow.js'
import { asyncErrorHandler } from '../../utils/asyncHandler.js'
import { StatusCodes } from 'http-status-codes';


export const getMostBorrowedBooks = asyncErrorHandler(async (req, res) => {
    
    const pipeline = [
        {
            $match: { isReturned: true }
        },
        {
            $group: {
                _id: "$book",
                borrowCount: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: "books",
                localField: '_id',
                foreignField: '_id',
                as: "book"
            }
        },
        {
            $unwind: '$book'
        },
        {
            $sort:{
                borrowCount : -1
            }
        }
    ]

    const mostBorrowBooks = await Borrow.aggregate(pipeline);

    
    return res.status(StatusCodes.OK).json({
        message: "Most borrow books.",
        success: true,
        borrow: mostBorrowBooks
    });
})