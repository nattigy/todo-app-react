import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $firstName: String
    $middleName: String
    $lastName: String
    $email: String
    $firebaseId: String
  ){
    userCreateOne(record:{
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      email: $email
      firebaseId: $firebaseId
    }){
      record{
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
  }
`;

