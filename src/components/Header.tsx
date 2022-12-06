
import styles from './Header.module.css';
import '../Global.css';

import TodoLogo from '../img/Todo.svg'

export function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.todo}>
                <img src={TodoLogo} alt="Logo do To-Do" />
                <p>
                    <span className={styles.to}>to</span>
                    <span className={styles.do}>do</span>
                </p>
            </div>
        </header>
    )
}