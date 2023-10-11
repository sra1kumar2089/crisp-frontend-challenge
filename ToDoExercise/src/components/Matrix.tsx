import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { IRootState } from '../redux/reducers';
import Task from '../models/task';
import './tasks/tasks.css';
import { TaskStatus } from '../utils';

export default function Matrix() {
    
    const taskRedx = useSelector((s: IRootState) => s.taskReducer)
    const [values, setValues] = useState({numOfCompletedTasks: 0, numOfIncompleteTasks: 0, avgTimeForCompletedTasks:0 });

    useEffect(()=>{
        //calculate all the values and display
        const avgTimeForCompletedTasks = taskRedx.tasks.filter(t => t.status == TaskStatus.Complete)
                        .reduce((sum:number, task:Task) => {
                                return sum + task.timeTakenToComplete;
                            },0);
        const numOfIncompleteTasks = taskRedx.tasks.filter(t => t.status == TaskStatus.Incomplete).length;  
        const numOfCompletedTasks = taskRedx.tasks.filter(t => t.status == TaskStatus.Complete).length;            

        setValues({
            numOfCompletedTasks,
            numOfIncompleteTasks,
            avgTimeForCompletedTasks
        })
    },[]);

    return (

        <div className='ml-10  w-full align-middle'>
            <div className='text-3xl'>Matrix</div>
            <div className="grid grid-cols-5 gap-3 mt-10 content-center">
                <div className="bg-blue-100"># of tasks completed</div>
                <div className="bg-red-100 col-span-4">{values.numOfCompletedTasks || '0'}</div>
                <div className="bg-blue-100"># of open tasks</div>
                <div className="bg-red-100 col-span-4">{values.numOfIncompleteTasks || '0'}</div>
                <div className="bg-blue-100">Avg. duration for completed tasks</div>
                <div className="bg-red-100 col-span-4">{values.avgTimeForCompletedTasks}</div>
          </div>           
        </div>

    )
}
