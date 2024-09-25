import { Outlet, useLocation } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import Sidebar from "./Sidebar"
import ScrollToTop from "./ScrollToTop"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setProjectId } from "../features/codeeditor/codeEditorSlice"

const RootLayout = () => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);
  const dispatch = useDispatch()

  const toggle = (data) => {
    setShowSidebar(data)
  }

  const isPen = location.pathname.includes('/pen');

  useEffect(() => {
    !isPen && dispatch(setProjectId(''))
  }, [isPen])

  return (
    <div className="flex">
      <ScrollToTop setShowSidebar={setShowSidebar} />
      {
        !isPen && (
          <div className={`${showSidebar ? 'w-[14vw] transform duration-500' : 'w-2 -translate-x-44 transform duration-500'}`}>
            <Sidebar toggle={toggle} />
          </div>
        )
      }
      <div className={`${isPen
        ? 'w-[100vw]'
        : showSidebar
          ? 'w-[86vw]'
          : 'w-[100vw]'
        }`}>
        <Header />
        <Outlet />
        {
          !isPen && (
            <Footer />
          )
        }
      </div>

    </div>
  )
}
export default RootLayout