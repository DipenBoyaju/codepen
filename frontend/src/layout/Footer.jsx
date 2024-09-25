import { Link } from "react-router-dom"
import logo from '../assets/logo.svg'

const Footer = () => {
  return (
    <div className="bg-[#010101] px-[8%] py-10 flex justify-between text-zinc-50 font-lato">
      <div className="flex flex-col gap-2">
        <div className=" flex gap-3">
          <p className="font-semibold">CodePen</p>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">About</Link>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">Blog</Link>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">Podcast</Link>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">Documentation</Link>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">Support</Link>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">Advertise</Link>
        </div>
        <div className=" flex gap-3">
          <p className="font-semibold">For</p>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">Teams</Link>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">Education</Link>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">Privacy</Link>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">Embeds</Link>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">Asset Hosting</Link>
        </div>
        <div className=" flex gap-3">
          <p className="font-semibold">Social</p>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">YouTube</Link>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">𝕏</Link>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">Documentation</Link>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">Instagram</Link>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">Mastodon</Link>
        </div>
        <div className=" flex gap-3">
          <p className="font-semibold">Community</p>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">Spark</Link>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">Challenges</Link>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">Topics</Link>
          <Link className="text-zinc-400 hover:text-white cursor-pointer">Code of Conduct</Link>
        </div>
      </div>
      <div className="">
        <img src={logo} alt="" />
        <p className="text-xs text-right text-zinc-400 pt-5">©2024 CodePen<br />
          Demo or it didn&apos;t happen.<br />
          Terms of Service · Privacy Policy</p>
      </div>
    </div>
  )
}
export default Footer