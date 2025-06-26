import { useChatBotStates } from "../Context";
import styles from '../css/Chat.module.css';
import imgPerfil from '../assets/img/Pingu.jpg';

const ChatYou = ({ question }) => {
    const { modoDarkLight } = useChatBotStates();

    const headerModo = modoDarkLight ? styles.yHeaderDark : styles.yHeaderWhite;
    const footerModo = modoDarkLight ? styles.yFooterDark : styles.yFooterWhite;
    const btnModo = modoDarkLight ? styles.dark : styles.white;

    return (
        <div className={styles.chatYou}>
            <img className={styles.imgPerfil} src={imgPerfil} alt="imgPerfil" />
            <div className={styles.youBody}>
                <div className={`${styles.youHeader} ${headerModo}`}>
                    <span className={styles.spanYou}>Tú</span>
                    <span className={styles.spanDate}>Hace 1 min</span>
                </div>
                <div className={`${styles.youFooter} ${footerModo}`}>
                    <p>
                        { question }
                    </p>
                </div>
                <div className={styles.contentEdit}>
                    <button className={`${styles.btnEdit} ${btnModo}`}>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatYou;