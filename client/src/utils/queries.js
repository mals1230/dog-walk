import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($userFullName: String!) {
    user(userFullName: $userFullName) {
      _id
      userFullname
      email
      pets {
        _id
        username
      }
    }
  }
`;

export const QUERY_PETS = gql`
  query getPets {
    Pets {
      _id
      petName
      petUser
      createdAt
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      userFullName
      email
      Pets {
        _id
        petName
        petUser
        createdAt
      }
    }
  }
`;
