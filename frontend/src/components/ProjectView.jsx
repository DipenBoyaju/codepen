import { useGetAllProjectQuery } from "../apis/project.Api.js"
import ProjectCard from "./ProjectCard.jsx";

const ProjectView = () => {

  const { data } = useGetAllProjectQuery();

  const visibleProjects = data?.data?.filter(project => project.penVisibility === true);
  const displayedProjects = visibleProjects?.slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-10">
      <div className="space-y-2 pt-6">
        <h2 className="font-lato text-xl md:text-2xl text-white font-bold">Find inspiration from 1.8 million+ front-end designers and developers.</h2>
        <p className="font-lato text-white leading-tight text-sm">Browse and share work from world-class designers and developers in the front-end community.</p>
      </div>
      {
        displayedProjects?.map((project) => (
          <ProjectCard project={project} key={project._id} />
        ))
      }
    </div>
  )
}
export default ProjectView