export const sendMessage = (message, socket, dispatch) => {
    if (message.trim().length && localStorage.getItem('user-local')) {
        socket.emit("new-message", {
            message: encodeURIComponent(message),
            type: "text",
            token: localStorage.getItem('user-local')
        })
        dispatch({ type: "setmessage", message: "" })
    }
}