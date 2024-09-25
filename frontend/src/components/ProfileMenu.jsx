import { Link, useNavigate } from "react-router-dom"
import { FaGear } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { useUsersignoutMutation } from "../apis/auth.Api";
import { useDispatch } from "react-redux";
import { removeCredentials } from "../features/auth/auth.slice";
import { store } from "../app/store";
import persistStore from "redux-persist/es/persistStore";
import { RiLayout4Fill } from "react-icons/ri";

const ProfileMenu = () => {
  const nav = useNavigate()
  const [signout] = useUsersignoutMutation();
  const dispatch = useDispatch();
  const handleSignout = async () => {
    try {
      const response = await signout().unwrap();

      if (response.success === true) {
        dispatch(removeCredentials())
        persistStore(store).purge();
        console.log(response.message);
        nav('/')
      }
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <div className="bg-[#252830] absolute top-14 right-2 rounded-md flex flex-col w-40 py-2 z-20">
      <div className="flex flex-col text-zinc-50 font-lato font-semibold text-[14px] gap-1">
        <Link to={'/your-work'} className="hover:bg-[#717790] p-1 px-4">Your Work</Link>
        <Link to={'/profile'} className="hover:bg-[#717790] p-1 px-4">Profile</Link>
      </div>
      <hr className="my-2 mx-4" />
      <div className="text-zinc-50 font-lato font-semibold text-[14px]">
        <Link className="hover:bg-[#717790] p-1 px-4 flex items-center gap-2" to={'/pen'}><RiLayout4Fill className="rotate-90" /> New Pen</Link>
      </div>
      <hr className="my-2 mx-4" />
      <div className="flex flex-col text-zinc-50 font-lato font-semibold text-[14px] gap-1">
        <Link className="hover:bg-[#717790] p-1 px-4 flex items-center gap-2"><FaGear /> Setting</Link>
        <Link className="hover:bg-[#717790] p-1 px-4 flex items-center gap-2" onClick={handleSignout}><MdLogout /> Log Out</Link>
      </div>
    </div>
  )
}
export default ProfileMenu