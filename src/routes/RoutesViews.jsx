import { Route, Routes } from "react-router-dom"
import { routes } from "../assets/helpers/routes"
import LoginPage from "../pages/LoginPage"
import COlvidadaPage from "../pages/COlvidadaPage"
import RegisterPage from "../pages/RegisterPage"
import CheckEmailPage from "../pages/CheckEmailPage"
import ConfirmPasswordPage from "../pages/ConfirmPasswordPage"

const RoutesViews = () => {
    return (
        <Routes>
            <Route path={routes.login} element={<LoginPage/>} />
            <Route path={routes.forgottenPassword} element={<COlvidadaPage/>} />
            <Route path={routes.register} element={<RegisterPage/>} />
            <Route path={routes.checkEmail} element={<CheckEmailPage/>} />
            <Route path={routes.confirmPassword} element={<ConfirmPasswordPage/>} />
        </Routes>
    )
}

export default RoutesViews
