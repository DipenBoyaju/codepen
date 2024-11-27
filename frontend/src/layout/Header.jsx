import { useLocation, useNavigate } from "react-router-dom"
import EditName from "../components/EditName";
import { FaCloud } from "react-icons/fa";
import { PiGearFill } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import LayoutOption from "../components/LayoutOption";
import { RiLayout2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import ProfileMenu from "../components/ProfileMenu";
import { useAddProjectMutation, useUpdateProjectMutation } from "../apis/project.Api";
import PenSetting from "../components/PenSetting";
import { setLayoutIndex, setProjectId, setTitle } from '../features/codeeditor/codeEditorSlice'
import SaveMessage from "../components/SaveMessage";
import LoginForm from "../components/LoginForm";
import { ImCross } from "react-icons/im";
// import { useUploadImageMutation } from "../apis/imageUpload.Api";

const Header = () => {
  const nav = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null)
  const [layoutOption, setLayoutOption] = useState(false);
  const [selectedIconIndex, setSelectedIconIndex] = useState(1);
  const [profileMenu, setProfileMenu] = useState(false);
  const [saveProject] = useAddProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  // const [uploadImage] = useUploadImageMutation();
  const [penSetting, setPenSetting] = useState(false)
  const dispatch = useDispatch()
  const [showMessage, setShowMessage] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [searchTitle, setSearchTitle] = useState('');
  const { currentUser } = useSelector((state) => state.user)
  const { htmlCode, cssCode, jsCode, title, projectId, image, penDetails, penTags, penVisibility, penAutoSave } = useSelector((state) => state.codeEditor);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false)
      }, 1000);

      return () => clearTimeout(timer)
    }
  })

  const handleIconChange = (index) => {
    setSelectedIconIndex(index);
    dispatch(setLayoutIndex(index))
  };

  const isPen = location.pathname.includes('/pen');

  const handleSaveProject = async () => {
    // await dispatch(setCaptureScreenshot(true))
    try {
      if (currentUser) {
        const projectData = {
          title,
          htmlCode,
          cssCode,
          jsCode,
          author: currentUser._id,
          penDetails,
          penTags,
          penVisibility,
          image
        }
        let response;

        if (projectId) {
          // await uploadImage({ id: projectId, imageBase64: image }).unwrap();

          response = await updateProject({ id: projectId, ...projectData }).unwrap();

          if (response.success === true) {
            console.log('project updated');
            // dispatch(setProjectId(response?.data?._id));
            setShowMessage(true)
          }

          if (response.success === false) {
            console.log(response.message);

          }
        } else {
          // const id = new Date().getTime().toString();
          // await uploadImage({ id, imageBase64: image }).unwrap();

          response = await saveProject(projectData).unwrap();
          if (response.success && response?.data?._id) {
            dispatch(setProjectId(response?.data?._id));
            nav(`/${currentUser.username}/pen/${response?.data?._id}`);
            setShowMessage(true)
          }


          if (response.success === true) {
            console.log('project added');
          }
        }
      } else {
        setShowLogin(true)
      }

    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   let autoSaveInterval;

  //   if (penAutoSave) {
  //     autoSaveInterval = setInterval(async () => {
  //       try {
  //         await handleSaveProject();
  //         console.log('Auto-saving project...');
  //       } catch (error) {
  //         console.error('Auto-save failed:', error);
  //       }
  //     }, 5000);
  //   }
  //   return () => {
  //     if (autoSaveInterval) {
  //       clearInterval(autoSaveInterval);
  //       console.log('Auto-save stopped');
  //     }
  //   };
  // }, [penAutoSave, htmlCode, cssCode, jsCode, title, penDetails, penTags, penVisibility]);

  useEffect(() => {
    let autoSaveTimeout;

    if (penAutoSave) {
      autoSaveTimeout = setTimeout(async () => {
        await handleSaveProject();
        console.log('Auto-saving project...');
      }, 5000);
    }

    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
    };
  }, [penAutoSave, htmlCode, cssCode, jsCode, title, penDetails, penTags, penVisibility]);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setProfileMenu])

  const handleClearSearch = () => {
    setSearchTitle('');
  }

  return (
    <div className="bg-black p-2 py-2 flex justify-between border-b-[1px] border-[#2b2d33] z-10">
      {showMessage && <SaveMessage />}
      {showLogin && <LoginForm setShowLogin={setShowLogin} />}
      <div className="">
        {
          isPen && (
            <div className="flex flex-row items-center gap-2">
              <div className="cursor-pointer" onClick={() => nav('/')}>
                <svg viewBox="0 0 100 100" className="fill-white block w-10" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M100 34.2c-.4-2.6-3.3-4-5.3-5.3-3.6-2.4-7.1-4.7-10.7-7.1-8.5-5.7-17.1-11.4-25.6-17.1-2-1.3-4-2.7-6-4-1.4-1-3.3-1-4.8 0-5.7 3.8-11.5 7.7-17.2 11.5L5.2 29C3 30.4.1 31.8 0 34.8c-.1 3.3 0 6.7 0 10v16c0 2.9-.6 6.3 2.1 8.1 6.4 4.4 12.9 8.6 19.4 12.9 8 5.3 16 10.7 24 16 2.2 1.5 4.4 3.1 7.1 1.3 2.3-1.5 4.5-3 6.8-4.5 8.9-5.9 17.8-11.9 26.7-17.8l9.9-6.6c.6-.4 1.3-.8 1.9-1.3 1.4-1 2-2.4 2-4.1V37.3c.1-1.1.2-2.1.1-3.1 0-.1 0 .2 0 0zM54.3 12.3 88 34.8 73 44.9 54.3 32.4zm-8.6 0v20L27.1 44.8 12 34.8zM8.6 42.8 19.3 50 8.6 57.2zm37.1 44.9L12 65.2l15-10.1 18.6 12.5v20.1zM50 60.2 34.8 50 50 39.8 65.2 50zm4.3 27.5v-20l18.6-12.5 15 10.1zm37.1-30.5L80.7 50l10.8-7.2z"></path></svg>
              </div>
              <div className="text-white">
                <EditName title={title} projectId={projectId} setTitle={setTitle} />
                <p className="text-zinc-400 text-sm">{currentUser ? currentUser.fullname : 'Captain Anonymous'} </p>
              </div>
            </div>
          )
        }
        {
          !isPen && (
            <div className="">
              <form className='flex items-center'>
                <input type="text" className="bg-[#252830] text-zinc-300 p-2 px-3 font-semibold text-lg font-lato" placeholder="Search CodePen..." onChange={(e) => setSearchTitle(e.target.value)} value={searchTitle} name='search' />
                <div className="relative flex justify-center items-center">
                  {searchTitle && (
                    <button
                      type='button'
                      onClick={handleClearSearch}
                      className='absolute right-2'
                      aria-label='Clear search'
                    >
                      <ImCross className='text-zinc-300' />
                    </button>
                  )}
                </div>
              </form>
            </div>

          )
        }
      </div>
      <div className="flex items-center gap-2">
        {
          isPen && (
            <>
              <button className="bg-[#444857] hover:bg-[#6a6f81] text-zinc-50 p-[10px] px-5 rounded-sm flex items-center gap-1" onClick={handleSaveProject}><FaCloud /> Save</button>
              <button className="bg-[#444857] hover:bg-[#6a6f81] text-zinc-50 p-[10px] px-5 rounded-sm flex items-center gap-1" onClick={() => setPenSetting((prev) => !prev)}><PiGearFill /> Settings</button>
              {
                penSetting ? <PenSetting setPenSetting={setPenSetting} /> : ''
              }

              <button onClick={() => setLayoutOption((prev) => !prev)} className="bg-[#444857] hover:bg-[#6a6f81] text-zinc-50 p-[10px] px-5 rounded-sm flex items-center text-2xl gap-1 active:top-[10px]"><RiLayout2Fill className={`${selectedIconIndex === 0 ? '-rotate-180' : selectedIconIndex === 2 ? '-rotate-0' : '-rotate-90'} transform transition-all duration-300`} /></button>
              {
                layoutOption ? <LayoutOption selectedIconIndex={selectedIconIndex} onIconChange={handleIconChange} setLayoutOption={setLayoutOption} /> : ''
              }
            </>
          )
        }

        {
          !currentUser ? (
            <>
              {location.pathname !== "/signup" && (
                <button
                  onClick={() => nav('/signup')}
                  className="bg-primary p-[10px] px-5 rounded-sm text-black hover:text-white hover:bg-[#2c8b51]"
                >
                  Sign Up
                </button>
              )}
              {location.pathname !== '/login' && (
                <button
                  onClick={() => nav('/login')}
                  className="bg-[#444857] hover:bg-[#6a6f81] text-zinc-50 p-[10px] px-5 rounded-sm">
                  Log In
                </button>
              )}
            </>
          ) : (
            <>
              <span className="h-10 w-10 overflow-hidden rounded-md" onClick={() => setProfileMenu((prev) => !prev)} onBlur={() => setProfileMenu(false)}>
                <img src={currentUser.profilePicture} className="w-full h-full cursor-pointer" alt="" />
                {
                  profileMenu ? <div className="" ref={profileRef}>
                    <ProfileMenu />
                  </div> : ''
                }
              </span>
            </>
          )
        }
      </div>
    </div>
  )
}
export default Header