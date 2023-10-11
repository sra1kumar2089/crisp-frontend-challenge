// import Task from "../models/task";
// import { TaskStatus } from "../utils";
// import * as actionTypes from "./actionTypes"

// //adds task
//   export const addTask = (task: Task) => ({
//     type: actionTypes.ADD_TASK,
//     payload: {...task, status: TaskStatus.Incomplete}
//   });

//   //marks the status as complete
//   export const completeTask = (task:Task) => ({
//     type: actionTypes.COMPLETE_TASK,
//     payload: {...task, status: TaskStatus.Complete}
//   });

//   //soft deletes the task
//   export const deleteTask = (task:Task) => ({
//     type: actionTypes.DELETE_TASK,
//     payload: {...task, status: TaskStatus.Delete}
//   });

//   //helps tp undo edits made to a task
//   export const undoTask = (taskId:number) => ({
//     type: actionTypes.UNDO_TASK_CHANGE,
//     payload: {id:taskId, status: TaskStatus.Undo}
//   });

//   //save edits
//   export const editTask = (task:Task) => ({
//     type: actionTypes.EDIT_TASK,
//     payload: {...task, status: TaskStatus.Edit}
//   });

//   //undo previous add/delete activity
//   export const undoLastActivity = () => ({
//     type: actionTypes.UNDO_LAST_ACTIVITY
//   });


import Task from "../models/task";
import { TaskStatus } from "../utils";
import * as actionTypes from "./actionTypes"

//adds task
  export const addTask = (task: Task) => ({
    type: actionTypes.ADD_TASK,
    payload: task
  });

  //marks the status as complete
  export const completeTask = (task:Task) => ({
    type: actionTypes.COMPLETE_TASK,
    payload: task
  });

  //soft deletes the task
  export const deleteTask = (task:Task) => ({
    type: actionTypes.DELETE_TASK,
    payload: task
  });

  //helps tp undo edits made to a task
  export const undoTask = (taskId:number) => ({
    type: actionTypes.UNDO_TASK_CHANGE,
    payload: {id:taskId}
  });

  //save edits
  export const editTask = (task:Task) => ({
    type: actionTypes.EDIT_TASK,
    payload: task,
  });

  //undo previous add/delete activity
  export const undoLastActivity = () => ({
    type: actionTypes.UNDO_LAST_ACTIVITY
  });