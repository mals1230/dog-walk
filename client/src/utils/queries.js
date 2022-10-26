import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($userFullName: String!) {
    user(userFullName: $userFullName) {
      _id
      userFullName
      email
      pets {
        _id
        userFullName
      }
    }
  }
`;

export const QUERY_PETS = gql`
  query getPets {
    pets {
      _id
      petName
      petUser
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      userFullName
      email
      pets {
        _id
        petName
        petUser
      }
    }
  }
`;
