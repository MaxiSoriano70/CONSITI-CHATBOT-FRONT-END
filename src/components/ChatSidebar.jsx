import { useState } from "react";
import { useChatBotStates } from "../Context";
import styles from '../css/Chat.module.css';
import imgPerfil from '../assets/img/Pingu.jpg';

const ChatSidebar = ({ onToggleSidebar }) => {
    const { modoDarkLight } = useChatBotStates();
    const [activeMenu, setActiveMenu] = useState("chats");
    const [dropdownActive, setDropdownActive] = useState(false);

    const logoStyle = modoDarkLight ? styles.logoSiderbarBlack : styles.logoSiderbarWhite;
    const menuButtonStyle = modoDarkLight ? styles.btnSidebarMenuBlack : styles.btnSidebarMenuWhite;
    const dropdownStyle = modoDarkLight ? styles.chatSidebarProfileDropdownBlack : styles.chatSidebarProfileDropdownWhite;
    const dropdownLinkStyle = modoDarkLight ? styles.dropdownLinkBlack : styles.dropdownLinkWhite;

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    const handleToggleDropdown = (e) => {
        e.preventDefault();
        setDropdownActive(prev => !prev);
    };

    return (
        <aside className={styles.chatSidebar}>
            <button className={styles.btnSidebarLeft} onClick={onToggleSidebar}>{'>'}</button>
            <a href="#" className={styles.chatSidebarLogo}>
                <i className={`fa-solid fa-circle-nodes ${styles.logoSiderbar} ${logoStyle}`}></i>
            </a>
            <ul className={styles.chatSidebarMenu}>
                <li className={activeMenu === "chats" ? styles.menuLiActive : styles.menuLi}>
                    <button data-title="Chats" className={`${styles.btnSidebarMenu} ${menuButtonStyle}`} onClick={() => handleMenuClick("chats")}>
                        <i className="fa-regular fa-comment"></i>
                    </button>
                </li>
                <li className={activeMenu === "guardado" ? styles.menuLiActive : styles.menuLi}>
                    <button data-title="Guardado" className={`${styles.btnSidebarMenu} ${menuButtonStyle}`} onClick={() => handleMenuClick("guardado")}>
                        <i className="fa-regular fa-folder"></i>
                    </button>
                </li>

                <li className={styles.chatSidebarProfile}>
                    <button
                        type="button"
                        className={styles.chatSidebarProfileToggle}
                        onClick={handleToggleDropdown}
                    >
                        <img className={styles.imgProfile} src={imgPerfil} alt="Perfil" />
                    </button>
                    <ul className={`${styles.chatSidebarProfileDropdown} ${dropdownStyle} ${dropdownActive ? styles.active : ''}`}>
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
