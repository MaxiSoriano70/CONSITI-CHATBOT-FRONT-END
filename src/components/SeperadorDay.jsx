import styles from '../css/Chat.module.css';

const SeperadorDay = () => {
    return (
        <div className={styles.separadorDay}>
            <div className={styles.linea}></div>
            Hoy
            <div className={styles.linea}></div>
        </div>
    );
}

export default SeperadorDay;