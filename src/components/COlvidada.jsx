import { useChatBotStates } from "../Context";
import styles from "../css/COlvidada.module.css";

const ForgotPassword = () => {
    const { modoDarkLight } = useChatBotStates();

    const temaFondo = modoDarkLight ? styles.fondoDark : styles.fondoWhite;
    const temaModo = modoDarkLight ? styles.modoDark : styles.modoWhite;
    const temaInput = modoDarkLight ? styles.inputDark : styles.inputWhite;

    return (
        <main className={`${styles.mainFPassword} ${temaFondo}`}>
        <section className={`${styles.sectionFPassword} ${temaModo}`}>
            <div className={styles.cabecera}>
            <button className={`${styles.btnLeft} ${styles.btnLeftWhithe}`}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <h2 className={styles.tituloFPassword}>Contraseña olvidada</h2>
            <p className={styles.msjFPassword}>
                Por favor ingresa tu email para restablecer tu contraseña
            </p>
            </div>
            <form className={styles.fRestablecer} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.cInput}>
                <label className={styles.lblEmail} htmlFor="email">
                Email
                </label>
                <input
                className={`${styles.inputEmail} ${temaInput}`}
                type="email"
                name="email"
                id="email"
                placeholder="Ingresa tu email"
                />
            </div>
            <button className={styles.btnRestablecer}>Restablecer contraseña</button>
            </form>
        </section>
        </main>
    );
}

export default ForgotPassword;