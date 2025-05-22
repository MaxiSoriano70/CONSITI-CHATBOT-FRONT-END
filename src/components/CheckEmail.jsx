import { useEffect, useRef, useState } from 'react';
import styles from '../css/CheckEmail.module.css';
import { useChatBotStates } from '../Context';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckEmail = () => {
    const { modoDarkLight } = useChatBotStates();
    const [isComplete, setIsComplete] = useState(false);


    const temaFondo = modoDarkLight ? styles.fondoDark : styles.fondoWhite;
    const temaModo = modoDarkLight ? styles.modoDark : styles.modoWhite;
    const temaInput = modoDarkLight ? styles.inputDark : styles.inputWhite;
    const temaText = modoDarkLight ? styles.textColorDark : styles.textColorWhite;
    const temaLink = modoDarkLight ? styles.lREmailDark : styles.lREmailWhite;

    const location = useLocation();
    const email = location.state?.email;
    const navigate = useNavigate();

    const inputRefs = useRef([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleInputChange = (e, index) => {
        const value = e.target.value.slice(0, 1);
        e.target.value = value;

        if (value && index < 4) {
            inputRefs.current[index + 1]?.focus();
        }

        if (!value && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        const code = inputRefs.current.map(input => input?.value.trim()).join('');
        setIsComplete(code.length === 5);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const inputs = inputRefs.current;
        const code = inputs.map(input => input?.value.trim()).join('');

        if (!email) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se ha encontrado el email.",
                confirmButtonColor: "#d33",
                ...(modoDarkLight && {
                    background: "#1e1e1e",
                    color: "#ffffff",
                    customClass: { popup: 'swal2-dark' }
                })
            });
            return;
        }

        if (inputs.some(input => input?.value.trim() === '')) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Por favor, completa todos los campos del código.",
                confirmButtonColor: "#d33",
                ...(modoDarkLight && {
                    background: "#1e1e1e",
                    color: "#ffffff",
                    customClass: { popup: 'swal2-dark' }
                })
            });
            return;
        }

        if (!/^\d{5}$/.test(code)) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "El código debe tener exactamente 5 dígitos numéricos.",
                confirmButtonColor: "#d33",
                ...(modoDarkLight && {
                    background: "#1e1e1e",
                    color: "#ffffff",
                    customClass: { popup: 'swal2-dark' }
                })
            });
            return;
        }

        Swal.fire({
            title: "Enviando...",
            text: "Por favor espera mientras procesamos tu solicitud",
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
            ...(modoDarkLight && {
                background: "#1e1e1e",
                color: "#ffffff",
                customClass: { popup: "swal2-dark" }
            })
        });

        try {
            const response = await axios.post('http://localhost:3000/auth/password-reset/check-code', {
                email,
                code
            });

            Swal.close();
            navigate('/confirmPassword', { state: { email, code } });

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Código incorrecto o expirado",
                text: error.response?.data?.message || 'Intenta nuevamente.',
                confirmButtonColor: "#d33",
                ...(modoDarkLight && {
                    background: "#1e1e1e",
                    color: "#ffffff",
                    customClass: { popup: 'swal2-dark' }
                })
            });
        }
    };

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
                <strong>{email}</strong>. Introduce el código de 5 dígitos que se menciona en el correo electrónico.
            </p>
            </div>

            <form className={styles.fCEmail} onSubmit={handleSubmit}>
            <div className={styles.cInput}>
                {[...Array(5)].map((_, i) => (
                <input
                    key={i}
                    type="number"
                    min="0"
                    max="9"
                    className={`${styles.inputClave} ${temaInput}`}
                    onInput={(e) => handleInputChange(e, i)}
                    ref={(el) => (inputRefs.current[i] = el)}
                />
                ))}
            </div>

            <button type="submit" className={styles.btnREnviar} disabled={!isComplete}>Verificar Código</button>

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
