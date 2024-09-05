import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { userMutations, userQueries } from './resolvers/userResolver.js';
import { BooksMutations, booksQuery } from './resolvers/booksResolver.js';

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        ...userQueries,
        ...booksQuery
    }
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        ...userMutations,
        ...BooksMutations
    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});
