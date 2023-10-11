import Task from "../models/task"

type TaskAction = {
    type: string
    payload: Task
  }

  export default TaskAction;