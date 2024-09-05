import User from '../../models/User.js'
import Book from '../../models/Book.js'
import { GraphQLString, GraphQLID, GraphQLList, GraphQLInt } from 'graphql'
import { BookType, PaginatedBooksType } from '../types/types.js'
import { booksAlterSchema, booksSchema, deleteBookSchema } from '../validationSchema/booksSchema.js'
import mongoose from 'mongoose'

// Books Query
export const booksQuery = {
    books: {
        type: new GraphQLList(BookType),
        resovle: async () => await Book.find()
    },
    book: {
        type: BookType,
        args: { id: { type: GraphQLID } },
        resolve: async (_, { id }) => await Book.findById(id)
    }
}

//Books Mutation
export const BooksMutations = {
    ListAllBooks: {
        type: PaginatedBooksType, 
        args: {
            page: { type: GraphQLInt, defaultValue: 1 },
            limit: { type: GraphQLInt, defaultValue: 10 },
            genre: { type: GraphQLString },
            author: { type: GraphQLString },
        },
        resolve: async (_, { page, limit, genre, author }) => {
            const pageNumber = parseInt(page, 10);
            const pageSize = parseInt(limit, 10);

            if (pageNumber < 1 || pageSize < 1) {
                throw new Error('Page and limit must be positive integers.');
            }

            const filter = {};
            if (genre) filter.genre = genre;
            if (author) filter.author = author;

            const skip = (pageNumber - 1) * pageSize;

            const totalBooks = await Book.countDocuments(filter);
            const totalPages = Math.ceil(totalBooks / pageSize);

            const books = await Book.find(filter)
                .skip(skip)
                .limit(pageSize)
                .exec();

            return {
                totalBooks,
                totalPages,
                page: pageNumber,
                limit: pageSize,
                books,
            };
        }
    },
    createBook: {
        type: BookType,
        args: {
            title: { type: GraphQLString },
            author: { type: GraphQLString },
            ISBN: { type: GraphQLInt },
            publicationDate: { type: GraphQLString },
            genre: { type: GraphQLString },
            copies: { type: GraphQLInt },
        },
        resolve: async (_, args) => {
            const { error } = booksSchema.validate(args);

            if (error) {
                throw new Error(error.details[0].message)
            }

            const { ISBN } = args;

            const isBookExisting = await Book.findOne({ ISBN })
            if (isBookExisting) {
                throw new Error("Books already exists.")
            }

            const newBook = new Book(args);
            await newBook.save();

            return {
                message: "Book created successfully.",
                book: newBook
            }
        }
    },
    deleteBook: {
        type: GraphQLID,
        args: {
            id: { type: GraphQLID },
        },
        resolve: async (_, { id }) => {
            const { error } = deleteBookSchema.validate({ id });

            if (error) {
                throw new Error(error.details[0].message)
            }

            const _id = new mongoose.Types.ObjectId(id);
            const result = await Book.deleteOne(
                { _id },
            );

            if (result.deletedCount === 0) {
                throw new Error("Books not found.")
            }

            return "Book deleted successfully."
        }
    },
    editBook: {
        type: BookType,
        args: {
            id: { type: GraphQLID },
            title: { type: GraphQLString },
            author: { type: GraphQLString },
            ISBN: { type: GraphQLInt },
            publicationDate: { type: GraphQLString },
            genre: { type: GraphQLString },
            copies: { type: GraphQLInt },
        },
        resolve: async (_, args) => {
            const { id, ...bookData } = args;

            const { error } = booksAlterSchema.validate(bookData, { allowUnknown: true });
            if (error) {
                throw new Error(error.details[0].message);
            }

            const _id = new mongoose.Types.ObjectId(id);

            const updatedBook = await Book.findByIdAndUpdate(
                _id,
                { $set: bookData },
                { new: true, runValidators: true }
            );

            if (!updatedBook) {
                throw new Error("Book not found.");
            }

            return updatedBook;
        }
    }
}