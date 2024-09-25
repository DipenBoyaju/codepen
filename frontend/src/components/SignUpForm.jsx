import { useState } from "react"
import { useUserSignupMutation } from "../apis/auth.Api"
import { useNavigate } from "react-router-dom";


const SignUpForm = () => {
  const nav = useNavigate();
  const [signup] = useUserSignupMutation();
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signup(formData).unwrap();
      if (response.success === true) {
        console.log(response.message);
        setFormData({ username: '', email: '', password: '' });
        nav('/login')
      }
    } catch (error) {
      console.log('Registration error:', error);
    }
  }

  return (
    <div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="">
          <label className="text-sm text-zinc-700">Your Name</label>
          <input type="text" className="w-full bg-[#D5D7DE] h-[50px] mt-1 rounded-sm px-2" name="fullname" value={formData.fullname} onChange={handleChange} required />
        </div>
        <div className="">
          <label className="text-sm text-zinc-700">Choose a username</label>
          <input type="text" className="w-full bg-[#D5D7DE] h-[50px] mt-1 rounded-sm px-2" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="">
          <label className="text-sm text-zinc-700">Email</label>
          <input type="email" className="w-full bg-[#D5D7DE] h-[50px] mt-1 rounded-sm px-2" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="">
          <label className="text-sm text-zinc-700">Choose Password</label>
          <input type="password" className="w-full bg-[#D5D7DE] h-[50px] mt-1 rounded-sm px-2" name="password" value={formData.password} onChange={handleChange} required />
          <div className="">
            {/* <p className="text-sm">Your password must:<br />
              <ul className="text-zinc-600 list-disc">
                <li>Include an UPPER and lowercase letter</li>
                <li>Include a number</li>
                <li><span>{`Include one or more of these special characters: .@$!%*#?&><)(^-_`}</span></li>
                <li>Be between 8 and 100 characters</li>
              </ul>
            </p> */}
            <button className="text-2xl font-semibold bg-primary rounded-sm text-zinc-50 py-3 px-7 my-4" type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default SignUpForm

// Your Name
// Choose a username
//  codepen.io/username
// Email
// Choose Password