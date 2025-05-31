import {useState} from "react";
import NewPasswordToken from "../../components/auth/NewPasswordToken.tsx";
import NewPasswordForm from "../../components/auth/NewPasswordForm.tsx";
import type {ConfirmToken} from "../../types/auth.ts";

export default function NewPasswordView() {
    const [token, setToken] = useState<ConfirmToken['token']>('')
    const [isValidToken, setIsValidToken] = useState(false)
    return (
        <>
            <h1 className="text-3xl font-extrabold text-gray-900 text-center">Restablecer contraseña</h1>
            <p className="text-lg text-gray-600 mt-4 text-center">
                Ingresa el código que recibiste para{' '}
                <span className="text-blue-600 font-semibold">restablecer tu contraseña</span>
            </p>

            {!isValidToken ? (
                <NewPasswordToken
                    token={token}
                    setToken={setToken}
                    setIsValidToken={setIsValidToken}
                />
            ) : (
                <NewPasswordForm token={token} />
            )}
        </>
    );

}
