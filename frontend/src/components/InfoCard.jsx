const InfoCard = ({ item }) => {
  return (
    <div className="p-5 rounded-lg bg-[#2C303A] space-y-4 z-10">
      <div className="w-20 h-20 -mt-14 bg-[#131417] rounded-md p-3">
        <img src={item.icon} alt="" className="" />
      </div>
      <h2 className="font-bold text-2xl text-zinc-50">{item.title}</h2>
      <p className="text-md text-zinc-300">{item.description}</p>
      <button className="bg-[#444857] text-zinc-100 py-2 px-6 text-md rounded-md">Try the Editor</button>
    </div>
  )
}
export default InfoCard