import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const NavBarHome = () => {
    return (
        <>
            <nav className="nav-bar navbar-vw  d-flex justify-content-between align-items-center">
                <div className="nav-brand">
                    <span className="text-brand">
                        <Link to="/">Chat App</Link>
                    </span>
                </div>
                <div className="nav-link">
                    <ul className="links d-flex justify-content-between align-items-center">
                        <li className="link-item">
                            <Link to={'/login'}>{"login"}</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default memo(NavBarHome)
