import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        userFullName
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $userFullName: String!
    $email: String!
    $password: String!
  ) {
    addUser(userFullName: $userFullName, email: $email, password: $password) {
      token
      user {
        _id
        userFullName
      }
    }
  }
`;

export const ADD_PET = gql`
  mutation addPet ($petName: String!, $petBreed: String!, $petAge: Int!, $petWeight: Int!, $petInstruction: String!, $petEmergency: String!) {
  addPet(petName: $petName, petBreed: $petBreed, petAge: $petAge, petWeight: $petWeight, petInstruction: $petInstruction, petEmergency: $petEmergency) {
    _id
    petName
    petBreed
    petAge
    petWeight
    petInstruction
    petEmergency
  }
}
`;

export const ADD_WALK = gql`
  mutation addWalk($petId: ID!, $walkName: String!) {
    addWalk(petId: $petId, walkName: $walkName) {
      _id
      petName
      petUser
      walk {
        _id
        walkName
        walkDuration
      }
    }
  }
`;
