import styles from '../css/Chat.module.css';

const Chatbot = ({ response }) => {
    return (
        <div className={styles.chatbot}>
            <div className={styles.containerLogoBot}>
                <i className={`fa-solid fa-robot ${styles.iconPerfil}`}></i>
            </div>
            <div className={styles.chatbotBody}>
                <div className={styles.chatbotHeader}>
                    <div className={styles.headerTxt}>
                        <span className={styles.spanResponse}>Response</span>
                        <span className={styles.spanResponseDate}>Hace 1 min</span>
                    </div>
                    <div className={styles.page}>
                        <button className={styles.btnPage}>&lt;</button>
                        <span className={styles.cantidadPage}>1/3</span>
                        <button className={styles.btnPage}>&gt;</button>
                    </div>
                </div>
                <div className={styles.youFooterBot}>
                    <p>
                        {response}
                    </p>
                    <div className={styles.contentButtonsBot}>
                        <button className={styles.btnChatBot}>
                            <i className="fa-solid fa-rotate-right"></i> Generate new response
                        </button>
                        <button className={styles.btnChatBot}>
                            <i className="fa-solid fa-copy"></i> Copiar
                        </button>
                        <button className={styles.btnChatBot}>
                            <i className="fa-regular fa-bookmark"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;