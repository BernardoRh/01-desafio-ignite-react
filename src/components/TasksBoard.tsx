import { Task } from './Task';
import { ClipboardText, PlusCircle } from 'phosphor-react';
import { useState, ChangeEvent, FormEvent, InvalidEvent } from 'react';

import styles from './TasksBoard.module.css';
import '../Global.css'

interface TasksToDo {
    task: string,
    completed: boolean,
}

interface TasksBoardProps {
    tasksOnGoing: TasksToDo[],
}

export function TasksBoard({tasksOnGoing}: TasksBoardProps) {

    const [tasks, setTasks] = useState(tasksOnGoing);
    const [quantTastks, setQuantTasks] = useState(tasks.length);
    const [quantTastksCompleted, setQuantTasksCompleted] = useState(tasks.filter(line => {
        return line.completed == true;
    }).length);
    const [taskInput, setTaskInput] = useState('');

    function handleCreateTask(event: FormEvent) {
        event.preventDefault();
        setTasks([...tasks, {task: taskInput, completed: false}]);
        setQuantTasks(quantTastks + 1);
        setTaskInput('');
    }

    function handleDeleteTask(taskToDelete: string) {
        const withoutTaskDeleted = tasks.filter(line => {
            return line.task != taskToDelete;
        });

        handleUncheckTask(taskToDelete);
        setTasks(withoutTaskDeleted);
        setQuantTasks(withoutTaskDeleted.length);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('');
        setTaskInput(event.target.value);
    }

    function handleInputTaskInvalid(event: InvalidEvent<HTMLInputElement>){
        event.target.setCustomValidity('Esste campo não pode estar vazio');
    }

    function onChangeTasksCompleted(){
        setQuantTasksCompleted(tasks.filter(line => {
            return line.completed == true;
        }).length)
    }

    function handleUncheckTask(taskToUncheck: string){
        tasks.filter(line => {
            line.task == taskToUncheck ? (line.completed = false, onChangeTasksCompleted()) : '';
        })
    }

    function handleCheckTask(taskToCheck: string){
        tasks.filter(line => {
            line.task == taskToCheck ? (line.completed = true, onChangeTasksCompleted()) : '';
        })
    }

    return(
        <>
            <form onSubmit={handleCreateTask} action="submit" className={styles.inputTask}>
                <input
                    type="text"
                    placeholder='Adicione uma nova tarefa'
                    name='inputTask'
                    value={taskInput}
                    onChange={handleInputChange}
                    onInvalid={handleInputTaskInvalid}
                    required
                />
                <button><p>Criar</p> <PlusCircle/></button>
            </form>
            <main>
                <div className={styles.tasksBoard}>
                    <div className={styles.tasksInfo}>
                        <p>Tarefas Criadas
                            <span>{quantTastks}</span>
                        </p>
                        <p>Concluídas
                            <span>
                                {quantTastks == 0 ? '0' : (`${quantTastksCompleted} de ${quantTastks}`)}
                            </span>
                        </p>
                    </div>
                    <div className={styles.tasksContent}>
                        {quantTastks == 0 ? 
                            (<>
                                <ClipboardText size={64}/>
                                <p>
                                    <span>Você ainda não tem tarefas cadastradas</span>
                                    <span>Crie tarefas e organize seus itens a fazer</span>
                                </p>
                            </>
                            ) : tasks.map(line => {
                                return(
                                    <Task
                                        key={line.task}
                                        task={line.task}
                                        completed={line.completed ?? false}
                                        deleteTask={handleDeleteTask}
                                        checkTask={handleCheckTask}
                                        uncheckTask={handleUncheckTask}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
            </main>
        </>
    )
}