'use client';


import {useActionState} from "react";
import {LoginAccount} from "@/app/(account)/login/action/action";

const initialState = { errors: {}, message: '' };

function LoginForm(){
    const [loginPage, loginPageAction] = useActionState(LoginAccount, initialState)

    return (<div>
        <span className={'flex justify-center animate-error-fade font-semibold'} > {loginPage.message} </span>
        <form action={loginPageAction} className="space-y-5">
        <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                Логин{' '}
                <span className="text-red-500">*</span>
            </label>
            <input
                name='login'
                type="text"
                className="w-full bg-[#1a1b1e] border border-black/20 rounded px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
        </div>

        <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                Пароль <span className="text-red-500">*</span>
            </label>
            <input
                name='password'
                type="password"
                className="w-full bg-[#1a1b1e] border border-black/20 rounded px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
        </div>

        <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded transition-colors"
        >
            Вход
        </button>
    </form>
    </div>)
}

export default LoginForm;