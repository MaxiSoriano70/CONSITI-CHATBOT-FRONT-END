import { useChatBotStates } from "../Context";
import styles from '../css/Chat.module.css';

const HistoryChat = () => {
    const { modoDarkLight } = useChatBotStates();

    const historyChatModo = modoDarkLight ? styles.historyChatDark : styles.historyChatWhite;
    const timeClass = modoDarkLight ? styles.historyChatTimeDark : styles.historyChatTimeWhite;

    return (
        <div className={`${styles.historyChat} ${historyChatModo}`}>
            <div className={styles.headerHistoryChat}>
                <i className={`fa-solid fa-robot ${styles.iconoBot}`}></i>
                <div className={styles.historyChatTitle}>
                    Cosmic Evolution
                </div>
                <span className={timeClass}>Now</span>
            </div>
            <div className={styles.bodyHistoryChat}>
                <span className={styles.historyChatTxt}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, quas perferendis, enim architecto ratione repudiandae laborum, molestiae sequi dolorum quis hic magnam? Odit vitae officiis voluptatum modi alias quasi et.
                </span>
            </div>
        </div>
    )
}

export default HistoryChat;