import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return !isAuthenticated ? <Outlet /> : <Navigate to={'/profile'} />
}
export default PublicRoute