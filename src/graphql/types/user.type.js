import User from '../../models/User.js';
import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql'


const userType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        role: { type: GraphQLString }
    })
});
