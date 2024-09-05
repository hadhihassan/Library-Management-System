import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt } from 'graphql'

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        role: { type: GraphQLString },
        borrowHistory: { type: new GraphQLList(BorrowType) }
    })
});

export const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        author: { type: GraphQLString },
        ISBN: { type: GraphQLString },
        publicationDate: { type: GraphQLString },
        genre: { type: GraphQLString },
        numberOfCopies: { type: GraphQLInt }, // Changed to GraphQLInt
        availableCopies: { type: GraphQLInt } // Changed to GraphQLInt
    })
});

export const BorrowType = new GraphQLObjectType({
    name: 'Borrow',
    fields: () => ({
        id: { type: GraphQLID },
        book: { type: BookType },
        user: { type: UserType },
        borrowedDate: { type: GraphQLString },
        returnDate: { type: GraphQLString }
    })
});

export const PaginatedBooksType = new GraphQLObjectType({
    name: 'PaginatedBooks',
    fields: {
        totalBooks: { type: GraphQLInt },
        totalPages: { type: GraphQLInt },
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        books: { type: new GraphQLList(BookType) },
    }
});


export const DeleteBookResponseType = new GraphQLObjectType({
    name: 'DeleteBookResponse',
    fields: {
        message: { type: GraphQLString }
    }
});