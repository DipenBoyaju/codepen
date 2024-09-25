const ProjectNotFound = ({ searchQuery }) => {
  return (
    <div className="p-8 outline-dashed rounded-md outline-[1px] outline-zinc-500  text-center space-y-4 font-lato">
      <h2 className="font-bold text-2xl text-zinc-50">No results for ${searchQuery}.</h2>
      <p className="text-zinc-300">If you give people nothingness, they can ponder what can be achieved from that nothingness.</p>
      <p className="text-zinc-300">— Tadao Ando</p>
    </div>
  )
}
export default ProjectNotFound