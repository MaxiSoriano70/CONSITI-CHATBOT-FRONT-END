import { useChatBotStates } from "../Context";
import styles from '../css/Chat.module.css';
import imgPerfil from '../assets/img/Pingu.jpg';

const ChatSidebar = () => {
    const { modoDarkLight } = useChatBotStates();

    const logoStyle = modoDarkLight ? styles.logoSiderbarBlack : styles.logoSiderbarWhite;
    const menuButtonStyle = modoDarkLight ? styles.btnSidebarMenuBlack : styles.btnSidebarMenuWhite;
    const dropdownStyle = modoDarkLight ? styles.chatSidebarProfileDropdownBlack : styles.chatSidebarProfileDropdownWhite;
    const dropdownLinkStyle = modoDarkLight ? styles.dropdownLinkBlack : styles.dropdownLinkWhite;

    return (
        <aside className={styles.chatSidebar}>
            <button className={styles.btnSidebarLeft}>{'>'}</button>
            <a href="#" className={styles.chatSidebarLogo}>
                <i className={`fa-solid fa-circle-nodes ${styles.logoSiderbar} ${logoStyle}`}></i>
            </a>
            <ul className={styles.chatSidebarMenu}>
                <li className={`${styles.menuLi} active`}>
                    <button data-title="Chats" className={`${styles.btnSidebarMenu} ${menuButtonStyle}`}>
                        <i className="fa-regular fa-comment"></i>
                    </button>
                </li>
                <li className={styles.menuLi}>
                    <button data-title="Guardado" className={`${styles.btnSidebarMenu} ${menuButtonStyle}`}>
                        <i className="fa-regular fa-folder"></i>
                    </button>
                </li>

                <li className={styles.chatSidebarProfile}>
                    <button type="button" className={styles.chatSidebarProfileToggle}>
                        <img className={styles.imgProfile} src={imgPerfil} alt="Perfil" />
                    </button>
                    <ul className={`${styles.chatSidebarProfileDropdown} ${dropdownStyle}`}>
                        <li>
                            <a href="#" className={`${styles.dropdownLink} ${dropdownLinkStyle}`}>
                                <i className="fa-solid fa-user"></i> Perfil
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`${styles.dropdownLink} ${dropdownLinkStyle}`}>
                                <i className="fa-solid fa-right-to-bracket"></i> Salir
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
    );
};

export default ChatSidebar;