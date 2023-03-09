import { memo } from "react"

function MesageSend({ data }) {
    const { message, at } = data
    return (
        <div className="message-send d-flex">
            <div className="message-content">
                <div className="message">
                    {decodeURIComponent(message)}
                </div>
                <div className="message-time">
                    {at}
                </div>
            </div>
        </div>)
}

export default memo(MesageSend)
