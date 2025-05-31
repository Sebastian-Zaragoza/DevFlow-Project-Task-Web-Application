import { Outlet } from 'react-router-dom';
import Logo from "../components/Logo.tsx";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
    return (
        <>
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
                    <div className="flex justify-center mb-6">
                        <Logo/>
                    </div>
                    <div className="space-y-6">
                        <Outlet />
                    </div>
                </div>
            </div>

            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    );
}
