import { Navigate } from "react-router-dom"
import Chat from "./Chat"


function RouteChatProvider() {

    if (localStorage.getItem('user-local')) {
        return <Chat />
    } else {
        return <Navigate to="/login" replace={true} />
    }
}

export default RouteChatProvider
