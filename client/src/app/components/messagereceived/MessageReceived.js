import { memo } from "react"

function MessageReceived({ data }) {
    const { sender, message, at } = data
    return (
        <div className="message-entered d-flex">
            <div className="message-content">
                <div className="user-send">
                    {sender}
                </div>
                <div className="message">
                    {decodeURIComponent(message)}
                </div>
                <div className="message-time">
                    {at}
                </div>
            </div>
        </div>
    )
}

export default memo(MessageReceived)
