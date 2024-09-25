import { AlignJustify, GripHorizontal } from 'lucide-react'
import { useGetProjectQuery, useSearchUsersProjectQuery } from "../apis/project.Api";
import { useSelector } from "react-redux";
import WorkCard from '../components/WorkCard';
import { useState } from 'react';
import WorkList from '../components/WorkList';
import { RxCross2 } from "react-icons/rx";
import ProjectNotFound from '../components/ProjectNotFound';

const YourWork = () => {
  const { currentUser } = useSelector((state) => state.user)
  const { data: projectsData, isLoading, error } = useGetProjectQuery(currentUser._id);
  const [list, setList] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults } = useSearchUsersProjectQuery(searchQuery, {
    skip: !searchTitle,
  })

  const handleChange = (e) => {
    setSearchTitle(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTitle.trim()) {
      setSearchQuery(searchTitle);
    } else {
      console.error('Title parameter is empty.');
    }
  };

  const handleClearSearch = () => {
    setSearchTitle('');
    setSearchQuery('');
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading projects</div>;

  const projectsToDisplay = searchQuery ? searchResults?.data : projectsData?.data;

  return (
    <div className="p-7">
      <div className="bg-[#1E1F26] flex justify-between items-center p-2 rounded-sm border-t-[2px] border-[#0EBEFF]">
        <div className="">
          <div className="">
            <form className='flex' onSubmit={handleSearch}>
              <input type="text" placeholder='Search for...' className='bg-[#2C303A] outline-none focus:outline-none font-lato p-1 px-2 focus:bg-[#575a63] text-zinc-50 rounded-l-sm' onChange={handleChange} value={searchTitle} name='search' />
              <div className="relative flex justify-center items-center">
                {searchTitle && (
                  <button
                    type='button'
                    onClick={handleClearSearch}
                    className='absolute right-1'
                    aria-label='Clear search'
                  >
                    <RxCross2 className='text-zinc-300' />
                  </button>
                )}
              </div>
              <button type='submit' className='bg-[#444857] px-2 text-sm text-zinc-300'>Search</button>
            </form>
          </div>
        </div>
        <div className="">
          <div className="bg-[#444857] text-4xl text-zinc-50 flex rounded-md overflow-hidden items-center">
            <span className={`p-1 px-[6px] border-r border-x-zinc-700 cursor-pointer hover:bg-[#717790] ${list ? 'transparent' : 'bg-[#717790]'}`} onClick={() => setList(false)}><GripHorizontal size={26} /></span>
            <span className={`p-1 px-[6px] cursor-pointer hover:bg-[#717790] ${list ? 'bg-[#717790]' : 'transparent'}`} onClick={() => setList(true)}><AlignJustify size={26} /></span>
          </div>
        </div>
      </div>
      <div className={`py-6 grid ${list ? 'grid-cols-1 gap-0' : 'grid-cols-3 gap-4'}`}>
        {
          list && (
            <div className="grid grid-cols-16 text-zinc-50 font-semibold font-lato p-2">
              <div className="col-span-5 pl-3">Title</div>
              <div className="col-span-1"></div>
              <div className="col-span-3 pl-3">Created</div>
              <div className="col-span-3 pl-3">Last Updated</div>
              <div className="col-span-3 pl-3">Stats</div>
              <div className="col-span-1"></div>
            </div>
          )
        }
        {projectsToDisplay?.length ? (
          projectsToDisplay.map((project) => (
            !list ? (
              <WorkCard key={project._id} project={project} username={currentUser.username} />
            ) : (
              <WorkList key={project._id} project={project} />
            )
          ))
        ) : (
          <div className="flex justify-center items-center">
            <ProjectNotFound searchQuery={searchQuery} />
          </div>
        )}
      </div>
    </div>
  )
}
export default YourWork