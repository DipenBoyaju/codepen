import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setTitle, setPenDetails, setPenVisibility, setPenTags, setPenAutoSave } from "../features/codeeditor/codeEditorSlice";
import { useUpdateSettingMutation } from "../apis/project.Api";

const PenSetting = ({ setPenSetting, projectId, projectData }) => {
  const [activeTab, setActiveTab] = useState('details');
  const settingRef = useRef(null)
  const dispatch = useDispatch()
  const { title, penVisibility, penAutoSave } = useSelector((state) => state.codeEditor)
  const { currentUser } = useSelector((state) => state.user)
  const [penDetail, setPenDetail] = useState({
    titles: title,
    description: '',
    tags: '',
  })
  const [updateSetting] = useUpdateSettingMutation();

  useEffect(() => {
    if (projectId) {
      const settingData = projectData?.data

      if (settingData) {
        dispatch(setPenDetails(settingData.penDetails || ''))
        dispatch(setPenTags(settingData.penTags || ''))
        dispatch(setTitle(settingData.title || ''))
        dispatch(setPenVisibility(settingData.penVisibility || ''))
      }
      else {
        dispatch(setPenDetails(''))
        dispatch(setPenTags(''))
        dispatch(setTitle(''))
        dispatch(setPenAutoSave(''))
        dispatch(setPenVisibility(''))
      }
    }
  }, [projectData, dispatch, projectId])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPenDetail((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    dispatch(setTitle(penDetail.titles))
  }, [penDetail.titles, dispatch])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingRef.current && !settingRef.current.contains(e.target)) {
        setPenSetting(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setPenSetting])

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const penData = {
        title: penDetail.titles,
        penDetails: penDetail.description,
        penTags: penDetail.tags,
        penVisibility: penVisibility,
      }
      dispatch(setPenDetails(penDetail.description))
      dispatch(setTitle(penDetail.titles))
      dispatch(setPenTags(penDetail.tags))
      dispatch(setPenVisibility(penVisibility))
      dispatch(setPenAutoSave(penAutoSave))

      try {
        const response = await updateSetting({ id: projectId, data: penData })

        if (response.success === true) {
          console.log(response.message);
        }
      } catch (error) {
        console.log(error);
      }
      setPenSetting(false)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full h-full flex absolute top-0 left-0 z-50 bg-opacity-55 bg-black py-4 md:py-20">
      <div ref={settingRef} className="rounded-md md:w-[50vw] mx-auto bg-[#131417]  border-[4px] border-[#252830]  w-[94vw] grid grid-rows-12">
        <div className="p-5 row-span-2 w-full">
          <div className="flex justify-between border-b items-center w-full">
            <h3 className="font-bold font-lato text-lg border-b-[3px] pb-2 border-[#47CF73] text-white">Pen Settings</h3>
            <span className="bg-[#444857] p-1 hover:bg-[#5c606e] cursor-pointer" onClick={() => setPenSetting((prev) => !prev)}>
              <RxCross2 className="text-sm text-white" />
            </span>
          </div>
        </div>
        <div className="row-span-8 w-full overflow-y-scroll">
          <div className="grid md:grid-cols-7 grid-cols-1 gap-4">
            <div className="col-span-2 flex md:flex-col">
              <p className={`hover:bg-[#2C303A] text-sm md:text-lg p-1 md:px-3 md:border-l-[3px]   cursor-pointer ${activeTab === 'details' ? 'md:border-primary bg-[#2C303A] ' : 'border-transparent'} text-white`} onClick={() => handleTabClick('details')}>Pen Details</p>
              <p className={`hover:bg-[#2C303A] text-sm md:text-lg p-1 md:px-3 md:border-l-[3px]   cursor-pointer ${activeTab === 'behavior' ? 'md:border-primary bg-[#2C303A] ' : 'border-transparent'} text-white`} onClick={() => handleTabClick('behavior')}>Behavior</p>
              <p className={`hover:bg-[#2C303A] text-sm md:text-lg p-1 md:px-3 md:border-l-[3px]   cursor-pointer ${activeTab === 'privacy' ? 'md:border-primary bg-[#2C303A] ' : 'border-transparent'} text-white`} onClick={() => handleTabClick('privacy')}>Privacy</p>
            </div>
            <div className="col-span-5">
              {
                activeTab === 'details' &&
                <div className="font-lato space-y-4">
                  <div className="flex flex-col border-l-[3px] border-[#444857] p-4 bg-gradient-to-tr from-[#252830] to-transparent] space-y-1">
                    <label className="font-bold text-[16px] text-white">Pen Title</label>
                    <input type="text" className="h-[40px] rounded-sm bg-[#E3E4E8] text-black p-3 text-sm font-light" placeholder="Untitled" value={penDetail.titles} onChange={handleChange} name="titles" />
                  </div>
                  <div className="flex flex-col border-l-[3px] border-[#444857] p-4 bg-gradient-to-tr from-[#252830] to-transparent] space-y-1">
                    <label className="font-bold text-[16px] text-white">Pen Description</label>
                    <textarea type="text" className="h-[100px] rounded-sm bg-[#E3E4E8] text-black p-3 text-sm font-light  leading-snug" placeholder="Explain what’s going on in your Pen here. This text is searchable, so it can also help others find your work. Remember to credit others where credit is due. Markdown supported." value={penDetail.description} onChange={handleChange} name="description" />
                  </div>
                  <div className="flex flex-col border-l-[3px] border-[#444857] p-4 bg-gradient-to-tr from-[#252830] to-transparent] space-y-1">
                    <div className="flex justify-between">
                      <label className="font-bold text-[16px] text-white">Pen Tags</label>
                      <p className="text-[12px] font-lato text-white">comma separated, max of five</p>
                    </div>
                    <input type="text" className="h-[40px] rounded-sm bg-[#E3E4E8] text-black p-3 text-sm font-light  leading-snug" value={penDetail.tags} onChange={handleChange} name="tags" />
                  </div>
                </div>
              }

              {
                activeTab === 'behavior' &&
                <div className="font-lato space-y-4">
                  <div className="flex flex-col border-l-[3px] border-[#444857] p-4 bg-gradient-to-tr from-[#252830] to-transparent] space-y-1">
                    <label className="font-bold text-[16px] text-white">Auto Save</label>
                    <p className="text-zinc-300 text-sm font-light">If active, Pens will autosave every 30 seconds after being saved once.</p>
                    <div className="py-2 flex gap-2 items-center">
                      <div className={`${penAutoSave ? 'bg-primary' : 'bg-[#9B9DAD]'} w-10 h-5 rounded-full cursor-pointer`} onClick={() => dispatch(setPenAutoSave(!penAutoSave))}>
                        <div className={`h-6 w-6 bg-white rounded-full -mt-[2px] ${penAutoSave ? 'translate-x-4' : 'translate-x-0'} transform transition-all duration-300`}></div>
                      </div>
                      <p className="font-lato text-white">{penVisibility ? 'On' : 'Off'}</p>
                    </div>
                  </div>
                </div>
              }

              {
                activeTab === 'privacy' &&
                <div className="font-lato space-y-4">
                  <div className="flex flex-col border-l-[3px] border-[#444857] p-4 bg-gradient-to-tr from-[#252830] to-transparent] space-y-1">
                    <label className="font-bold text-[16px] text-white">Keep it secret; keep it safe.</label>
                    <p className="text-zinc-300 text-sm font-light">Private Pens are hidden everywhere on CodePen, except to you. You can still share them and other people can see them, they just can&apos;t find them through searching or browsing.</p>
                    <div className="py-2 flex gap-2 items-center">
                      <div className={`${penAutoSave ? 'bg-primary' : 'bg-[#9B9DAD]'} w-10 h-5 rounded-full cursor-pointer`} onClick={() => dispatch(setPenAutoSave(!penAutoSave))}>
                        <div className={`h-6 w-6 bg-white rounded-full -mt-[2px] ${penAutoSave ? 'translate-x-4' : 'translate-x-0'} transform transition-all duration-300`}></div>
                      </div>
                      <p className="font-lato text-white">{penAutoSave ? 'Private' : 'Public'}</p>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="bg-[#252830] p-3 py-4 row-span-2 flex">
          <button className="bg-primary font-lato text-black p-3 px-5 rounded-sm ml-auto text-sm" onClick={currentUser ? handleSave : () => setPenSetting(false)}>{currentUser ? 'Save & Close' : 'Close'}</button>
        </div>
      </div>
    </div>
  )
}
export default PenSetting