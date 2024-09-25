import { useEffect, useRef } from "react";
import { RiLayout2Fill } from "react-icons/ri";

const LayoutOption = ({ selectedIconIndex, onIconChange, setLayoutOption }) => {

  const layoutRef = useRef(null)
  const icons = [
    RiLayout2Fill,
    RiLayout2Fill,
    RiLayout2Fill,
  ];

  const handleSelect = (index) => {
    onIconChange(index)
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (layoutRef.current && !layoutRef.current.contains(e.target)) {
        setLayoutOption(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setLayoutOption])

  return (
    <div ref={layoutRef} className="absolute top-14 w-auto bg-[#1E1F24] border-[4px] rounded-md transform transition-all duration-500 border-black -mb-6 p-3 py-4 space-y-3 z-50">
      <p className="font-lato font-semibold text-lg text-white">Change View</p>
      <div className="flex justify-between text-xl items-center text-center border-[2px] border-zinc-400 rounded-md text-white overflow-hidden">
        {icons.map((Icon, index) => (
          <div
            key={index}
            className={`p-2 px-8 cursor-pointer ${selectedIconIndex === index ? "bg-zinc-500" : "bg-transparent"
              }`}
            onClick={() => handleSelect(index)}
          >
            <Icon className={`${index === 0 ? '-rotate-180' : index === 2 ? '-rotate-0' : '-rotate-90'}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayoutOption;
