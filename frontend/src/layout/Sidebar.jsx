import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { RiMenuUnfold2Line } from "react-icons/ri";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RiLayout4Fill } from "react-icons/ri";

const Sidebar = ({ toggle }) => {
  const [viewtoggle, setViewToggle] = useState(true);
  const nav = useNavigate();
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    toggle(viewtoggle);
  }, [viewtoggle, toggle]);
  return (
    <aside className="w-[14vw] p-4 bg-secondary h-[100%] shadow-zinc-900 shadow-lg group fixed z-50">
      <img src={logo} alt="" className='cursor-pointer' onClick={() => nav('/')} />
      <div className={`absolute top-5 right-0 text-white bg-zinc-600 rounded-r-md p-2 -mr-8 z-20 -translate-x-9 opacity-0 group-hover:opacity-100 group-hover:-translate-x-0 transform duration-500 cursor-pointer`} onClick={() => setViewToggle((prev) => !prev)}>
        <RiMenuUnfold2Line />
      </div>
      <p className='uppercase font-archivo text-[10px] pt-5 pb-2 text-zinc-400'>{currentUser ? 'Create' : 'Try our online editor'}</p>
      {
        currentUser ? (
          <>
            <div className="bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-500 text-zinc-50 pt-1">
              <Link to={'/pen'} className='flex gap-2 p-2  items-center text-lg font-lato bg-[#2C303A]'><RiLayout4Fill className='text-[#717790] text-2xl rotate-90' /> Pen</Link>
            </div>
            <div className="mt-5">
              <Link to={'/your-work'} className='text-zinc-50 font-lato text-lg'>Your Work</Link>
            </div>
          </>
        ) : (
          <>
            <button className="relative  text-white w-full p-[2px] rounded-lg mb-4 text-lg">
              <div className="bg-gradient-to-r from-green-400 via-pink-500 to-blue-500 p-[3px] rounded-lg">
                <div className="bg-black text-center text-white w-full p-3 rounded-lg" onClick={() => nav('/pen')}>
                  Start Coding
                </div>
              </div>
            </button>
            <div className="">
              <Link to={'/search'} className='text-zinc-50 font-lato text-lg'>Search Pens</Link>
            </div>
          </>
        )
      }
    </aside>
  )
}
export default Sidebar