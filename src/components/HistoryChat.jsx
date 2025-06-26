import { useChatBotStates } from "../Context";
import styles from '../css/Chat.module.css';

const HistoryChat = ({ question, answer, index }) => {
    const { modoDarkLight } = useChatBotStates();

    const historyChatModo = modoDarkLight ? styles.historyChatDark : styles.historyChatWhite;
    const timeClass = modoDarkLight ? styles.historyChatTimeDark : styles.historyChatTimeWhite;

    return (
        <div className={`${styles.historyChat} ${historyChatModo}`}>
            <div className={styles.headerHistoryChat}>
                <i className={`fa-solid fa-robot ${styles.iconoBot}`}></i>
                <div className={styles.historyChatTitle}>
                    {question}
                </div>
                <span className={timeClass}>Now</span>
            </div>
            <div className={styles.bodyHistoryChat}>
                <span className={styles.historyChatTxt}>
                    {answer}
                </span>
            </div>
        </div>
    )
}

export default HistoryChat;