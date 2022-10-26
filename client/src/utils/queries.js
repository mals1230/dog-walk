// ADDING SO FILES/FOLDERS WILL GET SENT TO GITHUB
import { gql } from '@apollo/client';
import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($userFullname: String!) {
    user(userFullname: $userfullname) {
      _id
      userFullname
      email
      pets {
        _id
        petName
        createdAt
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
      userFullname
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