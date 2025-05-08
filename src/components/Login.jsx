import styleLogin from '../css/Login.module.css';
import logoGmail from '../assets/img/gmail.png';
import imgLogin from '../assets/img/imgLogin.svg';
import { useChatBotStates } from "../Context";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { routes } from '../assets/helpers/routes';
import axios from 'axios'; // 👈 Agregado

const Login = () => {
    const { nombreProyecto } = useChatBotStates();
    const { modoDarkLight } = useChatBotStates();
    const temaFondo = modoDarkLight ? "fondoDark" : "fondoWhite";
    const temaModo = modoDarkLight ? "modoDark" : "modoWhite";
    const temaLinea = modoDarkLight ? "lineaDark" : "lineaWhite";
    const temaInput = modoDarkLight ? "inputLoginDark" : "inputLoginWhite";
    const temaLabel = modoDarkLight ? "lblRDark" : "lblRWhite";
    const temaText = modoDarkLight ? "textColorDark" : "textColorWhite";
    const temaShadow = modoDarkLight ? "shadowColorDark" : "shadowColorWhite";
    const btnGoogle = modoDarkLight ? "btnGoogleDark" : "btnGoogleLigth";
    const linkolv = modoDarkLight ? "linkOlvDark" : "linkOlvWhite";
    const linkRegistrarme = modoDarkLight ? "linkRegistrarseDark" : "linkRegistrarseWhite";

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [emailValid, setEmailValid] = useState(null);
    const [passwordValid, setPasswordValid] = useState(null);

    const validateEmail = (value) => {
        setEmail(value);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmailValid(emailRegex.test(value));
    };

    const validatePassword = (value) => {
        setPassword(value);
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        setPasswordValid(passwordRegex.test(value));
    };

    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }

        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email,
                password,
            }, {
                withCredentials: true,
            });

            console.log("Login exitoso:", response.data);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

        } catch (error) {
            console.error("Error al iniciar sesión:", error.response?.data || error.message);
            alert("Credenciales incorrectas o error de conexión.");
        }
    };

    return (
        <main className={`${styleLogin.mainLogin} ${styleLogin[temaFondo]}`}>
            <section className={styleLogin.contenedorLogin}>
                <article className={styleLogin.cImgLogin}>
                    <img className={styleLogin.imgPLogin} src={imgLogin} alt="imgLogin" />
                </article>
                <article className={`${styleLogin.cLogin} ${styleLogin[temaModo]}`}>
                    <div className={styleLogin.cTitulo}>
                        <span className={styleLogin.bTxtBienvenida}>Bienvenido a</span>
                        <span className={`${styleLogin.bTxtTitulo} ${styleLogin[temaText]}`}>{nombreProyecto}</span>
                    </div>
                    <div className={styleLogin.cBtnGoogle}>
                        <button type="button" onClick={() => window.location.href = 'http://localhost:3000/auth/google/login'} className={`${styleLogin.btnGoogle} ${styleLogin[btnGoogle]} ${styleLogin[temaShadow]}`}>
                            <img className={styleLogin.imgGmail} src={logoGmail} alt="gmail" />
                            <span className={styleLogin.txtGmail}>Ingresar con Google</span>
                        </button>
                    </div>
                    <div className={styleLogin.cOr}>
                        <div className={`${styleLogin.lineaOr} ${styleLogin[temaLinea]}`}></div>
                        <span className={styleLogin.or}>O</span>
                        <div className={`${styleLogin.lineaOr} ${styleLogin[temaLinea]}`}></div>
                    </div>
                    <form className={styleLogin.formLogin} onSubmit={handleLogin}>
                        <div className={styleLogin.cInputLogin}>
                            <input className={`${styleLogin[temaInput]} ${styleLogin.borderInput} ${emailValid === true ? styleLogin.successInput : ''} ${emailValid === false ? styleLogin.dangerInput : ''}`}
                                type="email" name="email" id="email" value={email} onChange={(e) => validateEmail(e.target.value)} />
                            <label className={`${styleLogin.labelLogin} ${styleLogin[temaModo]} ${styleLogin[temaLabel]}`} htmlFor="email">Email</label>
                        </div>
                        <div className={styleLogin.cInputLogin}>
                            <input className={`${styleLogin[temaInput]} ${styleLogin.borderInput} ${passwordValid === true ? styleLogin.successInput : ''} ${passwordValid === false ? styleLogin.dangerInput : ''}`}
                                type={showPassword ? "text" : "password"} name="contraseña" id="contraseña" value={password} onChange={(e) => validatePassword(e.target.value)} />
                            <label className={`${styleLogin.labelLogin} ${styleLogin[temaModo]} ${styleLogin[temaLabel]}`} htmlFor="contraseña">Contraseña</label>
                            <button type="button" className={`${styleLogin.btnContra} ${styleLogin[temaLabel]}`} onClick={() => setShowPassword(!showPassword)}>
                                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} ${styleLogin.lEye} ${styleLogin[temaLabel]}`}></i>
                            </button>
                        </div>
                        <div className={styleLogin.cRecordar}>
                            <span className={styleLogin.cInputCheck}>
                                <input type="checkbox" name="recuerdame" id="recuerdame" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                                <label className={styleLogin.lRecuerdame} htmlFor="recuerdame">Recuérdame</label>
                            </span>
                            <Link className={`${styleLogin[linkolv]} ${styleLogin[temaText]}`} to={routes.forgottenPassword}>¿Olvidaste tu contraseña?</Link>
                        </div>
                        <button type="submit" className={styleLogin.btnLogin}>Iniciar sesión</button>
                        <span className={styleLogin.cRegistrarse}>¿No tienes cuenta?
                            <Link className={`${styleLogin[linkRegistrarme]} ${styleLogin[temaText]}`} to={routes.register}> Registrate </Link>
                        </span>
                    </form>
                </article>
            </section>
        </main>
    );
};

export default Login;
