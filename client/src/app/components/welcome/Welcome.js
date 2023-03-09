import { memo } from "react"

const Welcome = () => {
    return (
        <div className="chat-container d-flex">
            <div className="chat-message-center">
                <div className="defaultpage" style={{
                    height: "100%",
                    color: "#fff",
                }}>page d'accueil</div>
            </div>
        </div>
    )
}

export default memo(Welcome)
