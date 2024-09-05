import Borrow from '../../models/Borrow.js'
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql'


const borrowType = new GraphQLObjectType({
    name: "Borrow",
    fields: () => ({
        id: { type: GraphQLID },
        user: {
            type: GraphQLID,
            resolver(parent, _args) {
                return User.findById(parent.user);
            }
        },
        book: {
            type: GraphQLID,
            resolve(parent, _args) {
                return Books.findById(parent.book)
            }
        },
        isReturned: { type: GraphQLBoolean },
        returnDate: { type: GraphQLString }
    })
})