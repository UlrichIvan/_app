import MessageReceived from "../components/messagereceived/MessageReceived"
import MessageSend from "../components/messagesend/MessageSend"

export default function getMessages(messages = [], username = "") {
    if (messages.length) {
        return messages.map((m, i) => {
            if (m.sender === username) {
                return <MessageSend key={i} data={m} />
            } else {
                return <MessageReceived key={i} data={m} />
            }
        })
    }
    return null
}