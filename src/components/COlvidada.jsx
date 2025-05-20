import { Link } from "react-router-dom";
import { useChatBotStates } from "../Context";
import styles from "../css/COlvidada.module.css";
import { routes } from "../assets/helpers/routes";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const { modoDarkLight } = useChatBotStates();

    const temaFondo = modoDarkLight ? styles.fondoDark : styles.fondoWhite;
    const temaModo = modoDarkLight ? styles.modoDark : styles.modoWhite;
    const temaInput = modoDarkLight ? styles.inputDark : styles.inputWhite;

    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(null);

    const navigate = useNavigate();


    const validateEmail = (value) => {
        console.log("Typed:", value);
        setEmail(value);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmailValid(emailRegex.test(value));
        console.log(emailRegex.test(value));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailValid) {
        alert("Por favor ingresa un email válido.");
        return;
    }

    try {
        const response = await axios.post("http://localhost:3000/auth/password-reset/request", {
            email
        });

        console.log("Respuesta:", response.data);
        navigate("/checkEmail", { state: { email } });
    } catch (error) {
        console.error("Error al enviar el email:", error);
        alert("Ocurrió un error. Intenta nuevamente.");
    }
};


    return (
        <main className={`${styles.mainFPassword} ${temaFondo}`}>
            <section className={`${styles.sectionFPassword} ${temaModo}`}>
                <div className={styles.cabecera}>
                    <Link to={routes.login} className={`${styles.btnLeft} ${styles.btnLeftWhithe}`}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </Link>
                    <h2 className={styles.tituloFPassword}>Contraseña olvidada</h2>
                    <p className={styles.msjFPassword}>
                        Por favor ingresa tu email para restablecer tu contraseña
                    </p>
                </div>
                <form className={styles.fRestablecer} onSubmit={handleSubmit}>
                    <div className={styles.cInput}>
                        <label className={styles.lblEmail} htmlFor="email">Email</label>
                        <input
                            className={`
                                ${styles.inputEmail} ${temaInput} ${emailValid === true ? styles.successInput : ""} ${emailValid === false ? styles.dangerInput : ""}
                            `}
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => validateEmail(e.target.value)}
                            placeholder="Ingresa tu email"
                        />
                    </div>
                    <button className={styles.btnRestablecer}>Restablecer contraseña</button>
                </form>
            </section>
        </main>
    );
};

export default ForgotPassword;