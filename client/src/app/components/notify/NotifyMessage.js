import React from 'react'

function NotifyMessage({ message, handlerClick }) {
    return (
        <>
            <div className="header d-flex justify-content-between align-items-center">
                <span className="header-title">message</span>
                <span className="close" onClick={handlerClick}>&#10006;</span>
            </div>
            <div className="message">
                {message}
            </div>
        </>
    )
}

export default NotifyMessage
