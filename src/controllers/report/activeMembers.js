import Borrow from '../../models/Borrow.js'
import { asyncErrorHandler } from '../../utils/asyncHandler.js'
import { StatusCodes } from 'http-status-codes';


export const activeMembers = asyncErrorHandler(async (req, res) => {

    const pipeline = [
        {
            $match: { isReturned: true }
        },
        {
            $group: {
                _id: "$user",
                borrowCount: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: "users",
                localField: '_id',
                foreignField: '_id',
                as: "user"
            }
        },
        {
            $unwind: '$user'
        },
        {
            $sort: {
                borrowCount: -1
            }
        }
    ]

    const activeUseresBorrows = await Borrow.aggregate(pipeline);


    return res.status(StatusCodes.OK).json({
        message: "Active users.",
        success: true,
        borrow: activeUseresBorrows
    });
})