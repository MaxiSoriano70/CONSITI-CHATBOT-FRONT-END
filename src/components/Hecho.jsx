import { Link } from "react-router-dom";
import { useChatBotStates } from "../Context";
import styles from "../css/Hecho.module.css";
import { routes } from "../assets/helpers/routes";

const Hecho = () => {
    const { modoDarkLight } = useChatBotStates();

    const temaFondo = modoDarkLight ? styles.fondoDark : styles.fondoWhite;
    const temaModo = modoDarkLight ? styles.modoDark : styles.modoWhite;
    const checkTema = modoDarkLight ? styles.checkDark : styles.checkWhite;

    return (
        <main className={`${styles.mainFPassword} ${temaFondo}`}>
            <section className={`${styles.sectionFPassword} ${temaModo}`}>
                <div className={`${styles.check} ${checkTema}`}>
                    <i className="fa-solid fa-check"></i>
                </div>
                <h2 className={styles.titulo}>¡Hecho!</h2>
                <p className={styles.msjFPassword}>
                    Su contraseña ha cambiado. Para continuar haga clic en iniciar sesión
                </p>
                <Link to={routes.login} className={styles.btnRestablecer}>
                    Iniciar Sesión
                </Link>
            </section>
        </main>
    );
};

export default Hecho;