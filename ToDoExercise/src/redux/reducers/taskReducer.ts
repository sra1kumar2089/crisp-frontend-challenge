import Task, { TaskHistory } from '../../models/task';
import { UndoActions } from '../../utils';
import * as actionTypes from "../actionTypes"
import TaskAction from '../taskAction';


const initialState = {
  currentTaskId: 0, //has id of each task (auto number)
  tasks: [] as Task[], //list of tasks
  taskHistory: [] as TaskHistory[], //helps to keep track of changes made to each task
  actionHistory: [] as UndoActions[], //helps to undo all previous add/delete activities. Keeps track of previous actions (add/delete)
  deletedTasks: [] as Task[] //holds deleted tasks. Used to restore when user does 'undo'
};

const taskReducer = (state = initialState, action: TaskAction) => {
  let currentTaskHistory;
  let clone;

  switch (action.type) {
    //updates tasks array. Also updates actionHistory to indicate that the last activity was an ADD
    case actionTypes.ADD_TASK:
      return {
        ...state,
        currentTaskId: state.currentTaskId + 1,
        tasks: [...state.tasks, action.payload],
        taskHistory: [...state.taskHistory, { id: action.payload.id, tasks: [action.payload] }],
        actionHistory: [...state.actionHistory, UndoActions.Add]
      };
    //replaces existing task with an updated task having status as COMPLETE
    case actionTypes.COMPLETE_TASK:
      clone = state.tasks.filter(t => t.id != action.payload.id);

      //add to history array
      currentTaskHistory = state.taskHistory.find(t => t.id === action.payload.id);
      currentTaskHistory.tasks.push({...action.payload});

      return {
        ...state,
        tasks: [...clone, action.payload],
      };
    //removes the task from tasks array. 
    //Marks last operation as DELETE.
    //adds current task to deletesTasks array
    case actionTypes.DELETE_TASK:
      clone = state.tasks.filter(t => t.id != action.payload.id);

      return {
        ...state,
        tasks: [...clone],
        actionHistory: [...state.actionHistory, UndoActions.Delete],
        deletedTasks: [...state.deletedTasks, action.payload]
      };
    //replace existing task with updated task. Also, update taskHistory array
    case actionTypes.EDIT_TASK:
      clone = state.tasks.filter(t => t.id != action.payload.id);

      currentTaskHistory = state.taskHistory.find(t => t.id === action.payload.id);
      currentTaskHistory.tasks.push({...action.payload});

      return {
        ...state,
        tasks: [...clone, action.payload]
      };
    //update only EDITS (1st element in taskHistory is ADD. This can not be undone)
    case actionTypes.UNDO_TASK_CHANGE:

      currentTaskHistory = state.taskHistory.find(t => t.id === action.payload.id);
      if (currentTaskHistory.tasks.length > 1) {
        currentTaskHistory.tasks.pop();
        let prevVersionOfCurrentTask = currentTaskHistory.tasks[currentTaskHistory.tasks.length-1]

        clone = state.tasks.filter(t => t.id != action.payload.id)
        clone.push(prevVersionOfCurrentTask)

        return {
          ...state,
          tasks: [...clone]
        };
      }
    //check the last operation on actionHistory array. 
    //--If ADD, remove the last element from the tasks array.
    //--If DELETE, then take the last element from the deletedTasks array and add it to the tasks array
    case actionTypes.UNDO_LAST_ACTIVITY:
      if (state.actionHistory.length > 0) {
        let previousActivity = state.actionHistory.pop();

        switch (previousActivity) {
          case UndoActions.Add:
            state.tasks.pop();
            return {
              ...state,
              tasks: [...state.tasks]
            };
          case UndoActions.Delete:
            let lastDeletedTask = state.deletedTasks.pop()
            return {
              ...state,
              tasks: [...state.tasks, lastDeletedTask]
            };
        }
      }

    default:
      return state;
  }
};


export default taskReducer;