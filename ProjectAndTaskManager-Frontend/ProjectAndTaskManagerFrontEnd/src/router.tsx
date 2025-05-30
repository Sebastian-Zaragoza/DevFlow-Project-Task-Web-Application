import {BrowserRouter, Routes, Route} from "react-router-dom"
import AppLayout from "./layouts/AppLayout.tsx";
import DashboardView from "./views/DashboardView.tsx";
import CreateProjectView from "./views/projects/CreateProjectView.tsx";
import EditProjectView from "./views/projects/EditProjectView.tsx";
import ProjectDetailsView from "./views/projects/ProjectDetailsView.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import LoginView from "./views/auth/LoginView.tsx";
import RegisterView from "./views/auth/RegisterView.tsx";
import ConfirmAccountView from "./views/auth/ConfirmAccountView.tsx";
import RequestNewCodeView from "./views/auth/RequestNewCodeView.tsx";
import ForgotPasswordView from "./views/auth/ForgetPasswordView.tsx";
import NewPasswordView from "./views/auth/NewPasswordView.tsx";

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path='/' element={<DashboardView/>} index></Route>
                    <Route path='/projects/create' element={<CreateProjectView/>}></Route>
                    <Route path='/projects/:projectId/edit' element={<EditProjectView/>}></Route>
                    <Route path='/projects/:projectId' element={<ProjectDetailsView/>}></Route>
                </Route>
                <Route element={<AuthLayout/>}>
                    <Route path={'/auth/login'} element={<LoginView/>}/>
                    <Route path={'/auth/register'} element={<RegisterView/>}/>
                    <Route path={'/auth/confirm-account'} element={<ConfirmAccountView/>}/>
                    <Route path={'/auth/request-code'} element={<RequestNewCodeView/>}/>
                    <Route path={'/auth/forgot-password'} element={<ForgotPasswordView/>}/>
                    <Route path={'/auth/new-password'} element={<NewPasswordView/>}/>
                </Route>
            </Routes>

        </BrowserRouter>
    )
}