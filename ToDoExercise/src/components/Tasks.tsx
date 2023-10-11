import React, { useEffect, useState } from 'react'
import Modal from './modal/Modal';
import { useSelector, useDispatch } from "react-redux"
import { IRootState } from '../redux/reducers';
import AddEditTask from './tasks/AddEditTask';
import Task from '../models/task';
import TaskItem from './TaskItem';
import './tasks/tasks.css';
import { addTask, undoLastActivity, undoTask } from '../redux/actions';
import { TaskStatus } from '../utils';

export default function Tasks() {
    const [showAddModal, setShowAddModal] = useState<boolean>(false)
    const taskRedx = useSelector((s: IRootState) => s.taskReducer)
    const[tasks, setTasks] = useState<Task[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setTasks(taskRedx.tasks);
    })

    const onAddTask = () => {
        setShowAddModal(!showAddModal);
    };

    //keep undo-ing previous add/delete till the board is empty
    const onUndo = () => {
        dispatch(undoLastActivity());
    };

    const onHideAddTaskModal = () => {
        setShowAddModal(!showAddModal);
    };

    //creates a new task
    const onSaveTask = (task:Task) => {   
        const newTask = {
            id: taskRedx.currentTaskId,
            name: task.name,
            description: task.description,
            createdDate:new Date(),
            status: TaskStatus.Incomplete
        }

        dispatch(addTask(newTask));
        setShowAddModal(!showAddModal);
    }

    return (
        <div className='w-full'>
            <div className='text-3xl'>
                Tasks
                <button type="button"
                    onClick={onUndo}
                    className="text-white float-right bg-black hover:bg-blue-800 focus:ring-2 mt-0 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Undo</button>
                <button type="button"
                    onClick={onAddTask}
                    className="text-white float-right bg-black hover:bg-blue-800 focus:ring-2 mt-0 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Create Task</button>
            </div>

            {
                tasks?.length > 0 && tasks.map((item: Task) => {
                    return <TaskItem item={item}/>
                })
            }

            {showAddModal && <Modal show={showAddModal} handleClose={onHideAddTaskModal} title='Create Task'>
                <AddEditTask
                    showDefaultStatus={true}
                    onHideAddTaskModal={onHideAddTaskModal}
                    onSave={onSaveTask}
                    name=""
                    description=""
                />
            </Modal>
            }
            
        </div>

    )
}
