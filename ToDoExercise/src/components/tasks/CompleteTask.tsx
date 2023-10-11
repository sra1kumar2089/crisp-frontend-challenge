import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { completeTask } from '../../redux/actions';
import Task from '../../models/task';
import { TaskStatus } from '../../utils';

interface CompleteTaskProps {
    task: Task;
    onClose: any;
}

const CompleteTask = (props: CompleteTaskProps) => {
    const dispatch = useDispatch();
    const [timeTaken, setTimeTaken] = useState('');

  
    const onSave = () => {   
        //Time taken must be a number
        if(Number(timeTaken)){
            let updateTask = {...props.task, 
                status: TaskStatus.Complete, 
                timeTakenToComplete: Number(timeTaken)
            }   

            dispatch(completeTask(updateTask));
        }
        
        //close modal window
       if(props.onClose){
           props.onClose(false)
       }
   }

   const onCancel = () => {          
       if(props.onClose){
           props.onClose(false)
       }
   }

    return (
        <div>
             <div className="flex mb-4">
                <div className="w-1/3">Enter time taken to complete <span className='text-green-500'>{props.task.name}</span></div>
                <div className="w-2/3 mr-2 leading-2">
                    <input
                        value={timeTaken}
                        type="number"
                        onChange={(e) => setTimeTaken(e.target.value)}
                        className="bg-white border border-black text-gray-900 text-sm rounded-m focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Approx time taken in hours"></input><br />

                </div>
                
            </div>
            <div className='flex float-right'>
                <button type="button"
                    onClick={onSave}
                    className="text-white float-right bg-black text-xs font-medium text-center rounded-lg px-2 py-1 mr-2 mb-1 ">Save</button>
                <button type="button"
                    onClick={onCancel}
                    className="text-white float-right bg-black text-xs font-medium text-center rounded-lg px-2 py-1 mr-2 mb-1 ">Cancel</button>
            </div>            
        </div>
    )
}

export default CompleteTask