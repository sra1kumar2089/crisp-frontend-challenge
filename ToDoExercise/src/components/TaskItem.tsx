import React, { useEffect, useState } from 'react'
import Task from '../models/task'
import { TaskStatus } from '../utils'
import { useDispatch, useSelector } from "react-redux"
import { editTask, undoTask } from '../redux/actions';
import Modal from './modal/Modal';
import AddEditTask from './tasks/AddEditTask';
import DeleteTask from './tasks/DeleteTask';
import CompleteTask from './tasks/CompleteTask';
import { IRootState } from '../redux/reducers';

export default function TaskItem(props:any) {
   const taskColor = props.item.status == TaskStatus.Complete ? 'px-0.5 task-completed-color' : 'px-1 task-incomplete-color';
   const dispatch = useDispatch();
   const[isShowEdit, setIsShowEdit] = useState<boolean>(false);
   const[isShowDelete, setIsShowDelete] = useState<boolean>(false);
   const[isShowComplete, setIsShowComplete] = useState<boolean>(false);
   const taskRedx = useSelector((s: IRootState) => s.taskReducer)
   const [canUndo, setCanUndo] = useState<boolean>(false);


   //can undo only if any any edits are made to the task.
   //taskHistory stores all the changes made to each task
   useEffect(() => {
        let taskHistory = taskRedx.taskHistory.find(t => t.id === props.item.id)
        if(taskHistory && taskHistory.tasks.length > 1){
            setCanUndo(true);
        } else{
            setCanUndo(false);
        }
   });

   const onEditTaskChangeModal = () => {
        setIsShowEdit(!isShowEdit)
   }

   //save changes from edit
   const onEditSave = (task:Task) => {     
    const editedTask = {
       ...props.item,
        name: task.name,
        description: task.description
    }

    dispatch(editTask(editedTask));
    onEditTaskChangeModal()
}

const onDelete = () => {     
    setIsShowDelete(!isShowDelete)
}

//undo last edit on this task
const onUndo = () => {    
    dispatch(undoTask(props.item.id));
}

  return (
    <div className="task-item">
        <div className={taskColor}></div>
        <div className="item2 w-full float-left text-left px-2">
            <div className='text-2xl'>
                {props.item.name}
            </div>
            <div className='text-lg'>
                {props.item.description}
            </div>
            {
                props.item.status === TaskStatus.Complete && 
                    <div className='text-lg'>
                        Completion Time: {props.item.timeTakenToComplete} Hrs
                    </div>
            }
        </div>
        <div className="item2 col-span-2 px-px">
            <div>
                <button type="button"
                    onClick={()=>setIsShowComplete(!isShowComplete)}
                    className="task-button text-white float-right bg-black text-xs font-medium text-center rounded-lg px-2 py-1 mr-2 mb-1 ">Complete</button>
            </div>
            <div className='px-px'>
                <button type="button"
                    onClick={onEditTaskChangeModal}
                    className="task-button text-white float-right bg-black text-xs font-medium text-center rounded-lg px-2 py-1 mr-2 mb-1 ">Edit</button>
            </div>
            <div className='px-px'>
                <button type="button"
                    onClick={onDelete}
                    className="task-button text-white float-right bg-black text-xs font-medium text-center rounded-lg px-2 py-1 mr-2 mb-1 ">Delete</button>
            </div>
            {
                canUndo && <div className='px-px'>
                    <button type="button"
                        onClick={onUndo}
                        className="task-button text-white float-right bg-black text-xs font-medium text-center rounded-lg px-2 py-1 mr-2 mb-1 ">Undo Change</button>
                </div>
            }
        </div>

        {isShowEdit && <Modal show={isShowEdit} handleClose={onEditTaskChangeModal} title='Edit Task'>
            <AddEditTask
                name={props.item.name}
                description={props.item.description}
                showDefaultStatus={false}
                onHideAddTaskModal={onEditSave}
                onSave={onEditSave}
            />
        </Modal>
        }
        
        {isShowDelete && <Modal show={isShowDelete} handleClose={onDelete} title='Delete Task'>
            <DeleteTask
                task={props.item}
                onClose={setIsShowDelete}
            />
        </Modal>
        }

        {isShowComplete && <Modal show={isShowComplete} handleClose={()=>setIsShowComplete(!isShowComplete)} title='Complete Task'>
            <CompleteTask
                task={props.item}
                onClose={setIsShowComplete}
            />
        </Modal>
        }
    </div>

  )
}
