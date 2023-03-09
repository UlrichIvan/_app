import React, { useCallback, useEffect, useState } from 'react'
import "./notify.css"
import NotifyMessage from './NotifyMessage'

function Notify({ message = "test notify", type = "right", reset }) {

    const [mounted, setMounted] = useState(false)

    const unmount = useCallback(() => {
        setMounted(false)
        reset()
    }, [setMounted, reset])

    const getClassNotification = useCallback(() => {
        if (type === "right") {
            return mounted ? "notify notify-right enter" : "notify notify-right"
        } else if (type === "left") {
            return mounted ? "notify notify-left enter" : "notify notify-left"
        }
    }, [mounted, type])

    useEffect(() => {
        setMounted(true)
        let id = setTimeout(unmount, 2000)
        return () => (clearTimeout(id))
    }, [unmount])

    return (
        <>
            {message &&
                (<div className={getClassNotification()}>
                    <NotifyMessage message={message} handlerClick={unmount} />
                </div>)
            }
        </>
    )
}

export default Notify
