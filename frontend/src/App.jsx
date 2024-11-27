import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import RootLayout from './layout/RootLayout'
import SignUp from './pages/SignUp'
import ProtectedRoutes from './features/routes/ProtectedRoutes'
import YourWork from './pages/YourWork'
import PublicRoute from './features/routes/PublicRoute'
import Profile from './pages/Profile'
import NewPen from './pages/NewPen'
import Search from './pages/Search'
import { useSelector } from 'react-redux'
import AutoLogout from './components/Auth/AutoLogout'
import ProjectPenView from './pages/ProjectPenView'

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          element: <ProtectedRoutes />,
          children: [
            { path: '/your-work', element: <YourWork /> },
            { path: '/profile', index: true, element: <Profile /> }
          ]
        },
        {
          element: <PublicRoute />,
          children: [
            { index: true, element: <HomePage /> },
            { path: '/login', element: <Login /> },
            { path: '/signup', element: <SignUp /> },
          ]
        },


        { path: '/pen', element: <NewPen /> },
        { path: '/:username/pen/:id', element: <NewPen /> },
        { path: '/search', element: <Search /> },
        { path: 'pen/:username/:id', element: <ProjectPenView /> }
      ]
    },
  ])

  return <>
    {isAuthenticated && <AutoLogout />}
    <RouterProvider router={router} />
  </>
}
export default App