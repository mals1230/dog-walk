const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    userFullName: String
    email: String
    password: String
    address: String
    pet: [Pet]
    walk: [BookWalk]
  }

  type Pet {
    _id: ID
    petName: String
    petBreed: String
    petAge: Int
    petWeight: Int
    petInstruction: String
    petEmergency: String
  }

  type BookWalk {
    _id: ID
    walkDate: String
    walkTime: String
    walkDuration: String
    dogWalker: String
    
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
    pets: User
    pet(petId: ID!): Pet
    me: User
    user(userFullName: String!): User
    walk: BookWalk
  }

  type Mutation {
    addUser(
      userFullName: String!
      email: String!
      password: String!
      # address: String!
    ): Auth
    login(email: String!, password: String!): Auth

    removeUser(userID: ID!): User

    addPet(
      petName: String!
      petBreed: String!
      petAge: Int!
      petWeight: Int!
      petInstruction: String!
      petEmergency: String!
    ): Pet

    removePet(petId: ID!): Pet

    addWalk(
      walkDate: String!
      walkTime: String!
      walkDuration: String!
      dogWalker: String!
    ): BookWalk

    removeWalk(pet: ID!, walkId: ID!): BookWalk
  }
`;

module.exports = typeDefs;
