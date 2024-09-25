const ResetPassword = ({ forgotPassword }) => {
  return (
    <div className={`bg-[#2C303A] p-4 font-lato rounded-md text-left pb-6 mt-4 transition-all duration-700 transform ${forgotPassword ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
      <h3 className="font-bold text-xl text-zinc-50">Reset Your Password</h3>
      <form className="space-y-5 mt-3">
        <div className="space-y-1">
          <label htmlFor="" className='font-lato text-zinc-200 '>Username or email</label>
          <input type="text" name='username' className='bg-[#D5D7DE] h-[50px] w-full rounded-sm' />
        </div>
        <button className="text-xl text-center bg-[#444857] w-full py-3 text-zinc-50">Send Password Reset Email</button>
      </form>
    </div>
  )
}
export default ResetPassword