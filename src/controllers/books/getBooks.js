import Books from '../../models/Book.js'
import { asyncErrorHandler } from '../../utils/asyncHandler.js'

export const ListAllBooks = asyncErrorHandler(async (req, res) => {

    const { page = 1, limit = 10, genre, author } = req.query;

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    if (pageNumber < 1 || pageSize < 1) {
        return res.status(400).json({ error: 'Page and limit must be positive integers.' });
    }

    const filter = {};
    if (genre) {
        filter.genre = genre;
    }
    if (author) {
        filter.author = author;
    }

    const skip = (pageNumber - 1) * pageSize;

    const totalBooks = await Books.countDocuments(filter);

    const totalPages = Math.ceil(totalBooks / pageSize);

    const books = await Books.find(filter)
        .skip(skip)
        .limit(pageSize)
        .exec();

    res.json({
        totalBooks,
        totalPages,
        page: pageNumber,
        limit: pageSize,
        books,
    });
})