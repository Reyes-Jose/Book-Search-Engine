const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models')
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async( parent, args, context ) => {
            if(context.user){
                return User.findOne({})
            }
        }
    },
    Mutation: {
        addUser: async(parent, {username, email, password }) => {
            const user = await User.create({
                username, email, password});
            const token = signToken(user);

            return { token, user };
        },
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user){
                throw new AuthenticationError('No user with this email found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){
                throw new AuthenticationError('Incorrect password');
            }
            const token = signToken(user);

            return { token, user };
        },

        saveBook: async(parent, { book }, context ) => {
            if(context.user){
                return User.findOneAndUpdate(
                    { _id: bookId },
                    {
                        $addToSet: { bookStore: book },
                    },
                    {new: true},
                );
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        removeBook: async (parent, args, context) => {
            if(context.user){
                return User.findOneAndUpdate(
                { _id: context.user._id},
                { $pull: { bookId: args}},
                {new: true},
                );
            }
            throw new AuthenticationError('You need to be logged in!');

        }

    }
}

module.exports = resolvers;