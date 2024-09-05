import Book from '../../models/Book.js';
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } from 'graphql'

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        author: { type: GraphQLString },
        isbn: { type: GraphQLString },
        publicationDate: { type: GraphQLString },
        genre: { type: GraphQLString },
        copies: { type: GraphQLInt }
    })
});