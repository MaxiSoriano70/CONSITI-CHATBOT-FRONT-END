import { useState } from "react";
import styleRegister from '../css/Register.module.css';
import logoGmail from '../assets/img/gmail.png';
import { useChatBotStates } from "../Context";
import { Link } from "react-router-dom";
import { routes } from "../assets/helpers/routes";
import axios from 'axios';


const Register = () => {
    const { modoDarkLight } = useChatBotStates();

    const [nombre, setNombre] = useState('');
    const [nombreValid, setNombreValid] = useState(null);

    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [fechaNacimientoValid, setFechaNacimientoValid] = useState(null);

    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(null);

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(null);

    const [repeatPassword, setRepeatPassword] = useState('');
    const [repeatPasswordValid, setRepeatPasswordValid] = useState(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const validateNombre = (value) => {
        const trimmed = value.trim();
        setNombre(value);
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/;
        setNombreValid(regex.test(trimmed));
    };

    const validateFechaNacimiento = (value) => {
        setFechaNacimiento(value);
        const today = new Date();
        const selectedDate = new Date(value);
        const isValid = selectedDate < today;
        setFechaNacimientoValid(isValid);
    };

    const validateEmail = (value) => {
        setEmail(value);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmailValid(emailRegex.test(value));
    };

    const validatePassword = (value) => {
        setPassword(value);
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        const isValid = passwordRegex.test(value);
        setPasswordValid(isValid);
        setRepeatPasswordValid(value === repeatPassword && repeatPassword !== '');
    };

    const validateRepeatPassword = (value) => {
        setRepeatPassword(value);
        setRepeatPasswordValid(value === password && passwordValid);
    };

    const temaFondo = modoDarkLight ? "fondoDark" : "fondoWhite";
    const temaLinea = modoDarkLight ? "lineaDark" : "lineaWhite";
    const temaInput = modoDarkLight ? "inputRegisterDark" : "inputRegisterWhite";
    const temaLabel = modoDarkLight ? "lblRDark" : "lblRWhite";
    const temaBtnGoogle = modoDarkLight ? "btnGoogleDark" : "btnGoogleLigth";
    const temaShadow = modoDarkLight ? "shadowColorDark" : "shadowColorWhite";
    const temaLink = modoDarkLight ? "lIniciarSesionDark" : "lIniciarSesionWhite";

    const handleSubmit = async (e) => {
        e.preventDefault();
        validateNombre(nombre);
        validateFechaNacimiento(fechaNacimiento);
        validateEmail(email);
        validatePassword(password);
        validateRepeatPassword(repeatPassword);

        if (
            nombreValid &&
            fechaNacimientoValid &&
            emailValid &&
            passwordValid &&
            repeatPasswordValid
        ) {
            try {
                const response = await axios.post('http://localhost:3000/auth/register', {
                    email,
                    fullname: nombre,
                    birthdate: fechaNacimiento,
                    password,
                    role: "USER"
                }, { withCredentials: true });
                console.log('Usuario registrado:', response.data);
            } catch (error) {
                console.error('Error al registrar:', error.response?.data || error.message);
            }
        } else {
            console.log("Formulario inválido, mostrar errores");
        }
    };


    return (
        <main className={`${styleRegister.mainCRegister} ${styleRegister[temaFondo]}`}>
            <section className={`${styleRegister.sectionCRegister} ${styleRegister[temaFondo]}`}>
                <article className={styleRegister.articleRegister}>
                    <div className={styleRegister.divRegister}>
                        <h2 className={`${styleRegister.tituloRegister} ${styleRegister[temaLabel]}`}>Registro</h2>
                        <p className={`${styleRegister.txtRegister} ${styleRegister[temaLabel]}`}>Regístrate para disfrutar de Chatbot</p>
                        <form className={styleRegister.formRegister} onSubmit={handleSubmit}>
                            <div className={`${styleRegister.cInputRegister} ${styleRegister[temaFondo]}`}>
                                <input
                                    className={`${styleRegister[temaInput]} ${styleRegister.borderWhite} ${nombreValid === true ? styleRegister.successInput : ''} ${nombreValid === false ? styleRegister.dangerInput : ''}`}
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    value={nombre}
                                    onChange={(e) => validateNombre(e.target.value)}
                                />
                                <label className={`${styleRegister.labelRegister} ${styleRegister[temaFondo]} ${styleRegister[temaLabel]}`} htmlFor="nombre">Nombre</label>
                            </div>

                            <div className={`${styleRegister.cInputRegister} ${styleRegister[temaFondo]}`}>
                                <input
                                    className={`${styleRegister[temaInput]} ${styleRegister.borderWhite} ${modoDarkLight ? styleRegister.inputDateDark : ''} ${fechaNacimientoValid === true ? styleRegister.successInput : ''} ${fechaNacimientoValid === false ? styleRegister.dangerInput : ''}`}
                                    type="date"
                                    name="fechaDeNacimiento"
                                    id="fechaDeNacimiento"
                                    value={fechaNacimiento}
                                    onChange={(e) => validateFechaNacimiento(e.target.value)}
                                />
                                <label className={`${styleRegister.labelRegister} ${styleRegister[temaFondo]} ${styleRegister[temaLabel]}`} htmlFor="fechaDeNacimiento">Fecha de Nacimiento</label>
                            </div>

                            <div className={`${styleRegister.cInputRegister} ${styleRegister[temaFondo]}`}>
                                <input
                                    className={`${styleRegister[temaInput]} ${styleRegister.borderWhite} ${emailValid === true ? styleRegister.successInput : ''} ${emailValid === false ? styleRegister.dangerInput : ''}`}
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => validateEmail(e.target.value)}
                                />
                                <label className={`${styleRegister.labelRegister} ${styleRegister[temaFondo]} ${styleRegister[temaLabel]}`} htmlFor="email">Email</label>
                            </div>

                            <div className={`${styleRegister.cInputRegister} ${styleRegister[temaFondo]}`}>
                                <input
                                    className={`${styleRegister[temaInput]} ${styleRegister.borderWhite} ${passwordValid === true ? styleRegister.successInput : ''} ${passwordValid === false ? styleRegister.dangerInput : ''}`}
                                    type={showPassword ? "text" : "password"}
                                    name="contraseña"
                                    id="contraseña"
                                    value={password}
                                    onChange={(e) => validatePassword(e.target.value)}
                                />
                                <label className={`${styleRegister.labelRegister} ${styleRegister[temaFondo]} ${styleRegister[temaLabel]}`} htmlFor="contraseña">Contraseña</label>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`${styleRegister.btnContra} ${styleRegister[temaLabel]}`}
                                >
                                    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                </button>
                            </div>

                            <div className={`${styleRegister.cInputRegister} ${styleRegister[temaFondo]}`}>
                                <input
                                    className={`${styleRegister[temaInput]} ${styleRegister.borderWhite} ${repeatPasswordValid === true ? styleRegister.successInput : ''} ${repeatPasswordValid === false ? styleRegister.dangerInput : ''}`}
                                    type={showRepeatPassword ? "text" : "password"}
                                    name="contraseñaRepetir"
                                    id="contraseñaRepetir"
                                    value={repeatPassword}
                                    onChange={(e) => validateRepeatPassword(e.target.value)}
                                />
                                <label className={`${styleRegister.labelRegister} ${styleRegister[temaFondo]} ${styleRegister[temaLabel]}`} htmlFor="contraseñaRepetir">Repetir Contraseña</label>
                                <button
                                    type="button"
                                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                                    className={`${styleRegister.btnContra} ${styleRegister[temaLabel]}`}
                                >
                                    <i className={`fa-solid ${showRepeatPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                </button>
                            </div>

                            <button className={styleRegister.btnRegistrarse} type="submit">Registrarse</button>

                            <div className={styleRegister.cOr}>
                                <div className={`${styleRegister.lineaOr} ${styleRegister[temaLinea]}`}></div>
                                <span className={`${styleRegister.or} ${styleRegister[temaLabel]}`}>O</span>
                                <div className={`${styleRegister.lineaOr} ${styleRegister[temaLinea]}`}></div>
                            </div>

                            <div className={styleRegister.cBtnGoogle}>
                                <button type="button" onClick={() => window.location.href = 'http://localhost:3000/auth/google/register'} className={`${styleRegister.btnGoogle} ${styleRegister[temaBtnGoogle]} ${styleRegister[temaShadow]}`}>
                                    <span className={styleRegister.txtGmail}>Registrarse con Google</span>
                                    <img className={styleRegister.imgGmail} src={logoGmail} alt="gmail" />
                                </button>
                            </div>

                            <p className={`${styleRegister.txtIniciarSesion} ${styleRegister[temaLabel]}`}>
                                ¿Ya tiene una cuenta? <Link className={styleRegister[temaLink]} to={routes.login}>Iniciar sesión</Link>
                            </p>
                        </form>
                    </div>
                </article>
                <article className={styleRegister.articleFRegister}></article>
            </section>
        </main>
    );
};

export default Register;
