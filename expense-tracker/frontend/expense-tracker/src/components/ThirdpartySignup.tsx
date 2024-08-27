import React from 'react'
import googleIcon from "../assets/google-icon.svg";
import { BASE_URL } from '../utils/constant';

type Props = {
  method: "login" | "signup";
}

const ThirdpartySignup = ({method}: Props) => {
  return (
    <>
      <div className="relative mt-8">
        <hr className="my-4" />
        <p className="absolute text-slate-500 text-sm bg-white bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 px-3">
          Or {method} with
        </p>
      </div>

      <div className="flex justify-center mb-5">
        <a className="w-full flex gap-2 items-center justify-center p-2 rounded-lg border border-slate-200 hover:shadow" href={`${BASE_URL}/api/auth/google`}>
          <img className="w-6" src={googleIcon} alt="Google Icon" />
          <span className="text-slate-700 font-semibold text-sm">Signup with Google</span>
        </a>
      </div>
    </>
  )
}

export default ThirdpartySignup