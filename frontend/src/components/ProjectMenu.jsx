import { PiTrashSimpleFill } from "react-icons/pi";
import { useDeleteProjectMutation, useUpdateSettingMutation } from "../apis/project.Api";
import { MdLock } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPenVisibility } from "../features/codeeditor/codeEditorSlice";

const ProjectMenu = ({ id, setProjectMenu, penVisibility }) => {
  const [deleteProject] = useDeleteProjectMutation()
  const [visibilityStatus] = useUpdateSettingMutation()
  const [visibility, setVisibility] = useState(penVisibility)
  const dispatch = useDispatch();

  const handleVisibilityStatus = async (e) => {
    e.preventDefault()

    const newVisibility = !visibility
    dispatch(setPenVisibility(newVisibility))
    try {

      const response = await visibilityStatus({ id, data: { penVisibility: newVisibility } }).unwrap()


      if (response.success === true) {
        setVisibility(newVisibility)
        setProjectMenu(false)
      }
    } catch (error) {
      console.log(error);
      setProjectMenu(false)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const response = await deleteProject(id).unwrap()
      if (response.success === true) {
        console.log(response.message);
        setProjectMenu(false)
      }
    } catch (error) {
      console.log(error);
      setProjectMenu(false)
    }
  }

  return (
    <div className="bg-[#1E1F26] shadow-sm shadow-zinc-950 rounded-md absolute z-30 right-0 bottom-0 overflow-hidden font-lato w-36">
      <span className="p-3 px-4 hover:bg-[#717790] flex items-center gap-2 text-zinc-200 text-sm cursor-pointer" onClick={handleVisibilityStatus}>
        {
          visibility ? (
            <>
              <MdLock className="text-lg" />Make Private
            </>
          ) : (
            <>
              <FaEye className="text-lg" />Make Public
            </>
          )
        }
      </span>
      <span className="p-2 px-4 hover:bg-red-500 flex items-center gap-2 text-zinc-200 text-sm cursor-pointer" onClick={handleDelete}><PiTrashSimpleFill className="text-lg" />Delete</span>
    </div>
  )
}
export default ProjectMenu