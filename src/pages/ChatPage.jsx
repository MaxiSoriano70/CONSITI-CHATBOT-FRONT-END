import ChatContent from '../components/ChatContent';
import ChatSidebar from '../components/ChatSidebar';
import { useChatBotStates } from '../Context';
import styles from '../css/Chat.module.css';

const ChatPage = () => {
    const { modoDarkLight } = useChatBotStates();
    const chatModo = modoDarkLight ? styles.chatSectionBlack : styles.chatSectionWhite;

    return (
        <main className={styles.chatMain}>
            <section className={`${styles.chatSection} ${chatModo}`}>
                <ChatSidebar/>
                <ChatContent/>
            </section>
        </main>
    );
};

export default ChatPage;
