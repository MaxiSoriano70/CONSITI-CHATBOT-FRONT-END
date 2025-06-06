import { useChatBotStates } from "../Context";
import styles from '../css/Chat.module.css';
import Chatbot from "./Chatbot";
import ChatYou from "./ChatYou";
import HistoryChat from "./HistoryChat";
import SeperadorDay from "./SeperadorDay";

const ChatContent = () => {
    const { modoDarkLight } = useChatBotStates();

    // Clases condicionales con CSS Modules
    const sidebarButtonsClass = modoDarkLight ? styles.contentSidebarButtonsBlack : styles.contentSidebarButtonsWhite;
    const btnSidebarClass = modoDarkLight ? styles.btnSidebarBlack : styles.btnSidebarWhite;
    const nCantidadClass = modoDarkLight ? styles.nCantidadBlack : styles.nCantidadWhite;
    const contentSearchClass = modoDarkLight ? styles.contentSearchDark : styles.contentSearchWhite;
    const containerInputClass = modoDarkLight ? styles.cInputDark : styles.cInputWhite;
    const contentHistoryChatClass = `${styles.contentHistoryChat} ${modoDarkLight ? styles.black : styles.white}`;
    const sectionHeaderClass = `${styles.sectionHeader} ${modoDarkLight ? styles.vDark : styles.vWhite}`;
    const sectionBodyClass = `${styles.sectionBody} ${modoDarkLight ? `${styles.black} ${styles.sBodyDark}` : `${styles.white} ${styles.sBodyWhite}`}`;
    const sectionFooterClass = `${styles.sectionFooter} ${modoDarkLight ? styles.vDark : styles.vWhite}`;
    const inputSendClass = `${styles.inputSend} ${modoDarkLight ? styles.iSendDark : styles.iSendWhite}`;
    const btnEnviarClass = modoDarkLight ? styles.btnEnviarDark : styles.btnEnviarWhite;
    const btnFileClass = modoDarkLight ? styles.btnFileDark : styles.btnFileWhite;


    return (
        <div className={styles.chatContent}>
            <div className={`${styles.contentSidebar} ${styles.active}`}>
                <div className={styles.contentSidebarTitle}>
                    <p className={styles.title}>Chats</p>
                    <div className={styles.containerButtons}>
                        <button className={styles.btnPersonalizado1}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                        <button className={styles.btnPersonalizado2}>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                    </div>
                </div>

                <div className={sidebarButtonsClass}>
                    <button className={`${styles.btnSidebar} ${btnSidebarClass} ${styles.active}`}>
                        <i className="fa-solid fa-comment"></i> Chats
                        <span className={`${styles.nCantidad} ${nCantidadClass} ${styles.active}`}>45</span>
                    </button>
                    <button className={`${styles.btnSidebar} ${btnSidebarClass}`}>
                        <i className="fa-solid fa-bookmark"></i> Guardado
                        <span className={`${styles.nCantidad} ${nCantidadClass}`}>35</span>
                    </button>
                </div>

                <div className={contentSearchClass}>
                    <div className={`${styles.containerInput} ${containerInputClass}`}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="search" placeholder="Buscar..." />
                    </div>
                    <button className={styles.btnPersonalizado1}>
                        <i className="fa-solid fa-filter"></i>
                    </button>
                </div>

                <div className={contentHistoryChatClass}>
                    <HistoryChat/>
                    <HistoryChat/>
                    <HistoryChat/>
                    <HistoryChat/>
                    <HistoryChat/>
                    <HistoryChat/>
                    <HistoryChat/>
                    <HistoryChat/>
                    <HistoryChat/>
                    <HistoryChat/>
                    <HistoryChat/>
                    <HistoryChat/>
                </div>
            </div>

            <div className={`${styles.conversation} ${styles.desactive}`}>
                <div className={sectionHeaderClass}>
                    <h2 className={styles.titleConversation}>Chatbot UI</h2>
                </div>

                <div className={sectionBodyClass}>
                    <SeperadorDay/>
                    <ChatYou/>
                    <Chatbot/>
                    <SeperadorDay/>
                    <ChatYou/>
                    <Chatbot/>
                    <SeperadorDay/>
                    <ChatYou/>
                    <Chatbot/>
                    <SeperadorDay/>
                    <ChatYou/>
                    <Chatbot/>
                    <SeperadorDay/>
                    <ChatYou/>
                    <Chatbot/>
                    <SeperadorDay/>
                    <ChatYou/>
                    <Chatbot/>
                    <SeperadorDay/>
                    <ChatYou/>
                    <Chatbot/>
                </div>

                <div className={sectionFooterClass}>
                    <input
                        className={inputSendClass}
                        type="text"
                        placeholder="Pregunta lo que quieras..."
                    />
                    <button className={btnEnviarClass}>
                        <i className="fa-solid fa-right-long"></i>
                    </button>
                    <button className={btnFileClass}>
                        <i className="fa-solid fa-paperclip"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatContent;