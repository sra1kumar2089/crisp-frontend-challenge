import { TaskStatus } from "../utils";

export default interface Task {
    name: string;
    timeTakenToComplete?: number;
    status?: TaskStatus
    id: number;
    createdDate?: Date;
    description: string;
}

//to keep track of edits in tasks
export interface TaskHistory {
    tasks: Task[],
    id: number;
}
