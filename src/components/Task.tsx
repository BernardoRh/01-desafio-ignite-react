import { useState } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Trash } from 'phosphor-react'

import styles from './Task.module.css';
import '../Global.css';

interface TaskProps {
    completed?: boolean;
    task: string;
    deleteTask: (task: string) => void;
    checkTask: (task: string) => void;
    uncheckTask: (task: string) => void;
}

export function Task({task, completed, deleteTask, checkTask, uncheckTask, ...props}: TaskProps) {
    const [isCompleted, setIscompleted] = useState(completed)

    function handleCkeckTask() {
        if(isCompleted){
            setIscompleted(false);
            uncheckTask(task);
        } else {
            setIscompleted(true);
            checkTask(task);
        }
    }

    function handleDeleteTask(){
        deleteTask(task);
    }

   return(
    <div className={styles.task}>
        <CheckboxPrimitive.Root onClick={handleCkeckTask} id={`Checkbox${task}`} defaultChecked={isCompleted} className={styles.checkbox}>
            <CheckboxPrimitive.Indicator className={styles.checkboxIndicator}>
                <Check size={18}/>
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <label id={isCompleted? 'completed' : 'incompleted'} htmlFor={`Checkbox${task}`}>
            {task}
        </label>
        <button className={styles.delete} onClick={handleDeleteTask}><Trash size={24}/></button>
    </div>
   )
}