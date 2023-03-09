import { Navigate } from 'react-router-dom'

function ProtectedConnexion({ children }) {
    let user = localStorage.getItem('user')

    if (user) {
        return (
            <Navigate to="/chat" replace={true} />
        )
    } else {
        return (
            <>
                {children}
            </>
        )
    }
}

export default ProtectedConnexion
