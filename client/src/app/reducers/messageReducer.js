import { types } from "../utils/utils"

export const messageReducer = (state = [], action) => {
    switch (action.type) {
        case "update-messages":
            let messages = [...state.messages, action.message]
            return { ...state, messages }
        case "all-messages":
            return { ...state, messages: action.messages }
        case "update-groupname":
            let grps = state.groups?.length ? state.groups : []
            if (grps.length) {
                grps = grps.map((g) => {

                    if (g.name === action.name) {
                        g.unreadmessages = false
                    }
                    return g
                })
                return { ...state, groups: [...grps], group: { name: action.name, pre: action.pre } }
            } else {
                if (action.name && action.pre) {
                    return { ...state, group: { name: action.name, pre: action.pre } }
                } else return state
            }
        case "update-groups":
            return { ...state, groups: [...action.groups] }
        case types.USER_GROUP_TYPING:
            return { ...state, messageTyping: `${action.username} is typing...` }
        case types.RESET_TYPING_MESSAGE:
            return { ...state, display: false, messageTyping: "" }
        default:
            return state;
    }
}