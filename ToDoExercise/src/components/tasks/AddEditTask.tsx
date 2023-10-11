import React, { useEffect, useState } from 'react'
import Task from '../../models/task';

interface AddEditTaskProps {
    showDefaultStatus: boolean;
    name: string;
    description: string;
    title?: string
    onSave: (task: {}) => void;
    onHideAddTaskModal: (task: Task) => void;
}

//used to add and edit a task
const AddEditTask = (props: AddEditTaskProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        debugger;
        setName(props.name);
        setDescription(props.description)
    }, [props.name, props.description])

    const onSave = () => {
        const task = {
            name,
            description
        }

        //depending on source, adds/edits
        if (props.onSave) {
            props.onSave(task)
        }
    }

    return (
        <div>
            <div className="flex mb-4">
                <div className="w-1/3">Task Name</div>
                <div className="w-2/3 mr-2 leading-2">
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white border border-black text-gray-900 text-sm rounded-m focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter task name"></input><br />
                </div>
            </div>
            <div className="flex mb-4">
                <div className="w-1/3">Task Description</div>
                <div className="w-2/3 mr-2 leading-2">
                    <input type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-white border border-black text-gray-900 text-sm rounded-m focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter task description"></input><br />
                    {props.showDefaultStatus && <div className='text-sm float-left italic'>
                        Default status is incomplete
                    </div>}
                </div>

            </div>
            <div>
                <button type="button"
                    onClick={onSave}
                    className="text-white float-right bg-black text-xs font-medium text-center rounded-lg px-2 py-1 mr-2 mb-1 ">Save</button>
            </div>
        </div>
    )
}


export default AddEditTask