const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    userfullname: String
    email: String
    password: String
    address: String
    Pet: [Pet]!
  }

  type Pet {
    _id: ID
    petName: String
    petBreed: String
    petAge: Number
    petWeight: Number
    PetInstruction: String
    petEmergency: String
  }

  type BookWalk {
    _id: ID
    walkDate: Date
    walkTime: Date
    WalkDuration: Number
    dogWalker: [DogWalker]
    pet: [Pet]
  }

  type DogWalker {
    _id: ID
    walkerName: String
    walkerBio: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userfullname: String!): User
    pets(userfullname: String): [Pet]
    pet(petId: ID!): Pet
    me: User
  }

  type Mutation {
    addUser(userfullname: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPet(petName: String!): Pet
    removePet(petId: ID!): Pet
    addWalk(petId: ID!, dogWalker: ID!): Pet
    removeWalk(petId: ID!, walkId: ID!): Pet
  }
`;

module.exports = typeDefs;
