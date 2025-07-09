import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectLoggedInUser } from '../authSlice'
import { useLocation } from "react-router-dom";

function Protected({children}) {
    const location = useLocation();
    console.log("Current route is:", location.pathname);
    const user = useSelector(selectLoggedInUser)
    console.log('this is the user when logged in',user)
  if (!user) {
    return <Navigate to='/login' replace={true} />;
  }
  return (
    <div>
      {children}
    </div>
  )
}

export default Protected
