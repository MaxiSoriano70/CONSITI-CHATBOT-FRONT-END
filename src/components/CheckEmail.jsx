import { useEffect, useRef } from 'react';
import styles from '../css/CheckEmail.module.css';
import { useChatBotStates } from '../Context';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckEmail = () => {
    const { modoDarkLight } = useChatBotStates();

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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
        alert('No se ha encontrado el email.');
        return;
        }

        const inputs = inputRefs.current;
        const code = inputs.map(input => input.value.trim()).join('');

        if (inputs.some(input => input.value.trim() === '')) {
        alert('Por favor, completa todos los campos del código.');
        return;
        }

        if (!/^\d{5}$/.test(code)) {
        alert('El código debe tener exactamente 5 dígitos numéricos.');
        return;
        }

        try {
        const response = await axios.post('http://localhost:3000/auth/password-reset/check-code', {
            email,
            code
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        console.log(response.data);
        navigate('/confirmPassword', { state: { email, code } });

        } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || 'Código inválido o expirado. Intenta nuevamente.');
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
