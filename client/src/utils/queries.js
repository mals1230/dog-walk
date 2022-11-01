import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query Query($userFullName: String!) {
  user(userFullName: $userFullName) {
    userFullName
    _id
    email
    pet {
      petName
      petBreed
      petAge
      petWeight
      petInstruction
      petEmergency
      _id
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

export const QUERY_WALK = gql`
  query getWalk {
    walk {
        _id
        walkDuration
        walkTime
        walkDate
        # pet
        dogWalker
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
