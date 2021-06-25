import { gql } from "@apollo/client";

//Create task mutation
export const CREATE_TASK = gql`
  mutation createTask(
    $title: String
    $isDaily: Boolean
    $notes: String
    $dueDate: Date
    $reminderTime: String
    $owner: MongoID
  ){
    taskCreateOne(record: {
      title: $title
      isDaily: $isDaily
      notes: $notes
      dueDate: $dueDate
      reminderTime: $reminderTime
      owner: $owner
    }){
      recordId
    }
  }
`;

//Change task status mutation
export const CHANGE_TASK_STATUS = gql`
  mutation changeTaskStatus(
    $status: EnumTaskStatus,
    $task_id: MongoID!
  ){
    taskUpdateById(
      _id: $task_id
      record: {
        status: $status
    }){
      recordId
    }
  }
`;

//Update task title mutation
export const UPDATE_TASK_TITLE = gql`
  mutation changeTaskTitle(
    $title: String,
    $task_id: MongoID!
  ){
    taskUpdateById(
      _id: $task_id
      record: {
        title: $title
    }){
      recordId
    }
  }
`;

//Update task notes mutation
export const UPDATE_TASK_NOTES = gql`
  mutation changeTaskNotes(
    $notes: String,
    $task_id: MongoID!
  ){
    taskUpdateById(
      _id: $task_id
      record: {
        notes: $notes
    }){
      recordId
    }
  }
`;

//Update due date mutation
export const UPDATE_TASK_DUE_DATE = gql`
  mutation changeTaskDueDate(
    $dueDate: Date,
    $task_id: MongoID!
  ){
    taskUpdateById(
      _id: $task_id
      record: {
        dueDate: $dueDate
    }){
      recordId
    }
  }
`;

//Update is daily mutation
export const UPDATE_TASK_IS_DAILY = gql`
  mutation changeTaskIsDaily(
    $isDaily: Boolean,
    $task_id: MongoID!
  ){
    taskUpdateById(
      _id: $task_id
      record: {
        isDaily: $isDaily
    }){
      recordId
    }
  }
`;

//Update task reminder mutation
export const UPDATE_TASK_REMINDER_TIME = gql`
  mutation changeTaskIsDaily(
    $reminderTime: String,
    $task_id: MongoID!
  ){
    taskUpdateById(
      _id: $task_id
      record: {
        reminderTime: $reminderTime
    }){
      recordId
    }
  }
`;

//Delete task mutation
export const DELETE_TASK = gql`
mutation changeTaskIsDaily($task_id: MongoID!){
  taskRemoveById(_id: $task_id){
    recordId
  }
}
`;
