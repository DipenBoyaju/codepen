import { FcGoogle } from "react-icons/fc"
import app from "../../firebase.js"
import { useDispatch } from 'react-redux';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { setCredentials } from "../../features/auth/auth.slice";
import { useGoogleSignMutation } from "../../apis/auth.Api.js";

const GoogleAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const nav = useNavigate()
  const [google] = useGoogleSignMutation()

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const userData = {
        username: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email
      }

      const response = await google(userData).unwrap();
      const { token, expiresAt, user } = response;

      if (response.success === true) {
        await dispatch(setCredentials({ user, token, expiresAt }));
        nav('/profile')

      } else {
        console.log('its error', response.message);

      }
    } catch (error) {
      console.log('googlesign error:', error);
    }
  }

  return (
    <div>
      <span className='bg-[#444857] font-lato text-zinc-50 flex gap-2 flex-row items-center p-1 px-5 rounded-md cursor-pointer border-[3px] border-[#444857] hover:bg-black' onClick={handleGoogleClick}><FcGoogle className='text-3xl' />Log In with Google</span>
    </div>
  )
}
export default GoogleAuth