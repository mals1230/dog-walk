const { AuthenticationError } = require("apollo-server-express");
const { User, BookWalk, DogWalker, Pet } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
  
    pets: async (parent, args, context) => {
      const user = context.user._id;
      return User.find({ _id: user }).populate("pet");
    },

    pet: async (parent, { petId }) => {
      return Pet.findOne({ _id: petId });
    },

    walks: async (parent, args, context) => {
      const user = context.user._id
      return User.find({ _id: user }).populate("walk");
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("pet");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    user: async (parent, args, context) => {
      console.log("help")
      // if (context.user) {
      return User.findOne({ userFullName: args.userFullName }).populate("pet");
      // }
      throw new AuthenticationError("You need to be logged in!");
    },
    //   walk: async (parent, { BookWalk }) => {
    //     return BookWalk.findOne({ _id: BookWalk }).populate("walk");
    //   },
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
      console.log("we are logging in!")
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

    addPet: async (
      parent,
      { petName, petBreed, petAge, petWeight, petInstruction, petEmergency },
      context
    ) => {
      if (context.user) {
        const pet = await Pet.create({
          petName,
          petBreed,
          petAge,
          petWeight,
          petInstruction,
          petEmergency,
          petUser: context.user._id,
        });
        console.log(pet);
        console.log(context.user);

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pet: pet._id } },
          { new: true }
        );
        console.log(user);
        return pet;
      }
      throw new AuthenticationError(
        "You need to be logged in to add your pet!"
      );
    },

    addWalk: async (
      parent,
      { walkDate, walkTime, walkDuration, dogWalker },
      context
    ) => {
      console.log("start resolver")
      if (context.user) {
        console.log("in context")
       
        const walk = await BookWalk.create({
          walkDate,
          walkTime,
          walkDuration,
          dogWalker,

         
        });
        console.log(walk);
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { walk: walk._id } },
          { new: true }
        );
        console.log(user);
        return walk;

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
      throw new AuthenticationError(
        "You need to be logged in to remove a pet!"
      );
    },
    removeWalk: async (parent, { petId, walkId }, context) => {
      if (context.user) {
        return Pet.findOneAndUpdate(
          { _id: petId },
          {
            $pull: {
              walks: {
                _id: walkId,
                walkUser: context.user.userFullName,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError(
        "You need to be logged in to cancel a walk!"
      );
    },
    removeUser: async (parent, { petId, walkId }, context) => {
      if (context.user) {
        return pet.findOneAndUpdate(
          { _id: petId },
          {
            $pull: {
              walks: {
                _id: walkId,
                walkUser: context.user.userFullName,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError(
        "You need to be logged in to delete your account!"
      );
    },
  },
};

module.exports = resolvers;
