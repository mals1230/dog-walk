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

    addPet: async (parent, { petName, petBreed, petAge, petWeight }, context) => {
      if (context.user) 
      {
        const pet = await Pet.create({
          petName,
          petBreed,
          petAge,
          petWeight,
          petUser: context.user.userFullName,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pets: pet._id } }
        );

        return pet;
      }
      throw new AuthenticationError("You need to be logged in to add your pet!");
    },

    addWalk: async (parent, { walkDate, walkTime, walkDuration, dogWalker, pet }, context) => {
      if (context.user) {
        return Pet.findOneAndUpdate(
          { _id: petId },
          {
            $addToSet: {
              walk: { walkDate, walkTime, walkDuration, dogWalker, pet, petUser: context.user.userFullName },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in to book a walk!");
    },
    removePet: async (parent, { petId }, context) => {
      if (context.user) {
        const pet = await Pet.findOneAndDelete({
          _id: petId,
          petUser: context.user.userFullName,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { pets: pet._id } }
        );

        return pet;
      }
      throw new AuthenticationError("You need to be logged in to remove a pet!");
    },
    // removeWalk: async (parent, { thoughtId, commentId }, context) => {
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
    // removeUser:  async (parent, { thoughtId, commentId }, context) => {
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
