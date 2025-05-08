import styles from '../css/CheckEmail.module.css';
import { useChatBotStates } from '../Context';

const CheckEmail = () => {
    const { modoDarkLight } = useChatBotStates();

    const temaFondo = modoDarkLight ? styles.fondoDark : styles.fondoWhite;
    const temaModo = modoDarkLight ? styles.modoDark : styles.modoWhite;
    const temaInput = modoDarkLight ? styles.inputDark : styles.inputWhite;
    const temaText = modoDarkLight ? styles.textColorDark : styles.textColorWhite;
    const temaLink = modoDarkLight ? styles.lREmailDark : styles.lREmailWhite;

    return (
        <main className={`${styles.mainCEmail} ${temaFondo}`}>
        <section className={`${styles.sectionCEmail} ${temaModo}`}>
            <div className={styles.cabecera}>
            <button className={`${styles.btnLeft} ${styles.btnLeftWhithe}`}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <h2 className={styles.tituloCEmail}>Revisa tu correo</h2>
            <p className={styles.msjCEmail}>
                Hemos enviado un enlace de restablecimiento a <br />
                contact@dscode...com. Introduzca el código de 5 dígitos que se menciona en el correo electrónico.
            </p>
            </div>
            <form className={styles.fCEmail}>
            <div className={styles.cInput}>
                {[...Array(5)].map((_, i) => (
                <input
                    key={i}
                    type="number"
                    min="0"
                    max="9"
                    className={`${styles.inputClave} ${temaInput}`}
                    onInput={(e) => e.target.value = e.target.value.slice(0, 1)}
                />
                ))}
            </div>
            <button type="submit" className={styles.btnREnviar}>Verificar Código</button>
            <p className={styles.txtREmail}>
                ¿Aún no has recibido el correo?{' '}
                <a href="#" className={`${styles.lReenviarEmail} ${temaLink}`}>Reenviar email</a>
            </p>
            </form>
        </section>
        </main>
    );
};

export default CheckEmail;
