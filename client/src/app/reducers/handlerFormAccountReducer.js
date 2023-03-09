export const handlerFormAccountReducer = (state, action) => {
    switch (action.type) {
        case "setname":
            return { ...state, name: action.name }
        case "setpassword":
            return { ...state, password: action.password }
        case "seterrorname":
            return { ...state, errorName: action.erroNname }
        case "seterrorpassword":
            return { ...state, errorName: action.errorPassword }
        case "global-message":
            return { ...state, globalMessage: action.message }
        case "all-errors":
            let s = {}
            let errors = action.errors
            errors.forEach(error => {
                let [key] = Object.keys(error)
                let [value] = Object.values(error)
                s[key] = value
            })

            return { ...state, ...s }
        default:
            return state

    }
}