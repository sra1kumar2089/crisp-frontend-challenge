import React, { useState } from 'react'
import { IRootState } from '../../redux/reducers';
import { useSelector, useDispatch } from "react-redux"
import { deleteTask } from '../../redux/actions';
import Task from '../../models/task';
import { TaskStatus } from '../../utils';

interface DeleteTaskProps {    
    task: Task;
    onClose: any;
}

const DeleteTask = (props: DeleteTaskProps) => {
    const dispatch = useDispatch();

    const onYes = () => {         
         dispatch(deleteTask({...props.task, status: TaskStatus.Delete}));

         //close modal
        if(props.onClose){
            props.onClose(false)
        }
    }

    const onNo = () => {          
        if(props.onClose){
            props.onClose(false)
        }
    }

    return (
        <div>
            <div className="flex mb-4">
                <div className="w-full">Do you want to delete task <span className='text-green-500'>{props.task.name}</span>?</div>
            </div>
            <div className='flex float-right'>
                <button type="button"
                    onClick={onYes}
                    className="text-white float-right bg-black text-xs font-medium text-center rounded-lg px-2 py-1 mr-2 mb-1 ">Yes</button>
                <button type="button"
                    onClick={onNo}
                    className="text-white float-right bg-black text-xs font-medium text-center rounded-lg px-2 py-1 mr-2 mb-1 ">No</button>
            </div>            
        </div>
    )
}


export default DeleteTask