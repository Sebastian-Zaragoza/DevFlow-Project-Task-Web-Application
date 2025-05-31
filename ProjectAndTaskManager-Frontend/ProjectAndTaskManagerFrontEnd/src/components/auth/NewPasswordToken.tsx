import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { Link } from 'react-router-dom'
import type {ConfirmToken} from "../../types/auth.ts";
import React from "react"
import {useMutation} from "@tanstack/react-query"
import {validateToken} from "../../api/AuthApi.ts";
import {toast} from "react-toastify"

type NewPasswordTokenProps= {
    token:ConfirmToken['token']
    setToken: React.Dispatch<React.SetStateAction<string>>
    setIsValidToken:  React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordToken({token, setToken, setIsValidToken}: NewPasswordTokenProps) {
    const {mutate} = useMutation({
        mutationFn: validateToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data)=>{
            toast.success(data)
        }
    })

    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token)
    }
    const handleComplete = (token: ConfirmToken['token']) => {
        mutate({token})
        setIsValidToken(true)
    }

    return (
        <>
            <form className="mt-8 space-y-6 bg-white rounded-2xl p-8" noValidate>
                <label className="text-sm font-medium text-gray-700 block text-center mb-4">
                    Código de 6 dígitos
                </label>

                <div className="flex justify-center gap-4">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField
                            className="w-12 h-14 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-center text-xl"
                        />
                        <PinInputField
                            className="w-12 h-14 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-center text-xl"
                        />
                        <PinInputField
                            className="w-12 h-14 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-center text-xl"
                        />
                        <PinInputField
                            className="w-12 h-14 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-center text-xl"
                        />
                        <PinInputField
                            className="w-12 h-14 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-center text-xl"
                        />
                        <PinInputField
                            className="w-12 h-14 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-center text-xl"
                        />
                    </PinInput>
                </div>
            </form>

            <nav className="mt-8 flex flex-col space-y-3 text-center">
                <Link to="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Solicitar un nuevo código
                </Link>
            </nav>
        </>
    );

}