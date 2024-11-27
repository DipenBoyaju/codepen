import { useSelector } from 'react-redux'
import profilebg from '../assets/profilebg.svg'
import WorkCard from '../components/WorkCard'
import { useGetProjectQuery } from '../apis/project.Api'
import { useState } from 'react'

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)
  const { data } = useGetProjectQuery(currentUser._id);
  const [activeTab, setActiveTab] = useState('showcase');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className=" pb-8">
      <div className="mt-3 bg-red-200 flex items-center justify-center bg-no-repeat bg-cover flex-col" style={{ backgroundImage: `url(${profilebg})` }}>
        <div className="text-center space-y-1 pt-28 pb-20">
          <h2 className='font-extrabold text-4xl text-zinc-50 capitalize'>{currentUser.fullname}</h2>
          <p className='text-zinc-400 font-lato text-[16px]'>@{currentUser.username}</p>
        </div>
        <div className="bg-black w-full h-14 relative z-10">
          <div className="mx-auto flex justify-center">
            <div className="w-[7.5rem] h-[7.5rem] border-[5px] border-[#2C303A] absolute bottom-0 overflow-hidden">
              <img src={currentUser.profilePicture} alt="" className='h-full w-full' />
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="py-5 px-3">
          <span className='font-bold text-lg text-zinc-50 font-lato'>Pen</span>
          <div className="flex bg-[#2C303A] border-t-[5px] border-[#5A5F73] p-3 rounded-sm gap-3 items-center mt-1 font-lato">
            <p className={`${activeTab === 'showcase' ? 'text-white font-semibold' : 'text-zinc-500'} cursor-pointer hover:text-white`} onClick={() => handleTabClick('showcase')}>Showcase</p>
            <p className={`${activeTab === 'public' ? 'text-white font-semibold' : 'text-zinc-500'} cursor-pointer hover:text-white`} onClick={() => handleTabClick('public')}>Public</p>
            <p className={`${activeTab === 'private' ? 'text-white font-semibold' : 'text-zinc-500'} cursor-pointer hover:text-white`} onClick={() => handleTabClick('private')}>Private</p>
          </div>
        </div>
        {
          data?.data?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {

                <>
                  {
                    activeTab === 'showcase' && (
                      data?.data?.map((project) => (
                        <WorkCard key={project._id} project={project} username={currentUser.username} />
                      ))
                    )
                  }

                  {
                    activeTab === 'public' && (
                      data?.data?.filter(project => project.penVisibility === true).length ? (
                        <>
                          {data.data
                            .filter(project => project.penVisibility === true)
                            .map((project) => (
                              <WorkCard key={project._id} project={project} username={currentUser.username} />
                            ))}
                        </>
                      ) : (
                        <div className="text-center flex w-full px-3">
                          <p className='text-zinc-200 bg-[#2C303A] rounded-md outline-zinc-500 py-4 px-14 font-lato w-full'>No Projects Found</p>
                        </div>
                      )
                    )
                  }

                  {
                    activeTab === 'private' && (
                      data?.data?.filter(project => project.penVisibility === false).length ? (
                        <>
                          {data.data
                            .filter(project => project.penVisibility === false)
                            .map((project) => (
                              <WorkCard key={project._id} project={project} username={currentUser.username} />
                            ))}
                        </>
                      ) : (
                        <div className="text-center flex w-full px-3">
                          <p className='text-zinc-200 bg-[#2C303A] rounded-md outline-zinc-500 py-4 px-14 font-lato w-full'>No Projects Found</p>
                        </div>
                      )
                    )
                  }
                </>
              }
            </div>
          ) : (
            <div className="text-center flex w-full px-3">
              <p className='text-zinc-200 bg-[#2C303A] rounded-md outline-zinc-500 py-4 px-14 font-lato w-full'>No Projects Found</p>
            </div>
          )
        }
      </div>
    </div >
  )
}
export default Profile