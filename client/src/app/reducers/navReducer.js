export const navReducer = (state, action) => {
    switch (action.type) {
        case "reset":
            return { display: false, message: "" }
        case "setmessage":
            return { ...state, message: action.message }
        case "user-typing":
            return { ...state, display: action.display, message: `${action.username} is typing...` }
        default:
            return state;
    }
}