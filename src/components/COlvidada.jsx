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
        setEmail(value);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmailValid(emailRegex.test(value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailValid) {
            Swal.fire({
                icon: "error",
                title: "Email inválido",
                text: "Por favor ingresa un email válido.",
                confirmButtonColor: "#d33",
                ...(modoDarkLight && {
                    background: "#1e1e1e",
                    color: "#ffffff",
                    customClass: {
                        popup: 'swal2-dark'
                    }
                })
            });
            return;
        }

        try {
            Swal.fire({
                title: "Enviando...",
                text: "Por favor espera mientras procesamos tu solicitud",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
                ...(modoDarkLight && {
                    background: "#1e1e1e",
                    color: "#ffffff",
                    customClass: {
                        popup: "swal2-dark"
                    }
                })
            });

            const response = await axios.post("http://localhost:3000/auth/password-reset/request", { email });

            Swal.close();

            navigate("/checkEmail", { state: { email } });

        } catch (error) {
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ocurrió un error. Intenta nuevamente.",
                confirmButtonColor: "#d33",
                ...(modoDarkLight && {
                    background: "#1e1e1e",
                    color: "#ffffff",
                    customClass: {
                        popup: 'swal2-dark'
                    }
                })
            });
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
                    <button className={styles.btnRestablecer} disabled={!emailValid}>Restablecer contraseña</button>
                </form>
            </section>
        </main>
    );
};

export default ForgotPassword;