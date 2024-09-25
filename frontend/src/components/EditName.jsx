import { useEffect, useState } from "react"
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { resetTitle } from "../features/codeeditor/codeEditorSlice";

const EditName = ({ title, projectId, setTitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState("");
  const dispatch = useDispatch()

  useEffect(() => {
    if (!projectId) {
      return () => {
        dispatch(resetTitle());
      };
    }
  }, [dispatch]);


  const handleEdit = () => {
    setIsEditing(true);
    setTempName(title);
  }

  const handleChange = (e) => {
    setTempName(e.target.value)
  }

  const handleSave = () => {
    if (tempName.trim() !== "") {
      // setName(tempName);
      dispatch(setTitle(tempName))
    }
    setIsEditing(false);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  }

  return (
    <div className="flex items-center gap-2">
      {
        isEditing ? (
          <input type="text" autoFocus className="bg-transparent focus:outline-none font-bold font-lato text-xl" onChange={handleChange} value={tempName} onKeyDown={handleKeyDown} onBlur={handleSave} />
        ) : <span className="text-xl font-bold font-lato">{title}</span>
      }
      {
        !isEditing ? <MdModeEditOutline className="cursor-pointer text-xl" onClick={handleEdit} /> : ''
      }
    </div>
  )
}
export default EditName