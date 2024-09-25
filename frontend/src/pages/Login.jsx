import { useState } from 'react';
import logo from '../assets/logo.svg';
import { MdPlayArrow } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import ResetPassword from '../components/ResetPassword';
import { useUserloginMutation } from '../apis/auth.Api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/auth.slice';
import GoogleAuth from '../components/Auth/GoogleAuth';
import GithubAuth from '../components/Auth/GithubAuth';

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch()
  const [login] = useUserloginMutation();
  const [showInfo, setShowInfo] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
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
      const { token, expiresAt, user } = response;

      if (response.success === true) {
        await dispatch(setCredentials({ user, token, expiresAt }));
        console.log(response.message);
        setUserData({ userIdentifier: '', type: '', password: '' });
        nav('/profile')
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log('Registration error:', error);
    }
  }

  return (
    <div className="bg-[#1B1C24] pt-28">
      <div className="w-[60vw] mx-auto">
        <div className="">
          <img src={logo} alt="" className='w-40 pb-1' />
          <h2 className='text-6xl font-bold text-zinc-50'>Log In</h2>
        </div>
        <div className="grid md:grid-cols-7 gap-10">
          <div className="md:col-span-3">
            <div className="space-y-2 pt-8 pb-2">
              <GoogleAuth />
              <GithubAuth />
            </div>
            <div className={`flex gap-1 text-zinc-50 p-2 ${showInfo ? 'bg-[#2C303A]' : ''} rounded-md cursor-default`} onClick={() => setShowInfo((prev) => !prev)}>
              <p><MdPlayArrow className={`text-xl mt-1 ${showInfo ? 'rotate-90' : ''}`} /></p>
              <p>How social log in works<br />
                {
                  showInfo ?
                    <span className='text-sm text-zinc-400 font-lato pb-2 pr-1'>If the email address associated with your social account matches the email address of your CodePen account, you&apos;ll be logged in. You aren&apos;t locked to any particular social account. Questions? contact support.</span> : ''
                }
              </p>
            </div>
          </div>

          <div className={`md:col-span-1 relative transition-all duration-500`}>
            <span className={`uppercase text-lg justify-center border-[2px] ml-5 text-zinc-400 border-zinc-400 rounded-md ${forgotPassword ? 'py-[40%]' : 'py-[10%]'} text-center font-lato px-3 bg-[#1B1C24] absolute z-20 transition-all duration-500 ${forgotPassword ? 'top-[20%]' : 'top-[30%]'} transform -translate-y-1/2`}>
              or
            </span>
            <span className='w-[2px] bg-zinc-400 h-full absolute top-0 mx-auto z-10 inset-1/2'></span>
          </div>

          <div className="md:col-span-3">
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label htmlFor="" className='font-lato text-zinc-200 '>Username or email</label>
                <input type="text" name='userIdentifier' className='bg-[#D5D7DE] h-[50px] w-full rounded-sm px-2' value={userData.userIdentifier} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="" className='font-lato text-zinc-200 '>Password</label>
                <input type="password" name='password' className='bg-[#D5D7DE] h-[50px] w-full rounded-sm px-2' value={userData.password} onChange={handleChange} required />
              </div>
              <button className='bg-primary w-full text-lg p-2 rounded-sm font-lato' type='submit'>Log In</button>
            </form>
            <div className="py-6 text-center transition-all duration-500">
              <p className='text-[#40bcff] hover:text-zinc-50 cursor-pointer' onClick={() => setForgotPassword((prev) => !prev)}>Forgot password?</p>
              {
                forgotPassword ? <ResetPassword forgotPassword={forgotPassword} /> : ''
              }
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-8">
        <p className='text-zinc-50'>Need an account? <Link to={'/signup'} className='text-[#40bcff]'>Sign up now!</Link></p>
      </div>
    </div>
  )
}
export default Login