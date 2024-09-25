import { useEffect, useState } from "react";
import { IoIosExpand } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const [output, setOutput] = useState();
  const nav = useNavigate();

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
        <script type="module">${project.jsCode || ''}</script>
      </body>
    </html>
  `;
    setOutput(combinedOutput);
  }, [project.htmlCode, project.cssCode, project.jsCode, project.title]);

  return (
    <div className="p-4 relative overflow-hidden rounded-lg group">
      <div className="h-full w-full bg-[#1E1F26] absolute right-0 bottom-0 z-0 rounded-lg transform translate-x-7 translate-y-10 transition-all duration-300 group-hover:translate-y-0 group-hover:translate-x-0"></div>
      <div className="absolute top-8 right-8 z-20 bg-[#717790] text-white text-xl p-1 rounded-md scale-0 group-hover:scale-100 duration-300 transition-all shadow-2xl cursor-pointer">
        <IoIosExpand />
      </div>
      <div className="h-48 rounded-md w-full bg-zinc-900 relative z-10 overflow-hidden cursor-pointer">
        <iframe title="Result" srcDoc={output} className="h-full w-full overflow-hidden cursor-pointer" sandbox="allow-scripts" />
        <div
          className="absolute top-0 left-0 w-full h-full cursor-pointer"
          onClick={() => nav(`/pen/${project.author.username}/${project._id}`)}
          style={{ background: 'transparent' }}
        ></div>
      </div>
      <div className="flex flex-row gap-2 pt-4 relative z-10">
        <div className="w-11 h-11 rounded-md overflow-hidden">
          <img src={project.author.profilePicture} alt="" className="w-full h-full" />
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-[16px] text-zinc-50 capitalize cursor-pointer" onClick={() => nav(`/pen/${project.author.username}/${project._id}`)}>{project.title.slice(0, 22)}</p>
          <p className="text-sm text-zinc-400">{project.author.username}</p>
        </div>
      </div>
    </div>
  )
}
export default ProjectCard