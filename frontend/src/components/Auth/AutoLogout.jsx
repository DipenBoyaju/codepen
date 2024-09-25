import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { removeCredentials } from "../../features/auth/auth.slice";

const AutoLogout = () => {
  const dispatch = useDispatch();
  const { expiresAt } = useSelector((state) => state.user)

  useEffect(() => {
    if (expiresAt) {
      const timeLeft = expiresAt - Date.now();

      if (timeLeft > 0) {
        const timer = setTimeout(() => {
          dispatch(removeCredentials());
        }, timeLeft);

        return () => clearTimeout(timer)
      }
    }
  }, [expiresAt, dispatch])

  return null;
}
export default AutoLogout