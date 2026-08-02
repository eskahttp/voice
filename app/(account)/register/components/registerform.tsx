'use client';

import {useActionState} from "react";
import {createAccount} from "@/app/(account)/register/action/action";

const initialState = { errors: {}, message: '' };

function RegisterForm(){
    const [regPage, regPageAction] = useActionState(createAccount, initialState);

    return (<div>
        <h1 className="text-white text-2xl font-bold text-center mb-6">
            Создать учётную запись
        </h1>
        <span className={"flex justify-center animate-error-fade font-semibold"} >
            {regPage.nickLogError} </span>
        <span>{regPage.message}</span>

        <form action={regPageAction} className="space-y-5">
            <div>
                <span className={'text-red-400 text-sm'} >{regPage?.errors?.email}</span>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-2">
                    E-mail <span className="text-red-500">*</span>
                </label>
                <input
                    name='email'
                    type="email"
                    className="w-full bg-[#1e1f22] text-white px-3 py-2.5 rounded border border-transparent focus:border-blue-500 focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-2">
                    Отображаемое имя
                </label>
                <input
                    name='nickname'
                    type="text"
                    className="w-full bg-[#1e1f22] text-white px-3 py-2.5 rounded border border-transparent focus:border-blue-500 focus:outline-none"
                />
            </div>

            <div>
                <span className={'text-red-400 text-sm'} >{regPage?.errors?.login}</span>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-2">
                    Логин <span className="text-red-500">*</span>
                </label>
                <input
                    name='login'
                    type="text"
                    className="w-full bg-[#1e1f22] text-white px-3 py-2.5 rounded border border-transparent focus:border-blue-500 focus:outline-none"
                />
            </div>

            <div>
                <span className={'text-red-400 text-sm'} >{regPage?.errors?.password}</span>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-2">
                    Пароль <span className="text-red-500">*</span>
                </label>
                <input
                    name='password'
                    type="password"
                    className="w-full bg-[#1e1f22] text-white px-3 py-2.5 rounded border border-transparent focus:border-blue-500 focus:outline-none"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-500/60 hover:bg-indigo-500 text-white font-medium py-2.5 rounded transition-colors"
            >
                Создать учётную запись
            </button>

        </form>
    </div>)
}

export default RegisterForm;