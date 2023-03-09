import { Navigate } from "react-router-dom"
import Login from "./Login"

function RouteLoginProvider({ path, component }) {

    if (!localStorage.getItem('user-local')) {
        return <Login />
    } else {
        return <Navigate to="/chat" replace={true} />
    }
}

export default RouteLoginProvider
