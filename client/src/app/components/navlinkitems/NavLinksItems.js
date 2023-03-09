import { memo, useCallback, useContext } from 'react'
import { Link } from 'react-router-dom'
import { chatdispatchcontext } from '../../context/chatdispatchContext'

const NavLinksItems = ({ links = [], logOut = () => { } }) => {

    const { dispatch } = useContext(chatdispatchcontext)

    const handlerToggleSetting = useCallback(() => {
        dispatch({ type: "toggle-setting" })
    }, [dispatch])

    return (
        <div className='nav-link'>
            <ul className="links d-flex justify-content-between align-items-center">
                {links.map((li, i) => {
                    if (li.name === "logout") {
                        return (
                            <li key={i} className="link-item">
                                <span to={li.path} onClick={logOut}>{li.name}</span>
                            </li>
                        )
                    }
                    return (
                        <li key={i} className="link-item">
                            <Link to={li.path}>{li.name}</Link>
                        </li>
                    )
                })}
                {<li className="user" onClick={handlerToggleSetting}>
                    <div className="circle-name" title={"Settings"}>
                        <span className='settings'><i className='fa fa-bars fax-2' aria-hidden="true"></i></span>
                    </div>
                </li>}
            </ul>
        </div>
    )
}

export default memo(NavLinksItems)
