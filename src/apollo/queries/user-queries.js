import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query($firebaseId: String){
    userOne(filter: {
      firebaseId: $firebaseId
    }){
      _id
      firstName
      middleName
      lastName
      email
      firebaseId
      tasks{
        _id
      }
    }
  }
`;

export const GET_USER = `
query($firebaseId: String){
  userOne(filter: {firebaseId: $firebaseId}){
    _id
    firstName
    middleName
    lastName
    email
    firebaseId
    tasks{
      _id
    }
  }
}
`;

