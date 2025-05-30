import {useState} from "react";
import NewPasswordToken from "../../components/auth/NewPasswordToken.tsx";
import NewPasswordForm from "../../components/auth/NewPasswordForm.tsx";
import type {ConfirmToken} from "../../types/auth.ts";

export default function NewPasswordView() {
    const [token, setToken] = useState<ConfirmToken['token']>('')
    const [isValidToken, setIsValidToken] = useState(false)
    return (
        <>
            <h1 className="text-5xl font-black text-white">Reset Password</h1>
            <p className="text-2xl font-light text-white mt-5">
                Enter the code that you have received to {' '}
                <span className="text-red-400 font-bold">reset your password</span>
            </p>
            {!isValidToken? <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}/> :
                <NewPasswordForm token={token}/>}
        </>
    );
}
