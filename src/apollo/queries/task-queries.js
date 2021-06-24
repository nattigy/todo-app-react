import { gql } from "@apollo/client";

export const GET_MY_TASKS = gql`
  query getMyTasks($user_id: MongoID!){
    taskMany(
      filter: {
        owner: $user_id
      },
      sort: REMINDERTIME_ASC
    ){
      _id
      title
      status
      isDaily
      notes
      dueDate
      reminderTime
      createdAt
    }
  }
`;

export const GET_TASK_DETAIL = gql`
  query getTaskDetail($task_id: MongoID!){
    taskById(_id: $task_id){
      _id
      title
      status
      isDaily
      notes
      dueDate
      reminderTime
      createdAt
    }
  }
`;

export const GET_TODAYS_TASKS = gql`
  query getTodaysTask($dueDate: Date){
    taskMany(
      filter: {
        dueDate: $dueDate
      },
      sort: REMINDERTIME_ASC
    ){
      _id
      title
      status
      isDaily
      notes
      dueDate
      reminderTime
      createdAt
    }
  }
`;

export const GET_DAILY_TASKS = gql`
  query getDailyTasks{
    taskMany(
      filter: {
       isDaily: true
      },
      sort: REMINDERTIME_ASC
    ){
      _id
      title
      status
      isDaily
      notes
      dueDate
      reminderTime
      createdAt
    }
  }
`;

export const GET_CALENDAR = gql`
  query getMyTasks($user_id: MongoID!){
    taskMany(
      filter: {
        owner: $user_id
      },
      sort: DUEDATE_ASC
    ){
      _id
      title
      status
      isDaily
      notes
      dueDate
      reminderTime
      createdAt
    }
  }
`;

export const GET_TASKS_BY_STATUS = gql`
  query getTasksByStatus($status: EnumTaskStatus){
    taskMany(
      filter: {
        status: $status
      },
      sort: DUEDATE_DESC
    ){
      _id
      title
      status
      isDaily
      notes
      dueDate
      reminderTime
      createdAt
    }
  }
`;

