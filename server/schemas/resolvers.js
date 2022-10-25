const { AuthenticationError } = require("apollo-server-express");
const { User, Thought, Pet } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // users: async () => {
    //   return User.find().populate('pet');
    // },
    // user: async (parent, { userfullname }) => {
    //   return User.findOne({ userfullname }).populate("pet");
    // },
    // pets: async (parent, { userfullname }) => {
    //   const params = userfullname ? { userfullname } : {};
    //   return Pet.find(params).sort({ createdAt: -1 });
    // },
    pet: async (parent, { petId }) => {
      return Pet.findOne({ _id: petId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("pet");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // walk: async (parent, { BookWalk }) => {
    //   return BookWalk.findOne({ _id: BookWalk }).populate("pet");
    // },
    // singlewalk:
  },

  Mutation: {
    addUser: async (parent, { userFullName, email, password, address }) => {
      const user = await User.create({
        userFullName,
        email,
        password,
        address,
      });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    // addPet: async (parent, { petId }, context) => {},
    //   if (context.user) {
    //     const thought = await Thought.create({
    //       thoughtText,
    //       thoughtAuthor: context.user.username,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { thoughts: thought._id } }
    //     );

    //     return thought;
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },
    // addComment: async (parent, { thoughtId, commentText }, context) => {
    //   if (context.user) {
    //     return Thought.findOneAndUpdate(
    //       { _id: thoughtId },
    //       {
    //         $addToSet: {
    //           comments: { commentText, commentAuthor: context.user.username },
    //         },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },
    // removeThought: async (parent, { thoughtId }, context) => {
    //   if (context.user) {
    //     const thought = await Thought.findOneAndDelete({
    //       _id: thoughtId,
    //       thoughtAuthor: context.user.username,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { thoughts: thought._id } }
    //     );

    //     return thought;
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },
    // removeComment: async (parent, { thoughtId, commentId }, context) => {
    //   if (context.user) {
    //     return Thought.findOneAndUpdate(
    //       { _id: thoughtId },
    //       {
    //         $pull: {
    //           comments: {
    //             _id: commentId,
    //             commentAuthor: context.user.username,
    //           },
    //         },
    //       },
    //       { new: true }
    //     );
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },
  },
};

module.exports = resolvers;
