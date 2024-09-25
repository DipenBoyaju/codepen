import { FaRegCircleCheck } from "react-icons/fa6";

const SaveMessage = () => {
  return (
    <div className="absolute w-1/2 h-auto">
      <span></span>
      <div className="flex justify-end mx-auto">
        <p className="font-lato flex items-center gap-1 p-2 px-4 text-sm bg-primary rounded-md transition-all duration-300"><FaRegCircleCheck className="" />Saved</p>
      </div>
    </div>
  )
}
export default SaveMessage