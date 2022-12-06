import { Header } from './components/Header';
import { TasksBoard } from './components/TasksBoard';

import styles from './App.module.css'
import './Global.css';

const tasksContent = [
  {
    task: 'Comprar leite',
    completed: true,
  },
  {
    task: 'Terminar o desafio React do Ignite',
    completed: false,
  }
]

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <TasksBoard tasksOnGoing={tasksContent}/>
      </div>
    </div>
  )
}

