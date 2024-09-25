import { HiDotsHorizontal } from "react-icons/hi";
import { format } from 'date-fns';
import { Expand } from "lucide-react";
import ProjectMenu from "./ProjectMenu";
import { useEffect, useRef, useState } from "react";

const WorkList = ({ project }) => {
  const createdDate = format(project.createdAt, 'MMMM d, yyyy');
  const updatedDate = format(project.updatedAt, 'MMMM d, yyyy');
  const [projectMenu, setProjectMenu] = useState(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setProjectMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setProjectMenu])

  const handleMenuClick = (id) => {
    setProjectMenu((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="grid grid-cols-1 bg-[#0F1012] p-2 border-b-[1px] border-[#131417] items-center cursor-pointer hover:bg-black group">
      <div className="grid grid-cols-16">
        <div className="col-span-5 border-r border-[#131417] text-[#209DF0]">{project.title}</div>
        <div className="col-span-1 flex justify-center border-r border-[#131417]"><div className="bg-[#717790] rounded-sm text-zinc-50 p-1 opacity-0 group-hover:opacity-100 transform duration-500 transition-all"><Expand size={20} /></div></div>
        <div className="col-span-3 border-r border-[#131417] text-[#9B9DAD] text-sm pl-3">{createdDate}</div>
        <div className="col-span-3 border-r text-[#9B9DAD] text-sm border-[#131417] px-3">{updatedDate}</div>
        <div className="col-span-3 border-r border-[#131417] text-[#9B9DAD] text-sm px-3">Stats</div>
        <div className="col-span-1 text-[#9B9DAD] text-2xl flex justify-center"><HiDotsHorizontal className="hover:text-zinc-200 cursor-pointer relative" onClick={() => handleMenuClick(project._id)} />
          {
            projectMenu === project._id && (<div ref={menuRef} className="absolute">
              <ProjectMenu id={project._id} />
            </div>)
          }
        </div>
      </div>
    </div>
  )
}
export default WorkList