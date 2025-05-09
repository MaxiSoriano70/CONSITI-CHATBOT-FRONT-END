import { useChatBotStates } from "../Context";
import styles from "../css/Hecho.module.css";

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
                <button className={styles.btnRestablecer} disabled>
                    Iniciar Sesión
                </button>
            </section>
        </main>
    );
};

export default Hecho;