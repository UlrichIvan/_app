/**
 * @author <dreamwebfoundation@gmail.com>
 */

//necessary imports from this component
import { useCallback, memo, useContext } from 'react'
import { chatdispatchcontext } from '../../context/chatdispatchContext'
import { UcFirst } from '../../helpers/UcFirst'
import { types } from '../../utils/utils'

/**
 *  list all groups of user
 * @returns JSX.Element
 */
const Groups = ({ group = "", groups = [], search = "" }) => {

    // get state,socket and dispatch for global chatComponent
    const { dispatch: chatDispatch } = useContext(chatdispatchcontext)

    // hook for filter friends of user
    const filterGroup = useCallback((groups, search) => {
        let gps = groups.filter((g) => {
            if (search.trim().length) {
                return g.name.indexOf(search) !== -1
            } else return true
        })
        return gps.length ? gps : groups
    }, [])

    // hook handler click
    const handlerClick = useCallback((g, e) => {
        e.preventDefault()
        if (g.name !== group.name) {
            chatDispatch({ type: types.UPDATE_GROUPNAME, name: g.name, pre: g.pre })
            chatDispatch({ type: types.UNREAD_MESSAGES, groupname: g.name, unread: false })
        }
    }, [chatDispatch, group])

    return (
        <div className='groups'>
            {<ul className="user-body">
                {filterGroup(groups, search).map((g, i) => {
                    return (
                        <li key={i} onClick={handlerClick.bind(null, g)}
                            className={`f d-flex align-items-center justify-content-between ${g.unreadmessages ? "unread" : ""}`}
                        >
                            <div className="f-infos d-flex align-items-center">
                                <span
                                    className="f-pre d-flex justify-content-center align-items-center"
                                    title={UcFirst(g.name)}
                                >
                                    {(g.pre || g.name[0]).toUpperCase()}
                                </span>
                                <span className="f-name">{UcFirst(g.name)}</span>
                            </div>
                        </li>)
                })}
            </ul>}
        </div>
    )
}

export default memo(Groups)
