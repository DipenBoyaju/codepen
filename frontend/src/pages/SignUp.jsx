import { FcGoogle } from "react-icons/fc"
import { IoLogoGithub } from "react-icons/io"
import SignUpForm from "../components/SignUpForm"
import { IoMdCheckbox } from "react-icons/io";
import { AiFillStop } from "react-icons/ai";
import { useState } from "react";
import GoogleAuth from "../components/Auth/GoogleAuth";
import GithubAuth from "../components/Auth/GithubAuth";

const SignUp = () => {
  const [showSignup, setShowSignup] = useState(false)
  return (
    <div className="bg-[#1B1C24] px-4 pt-10">
      <div className="md:w-[60vw] mx-auto bg-[#5A5F73]">
        <div className="flex">
          <span className="w-full h-1 bg-green-400"></span>
          <span className="w-full h-1 bg-yellow-400"></span>
          <span className="w-full h-1 bg-purple-400"></span>
          <span className="w-full h-1 bg-cyan-400"></span>
        </div>
        <div className="text-center p-12">
          <h1 className="font-bold text-zinc-50 text-6xl">Free</h1>
          <p className="text-zinc-200 pt-4">Welcome to CodePen.</p>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-3 p-4 bg-white">
            <div className="space-y-2 pb-2">
              <GoogleAuth />
              <GithubAuth />
            </div>
            <div className="">
              <p className="text-lg">or,</p>
              <button className="p-2 bg-[#444857] rounded-sm px-4 text-zinc-50 my-3 mb-3 hover:bg-[#575c6d]" onClick={() => setShowSignup((prev) => !prev)}>Sign Up with Email</button>
              {
                showSignup ? <SignUpForm /> : ''
              }
            </div>
            <div className="">
              <p className="text-sm text-zinc-600 font-lato">By signing up, you agree to CodePen&apos;s <span className="text-[#40bcff] hover:text-[#308dc0] cursor-pointer">Terms of Service</span> , <span className="text-[#40bcff] hover:text-[#308dc0] cursor-pointer">Code of Conduct</span> , and <span className="text-[#40bcff] hover:text-[#308dc0] cursor-pointer">Privacy Policy</span>.</p>
            </div>
          </div>
          <div className="col-span-2 bg-[#444857] p-4 font-lato">
            <div className="">
              <h6 className="uppercase text-zinc-200 font-semibold pb-1">Free</h6>
              <hr />
              <p className="text-sm flex justify-between text-zinc-400 pt-2">Deploys <span>0</span></p>
              <p className="text-sm flex justify-between text-zinc-400">Custom Domains <span>0</span></p>
            </div>
            <div className="">
              <h6 className="uppercase text-zinc-200 font-semibold pb-1 pt-5">Pen & Project views</h6>
              <hr />
              <p className="text-sm flex justify-between text-zinc-400 pt-2">Editor View <span><IoMdCheckbox className="text-green-500" /></span></p>
              <p className="text-sm flex justify-between text-zinc-400">Full View<span><IoMdCheckbox className="text-green-500" /></span></p>
              <p className="text-sm flex justify-between text-zinc-400">Details View<span><IoMdCheckbox className="text-[#16C60C]" /></span></p>
              <p className="text-sm flex justify-between text-zinc-400">Shareable Debug View<span><AiFillStop className="text-[#F03A17]" /></span></p>
            </div>
            <div className="">
              <h6 className="uppercase text-zinc-200 font-semibold pb-1 pt-5">Pen Features</h6>
              <hr />
              <p className="text-sm flex justify-between text-zinc-400">Collab Mode<span><AiFillStop className="text-[#F03A17]" /></span></p>
              <p className="text-sm flex justify-between text-zinc-400">Professor Mode<span><AiFillStop className="text-[#F03A17]" /></span></p>
              <p className="text-sm flex justify-between text-zinc-400">Presentation View<span><AiFillStop className="text-[#F03A17]" /></span></p>
            </div>
            <div className="">
              <h6 className="uppercase text-zinc-200 font-semibold pb-1 pt-5">Asset Hosting</h6>
              <hr />
              <p className="text-sm flex justify-between text-zinc-400">Storage<span><AiFillStop className="text-[#F03A17]" /></span></p>
            </div>
            <div className="">
              <h6 className="uppercase text-zinc-200 font-semibold pb-1 pt-5">Need More?</h6>
              <hr />
              <p className="text-md text-center p-2 px-3 bg-[#F9E9A2] rounded-md mt-2">Unlock the full power of CodePen <span className="cursor-pointer underline text-[#40bcff]">with our PRO plans</span>.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-4 ">
        <p className="text-zinc-100
        "><span className="text-[#40bcff] cursor-pointer hover:text-zinc-50">Terms of Service</span> · <span className="text-[#40bcff] cursor-pointer hover:text-zinc-50">Privacy Policy</span> · <span className="text-[#40bcff] cursor-pointer hover:text-zinc-50">Code of Conduct</span></p>
      </div>
    </div>
  )
}
export default SignUp