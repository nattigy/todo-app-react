import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation createTask(
    $title: String
    $isDaily: Boolean
    $notes: String
    $dueDate: Date
    $reminderTime: Date
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

export const UPDATE_TASK_REMINDER_TIME = gql`
  mutation changeTaskIsDaily(
    $reminderTime: Date,
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

export const DELETE_TASK = gql`
mutation changeTaskIsDaily($task_id: MongoID!){
  taskRemoveById(_id: $task_id){
    recordId
  }
}
`;
