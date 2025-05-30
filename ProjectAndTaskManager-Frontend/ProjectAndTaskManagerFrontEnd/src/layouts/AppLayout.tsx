import {Navigate, Outlet} from "react-router-dom";
import Logo from "../components/Logo.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NavMenu from "../components/NavMenu.tsx";
import {Link} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";

export default function AppLayout() {
    const {data, isError} = useAuth()
    if (isError) {
        return <Navigate to='auth/login'/>
    }
    if (data) return (
        <>
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center pl-20 pr-20">
                    <div className="w-48">
                        <Link to={'/'}> <Logo/></Link>
                    </div>
                    <NavMenu
                        name={data.name}
                    />
                </div>
            </header>
            <section className="max-w-screen-2xl mx-auto mt-10 pl-24">
                <Outlet/>
            </section>
            <footer className="pl-20 py-5">
                <p className="text-center">
                    Todos los derechos reservados {new Date().getFullYear()}
                </p>
            </footer>
            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}