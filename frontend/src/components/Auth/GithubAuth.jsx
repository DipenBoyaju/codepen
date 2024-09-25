import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { IoLogoGithub } from "react-icons/io"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGithubSignMutation } from "../../apis/auth.Api";
import { setCredentials } from "../../features/auth/auth.slice";
import app from "../../firebase";

const GithubAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const nav = useNavigate()
  const [github] = useGithubSignMutation()

  const handleGithubClick = async () => {
    const provider = new GithubAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })

    try {
      const resultsFromGithub = await signInWithPopup(auth, provider);
      console.log(resultsFromGithub);

      const userData = {
        username: resultsFromGithub.user.displayName || resultsFromGithub.user.email.split('@')[0],
        email: resultsFromGithub.user.email
      }

      const response = await github(userData).unwrap();
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
      <span className='bg-[#444857] font-lato text-zinc-50 flex gap-2 flex-row items-center p-1 px-5 rounded-md cursor-pointer border-[3px] border-[#444857] hover:bg-black' onClick={handleGithubClick}><IoLogoGithub className='text-3xl' />Log In with GitHub</span>
    </div>
  )
}
export default GithubAuth