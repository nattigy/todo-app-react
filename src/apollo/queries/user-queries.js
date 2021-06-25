import { gql } from "@apollo/client";

//Get user by id query
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

//Get user by firebase id query
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

