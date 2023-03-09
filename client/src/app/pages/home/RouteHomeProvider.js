import React from 'react'
import { Navigate } from 'react-router-dom'
import Home from './Home'

function RouteHomeProvider() {

    if (!localStorage.getItem('user-local')) {
        return <Home />
    } else {
        return <Navigate to="/chat" replace={true} />
    }
}

export default RouteHomeProvider
