import { gql } from "@apollo/client";

//Get all logged in user tasks query
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

//Get task detail query
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

//Get users today's task query
export const GET_TODAYS_TASKS = gql`
  query getTodaysTask($dueDate: Date, $owner: MongoID){
    taskMany(
      filter: {
        dueDate: $dueDate,
        owner: $owner
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

//Get users daily tasks query
export const GET_DAILY_TASKS = gql`
  query getDailyTasks($owner: MongoID){
    taskMany(
      filter: {
       isDaily: true,
       owner: $owner
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

//Get user tasks by status query
export const GET_TASKS_BY_STATUS = gql`
  query getTasksByStatus($status: EnumTaskStatus, $owner: MongoID){
    taskMany(
      filter: {
        status: $status,
        owner: $owner
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

