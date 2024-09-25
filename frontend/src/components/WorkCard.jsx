import { useEffect, useRef, useState } from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { IoIosExpand } from "react-icons/io";
import ProjectMenu from "./ProjectMenu";

const WorkCard = ({ project, username }) => {
  const [output, setOutput] = useState();
  const [projectMenu, setProjectMenu] = useState(false)
  const nav = useNavigate();
  const menuRef = useRef(null)

  useEffect(() => {
    const combinedOutput = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${project.title || 'Document'}</title>
        <style>
          body {
            margin: 0;
            overflow: hidden;
            padding: 0;
            user-select: none; 
            pointer-events: none;
            height: 100vh;
            width: 100vw;
            font-size: 16px;
          }
          ${project.cssCode || ''}
        </style>
      </head>
      <body>
        ${project.htmlCode || ''}
        <script>${project.jsCode || ''}</script>
      </body>
    </html>
  `;
    setOutput(combinedOutput);
  }, [project.htmlCode, project.cssCode, project.jsCode, project.title]);

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

  return (
    <div className="p-4 relative overflow-hidden rounded-lg group">
      <div className="h-full w-full bg-[#1E1F26] absolute right-0 bottom-0 z-0 rounded-lg transform translate-x-4 translate-y-10 transition-all duration-300 group-hover:translate-y-0 group-hover:translate-x-0"></div>
      <div className="absolute top-8 right-8 z-20 bg-[#717790] text-white text-xl p-1 rounded-md scale-0 group-hover:scale-100 duration-300 transition-all shadow-2xl cursor-pointer">
        <IoIosExpand />
      </div>
      <div className="h-48 rounded-md w-full bg-zinc-900 relative z-10 overflow-hidden cursor-pointer">
        <iframe title="Result" srcDoc={output} className="h-full w-full overflow-hidden cursor-pointer" sandbox="allow-scripts" />
        <div
          className="absolute top-0 left-0 w-full h-full cursor-pointer"
          onClick={() => nav(`/${username}/pen/${project._id}`)}
          style={{ background: 'transparent' }}
        ></div>
      </div>
      <div className="flex items-center justify-between pt-4 relative z-10 px-3">
        <p className="font-bold text-[16px] text-zinc-50 capitalize cursor-pointer" onClick={() => nav(`/${username}/pen/${project._id}`)}>{project.title.slice(0, 32)}</p>
        <PiDotsThreeOutlineFill className="text-[#5A5F73] text-3xl group-hover:text-zinc-400 cursor-pointer" onClick={() => setProjectMenu((prev) => !prev)} />
        {
          projectMenu ?
            <div ref={menuRef} className="absolute bottom-9 right-0">
              <ProjectMenu id={project._id} penVisibility={project.penVisibility} setProjectMenu={setProjectMenu} />
            </div> : ''
        }
      </div>
    </div>
  )
}
export default WorkCard