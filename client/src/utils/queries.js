// ADDING SO FILES/FOLDERS WILL GET SENT TO GITHUB
import { gql } from '@apollo/client';
import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(userfullname: $userfullname) {
      _id
      userfullname
      email
      pets {
        _id
        petText
        createdAt
      }
    }
  }
`;

export const QUERY_PETS = gql`
  query getPets {
    Pets {
      _id
      petText
      petUser
      createdAt
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      Pets {
        _id
        petText
        petUser
        createdAt
      }
    }
  }
`;