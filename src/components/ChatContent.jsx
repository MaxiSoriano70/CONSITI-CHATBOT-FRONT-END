import { useState } from "react";
import { useChatBotStates } from "../Context";
import styles from '../css/Chat.module.css';
import Chatbot from "./Chatbot";
import ChatYou from "./ChatYou";
import HistoryChat from "./HistoryChat";
import SeperadorDay from "./SeperadorDay";

const ChatContent = ({ sidebarVisible }) => {
    const { modoDarkLight } = useChatBotStates();

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

    const contentSidebarClass = `${styles.contentSidebar} ${sidebarVisible ? styles.active : styles.desactive}`;
    const conversationClass = `${styles.conversation} ${sidebarVisible ? styles.desactive : styles.active}`;

    const [inputText, setInputText] = useState("");
    const [loading, setLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);

    const handleSend = async () => {
        if (inputText.trim() === "") return;
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question: inputText })
            });

            const data = await response.json();

            setChatHistory(prev => [...prev, { question: inputText, answer: data.answer }]);
            setInputText("");
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className={styles.chatContent}>
            <div className={contentSidebarClass}>
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
                    {chatHistory.map((chat, index) => (
                        <HistoryChat
                            key={index}
                            question={chat.question}
                            answer={chat.answer}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            <div className={conversationClass}>
                <div className={sectionHeaderClass}>
                    <h2 className={styles.titleConversation}>Chatbot UI</h2>
                </div>

                <div className={sectionBodyClass}>
                    {chatHistory.map((chat, index) => (
                        <div key={index}>
                            <ChatYou question={chat.question} />
                            <Chatbot response={chat.answer} />
                            <SeperadorDay />
                        </div>
                    ))}

                    {loading && (
                        <div className={styles.loadingContainer}>
                            <i className="fa-solid fa-spinner fa-spin"></i>
                        </div>
                    )}
                </div>

                <div className={sectionFooterClass}>
                    <input
                        className={inputSendClass}
                        type="text"
                        placeholder="Pregunta lo que quieras..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button
                        className={btnEnviarClass}
                        onClick={handleSend}
                        disabled={loading}
                    >
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