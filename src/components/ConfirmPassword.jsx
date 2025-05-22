import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../css/ConfirmPassword.module.css';
import { useChatBotStates } from '../Context';
import axios from 'axios';

const ConfirmPassword = () => {
    const { modoDarkLight } = useChatBotStates();
    const location = useLocation();
    const navigate = useNavigate();

    const { email, code } = location.state || {};

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(null);
    const [confirmValid, setConfirmValid] = useState(null);
    const [formValid, setFormValid] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const temaFondo = modoDarkLight ? styles.fondoDark : styles.fondoWhite;
    const temaModo = modoDarkLight ? styles.modoDark : styles.modoWhite;
    const temaInput = modoDarkLight ? styles.inputDark : styles.inputWhite;
    const temaEye = modoDarkLight ? styles.btnEyeDark : styles.btnEyeWhite;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    useEffect(() => {
        const isPasswordValid = passwordRegex.test(password);
        const isConfirmValid = password === confirmPassword && confirmPassword !== '';

        setPasswordValid(password ? isPasswordValid : null);
        setConfirmValid(confirmPassword ? isConfirmValid : null);
        setFormValid(isPasswordValid && isConfirmValid);
    }, [password, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            const response = await axios.post('http://localhost:3000/auth/password-reset/confirm', {
                email,
                code,
                newPassword: password
            });

            Swal.close();

            await Swal.fire({
                icon: "success",
                title: "Contraseña actualizada",
                text: "Tu contraseña ha sido actualizada correctamente.",
                confirmButtonColor: "#3085d6",
                ...(modoDarkLight && {
                    background: "#1e1e1e",
                    color: "#ffffff",
                    customClass: { popup: "swal2-dark" }
                })
            });

            navigate('/hecho');

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.message || 'Hubo un error al actualizar la contraseña.',
                confirmButtonColor: "#d33",
                ...(modoDarkLight && {
                    background: "#1e1e1e",
                    color: "#ffffff",
                    customClass: { popup: "swal2-dark" }
                })
            });
        }
    };


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

            <form className={styles.fRestablecer} onSubmit={handleSubmit}>
            <div className={styles.cInput}>
                <label className={styles.lblEmail} htmlFor="password">Contraseña</label>
                <div className={styles.inputWrapper}>
                <input
                    className={`
                    ${styles.inputPassword} ${temaInput}
                    ${passwordValid === true ? styles.successInput : ""}
                    ${passwordValid === false ? styles.dangerInput : ""}
                    `}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Ingresa tu nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    className={`${styles.btnEye} ${temaEye}`}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
                </div>
            </div>

            <div className={styles.cInput}>
                <label className={styles.lblEmail} htmlFor="confirmPassword">Confirmar contraseña</label>
                <div className={styles.inputWrapper}>
                <input
                    className={`
                    ${styles.inputPassword} ${temaInput}
                    ${confirmValid === true ? styles.successInput : ""}
                    ${confirmValid === false ? styles.dangerInput : ""}
                    `}
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Vuelva a introducir la contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    type="button"
                    className={`${styles.btnEye} ${temaEye}`}
                    onClick={() => setShowConfirm(!showConfirm)}
                >
                    <i className={`fa-solid ${showConfirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
                </div>
            </div>

            <button
                type="submit"
                className={styles.btnRestablecer}
                disabled={!formValid}
            >
                Actualizar contraseña
            </button>
            </form>
        </section>
        </main>
    );
};

export default ConfirmPassword;