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
            <form
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >Code of 6 digits</label>
                <div className="flex justify-center gap-5">
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
                    to='/auth/forgot-password'
                    className="text-center text-gray-300 font-normal"
                >
                    Request a new token
                </Link>
            </nav>
        </>
    )
}