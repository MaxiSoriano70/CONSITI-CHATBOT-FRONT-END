import { useState } from 'react';
import ChatContent from '../components/ChatContent';
import ChatSidebar from '../components/ChatSidebar';
import { useChatBotStates } from '../Context';
import styles from '../css/Chat.module.css';

const ChatPage = () => {
    const { modoDarkLight } = useChatBotStates();
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const chatModo = modoDarkLight ? styles.chatSectionBlack : styles.chatSectionWhite;

    const toggleSidebar = () => {
        setSidebarVisible(prev => !prev);
    };

    return (
        <main className={styles.chatMain}>
            <section className={`${styles.chatSection} ${chatModo}`}>
                <ChatSidebar onToggleSidebar={toggleSidebar} />
                <ChatContent sidebarVisible={sidebarVisible} />
            </section>
        </main>
    );
};

export default ChatPage;