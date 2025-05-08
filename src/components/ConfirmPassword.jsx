import styles from '../css/ConfirmPassword.module.css';
import { useChatBotStates } from '../Context';

const ConfirmPassword = () => {
    const { modoDarkLight } = useChatBotStates();

    const temaFondo = modoDarkLight ? styles.fondoDark : styles.fondoWhite;
    const temaModo = modoDarkLight ? styles.modoDark : styles.modoWhite;
    const temaInput = modoDarkLight ? styles.inputDark : styles.inputWhite;
    const temaEye = modoDarkLight ? styles.btnEyeDark : styles.btnEyeWhite;

    return (
        <main className={`${styles.mainFPassword} ${temaFondo}`}>
        <section className={`${styles.sectionFPassword} ${temaModo}`}>
            <div className={styles.cabecera}>
            <button className={`${styles.btnLeft} ${styles.btnLeftWhithe}`}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <h2 className={styles.tituloFPassword}>Establecer una nueva contraseña</h2>
            <p className={styles.msjFPassword}>
                Cree una nueva contraseña. Asegúrese de que difiere de anteriores por seguridad
            </p>
            </div>

            <form className={styles.fRestablecer}>
            <div className={styles.cInput}>
                <label className={styles.lblEmail} htmlFor="password">Contraseña</label>
                <div className={styles.inputWrapper}>
                <input
                    className={`${styles.inputPassword} ${temaInput}`}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Ingresa su nueva contraseña"
                />
                <button type="button" className={`${styles.btnEye} ${temaEye}`}>
                    <i className="fa-solid fa-eye"></i>
                </button>
                </div>
            </div>

            <div className={styles.cInput}>
                <label className={styles.lblEmail} htmlFor="confirmPassword">Confirmar contraseña</label>
                <div className={styles.inputWrapper}>
                <input
                    className={`${styles.inputPassword} ${temaInput}`}
                    type="password"
                    name="password"
                    id="confirmPassword"
                    placeholder="Vuelva a introducir la contraseña"
                />
                <button type="button" className={`${styles.btnEye} ${temaEye}`}>
                    <i className="fa-solid fa-eye"></i>
                </button>
                </div>
            </div>

            <button className={styles.btnRestablecer}>Actualizar contraseña</button>
            </form>
        </section>
        </main>
    );
};

export default ConfirmPassword;
