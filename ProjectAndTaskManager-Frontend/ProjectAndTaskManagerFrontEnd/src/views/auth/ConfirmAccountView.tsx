import {Link, useNavigate} from "react-router-dom"
import {PinInput, PinInputField} from "@chakra-ui/pin-input";
import {useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {confirmAccount} from "../../api/AuthApi.ts";
import {toast} from "react-toastify"
import type {ConfirmToken} from "../../types/auth.ts";

export default function ConfirmAccountView() {
    const [token, setToken] = useState<ConfirmToken['token']>('')
    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token)
    }

    const navigate = useNavigate()
    const {mutate} = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate('/auth/login')
        }
    })

    const handleComplete = (token: ConfirmToken['token'])=>{
        mutate({token})
    }
    return (
        <>
            <h1 className="text-5xl font-black text-white">Confirm Your Account</h1>
            <p className="text-2xl font-light text-white mt-5">
                Enter the code you received{" "}
                <span className="text-red-500 font-bold">via email</span>
            </p>
            <form className="space-y-8 p-10 bg-white mt-10" noValidate>
                <label className="font-normal text-2xl text-center block">
                    6-Digit Code
                </label>
                <div className="flex justify-between gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="w-10 h-20 p-3 rounded-lg border-gray-300 border placeholder-white text-center"></PinInputField>
                        <PinInputField className="w-10 h-20 p-3 rounded-lg border-gray-300 border placeholder-white text-center"></PinInputField>
                        <PinInputField className="w-10 h-20 p-3 rounded-lg border-gray-300 border placeholder-white text-center"></PinInputField>
                        <PinInputField className="w-10 h-20 p-3 rounded-lg border-gray-300 border placeholder-white text-center"></PinInputField>
                        <PinInputField className="w-10 h-20 p-3 rounded-lg border-gray-300 border placeholder-white text-center"></PinInputField>
                        <PinInputField className="w-10 h-20 p-3 rounded-lg border-gray-300 border placeholder-white text-center"></PinInputField>
                    </PinInput>
                </div>
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to="/auth/request-code"
                    className="text-center text-gray-300 font-normal"
                >
                    Request a New Code
                </Link>
            </nav>
        </>
    );
}
