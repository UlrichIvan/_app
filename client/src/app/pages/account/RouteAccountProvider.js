import React from 'react'
import { Navigate } from 'react-router-dom'
import Account from './Account'

function RouteAccountProvider() {

    if (!localStorage.getItem('user-local')) {
        return <Account />
    } else {
        return <Navigate to={"/chat"} replace={true} />
    }
}

export default RouteAccountProvider
