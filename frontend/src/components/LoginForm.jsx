import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUserloginMutation } from "../apis/auth.Api";
import { setCredentials } from "../features/auth/auth.slice";

const LoginForm = ({ setShowLogin }) => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [login] = useUserloginMutation();

  const [userData, setUserData] = useState({
    userIdentifier: '',
    type: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmail = regex.test(userData.userIdentifier)

    userData.type = isEmail ? 'email' : 'username'


    try {
      const response = await login(userData).unwrap();

      if (response.success === true) {
        await dispatch(setCredentials(response.user));
        console.log(response.message);
        setUserData({ userIdentifier: '', type: '', password: '' });
        setShowLogin(false)
        nav('/profile')
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log('Registration error:', error);
    }
  }

  return (
    <div className="w-full h-full flex absolute top-0 left-0 z-50 bg-opacity-55 bg-black py-4 md:py-20">
      <div className="rounded-lg md:w-[40vw] mx-auto bg-white border-t-[8px] border-primary w-[74vw] px-10 py-4">
        <span className="text-2xl cursor-pointer ml-auto" onClick={() => setShowLogin(false)}><RxCross2 className="ml-auto" /></span>
        <div className="text-center space-y-3 pt-4">
          <h3 className="font-lato font-extrabold text-4xl text-[#444857]">Hold up!</h3>
          <p className="text-zinc-500 text-sm">You’ll have to Log In or Sign Up (for free!) to save your Pen. Don’t worry! All your work will be saved to your account.</p>
        </div>
        <form className="pt-20 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label htmlFor="" className="font-semibold text-sm font-lato">Username or Email</label>
            <input type="text" name='userIdentifier' className="bg-[#EAEBEE] h-[50px] rounded-md w-full px-3" value={userData.userIdentifier} onChange={handleChange} required />
          </div>
          <div className="space-y-1">
            <label htmlFor="" className="font-semibold text-sm font-lato">Password</label>
            <input type="password" name="password" className="bg-[#EAEBEE] h-[50px] rounded-md w-full px-3" value={userData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="w-full text-sm p-3 rounded-md bg-primary hover:text-white hover:bg-[#208346]">Log In</button>
        </form>
        <div className="text-center text-sm pt-10">
          <p>Need to create an account? <span className="text-[#1FA6D4] cursor-pointer" onClick={() => {
            nav('/signup')
            setShowLogin(false)
          }}>Sign Up for CodePen</span></p>
        </div>
      </div>
    </div>
  )
}
export default LoginForm