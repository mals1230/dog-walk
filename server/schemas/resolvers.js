const { AuthenticationError } = require("apollo-server-express");
const { User, BookWalk, DogWalker, Pet } = require("../models");
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
    
    // COMMENTING OUT UNTIL BRYAN / MIKE HELP US WITH SERVER ISSUE
    // walk: async (parent, { bookWalkId }) => {
    //   return BookWalk.findOne({ _id: bookWalkId });
    // },
  
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("pet");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // walk: async (parent, { BookWalk }) => {
    //   return BookWalk.findOne({ _id: BookWalk }).populate("pet");
    // },
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

        // return Pet.findOneAndUpdate(
        //   { _id: petId },
        //   {
        //     $addToSet: {
        //       walk: { walkDate, walkTime, walkDuration, dogWalker, petId, petUser: context.user.userFullName },
        //     },
        //   },
        //   {
        //     new: true,
        //     runValidators: true,
        //   }
        // );
        const bookWalk = await BookWalk.create({ walkDate, walkTime, walkDuration, dogWalker, pet, petUser: context.user.userFullName })
        console.log(bookWalk)

        return BookWalk.findById( bookWalk._id).populate("dogWalker").populate("pet")

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
      throw new AuthenticationError("You need to be logged in to cancel a walk!");
    },
    removeUser:  async (parent, { petId, walkId }, context) => {
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
      throw new AuthenticationError("You need to be logged in to delete your account!");
    },
  },
};

module.exports = resolvers;
